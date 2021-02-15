import React from "react";

import { Paper, Table, TableRow, TableBody } from "@material-ui/core";

import {
  StyledTableHead,
  StyledCell,
  StyledTableHeadCell,
  Status,
} from "../styles";

export default function StatusesTable(props) {
  const statuses = ["new", "active", "onhold", "delayed", "completed"];
  const { projects } = props;
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
    <Paper variant="outlined" square>
      <Table style={{ minWidth: 60 }}>
        <StyledTableHead>
          <TableRow>
            <StyledTableHeadCell style={{ width: 120 }}>
              Status
            </StyledTableHeadCell>
            <StyledTableHeadCell>Total</StyledTableHeadCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {statuses.map((status) => {
            return (
              <TableRow key={status}>
                <StyledCell component="th" scope="row">
                  <Status type={status}>{status}</Status>
                </StyledCell>
                <StyledCell style={{ textAlign: "center" }}>
                  {getTotals(projects, status)}
                </StyledCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
