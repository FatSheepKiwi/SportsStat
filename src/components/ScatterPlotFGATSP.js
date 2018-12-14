import React from "react";
import {message} from 'antd';
import { observer, inject, Provider } from "mobx-react";
import SportStatServer from "./../apis/sportStatServer";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


class ScatterPlotFGATSP extends React.Component {
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

    calculateTrueShootingPercentage = element => {
        var res =
          element.Points /
          (2 * (element.fieldGoalsAttempted + 0.44 * element.freeThrowsAttempted));
        return res;
      };

    getSeries = () => {
        var res = [];
        console.log(this.state.playerStat.length)
        for (let i = 0; i < this.state.playerStat.length; i++) {
            var curPlayer = {};
            var data = [];
            var curData = [];
            curPlayer["name"] = this.findPlayerName(this.state.playerStat[i].playerID);
            curPlayer["color"] = 'rgba(223, 83, 83, .5)';
            curData.push(this.state.playerStat[i].fieldGoalsAttempted);
            var TSP = this.calculateTrueShootingPercentage(this.state.playerStat[i]);
            curData.push(TSP);
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
                text: 'Player FGA vs TSP'
            },
            subtitle: {
                text: 'TSP: True Shooting Percentage'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'FGA (Field Goals Attempted)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'TSP'
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
                        pointFormat: '{point.x} FGA, {point.y} TSP'
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


ScatterPlotFGATSP = inject("store")(observer(ScatterPlotFGATSP));
export default ScatterPlotFGATSP;