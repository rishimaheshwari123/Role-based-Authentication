import React from "react";
import { useLocation, useParams } from "react-router-dom";

const Path = () => {
  const { id } = useParams();
  // const location = useLocation();

  // const id = location.pathname.split("/").at(-1);
  return <div>id: {id}</div>;
};

export default Path;
