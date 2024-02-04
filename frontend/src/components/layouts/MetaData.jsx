import React from "react";
import { Helmet } from "react-helmet-async";

function MetaData({ title }) {
  return (
    <div>
      <Helmet>
        <title>{`${title} - Ecommerce`}</title>
      </Helmet>
    </div>
  );
}

export default MetaData;
