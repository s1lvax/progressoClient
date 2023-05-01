import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserId } from "../contexts/UserId";

function Charts() {
  const { userId } = useContext(UserId);
  const [weightStats, setWeightStats] = useState([]);
  const [bfStats, setBFStats] = useState([]);
  const [avgWeight, setAvgWeight] = useState(null);
  const [avgBf, setAvgBf] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getStats/${userId}`)
      .then((response) => {
        const data = JSON.parse(response.data); // Parse the JSON string to a JavaScript object
        const weightData = data.weight;
        const bfData = data.bodyfat;
        const avgWeight = data.avgWeight;
        const avgBf = data.avgBf;

        //all the stats into arrays
        setWeightStats(weightData);
        setBFStats(bfData);

        //average values
        setAvgWeight(avgWeight);
        setAvgBf(avgBf);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <div>
      <div>Your weight stats are : {weightStats}</div>
      <div>Your BF stats are: {bfStats}</div>
      <br />
      <div>Your Average Weight is: {avgWeight}</div>
      <div>Your Average BF is: {avgBf}</div>
    </div>
  );
}

export default Charts;
