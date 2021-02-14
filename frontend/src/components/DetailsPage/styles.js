import styled from "styled-components";
import {Typography} from "@material-ui/core";
export const Status = styled.div`
  background: ${(props) =>
    (props.type === "new" && "lightblue") ||
    (props.type === "active" && "yellow") ||
    (props.type === "canceled" && "red")};
  text-align: center;
  border-radius: 30px;
  width: 100%;
  margin: 0 auto;
  font-weight: bold;
  text-transform: capitalize;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

export const CreatorDiv = styled.div`
    background: #B8860B;
    font-weight: bold;
    border-radius: 15px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    text-align: center;
    width: 100px;
`;

export const MainTypography = styled(Typography)`
    padding: 20px;
    word-wrap: break-word;
`