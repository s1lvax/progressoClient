import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { UserId } from "../contexts/UserId";
import Chart from "chart.js/auto";

function Charts() {
  const { userId } = useContext(UserId);
  const [weightStats, setWeightStats] = useState([]);
  const [bfStats, setBFStats] = useState([]);
  const [dates, setDates] = useState([]);
  const [avgWeight, setAvgWeight] = useState(null);
  const [avgBf, setAvgBf] = useState(null);
  const weightChartRef = useRef(null);
  const bfChartRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getStats/${userId}`)
      .then((response) => {
        const data = JSON.parse(response.data);
        const weightData = data.weight;
        const bfData = data.bodyfat;
        const avgWeight = data.avgWeight;
        const avgBf = data.avgBf;
        const dates = data.dates;

        setWeightStats(weightData);
        setBFStats(bfData);
        setAvgWeight(avgWeight);
        setAvgBf(avgBf);

        if (weightChartRef.current) {
          new Chart(weightChartRef.current, {
            type: "line",
            data: {
              labels: dates,
              datasets: [
                {
                  label: "Weight",
                  data: weightData,
                  borderColor: "#7a00b4",
                  backgroundColor: "rgba(122, 0, 180, 0.1)",
                  borderWidth: 3,
                  fill: true,
                  lineTension: 0.3,
                },
              ],
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      fontColor: "#b1b1b1",
                    },
                    gridLines: {
                      color: "rgba(177, 177, 177, 0.1)",
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontColor: "#b1b1b1",
                    },
                    gridLines: {
                      color: "rgba(177, 177, 177, 0.1)",
                    },
                  },
                ],
              },
            },
          });
        }

        if (bfChartRef.current) {
          new Chart(bfChartRef.current, {
            type: "line",
            data: {
              labels: dates,
              datasets: [
                {
                  label: "Bodyfat",
                  data: bfData,
                  borderColor: "#b4009e",
                  backgroundColor: "rgba(180, 0, 158, 0.1)",
                  borderWidth: 3,
                  fill: true,
                  pointBackgroundColor: "#b4009e",
                  pointBorderColor: "transparent",
                  pointRadius: 6,
                  pointHoverRadius: 8,
                  shadowOffsetX: 0,
                  shadowOffsetY: 5,
                  shadowBlur: 10,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                  lineTension: 0.5,
                },
              ],
            },
            options: {
              tooltips: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: function (tooltipItem, data) {
                    var label =
                      data.datasets[tooltipItem.datasetIndex].label || "";
                    if (label) {
                      label += ": ";
                    }
                    label += tooltipItem.yLabel + "%";
                    return label;
                  },
                },
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      max: 100,
                      fontColor: "#b1b1b1",
                    },
                    gridLines: {
                      color: "rgba(177, 177, 177, 0.1)",
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontColor: "#b1b1b1",
                    },
                    gridLines: {
                      color: "rgba(177, 177, 177, 0.1)",
                    },
                  },
                ],
              },
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexBasis: "50%", flexGrow: 1 }}>
        <canvas ref={weightChartRef} />
      </div>
      <div style={{ flexBasis: "50%", flexGrow: 1 }}>
        <canvas ref={bfChartRef} />
      </div>
    </div>
  );
}

export default Charts;
