import Link from "next/link";
import React from "react";

const Notfound = () => {

  return (
    <div>
      <div>404 page is not found </div>{" "}
      <div>
        <Link href={"/"}>Go to Home</Link>
      </div>
    </div>
  );
};

export default Notfound;
