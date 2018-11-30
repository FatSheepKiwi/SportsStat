import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, message, Checkbox, Button, AutoComplete, Upload } from 'antd';
import {observer,inject, Provider} from 'mobx-react';
import axios from 'axios';
import './UserProfileForm.css';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
        }],
    }],
}];

const props = {
    action: '/upload.do',
    listType: 'picture',
    defaultFileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    }, {
      uid: -2,
      name: 'yyy.png',
      status: 'done',
      url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    }]
  };

class UserProfileForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        avatarExtends: '',
        avatarName: '',        
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
        autoCompleteResult = [];
        } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    normFile = (e) => {
        // console.log('Upload event:', e);
        // console.log(this.state.avatarName); 
        // var ext = e.file.name.substr(e.file.name.lastIndexOf("."));
        // var avatar = this.props.store.email + ext;
        // console.log(avatar);
        // this.setState({avatarName: avatar});
        // if (Array.isArray(e)) {
        //     return e;
        // }        

        // console.log(imageUrl);
        // const formData = new FormData()
        // formData.append(avatar, file, );
        // axios.post("/profile/avatar", formData)
        return e && e.fileList;
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
      
    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        const imageUrl = this.state.imageUrl;

        const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
        };
        const tailFormItemLayout = {
        wrapperCol: {
            xs: {
            span: 24,
            offset: 0,
            },
            sm: {
            span: 16,
            offset: 8,
            },
        },
        };
        const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
        })(
        <Select style={{ width: 70 }}>
            <Option value="86">+1</Option>            
            <Option value="86">+86</Option>
            <Option value="87">+...</Option>
        </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
        <Form onSubmit={this.handleSubmit}>            
            <FormItem
            {...formItemLayout}
            label={(
                <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            )}
            >
            {getFieldDecorator('nickname', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
                <Input />
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="Habitual Residence"
            >
            {getFieldDecorator('residence', {
                initialValue: ['irvine', 'los angelos', 'san francisco', 'san diego', 'xixi', 'hehe'],
                rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
            })(
                <Cascader options={residences} />
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="Phone Number"
            >
            {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
            </FormItem>
            <FormItem
            {...formItemLayout}
            label="Website"
            >
            {getFieldDecorator('website', {
                rules: [{ required: true, message: 'Please input website!' }],
            })(
                <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="website"
                >
                <Input />
                </AutoComplete>
            )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
                valuePropName: 'checked',
            })(
                <Checkbox>I have read the <a href="">agreement</a></Checkbox>
            )}
            </FormItem>
            
            <FormItem
                {...formItemLayout}
                label="Upload image"
                extra="Only accept .jpeg and .png."
                >
                {getFieldDecorator('upload', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                })(
                    <Upload
                        className="avatar-uploader"
                        name="avatar"
                        showUploadList={false}
                        action="/profile/avatar"
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                    >
                        {
                        imageUrl ?
                            <img src={imageUrl} alt="" className="avatar" /> :
                            <Icon type="plus" className="avatar-uploader-trigger" />
                        }
                    </Upload>
                )}
            </FormItem>

            <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
            </FormItem>
            

        </Form>
        );
    }
}    

UserProfileForm = inject('store')(observer(UserProfileForm))
export default UserProfileForm;