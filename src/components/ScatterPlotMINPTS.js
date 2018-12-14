import React from "react";
import {message} from 'antd';
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "./../apis/sportStatServer";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class ScatterPlotMINPTS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerStat: [],
            playerBios: [],
        }
    }

    chooseRegularSeason = (data) => {
        var res = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].statType === "RegularSeason") {
            res.push(data[i]);
          }
        }
        return res;
    }

    fetchPlayerStat = () => {
        const url = "/player/average/season/2018-19";
        SportStatServer.get(url)
            .then(response => {
                var filterData = this.chooseRegularSeason(response.data);
                this.setState({
                    playerStat: filterData
                });
            }) 
            .catch(function(err) {
                console.log("error");
                message.error("Get player rank stats failed, please retry...")
            });

        SportStatServer.get("/player/all-bio")
            .then(response => {
                this.setState({
                    playerBios: response.data
                });
            })
            .catch(err => {
                message.error("Fetch data failed, please retry...");
            });
    }

    findPlayerName = (id) => {
        for (let i = 0; i < this.state.playerBios.length; i++) {
          if (this.state.playerBios[i].playerID === id) {
            return this.state.playerBios[i].playerName + " ";
          }
        }
    }

    getSeries = () => {
        var res = [];
        console.log(this.state.playerStat.length)
        for (let i = 0; i < this.state.playerStat.length; i++) {
            var curPlayer = {};
            var data = [];
            var curData = [];
            curPlayer["name"] = this.findPlayerName(this.state.playerStat[i].playerID);
            curPlayer["color"] = 'rgba(119, 152, 191, .5)';
            curData.push(this.state.playerStat[i].minute);
            curData.push(this.state.playerStat[i].Points);
            data.push(curData);
            curPlayer["data"] = data;
            res.push(curPlayer);
        }
        return res;
    }

    componentDidMount = () => {
        this.fetchPlayerStat();
    }

    render() {
        const options = {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Player MIN vs PTS'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'MIN (Minute)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'PTS (Points)'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: false,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x} MIN, {point.y} PTS'
                    }
                }
            },
            series: this.getSeries()
        }
        return (
            <HighchartsReact highcharts={Highcharts} options={options} />
        );
    }
}

ScatterPlotMINPTS = inject("store")(observer(ScatterPlotMINPTS));
export default ScatterPlotMINPTS;