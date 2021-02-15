import styled from "styled-components";
import { TableCell, TableHead } from "@material-ui/core/";

export const Status = styled.div`
  background: ${(props) =>
    (props.type === "new" && "lightblue") ||
    (props.type === "active" && "yellow") ||
    (props.type === "onhold" && "pink") ||
    (props.type === "completed" && "lightgreen") ||
    (props.type === "delayed" && "red")}; 
  text-align: center;
  border-radius: 30px;
  width: 75%;
  margin: 0 auto;
  font-weight: bold;
  text-transform: capitalize;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

export const StyledCell = styled(TableCell)`
  & .MuiTableCell-root {
    text-align: center;
  }
  height: "30px";
  padding: "0px 16px";
  max-width: 100px;
`;

export const StyledTableHeadCell = styled(TableCell)`
  background-color: #15171c;
`;

export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-head {
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
`;
