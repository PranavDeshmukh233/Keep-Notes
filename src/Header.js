import React from "react";
import keep from "./keep.png";
export default function Header() {
  return (
    <>
      <div className="header" style={{ width: "100%" }}>
        <img src={keep} alt="logo" width="40px" height="40px" />
        <h2>Keep Notes</h2>
      </div>
    </>
  );
}
