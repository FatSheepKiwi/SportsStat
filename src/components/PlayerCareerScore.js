import React from 'react';
import {Spin} from 'antd';
import {observer,inject, Provider} from 'mobx-react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class PlayerCareerScore extends React.Component {

	getXAxis = () => {
		var res = [];
        this.props.store.playerStatistic.forEach(element => {
			if (element.statType === "RegularSeason"){
				res.push(element.seasonID);
			}
        });
        return res;
	}

	getData = () => {
		var res = [];
        this.props.store.playerStatistic.forEach(element => {
			if (element.statType === "RegularSeason"){
				res.push(element.Points);
			}
        });
        return res;
	}

  	render() {
		const options = {
			title: {
				text: this.props.store.playerData.playerFirstName + " " + this.props.store.playerData.playerLastName + '\' Career Scores board '
			},
		
			yAxis: {
				title: {
					text: 'Points'
				}
			},
		
			xAxis:{
				title: {
					text: 'Season'
				},
				categories: this.getXAxis()//['2009-2010', '2010-2011', '2011-2012', '2012-2013','2013-2014', '2014-2015', '2015-2016', '2016-2017', '2017-2018']
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle'
			},
		
			plotOptions: {
				series: {
					label: {
						connectorAllowed: false
					},
					//pointStart: 2010
				}
			},
		
			series: [{
				name: 'Average Scores per Season',
				data: this.getData()//[9.9, 12.2, 16.8, 25.9, 25.4, 27.4, 29.0, 29.1, 30.4]
			}],
		
			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {
						legend: {
							layout: 'horizontal',
							align: 'center',
							verticalAlign: 'bottom'
						}
					}
				}]
			}
		  }
    	return (
        	<div>
				<Spin spinning = {this.props.store.loadingInfo}>
            	<HighchartsReact
                	highcharts={Highcharts}
                	options={options}
            	/>
				</Spin>
      		</div>
    	);
  	}
}

PlayerCareerScore = inject('store')(observer(PlayerCareerScore))
export default PlayerCareerScore;