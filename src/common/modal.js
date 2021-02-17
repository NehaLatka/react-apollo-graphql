import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2)
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const radialData = {
    optionsRadial: {
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -20,
              show: true,
              color: "#888",
              fontSize: "13px"
            },
            value: {
              formatter: function (val) {
                return val;
              },
              color: "#111",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Percent"]
    },
    seriesRadial: [props.accuracy]
  };

  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Details</h2>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Prediction(Age)</TableCell>
                    <TableCell>Completion Time</TableCell>
                    <TableCell>Sex</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>Diameter</TableCell>
                    <TableCell>Height</TableCell>
                    <TableCell>Whole Weight</TableCell>
                    <TableCell>Shell Weight</TableCell>
                    <TableCell>Shucked Weight</TableCell>
                    <TableCell>Viscara Weight</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.data.map((row) => (
                    <TableRow key={row.jobId}>
                      <TableCell component="th" scope="row">
                        {row.prediction}
                      </TableCell>
                      <TableCell>{row.timeStamp}</TableCell>
                      <TableCell>{row.sex}</TableCell>
                      <TableCell>{row.length}</TableCell>
                      <TableCell>{row.diameter}</TableCell>
                      <TableCell>{row.height}</TableCell>
                      <TableCell>{row.wholeWeight}</TableCell>
                      <TableCell>{row.shellWeight}</TableCell>
                      <TableCell>{row.shuckedWeight}</TableCell>
                      <TableCell>{row.visceraWeight}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
