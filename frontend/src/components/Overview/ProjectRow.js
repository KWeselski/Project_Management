import React from "react";

import { TableCell, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import OperationIcons from "./OperationsIcons/index";
import StatusDiv from "./StatusDiv";

const styles = {
  cell: {
    textAlign: "center",
    height: 30,
    padding: "0px 16px",
    minWidth: 100,
  },
  titleCell: {
    whiteSpace: "normal",
    wordWrap: "break-word",
    padding: "0px 16px",
    minWidth: 100,
  },
  operation: {
    width: 100,
  },
};

function ProjectRow(props) {
  const { classes, project } = props;

  const getCurrentDate = (d) => {
    let date = new Date(d);
    let separator = "/";
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return `${day}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year} - ${hour}:${minutes}`;
  };

  return (
    <TableRow key={project.id}>
      <TableCell className={classes.titleCell} component="th" scope="row">
        <b>{project.title}</b>
      </TableCell>
      <TableCell align="center" className={classes.cell}>
        {getCurrentDate(project.start_date)}
      </TableCell>
      <TableCell align="center" className={classes.cell}>
        {getCurrentDate(project.end_date)}
      </TableCell>
      <TableCell className={classes.cell}>
        <StatusDiv type={project.status} />
      </TableCell>
      <TableCell className={classes.operation}>
        <OperationIcons project={project} />
      </TableCell>
    </TableRow>
  );
}
export default withStyles(styles)(ProjectRow);
