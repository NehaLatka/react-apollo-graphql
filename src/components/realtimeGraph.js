import React, { Component } from "react";
import { Query } from "react-apollo";
import { getAllJobs } from "../queries/queries";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "../common/sampleTable";
import ApexChart1 from "./realGraph";

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.updateCharts = this.updateCharts.bind(this);

    this.state = {
      timeStampForAccuracy: [],
      timeStampForDuration: [],
      Accuracy: [],
      Duration: [],
      datasetValue: "d1",
      modelValue: "m1",
      pipelineStatus: true
    };
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

  updateDB = () => {
    console.log("working..............");
    axios
      .post("http://178.128.63.115:4001/graphql", {
        query:
          "mutation($status:String!){updateJob(status:$status){ _id status}}",
        variables: { status: "completed" }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async componentDidMount() {
    try {
      setTimeout(() => {
        axios
          .get(
            `https://xn5xda4kr0.execute-api.ap-south-1.amazonaws.com/test/pipelinestatus`,
            {
              header: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"
              }
            }
          )
          .then((resp) => {
            console.log("first hit");
            if (resp.data && resp.data.length > 0) {
              let str = JSON.parse(resp.data);
              if (
                str.model_deployment_status === "Succeeded" ||
                str.model_deployment_status.toLowerCase() === "failed"
              ) {
                this.setState({ pipelineStatus: false });
                console.log("calling");
                this.updateDB();
              } else {
                this.setState({ pipelineStatus: true });
              }
            }
          });
      }, 5000);

      setInterval(async () => {
        const resp = axios
          .get(
            `https://xn5xda4kr0.execute-api.ap-south-1.amazonaws.com/test/pipelinestatus`,
            {
              header: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET"
              }
            }
          )
          .then((resp) => {
            console.log(resp);
            if (resp.data && resp.data.length > 0) {
              let str = JSON.parse(resp.data);
              if (
                str.model_deployment_status === "Succeeded" ||
                str.model_deployment_status.toLowerCase() === "failed"
              ) {
                this.setState({ pipelineStatus: false });
              } else {
                this.setState({ pipelineStatus: true });
              }
            }
          });
      }, 60000);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const columns = [
      { text: "Version", renderKey: "version" },
      { text: "ID", renderKey: "Id" },
      { text: "MSE", renderKey: "mse" },
      { text: "End Time", renderKey: "endTime" },
      { text: "Status", renderKey: "status" },
      { text: "Standard Deviation", renderKey: "standardDeviation" },
      { text: "Data Source", renderKey: "link" }
    ];

    return (
      <Query query={getAllJobs}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          console.log("in realtimegraph.js", data.getAllJobs);
          let sample = ["None"];
          data.getAllJobs.map((row) => {
            if (row.link) {
              sample.push(row.link.slice(row.link.indexOf("=") + 1));
            }
          });
          return (
            <div styles={{ flexGrow: "1" }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper>
                    <ApexChart1 graphdata={data.getAllJobs} />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <Table
                      rows={data.getAllJobs}
                      columns={columns}
                      pipelineStatus={this.state.pipelineStatus}
                      linkArray={sample}
                    />
                    <br />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ApexChart;
