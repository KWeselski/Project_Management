import React, { Component } from "react";
import styled from "styled-components";
import { SidebarData } from "./SidebarData";
import SidebarItemMenu from "./SidebarItemMenu";

const Side = styled.div`
  background: #15171c;
  height: 5vh;
  display: flex;
  top:0;
  position: sticky;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 200px;
  height: 95vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 5vh;
  left: ${(props) => (props.open ? "0" : "-15%")};
  transition: left 0.2s ease-in;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    return (
      <React.Fragment>
        <Side></Side>
        <SidebarNav open={this.props.open}>
          <SidebarWrap>
            {SidebarData.map((item, index) => {
              return <SidebarItemMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </React.Fragment>
    );
  }
}

export default Sidebar;
