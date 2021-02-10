import { StyledCell, Status } from "./styles";
import OperationIcons from "./OperationIcons";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from 'react';
export default function ProjectRow(props) {
  const {project} = props

  const getCurrentDate = (d) => {
    let date = new Date(d);
    let separator = "/";
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return `${day}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year} - ${hour}:${minutes}`;
  };

  return (
    <TableRow key={project.id}>
      <StyledCell
        style={{ whiteSpace: "normal", wordWrap: "break-word" }}
        component="th"
        scope="row"
      >
        <b>{project.title}</b>
      </StyledCell>
      <StyledCell align="center">
        {getCurrentDate(project.start_date)}
      </StyledCell>
      <StyledCell align="center">
        {getCurrentDate(project.end_date)}
      </StyledCell>
      <StyledCell>
        <Status type={project.status}>{project.status}</Status>
      </StyledCell>
      <TableCell style={{ width: 100 }}>
        <OperationIcons project={project} />
      </TableCell>
    </TableRow>
  );
}
