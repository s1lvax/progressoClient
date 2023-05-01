import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserId } from "../contexts/UserId";

function Charts() {
  const { userId } = useContext(UserId);
  const [weightStats, setWeightStats] = useState([]);
  const [bfStats, setBFStats] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/getStats/${userId}`)
      .then((response) => {
        const weightData = response.data.map((entry) => entry.weight);
        const bfData = response.data.map((entry) => entry.bodyfat);
        setWeightStats(weightData);
        setBFStats(bfData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <div>
      <h1>Working</h1>
      <div>{weightStats}</div>
      <div>{bfStats}</div>
    </div>
  );
}

export default Charts;
