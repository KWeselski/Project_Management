import React, { useState } from "react";

import { Typography } from "@material-ui/core";

import {DropdownItem, DropIconDiv, SidebarItem, SidebarTypography } from './styles'

const SidebarItemMenu = ({ item }) => {
  const [itemDropdown, setItemDropdown] = useState(false);

  const showItemDropdown = () => setItemDropdown(!itemDropdown);

  return (
    <React.Fragment>
      <SidebarItem to={item.link} onClick={item.dropItem && showItemDropdown}>
        {item.icon}
        <SidebarTypography>
          <Typography variant="h6">{item.title}</Typography>
        </SidebarTypography>

        <DropIconDiv>
          {item.dropItem && itemDropdown ? item.iconOpened : item.itemDropdown}
          {item.dropItem && !itemDropdown ? item.iconClosed : item.null}
        </DropIconDiv>
      </SidebarItem>
      {itemDropdown &&
        item.dropItem.map((item, index) => {
          return (
            <DropdownItem to={item.link} key={index}>
              {item.icon}
              <Typography variant="h6">{item.title}</Typography>
            </DropdownItem>
          );
        })}
    </React.Fragment>
  );
};

export default SidebarItemMenu;
