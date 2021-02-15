import styled from "styled-components";

import { Dialog, DialogContent, Typography } from "@material-ui/core";

export const StyledDialog = styled(Dialog)`
  position: absolute;
`;

export const StyledDialogContent = styled(DialogContent)`
  height: 40vh;
  minWidth: 30vh;
  maxWidth: 60vh;
`;

export const MainTypography = styled(Typography)`
  padding: 20px;
  word-wrap: break-word;
`;