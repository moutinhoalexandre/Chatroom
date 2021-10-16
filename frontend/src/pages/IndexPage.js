import React from "react";
import {useEffect} from "react"

const IndexPage = (props) => {
  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (!token) {
      props.history.push("/login");
    } else {
      props.history.push("/dashboard");
    }
    // eslint-disable-next-line
  }, [0]);
  return <div></div>;
};

export default IndexPage;
