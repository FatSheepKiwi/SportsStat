import React from 'react';
import {Row, Col} from 'antd';
import TeamLastThreeYearBasic from './TeamLastThreeYearBasic';


class Team extends React.Component {

  render() {
    return (
        <div>
            <Row>
                <img src = {"https://stats.nba.com/media/img/teams/logos/HOU_logo.svg"} 
                    alt = {"Rocket"}/>
            </Row>
            <Row gutter = {16}>
                <Col span = {12} >
                    <TeamLastThreeYearBasic />
                </Col>      
            </Row>
        </div>
    );
}
}


export default Team;