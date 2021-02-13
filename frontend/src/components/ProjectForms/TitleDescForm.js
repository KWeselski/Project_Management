import React from "react";
import { Grid, TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export default function TitleDescForm(props) {
  const { title, description, handleChange } = props;
  return (
    <Paper variant="outlined" square>
      <Grid
        container
        xs={12}
        md={12}
        textAlign="center"
        justify="space-between"
        style={{ height: "100%", marginTop: 20 }}
      >
        <Grid item xs={8} md={12} style={{ padding: 20 }}>
          <TextField
            name="title"
            variant="standard"
            required
            fullWidth
            id="title"
            label="Title"
            value={title}
            onChange={handleChange}
            inputProps={{ maxLength: 100, style: { fontSize: "1.4rem" } }}
          />
        </Grid>
        <Grid item xs={12} md={12} style={{ padding: 20 }}>
          <TextField
            name="description"
            variant="outlined"
            required
            fullWidth
            id="description"
            label="Description"
            value={description}
            rows={15}
            inputProps={{ maxLength: 1000 }}
            multiline={true}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
