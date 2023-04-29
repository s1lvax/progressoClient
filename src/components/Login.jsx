import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // Login successful, redirect the user to the /stat page
          window.location.href = "/home";
        } else {
          // Login failed, display an error message or handle the error as appropriate
          console.log("Login failed");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid username or password");
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={classes.textField}
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.textField}
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submitButton}
              fullWidth
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <br />
      <a href="/reg">Don't have an account? Register here!</a>
      <br />
      <br />
      {error && <div className="error">{error}</div>}
    </Container>
  );
}

export default Login;
