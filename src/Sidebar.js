import React, { useState } from "react";

import plusIcon from "./plus.png";

import "./Sidebar.css";

function Sidebar(props) {
  const colors = [	"#FFDAB9", "#FFF68F","#EEC591", " #FFA07A", "#DA70D6"];

  const [listOpen, setListOpen] = useState(false);

  return (
    <div className="sidebar">
      <img src={plusIcon} alt="Add" onClick={() => setListOpen(!listOpen)} />
      <ul className={`sidebar_list ${listOpen ? "sidebar_list_active" : ""}`}>
        {colors.map((item, index) => (
          <li
            key={index}
            className="sidebar_list_item"
            style={{ backgroundColor: item }}
            onClick={() => props.addNote(item)}
          />
        ))}
      </ul> 
    </div>
  );
}

export default Sidebar;