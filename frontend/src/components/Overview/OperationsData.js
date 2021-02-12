import React from "react";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import ChatSharpIcon from "@material-ui/icons/ChatSharp";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import AssessmentSharpIcon from "@material-ui/icons/AssessmentSharp";

export const OperationsData = [
  {
    title: "Details",
    icon: <AssessmentSharpIcon />,
    link: "/details/",
  },
  {
    title: "Edit",
    icon: <EditSharpIcon />,
    link: "/edit_project/",
  },
  {
    title: "Comment",
    icon: <ChatSharpIcon />,
    link: "/add_comment/",
  },
  {
    title: "Delete",
    icon: <DeleteSharpIcon />,
  },
];
