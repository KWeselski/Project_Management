import React from "react";
import { KeyboardDatePicker, TimePicker } from "@material-ui/pickers";
import { Grid, Typography } from "@material-ui/core";

export default function DatesForm(props) {

  const {values, handleStartDateChange, handleEndDateChange} = props
  return (
    <React.Fragment>
      <Grid container xs={12} md={12} justify="space-between">
        <Grid item>
          <Typography varaint="h6">Add start date</Typography>
          <KeyboardDatePicker
            error={!values.validate}
            helperText={!values.validate ? "Invalid date" : ""}
            value={values.startDate}
            placeholder="10/10/2018"
            onChange={(date) => handleStartDateChange(date)}
            minDate={new Date()}
            format="dd/MM/yyyy"
          />
        </Grid>
        <Grid item>
          <Typography varaint="h6">Start time</Typography>
          <TimePicker
            id="startTime"
            value={values.startDate}
            onChange={(date) => handleStartDateChange(date)}
          />
        </Grid>
      </Grid>
      <Grid container xs={12} md={12} justify="space-between">
        <Grid item>
          <Typography varaint="h6">Add end date</Typography>
          <KeyboardDatePicker
            value={values.endDate}
            placeholder="10/10/2018"
            name="endDate"
            onChange={(date) => handleEndDateChange(date)}
            minDate={new Date()}
            format="dd/MM/yyyy"
          />
        </Grid>
        <Grid item>
          <Typography varaint="h6">End time</Typography>
          <TimePicker
            id="endTime"
            value={values.endDate}
            onChange={(date) => handleEndDateChange(date)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
