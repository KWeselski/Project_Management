import styled from "styled-components";
import { Link } from "react-router-dom";
import breakpoint from "styled-components-breakpoint";

export const SidebarNav = styled.nav`
  background: #15171c;
  justify-content: center;
  height: ${(props) => (props.open ? "400" : "0")};
  width: 100%;
  transition: left 0.2s ease-in;
  z-index: 2;
  position: 'relative';
  top: ${(props) => (props.open ? "0" : "-500%")};
  ${breakpoint("sm")`
    position: fixed;
    width:200px;
    height: 100%;
    left: ${(props) => (props.open ? "0" : "-100%")};
  `}
`;

export const SidebarItem = styled(Link)`
  display: flex;
  color: #e1e9fc;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  &:hover {
    background: #252831;
    cursor: pointer;
  }
`;

export const DropdownItem = styled(Link)`
  background: #414757;
  height: 60px;
  display: flex;
  align-items: center;
  color: #f5f5f5;
  justify-content: space-evenly;
  text-decoration: none;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

export const DropIconDiv = styled.div`
  margin-left: auto;
`;
export const SidebarTypography = styled.span`
  margin-left: 16px;
`;

export const SidebarWrap = styled.div`
  width: 100%;
`;
