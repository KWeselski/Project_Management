import React from 'react';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import AddToQueueSharpIcon from '@material-ui/icons/AddToQueueSharp';
export const SidebarData = [
    {
        title: 'Overview',
        icon: <LocalLibraryIcon/>,
        link: "/overview",
        
    },
    {
        title: 'Profile',
        icon: <PersonSharpIcon/>
    },
    {
        title: 'New Project',
        icon: <AddToQueueSharpIcon/>,
        link: "/create_project",
    },
    {
        title: 'Test',
        icon: <LocalLibraryIcon/>,
        iconOpened: <ExpandLessIcon/>,
        iconClosed: <ExpandMoreIcon/>,

        dropItem: [
            {
                title: 'Test 1',
                icon: <MenuBookIcon/>
            },
            {
                title: 'Test 2',
                icon: <MenuBookIcon/>
            }
        ]
    },
]