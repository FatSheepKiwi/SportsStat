import React from 'react';
import {observer,inject, Provider} from 'mobx-react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom'

class TopicDetail extends React.Component {

    render() {
        return (
            <div>
                topic detail
            </div>
        );
    }
}

TopicDetail = inject('store')(observer(TopicDetail))
export default TopicDetail;