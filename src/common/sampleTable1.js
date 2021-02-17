import React from "react";
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
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import Modal from "./modal";
import data from "../mocks/modalData";
import { Link } from "react-router-dom";
import { getAllPrediction } from '../queries/queries';
import { Query, useQuery } from 'react-apollo';

const columns = [
  // { text: "Version", renderKey: "version" },
  { text: "Job Version", renderKey: "Id" },
  { text: "Prediction (Age)", renderKey: "prediction" },
  { text: "View Details", renderKey: "viewDetails" }
];

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
        {columns.map((headCell) => (
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

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  title: {
    flex: "1 1 100%"
  }
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar style={{ float: "right" }}>
      <Tooltip title="Add Prediction">
        <IconButton aria-label="add prediction">
          <Link to="/predictionform"><Add style={{ color: "black" }} /></Link>
        </IconButton>
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
  const [open, setOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState([]);

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
    <Query query={getAllPrediction}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading</div>
        if (error) return <div>Error</div>
        console.log("in sampletable.js", data.getAllPrediction);
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
              {props.title}
            </Typography>
            <Paper className={classes.paper}>
              <EnhancedTableToolbar />
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
                    rowCount={data.getAllPrediction.length}
                    columns={columns}
                  />
                  <TableBody>
                    {stableSort(data.getAllPrediction, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow>
                            {/* <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="left"
                            >
                              {row.version}
                            </TableCell> */}
                            <TableCell>{parseFloat(row.jobId).toFixed(2)}</TableCell>
                            <TableCell>{row.prediction}</TableCell>
                            <TableCell>
                              <Button
                                onClick={() => {
                                  setRowData(row);
                                  setOpen(true);
                                }}
                              >
                                View Details
                        </Button>
                              <Modal
                                open={open}
                                setOpen={setOpen}
                                data={[rowData]}
                              />
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
                count={data.getAllPrediction.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )
      }}
    </Query>
  );
}
