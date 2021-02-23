import React from "react";

import { KeyboardDatePicker, TimePicker } from "@material-ui/pickers";
import { Grid, Typography } from "@material-ui/core";

export default function DatesForm(props) {
  const {
    startDate,
    endDate,
    validate,
    handleStartDateChange,
    handleEndDateChange,
  } = props;
  return (
    <React.Fragment>
      <Grid container xs={12} md={12} justify="space-between">
        <Grid item>
          <Typography varaint="h6">Add start date</Typography>
          <KeyboardDatePicker
            value={startDate}
            placeholder="10/10/2018"
            name="startDate"
            onChange={(date) => handleStartDateChange(date)}
            minDate={new Date()}
            format="dd/MM/yyyy"
          />
        </Grid>
        <Grid item>
          <Typography varaint="h6">Start time</Typography>
          <TimePicker
            id="startTime"
            value={startDate}
            onChange={(date) => handleStartDateChange(date)}
          />
        </Grid>
      </Grid>
      <Grid container xs={12} md={12} justify="space-between">
        <Grid item>
          <Typography varaint="h6">Add end date</Typography>
          <KeyboardDatePicker
            value={endDate}
            placeholder="10/10/2018"
            name="endDate"
            onChange={(date) => handleEndDateChange(date)}
            format="dd/MM/yyyy"
          />
        </Grid>
        <Grid item>
          <Typography varaint="h6">End time</Typography>
          <TimePicker
            id="endTime"
            value={endDate}
            onChange={(date) => handleEndDateChange(date)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
