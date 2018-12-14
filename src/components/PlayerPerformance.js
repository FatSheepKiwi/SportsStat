import React from "react";
import { Spin } from "antd";
import { observer, inject } from "mobx-react";
import { Radar } from "react-chartjs-2";

class PlayerPerformance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getStatLevel = (type, curStat) => {
    if (type === "PTS") {
      if (curStat <= 2) {
        return 1;
      } else if (curStat > 2 && curStat <= 4) {
        return 2;
      } else if (curStat > 5 && curStat <= 7) {
        return 3;
      } else if (curStat > 7 && curStat <= 9) {
        return 4;
      } else if (curStat > 9 && curStat <= 12) {
        return 5;
      } else if (curStat > 12 && curStat <= 15) {
        return 6;
      } else if (curStat > 15 && curStat <= 18) {
        return 7;
      } else if (curStat > 18 && curStat <= 23) {
        return 8;
      } else if (curStat > 23 && curStat <= 28) {
        return 9;
      } else if (curStat > 28) {
        return 10;
      }
    } else if (type === "REB") {
      if (curStat <= 1) {
        return 1;
      } else if (curStat > 1 && curStat <= 2) {
        return 2;
      } else if (curStat > 2 && curStat <= 3) {
        return 3;
      } else if (curStat > 3 && curStat <= 4) {
        return 4;
      } else if (curStat > 4 && curStat <= 5) {
        return 5;
      } else if (curStat > 5 && curStat <= 6.5) {
        return 6;
      } else if (curStat > 6.5 && curStat <= 8) {
        return 7;
      } else if (curStat > 8 && curStat <= 9) {
        return 8;
      } else if (curStat > 9 && curStat <= 11) {
        return 9;
      } else if (curStat > 11) {
        return 10;
      }
    } else if (type === "AST") {
      if (curStat <= 1) {
        return 1;
      } else if (curStat > 1 && curStat <= 2) {
        return 2;
      } else if (curStat > 2 && curStat <= 3) {
        return 3;
      } else if (curStat > 3 && curStat <= 4) {
        return 4;
      } else if (curStat > 4 && curStat <= 5) {
        return 5;
      } else if (curStat > 5 && curStat <= 6) {
        return 6;
      } else if (curStat > 6 && curStat <= 7) {
        return 7;
      } else if (curStat > 7 && curStat <= 8) {
        return 8;
      } else if (curStat > 8 && curStat <= 9) {
        return 9;
      } else if (curStat > 9) {
        return 10;
      }
    } else if (type === "BLK") {
      if (curStat <= 0.2) {
        return 1;
      } else if (curStat > 0.2 && curStat <= 0.4) {
        return 2;
      } else if (curStat > 0.4 && curStat <= 0.6) {
        return 3;
      } else if (curStat > 0.6 && curStat <= 0.8) {
        return 4;
      } else if (curStat > 0.8 && curStat <= 1) {
        return 5;
      } else if (curStat > 1 && curStat <= 1.2) {
        return 6;
      } else if (curStat > 1.2 && curStat <= 1.5) {
        return 7;
      } else if (curStat > 1.5 && curStat <= 2.0) {
        return 8;
      } else if (curStat > 2 && curStat <= 2.5) {
        return 9;
      } else if (curStat > 2.5) {
        return 10;
      }
    } else if (type === "STL") {
      if (curStat <= 0.2) {
        return 1;
      } else if (curStat > 0.2 && curStat <= 0.4) {
        return 2;
      } else if (curStat > 0.4 && curStat <= 0.6) {
        return 3;
      } else if (curStat > 0.6 && curStat <= 0.8) {
        return 4;
      } else if (curStat > 0.8 && curStat <= 1) {
        return 5;
      } else if (curStat > 1 && curStat <= 1.2) {
        return 6;
      } else if (curStat > 1.2 && curStat <= 1.5) {
        return 7;
      } else if (curStat > 1.5 && curStat <= 2.0) {
        return 8;
      } else if (curStat > 2 && curStat <= 2.5) {
        return 9;
      } else if (curStat > 2.5) {
        return 10;
      }
    }
  };

  setFiveMainStat = element => {
    var res = [];
    res.push(this.getStatLevel("PTS", element.Points));
    res.push(this.getStatLevel("REB", element.Rebounds));
    res.push(this.getStatLevel("AST", element.Assists));
    res.push(this.getStatLevel("BLK", element.steals));
    res.push(this.getStatLevel("STL", element.turnovers));
    return res;
  };

  getPerformanceData = () => {
    var res = [];
    this.props.store.playerStatistic.forEach(element => {
      if (element.statType == "CareerRegularSeason") {
        res = this.setFiveMainStat(element);
      }
    });
    return res;
  };

  render() {
    const chartOptions = {
      legend: {
        display: false
      },
      title: {
        display: false,
        text: "Performance",
        fontSize: 20
      },
      scale: {
        ticks: {
          display: false,
          beginAtZero: true,
          fontSize: 10,
          min: 0,
          max: 10
        }
      },
      animation: {
        duration: 1000
      }
    };

    const chartData = {
      labels: ["PTS", "REB", "AST", "BLK", "STL"],
      datasets: [
        {
          borderColor: "rgba(120, 120, 120, 0.4)",
          backgroundColor: "rgba(223, 83, 83, 0.8)",
          borderWidth: 2,
          pointColor: "rgba(0,0,0,1)",
          pointStyle: "triangle",
          data: this.getPerformanceData()
        }
      ]
    };

    return (
      <div>
        <Spin spinning={this.props.store.loadingInfo}>
          <Radar data={chartData} options={chartOptions} />
        </Spin>
      </div>
    );
  }
}

PlayerPerformance = inject("store")(observer(PlayerPerformance));
export default PlayerPerformance;
