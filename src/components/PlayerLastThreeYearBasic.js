import React from 'react';
import {observer,inject, Provider} from 'mobx-react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


class PlayerLastThreeYearBasic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  	options: {},
		}
	}

	componentDidMount(){
		this.setState({
			options: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Last Three Year Basic statistic'
                },
                subtitle: {
                    text: 'with score, rebound, assist, steal and block'
                },
                xAxis: {
                    categories: [
                        'Score',
                        'Rebound',
                        'Assist',
                        'Steal',
                        'Block',
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'value'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: '2015-2016',
                    data: [29.0, 6.1, 7.5, 1.7, 0.5] 
            
                }, {
                    name: '2016-2017',
                    data: [29.1, 8.1, 11.2, 1.5, 0.6]            
                }, {
                    name: '2017-2018',
                    data: [30.4, 5.4, 8.8, 1.8, 0.7]      
                }]
            }
        });
    }

  	render() {
    	return (
        	<div>
            	<HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.options}
                />
      		</div>
    	);
  	}
}

PlayerLastThreeYearBasic = inject('store')(observer(PlayerLastThreeYearBasic))
export default PlayerLastThreeYearBasic;