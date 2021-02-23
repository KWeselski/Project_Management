import React from "react";

import {
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import StatusDiv from "../StatusDiv";

const styles = {
  table: {
    minWidth: 60,
  },
  tableHead: {
    "& .MuiTableCell-head": {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  cellHead: {
    backgroundColor: "#15171c",
    width: 130,
  },
  totalCell: {
    textAlign: "center",
  },
  cell: {
    textAlign: "center",
    height: 40,
    padding: "0px 16px",
    minWidth: 100,
  },
};

function StatusesTable(props) {
  const statuses = ["new", "active", "onhold", "delayed", "completed"];
  const { classes, projects } = props;
  const getTotals = (data, key) => {
    let total = 0;
    data.forEach((item) => {
      if (item["status"] == key) {
        total += 1;
      }
    });
    return total;
  };

  return (
    <Table className={classes.table}>
      <Paper variant="outlined" square>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.cellHead}>Status</TableCell>
            <TableCell className={classes.cellHead}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statuses.map((status) => {
            return (
              <TableRow key={status}>
                <TableCell className={classes.cell} component="th" scope="row">
                  <StatusDiv type={status} />
                </TableCell>
                <TableCell className={[classes.cell, classes.totalCell]}>
                  {getTotals(projects, status)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Paper>
    </Table>
  );
}
export default withStyles(styles)(StatusesTable);
