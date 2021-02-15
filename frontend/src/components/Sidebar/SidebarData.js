import React from "react";

import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import AddToQueueSharpIcon from "@material-ui/icons/AddToQueueSharp";

export const SidebarData = [
  {
    title: "Overview",
    icon: <LocalLibraryIcon />,
    link: "/overview",
  },
  {
    title: "Profile",
    icon: <PersonSharpIcon />,
    link: "/profile",
  },
  {
    title: "New Project",
    icon: <AddToQueueSharpIcon />,
    link: "/create_project",
  },
  {
    title: "Logout",
    icon: <ExitToAppIcon />,
    link: "/logout",
  },
];
