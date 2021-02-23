import React from "react";

import { Grid, Typography, NativeSelect } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  selectGrid: {
    width: "100%",
    padding: 10,
  },
};

function StatusSelect(props) {
  const { classes, status, handleChange } = props;
  return (
    <Grid container xs={8} className={classes.selectGrid}>
      <Grid item xs={3}>
        <Typography variant="h6">Status:</Typography>
      </Grid>
      <Grid item xs={5}>
        <NativeSelect
          variant="outlined"
          select
          fullWidth
          name="status"
          label="status"
          id="status"
          value={status}
          onChange={handleChange}
        >
          <option value="new">New</option>
          <option value={"active"}>Active</option>
          <option value={"onhold"}>On Hold</option>
          <option value={"completed"}>Completed</option>
          <option value={"delayed"}>Delayed</option>
        </NativeSelect>
      </Grid>
    </Grid>
  );
}
export default withStyles(styles)(StatusSelect);
