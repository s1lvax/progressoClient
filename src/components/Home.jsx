import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useContext } from "react";
import { UserId } from "../contexts/UserId";
import Charts from "./Charts";

function Home() {
  const { userId } = useContext(UserId);

  return (
    <>
      <Header />
      <Charts />
    </>
  );
}

export default Home;
