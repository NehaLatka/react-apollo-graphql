import React, { useState } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import { Button } from "@material-ui/core";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {props.columns.map((headCell) => (
          <TableCell
            key={headCell.renderKey}
            sortDirection={orderBy === headCell.renderKey ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.renderKey}
              direction={orderBy === headCell.renderKey ? order : "asc"}
              onClick={createSortHandler(headCell.renderKey)}
            >
              {headCell.text}
              {orderBy === headCell.renderKey ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired
};

const EnhancedTableToolbar = (props) => {
  const [linkValue, setLinkValue] = useState("");

  const handleChangeLinkValue = (event) => {
    setLinkValue(event.target.value);
  };
  const triggerCall = (link) => {
    let finalLink = "";
    if (!(link === "" || link === "None")) {
      finalLink = link;
    }
    axios
      .post("http://178.128.63.115:4001/graphql", {
        query:
          "mutation($datasetName: String! $algoName: String! $link: String ) { addJob( datasetName: $datasetName algoName: $algoName link: $link ) {_id status }}",
        variables: {
          datasetName: "60115b2c7c1fd3744c70164b",
          algoName: "601288953e5ed8568d7dcb41",
          link: finalLink
        }
      })
      .then((response) => {
        console.log("inside trigger call", response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Toolbar style={{ float: "right" }}>
      <FormControl
        variant="outlined"
        style={{ paddingRight: "10px", minWidth: "150px" }}
      >
        <InputLabel id="demo-simple-select-outlined-label">Link</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={linkValue}
          onChange={handleChangeLinkValue}
          label="Dataset"
        >
          {props.linkArray.map((link) => {
            return <MenuItem value={link}>{link}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <Tooltip title="Triger Pipeline">
        <Button
          variant="contained"
          disabled={props.state}
          onClick={() => {
            triggerCall(linkValue);
          }}
        >
          Trigger
        </Button>
      </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    marginLeft: "20%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 500
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  title: {
    flex: "1 1 100%"
  }
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(true);
  const [link, setLink] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Typography
        style={{
          color: "#000000",
          textAlign: "center",
          opacity: "1",
          font: "normal normal bold 32px/64px Calibri",
          marginBottom: "2.5rem",
          marginTop: "1.5rem"
        }}
      >
        History
      </Typography>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          state={props.pipelineStatus}
          linkArray={props.linkArray}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
              columns={props.columns}
            />
            <TableBody>
              {stableSort(props.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="left"
                      >
                        {row.version.toFixed(2)}
                      </TableCell>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.mse}</TableCell>
                      <TableCell>{row.endTime}</TableCell>
                      <TableCell
                        style={
                          row.status === "pending"
                            ? { color: "red" }
                            : { color: "green" }
                        }
                      >
                        {row.status.charAt(0).toUpperCase() +
                          row.status.slice(1)}
                      </TableCell>
                      <TableCell>{row.standardDeviation}</TableCell>
                      <TableCell>
                        <a href={row.link} target="_blank">
                          {row.link}
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
