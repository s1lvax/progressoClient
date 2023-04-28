import React from "react";
import { useState } from "react";
import axios from "axios";
import Header from "./Header";

function DailyWeight() {
  const [weight, setWeight] = useState();
  const [bodyfat, setBodyFat] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/sendWeight", {
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
    <div>
      <Header />
      <h1>Welcome to Progresso</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="number">Daily Weight</label>
        <input
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
          type="number"
          name="weight"
          id="weight"
        />

        <label htmlFor="number">BodyFat</label>
        <input
          onChange={(e) => setBodyFat(e.target.value)}
          value={bodyfat}
          type="number"
          name="bodyfat"
          id="bodyfat"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DailyWeight;
