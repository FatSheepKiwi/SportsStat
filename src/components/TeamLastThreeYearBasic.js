import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


class TeamLastThreeYearBasic extends React.Component {
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
                    data: [106.5, 43.1, 22.2, 10.0, 5.2]
            
                }, {
                    name: '2016-2017',
                    data: [115.3, 44.4, 25.2, 8.2, 4.3]            
                }, {
                    name: '2017-2018',
                    data: [112.4, 43.5, 21.5, 8.5, 4.8]    
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


export default TeamLastThreeYearBasic;