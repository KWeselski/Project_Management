import styled from "styled-components";
import {Grid, Typography} from "@material-ui/core";
import breakpoint from "styled-components-breakpoint";

export const MainGrid = styled(Grid)`
    margin-top: 70px;
    width: 100%;

${breakpoint("sm")`
    margin-left: 220px;
  `}
`
export const MainTypography = styled(Typography)`
    padding: 20px;
    word-wrap: break-word;
`

