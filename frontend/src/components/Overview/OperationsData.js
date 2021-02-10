import React from "react";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import ChatSharpIcon from "@material-ui/icons/ChatSharp";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import AssessmentSharpIcon from "@material-ui/icons/AssessmentSharp";


export const OperationsData = [
  {
    title: "Details",
    icon: <AssessmentSharpIcon />,
    link: "/details",
    state: `project_id: projects[projects.findIndex((x) => x.id === project.id)]`
  },
  {
    title: "Edit",
    icon: <EditSharpIcon />,
    link: "/edit_project/",
    state: `project_id: projects[projects.findIndex((x) => x.id === project.id)]`
  },
  {
    title: "Comment",
    icon: <ChatSharpIcon />,
    link: "/add_comment/",
    state: `project_id: project.id`
  },
  {
    title: "Delete",
    icon: <DeleteSharpIcon />,
  },
];
