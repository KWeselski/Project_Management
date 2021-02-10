import React from 'react';
import {
    Grid,
    Typography,
    NativeSelect 
} from "@material-ui/core";


export default function StatusSelect(props){
    const {status,handleChange} = props
    return(
        <Grid container xs={3} style={{ padding: 40 }}>
                  <Grid item xs={4}>
                    <Typography variant="h6">Status:</Typography>
                  </Grid>
                  <Grid item xs={6}>
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
                      <option value={"hold"}>On Hold</option>
                      <option value={"canceled"}>Canceled</option>
                      <option value={"completed"}>Completed</option>
                    </NativeSelect>
                  </Grid>
                </Grid>

    )

}