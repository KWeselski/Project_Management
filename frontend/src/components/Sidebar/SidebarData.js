import React from "react";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuBookIcon from "@material-ui/icons/MenuBook";
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
];
