import React from "react";

import { SidebarData } from "./SidebarData";
import SidebarItemMenu from "./SidebarItemMenu";
import {SidebarNav, SidebarWrap } from "./styles";

function Sidebar(props) {
  const {open} = props;
  return (
    <React.Fragment>
      <SidebarNav open={open}>
        <SidebarWrap>
          {SidebarData.map((item, index) => {
            return <SidebarItemMenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </React.Fragment>
  );
}

export default Sidebar;
