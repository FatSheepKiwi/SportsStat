import React from 'react';
import {observer,inject} from 'mobx-react';
import faker from 'faker';

class UserHeader extends React.Component {    
    render() {        
        const user = faker.internet.userName(); 
        return <a class="ui image label">{user}</a>;
    };
}

UserHeader = inject('store')(observer(UserHeader))
export default UserHeader;