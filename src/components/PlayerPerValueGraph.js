import React from "react";
import { Select, Spin } from "antd";
import { observer, inject, Provider } from "mobx-react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PARA = [
    85.910,
    53.897,
    51.757,
    46.845,
    39.190,
    39.190,
    34.677,
    14.707,
    -17.174,
    -20.091,
    -39.190,
    -53.897
]

const KEY = [
    "fieldGoalsMade",
    "turnovers",
    "threePointFieldGoalsMade",
    "freeThrowsMade",
    "steals",
    "offensiveRebounds",
    "Assists",
    "defensiveRebounds",
    "personalFouls",
]

class PlayerPerValueGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    getXAxis = (seasonType) => {
        var res = [];
        this.props.store.playerStatistic.forEach(element => {
            if (element.statType === seasonType) {
                res.push(element.seasonID);
            }
        });
        return res;
    }

    calculatePerValue = (element) => {
        var res = 0, i = 0;
        for (i = 0; i < KEY.length; i++) {
            res += PARA[i] * element[KEY[i]];
        }
        res += PARA[i++] * (element.freeThrowsAttempted - element.freeThrowsMade);
        res += PARA[i++] * (element.fieldGoalsAttempted - element.fieldGoalsMade);
        res += PARA[i] * element.blocks;
        res /= element.minute;
        
        return res;
    }

    getPerValueBasedOnSeasonType = (seasonType, seasons) => {
        var res = [];
        if (seasons.length === 0) {
            this.props.store.playerStatistic.forEach(element => {
                if (element.statType === seasonType) {
                    var curPerValue = this.calculatePerValue(element);
                    res.push(curPerValue);
                }
            });
        }
        else {
            var i = 0;
            this.props.store.playerStatistic.forEach(element => {
                if (element.statType === seasonType) {
                    while (element.seasonID != seasons[i]) {
                        res.push(0);
                        i++;
                    }
                    console.log(element.seasonID)
                    var curPerValue = this.calculatePerValue(element);
                    res.push(curPerValue);
                    i++;
                }
            });
        }
        return res;
    }

    render() {
        const options = {
            chart: {
                type: 'column',
            },
            title: {
                text: this.props.store.playerData.playerFirstName + " " + this.props.store.playerData.playerLastName + "'s Per Value Board"
            },
            subtitle: {
                text: "Reference: " + "<a href='https://bleacherreport.com/articles/113144-cracking-the-code-how-to-calculate-hollingers-per-without-all-the-mess'>Per Value Calculation</a>"
            },
            plotOptions: {
                column: {
                    depth: 25
                }
            },
            xAxis: {
                title: {
                    text: "Season",
                },
                categories: this.getXAxis("RegularSeason"),
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            series: [
            {
                name: 'RegularSeason',
                data: this.getPerValueBasedOnSeasonType("RegularSeason", [])
            },
            {
                name: 'PostSeason',
                data: this.getPerValueBasedOnSeasonType("PostSeason", this.getXAxis("RegularSeason"))
            }]
        }

        return (
            <div style={{ paddingTop: 20 }}>
                <Spin spinning={this.props.store.loadingInfo}>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </Spin>
            </div>
        )
    }
}


PlayerPerValueGraph = inject("store")(observer(PlayerPerValueGraph))
export default PlayerPerValueGraph;