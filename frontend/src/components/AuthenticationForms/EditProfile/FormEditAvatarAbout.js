import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export default function FormEditAvatarAbout(props) {
  const {
    returnStep,
    values,
    handleChange,
    handleImageUpload,
    nextStep,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item xs={10} md={3}>
        <Paper variant="outlined" square>
          <Typography align="center" style={{ marginTop: "5vh" }} variant="h4">
            Edit your personal info
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              justify="center"
              spacing={2}
              style={{ marginTop: "2vh", padding: 20, height: "100%" }}
              verticalAlign="middle"
            >
              <Grid
                container
                justify="center"
                alignItems="center"
                xs={12}
                md={10}
              >
                <Grid item>
                  <Avatar
                    style={{ height: 150, width: 150 }}
                    src={values.avatar}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} align="center">
                <input
                  name="avatar"
                  id="icon-button-file"
                  accept="image/*"
                  type="file"
                  hidden
                  multiple="false"
                  onChange={handleImageUpload}
                />
                <label htmlFor="icon-button-file">
                  <Button
                    fullWidth
                    variant="contained"
                    style={{ width: "50%" }}
                    color="primary"
                    component="span"
                  >
                    Change Avatar
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} md={10}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="description"
                  label="About me"
                  multiline={true}
                  rows={10}
                  id="description"
                  inputProps={{ maxLength: 1000 }}
                  value={values.description}
                  style={{ backgroundColor: "lightgray" }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={returnStep}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
