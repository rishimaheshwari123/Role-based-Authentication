import React from "react";
import { useLocation } from "react-router-dom";

const Path = () => {
  const location = useLocation();

  const id = location.pathname.split("/").at(-1);
  return <div>id: {id}</div>;
};

export default Path;
