import React from "react";
import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useContext } from "react";
import { UserId } from "../contexts/UserId";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(1),
    width: "80%",
  },
  button: {
    marginTop: theme.spacing(2),
    width: "50%",
  },
}));

function DailyWeight() {
  const { userId } = useContext(UserId);
  const classes = useStyles();
  const [weight, setWeight] = useState("");
  const [bodyfat, setBodyFat] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/sendWeight", {
        userid: userId,
        weight: weight,
        bodyfat: bodyfat,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <Header />
      <h1>Welcome to Progresso</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          label="Weight"
          type="number"
          name="weight"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <TextField
          className={classes.input}
          label="Body Fat"
          type="number"
          name="bodyfat"
          id="bodyfat"
          value={bodyfat}
          onChange={(e) => setBodyFat(e.target.value)}
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default DailyWeight;
