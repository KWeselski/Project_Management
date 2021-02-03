import React from 'react';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
export const SidebarData = [
    {
        title: 'Overview',
        icon: <LocalLibraryIcon/>,
        iconClosed: <ExpandMoreIcon/>,
        iconOpened: <ExpandLessIcon/>,
    },
    {
        title: 'Projects',
        icon: <LocalLibraryIcon/>
    },
    {
        title: 'Archive',
        icon: <LocalLibraryIcon/>
    },
    {
        title: 'Raports',
        icon: <LocalLibraryIcon/>
    },
    {
        title: 'Mail',
        icon: <LocalLibraryIcon/>,
        iconOpened: <ExpandLessIcon/>,
        iconClosed: <ExpandMoreIcon/>,

        dropItem: [
            {
                title: 'Test 1',
                icon: <MenuBookIcon/>,
            },
            {
                title: 'Test 2',
                icon: <MenuBookIcon/>,
            }
        ]
    },
    {
        title: 'Testowy',
        icon: <LocalLibraryIcon/>
    },
    {
        title: 'Testowy Expand',
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