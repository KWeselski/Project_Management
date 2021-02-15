import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

export const MainGrid = styled(Grid)`

${breakpoint("sm")`
    margin-left: 220px;
  `}
`
