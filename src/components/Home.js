import React from 'react';
import {Row, Col, Card, Spin} from 'antd';
import {observer,inject, Provider} from 'mobx-react';


class Home extends React.Component {

  render() {
    return (
      <div>
      <div>
        <Row>
          <Col span = {8}>
            <Card
              title="Points"
              style={{ width: '100%' }}
            >
              	<p>1. D'Angelo Russell BKN 38</p>
                <p>2.	Devin Booker PHX	37</p>
                <p>3.	Dwyane Wade MIA	35</p>
                <p>4.	Jimmy Butler PHI	34</p>
                <p>4.	Tobias Harris LAC	34</p>
            </Card>
          </Col>
          <Col span = {8}>
          <Card
              title="Rebounds"
              style={{ width: '100%' }}
            >
                <p>1.	Enes Kanter	26</p>
                <p>2.	Bam Adebayo	21</p>
                <p>3.	Andre Drummond	16</p>
                <p>3.	Meyers Leonard	16</p>
                <p>5.	Rudy Gobert	15</p>
            </Card>
          </Col>
          <Col span = {8}>
          <Card
              title="Assists"
              style={{ width: '100%' }}
            >
              	<p>1.	Mike Conley	11</p>
                <p>1.	Blake Griffin	11</p>
                <p>3.	Kyle Lowry	10</p>
                <p>4.	D.J. Augustin	9</p>
                <p>4.	Ben Simmons	9</p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span = {8}>
            <Card
              title="Blocks"
              style={{ width: '100%' }}
            >
              	
                <p>1.	Jaren Jackson Jr.	7</p>
                <p>1.	JaVale McGee	7</p>
                <p>3.	Marc Gasol	5</p>
                <p>4.	Deandre Ayton	3</p>
                <p>4.	Zach Collins	3</p>
            </Card>
          </Col>
          <Col span = {8}>
          <Card
              title="Steals"
              style={{ width: '100%' }}
            >
              
              <p>1.	Kentavious Caldwell-Pope	5</p>
              <p>1.	Andre Drummond	5</p>
              <p>3.	Jimmy Butler	4</p>
              <p>3.	Harry Giles III	4</p>
              <p>5.	Trevor Ariza	3</p>
            </Card>
          </Col>
          <Col span = {8}>
          <Card
              title="Turnovers"
              style={{ width: '100%' }}
            >
              <p>1.	LeBron James	6</p>
              <p>2.	Blake Griffin	5</p>
              <p>2.	Buddy Hield	5</p>
              <p>2.	Brandon Ingram	5</p>
              <p>2.	Jeremy Lin	5</p>
            </Card>
          </Col>
        </Row>
                <Row gutter = {16}>
                    <Col span = {12} >

                    </Col>
                    <Col span = {12}>

                    </Col>          
                </Row>
            </div>
            
            
          </div>
    );
  }
}

Home = inject('store')(observer(Home))
export default Home;