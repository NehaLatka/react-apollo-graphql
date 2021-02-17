import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button, Tooltip, Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import { getAllDatasets } from "../queries/queries";
import { Query, useQuery } from "react-apollo";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  paper1: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  detailtable: {
    width: "80%",
    padding: "10% 0 0",
    margin: "auto"
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

export default function CenteredGrid() {
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const [resData, setResData] = useState(null);
  const [isRedirectToPrediction, setRedirect] = useState(false);

  const handleChange = (event) => {
    // console.log(event);
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  const saveData = (responsedata, data) => {
    console.log(responsedata);
    // console.log("in save data shucked weight is", data["Shucked Weight"])
    axios
      .post(`http://178.128.63.115:4001/graphql`, {
        query:
          "mutation( $prediction: String!  $timeStamp: String  $datasetName: String!  $algoName: String!  $sex: Int!  $length: Float!  $diameter: Float!  $height: Float!  $wholeWeight: Float!  $shuckedWeight: Float!  $visceraWeight: Float!  $shellWeight: Float!      ) {      addPrediction(        prediction:$prediction  timeStamp:$timeStamp  datasetName:$datasetName  algoName:$algoName  sex:$sex  length:$length  diameter:$diameter  height:$height  wholeWeight:$wholeWeight  shuckedWeight:$shuckedWeight  visceraWeight:$visceraWeight  shellWeight:$shellWeight  ) {        _id        sex     shellWeight              }    }",
        variables: {
          prediction: responsedata,
          datasetName: "snail age prediction",
          algoName: "LP",
          sex: data["Sex"],
          length: data["Length"],
          diameter: data["Diameter"],
          height: data["Height"],
          wholeWeight: data["Whole Weight"],
          shuckedWeight: data["Shucked Weight"],
          shellWeight: data["Shell Weight"],
          visceraWeight: data["Viscera Weight"]
        }
      })
      .then((res) => {
        console.log("database response", res);
        if (res.status == 200) {
          console.log("comminh inb");
          window.location.replace("/prediction");
          console.log("comminh inbfewvewvew");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let finalData = {
      data: "",
      endpoint: "ML-demo-staging"
    };
    let d = Object.values(formData);
    for (let i = 0; i < d.length; i++) {
      if (i === d.length - 1) {
        finalData.data = finalData.data + d[i];
      } else {
        finalData.data = finalData.data + d[i] + ",";
      }
    }
    console.log(finalData);
    console.log("form data is...", formData);
    axios
      .post(
        "https://xn5xda4kr0.execute-api.ap-south-1.amazonaws.com/test/predict",
        finalData,
        {
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
          }
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200 && !response.data.errorMessage) {
          setResData(response.data);
          saveData(response.data, formData);
        } else {
          alert("Some error occured!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Query query={getAllDatasets}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Error</div>;
        return (
          <div className={classes.root}>
            <br />
            <Typography className={classes.typographyStyle}>
              Add Prediction
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}></Grid>
              <Grid item xs={5} className={classes.detailtable}>
                <Paper className={classes.paper}>
                  {/* Select from dropdown:
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "5%"
              }}
            >
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Dataset
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={dataset}
                  onChange={handleChangeDataset}
                  label="Dataset"
                >
                  <MenuItem value="null">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="D1">D1</MenuItem>
                  <MenuItem value="D2">D2</MenuItem>
                  <MenuItem value="D3">D3</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Model
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={model}
                  onChange={handleChangeModel}
                  label="Model"
                >
                  <MenuItem value="null">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="M1">M1</MenuItem>
                  <MenuItem value="M2">M2</MenuItem>
                  <MenuItem value="M3">M3</MenuItem>
                </Select>
              </FormControl>
            </div> */}
                  <div
                    style={{
                      width: "70%",
                      display: false,
                      marginLeft: "15%"
                    }}
                  >
                    <form
                      noValidate={true}
                      onSubmit={handleSubmit}
                      style={{ display: "grid", padding: "1rem" }}
                    >
                      {data.getDataSets[0].inputs.map((data) => {
                        switch (data.inputType) {
                          case "TextField":
                            return (
                              <>
                                {/* <Typography
                                  style={{ textAlign: "left", color: "black" }}
                                >
                                  {data.label}
                                </Typography> */}
                                <TextField
                                  id={data.id}
                                  name={data.label || data.id}
                                  label={data.label}
                                  value={formData[data.id]}
                                  onChange={handleChange}
                                  margin="normal"
                                  variant="outlined"
                                  defaultValue={data.defaultValue}
                                />
                              </>
                            );

                          case "Radio":
                            return (
                              <>
                                <Typography
                                  style={{ textAlign: "left", color: "black" }}
                                >
                                  {data.label}
                                </Typography>
                                <RadioGroup
                                  aria-label={data.id}
                                  name={data.id}
                                  value={formData[data.id]}
                                  onChange={handleChange}
                                >
                                  {data.data.map((data1) => {
                                    return (
                                      <FormControlLabel
                                        value={data1}
                                        control={<Radio />}
                                        label={data1}
                                      />
                                    );
                                  })}
                                </RadioGroup>
                                <br />
                              </>
                            );

                          case "Select":
                            return (
                              <>
                                <Typography
                                  style={{ textAlign: "left", color: "black" }}
                                >
                                  {data.label}
                                </Typography>
                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <InputLabel id="demo-simple-select-outlined-label">
                                    {data.label}
                                  </InputLabel>
                                  <Select
                                    id={data.id}
                                    value={formData[data.id]}
                                    onChange={handleChange}
                                    label={data.label}
                                    name={data.id}
                                    variant="outlined"
                                  >
                                    <MenuItem value="null">
                                      <em>None</em>
                                    </MenuItem>
                                    {data.data.map((data1) => {
                                      return (
                                        <MenuItem value={data1}>
                                          {data1}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </FormControl>
                                <br />
                              </>
                            );

                          case "Slider":
                            return (
                              <>
                                <Typography
                                  style={{ textAlign: "left", color: "black" }}
                                >
                                  {data.label}
                                </Typography>
                                <Slider
                                  value={formData[data.id]}
                                  onChange={(event, newValue) => {
                                    formData[data.id] = newValue;
                                  }}
                                  valueLabelDisplay="auto"
                                  defaultValue={0}
                                />
                                <br />
                              </>
                            );

                          default:
                            return <></>;
                        }
                        // return (
                        //   <>
                        //     {/* <label style={{ textAlign: "left", color: "#000000" }}>
                        //       {data.label}: */}
                        //     {/* <Tooltip title={data.label} >
                        //         <HelpIcon style={{size:"50%"}}/>
                        //       </Tooltip> */}
                        //     {/* </label> */}
                        //   </>
                        // );
                      })}
                      <br />
                      <Button type="submit" variant="contained" color="primary">
                        Procced
                      </Button>
                      <br />
                    </form>
                    {resData ? (
                      <Alert severity="success">Task Completed!!</Alert>
                    ) : null}
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        );
      }}
    </Query>
  );
}
