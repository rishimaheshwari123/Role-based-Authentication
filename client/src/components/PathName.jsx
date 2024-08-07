import React from "react";
import { Link } from "react-router-dom";
const data = [{ id: "Kaisa laga mera majak", name: "test" }];

const PathName = () => {
  return (
    <div>
      {data.map((c, index) => (
        <Link to={`/test/${c.id}`}>{c.name}</Link>
      ))}
    </div>
  );
};

export default PathName;
