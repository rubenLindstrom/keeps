import React from "react";

import { Link } from "react-router-dom";

const notFound = () => {
  return (
    <div>
      <p>Sorry, we couldn't find what you were looking for.</p>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  );
};

export default notFound;
