import React from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";

const styles = {
  avatar: {
    height: 150,
    width: 150,
  },
  avatarButton: {
    width: "50%",
  },
  mainGrid: {
    height: "80vh",
  },
  formGrid: {
    marginTop: "10px",
    padding: 20,
    height: "100%",
  },
  title: {
    marginTop: 15,
  },
};

function FormEditAvatarAbout(props) {
  const {
    classes,
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
      className={classes.mainGrid}
    >
      <Grid item xs={10} md={3}>
        <Paper variant="outlined" square>
          <Typography className={classes.title} align="center" variant="h4">
            Edit your personal info
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              justify="center"
              spacing={2}
              verticalAlign="middle"
              className={classes.formGrid}
            >
              <Grid
                container
                justify="center"
                alignItems="center"
                xs={12}
                md={10}
              >
                <Grid item>
                  <Avatar src={values.avatar} className={classes.avatar} />
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
                    color="primary"
                    component="span"
                    className={classes.avatarButton}
                  >
                    Change Avatar
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} md={10}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="description"
                  label="About me"
                  multiline={true}
                  rows={10}
                  id="description"
                  inputProps={{ maxLength: 300 }}
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
export default withStyles(styles)(FormEditAvatarAbout);
