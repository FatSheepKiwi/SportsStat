import React from 'react';
import {Row, Col, Card, Spin} from 'antd';

class Schedule extends React.Component {

  render() {
    const gridStyleSmall = {
      width: '25%',
      textAlign: 'center',
    };
    const gridStyleBig = {
      width: '50%',
      textAlign: 'center',
    };
    return (
      <div>
        <Card title = {'Today Game Schedule'}>
          <Card.Grid style={gridStyleSmall}>4:00 PM PST</Card.Grid>
          <Card.Grid style={gridStyleSmall}>Regular Season</Card.Grid>
          <Card.Grid style={gridStyleBig}>Milwaukee Bucks VS Charlotte Hornets</Card.Grid>

          <Card.Grid style={gridStyleSmall}>4:00 PM PST</Card.Grid>
          <Card.Grid style={gridStyleSmall}>Regular Season</Card.Grid>
          <Card.Grid style={gridStyleBig}>Minnesota Timberwolves VS Cleveland Cavaliers</Card.Grid>

          <Card.Grid style={gridStyleSmall}>4:00 PM PST</Card.Grid>
          <Card.Grid style={gridStyleSmall}>Regular Season</Card.Grid>
          <Card.Grid style={gridStyleBig}>Houston Rockets VS Washington Wizards</Card.Grid>

          <Card.Grid style={gridStyleSmall}>5:00 PM PST</Card.Grid>
          <Card.Grid style={gridStyleSmall}>Regular Season</Card.Grid>
          <Card.Grid style={gridStyleBig}>Boston Celtics VS New Orleans Pelicans</Card.Grid>

          <Card.Grid style={gridStyleSmall}>6:00 PM PST</Card.Grid>
          <Card.Grid style={gridStyleSmall}>Regular Season</Card.Grid>
          <Card.Grid style={gridStyleBig}>Indiana Pacers VS Utah Jazz</Card.Grid>

          <Card.Grid style={gridStyleSmall}>7:30 PM PST</Card.Grid>
          <Card.Grid style={gridStyleSmall}>Regular Season</Card.Grid>
          <Card.Grid style={gridStyleBig}>Milwaukee Bucks VS Charlotte Hornets</Card.Grid>

          <Card.Grid style={gridStyleSmall}>4:00 PM PST</Card.Grid>
          <Card.Grid style={gridStyleSmall}>Regular Season</Card.Grid>
          <Card.Grid style={gridStyleBig}>Orlando Magic VS Golden State Warriors</Card.Grid>
        </Card>
      </div>
    );
  }
}


export default Schedule;