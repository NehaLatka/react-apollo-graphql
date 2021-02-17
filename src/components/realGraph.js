import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  typographyStyle: {
    color: "#000000",
    textAlign: "center",
    opacity: "1",
    font: "normal normal bold 32px/64px Calibri",
    marginBottom: "1.5rem",
    marginTop: "1.5rem"
  }
}));

class ApexChart1 extends Component {
  constructor(props) {
    super(props);

    this.updateCharts = this.updateCharts.bind(this);

    this.state = {
      graphData: this.props.graphdata,
      timeStampForAccuracy: [],
      timeStampForDuration: [],
      Accuracy: [],
      Duration: [],
      datasetValue: "d1",
      modelValue: "m1"
    };
    console.log("<<<<<<<<<<<<", this.props.graphdata);
  }
  componentDidMount() {
    this.getGraphData();
  }

  handleChangeDataset = (event) => {
    console.log("changed value is " + event.target.value);
    this.setState({
      datasetValue: event.target.value
    });
    this.getGraphData(event.target.value, this.state.modelValue);
  };
  handleChangeModel = (event) => {
    console.log("changed value is " + event.target.value);
    this.setState({
      modelValue: event.target.value
    });
    this.getGraphData(this.state.datasetValue, event.target.value);
  };

  getGraphData() {
    let t1 = [];
    let a1 = [];
    let td1 = [];
    let td2 = [];
    let data1 = this.props.graphdata;
    data1.map((data) => {
      t1.push(data.endTime);
      a1.push(data.standardDeviation);
      td1.push(Number(data.mse));
    });
    // console.log("my timestamp is...." + t1);
    // console.log("my accuracy is " + a1);
    // console.log("timestamp for duration..."+td1)
    // console.log("min duration is...." + Math.min.apply(null,td1));
    // console.log("max duration is " + Math.max.apply(null,td1));
    this.setState({
      timeStampForAccuracy: t1,
      timeStampForDuration: t1,
      Accuracy: a1,
      Duration: td1
    });
  }

  updateCharts() {
    const max = 90;
    const min = 30;
    const newMixedSeries = [];
    const newBarSeries = [];

    this.state.seriesMixedChart.forEach((s) => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });
      newMixedSeries.push({ data: data, type: s.type });
    });

    this.state.seriesBar.forEach((s) => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * (180 - min + 1)) + min;
      });
      newBarSeries.push({ data, name: s.name });
    });

    this.setState({
      seriesMixedChart: newMixedSeries,
      seriesBar: newBarSeries,
      seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50]
    });
  }

  // const classes = useStyles();
  render() {
    const columns = [
      { text: "ID", renderKey: "Id" },
      { text: "Accuracy", renderKey: "accuracy" },
      { text: "Duration", renderKey: "duration" },
      { text: "Status", renderKey: "status" },
      { text: "Completion Time", renderKey: "completionTime" },
      { text: "Link", renderKey: "link" }
    ];

    const rows = [];

    const accuracyGraph = {
      optionsMixedChart: {
        chart: {
          height: 350,
          type: "line"
        },
        stroke: {
          width: 7,
          curve: "smooth"
        },
        xaxis: {
          type: "datetime",
          categories: this.state.timeStampForAccuracy,
            tickAmount: 10,
          labels: {
            formatter: function (value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), "dd MMM");
            }
          }
        },
        title: {
          text: "Standard Deviation",
          align: "left",
          style: {
            fontSize: "16px",
            color: "#666"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        markers: {
          size: 4,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7
          }
        },
        yaxis: {
          min: 0.0,
          max: 1.0,
          title: {
            text: "Standard Deviation"
          }
        }
      },
      seriesMixedChart: [
        {
          name: "Standard Deviation",
          data: this.state.Accuracy
        }
      ]
    };
    const DurationGraph = {
      optionsMixedChart: {
        chart: {
          height: 350,
          type: "line"
        },
        stroke: {
          width: 7,
          curve: "smooth"
        },
        xaxis: {
          type: "datetime",
          categories: this.state.timeStampForDuration,
          tickAmount: 10,
          labels: {
            formatter: function (value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), "dd MMM");
            }
          }
        },
        title: {
          text: "MSE",
          align: "left",
          style: {
            fontSize: "16px",
            color: "#666"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        markers: {
          size: 4,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7
          }
        },
        yaxis: {
          min: 0.0,
          max: 1.0,
          title: {
            text: "MSE"
          }
        }
      },
      seriesMixedChart: [
        {
          name: "MSE",
          data: this.state.Duration
        }
      ]
    };

    return (
      <div styles={{ flexGrow: "1" }}>
        <Typography
          style={{
            color: "#000000",
            textAlign: "center",
            opacity: "1",
            font: "normal normal bold 32px/64px Calibri",
            marginBottom: "1.5rem",
            marginTop: "1.5rem"
          }}
        >
          Standard Deviation And MSE
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper>
              <div style={{ padding: "5%" }}>
                <ReactApexChart
                  options={accuracyGraph.optionsMixedChart}
                  series={accuracyGraph.seriesMixedChart}
                  type="line"
                  width="500"
                  align="center"
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <div style={{ padding: "5%" }}>
                <ReactApexChart
                  options={DurationGraph.optionsMixedChart}
                  series={DurationGraph.seriesMixedChart}
                  type="line"
                  width="500"
                  align="center"
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ApexChart1;
