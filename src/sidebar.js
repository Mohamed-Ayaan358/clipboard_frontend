import * as React from 'react';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FolderIcon from '@mui/icons-material/Folder';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <DashboardIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Calender',
        path: '/reports',
        icon: <DateRangeIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Folders',
        path: '/products',
        icon: <FolderIcon />,
        cName: 'nav-text'
    },
    // {
    //     title: 'Sign In',
    //     path: '/sign-in',
    //     icon: <MenuIcon />,
    //     cName: 'nav-text'
    // }
    // }, */
    // {
    //     title: 'Messages',
    //     path: '/messages',
    //     icon: <FaIcons.FaEnvelopeOpenText />,
    //     cName: 'nav-text'
    // },
    // {
    //     title: 'Support',
    //     path: '/support',
    //     icon: <IoIcons.IoMdHelpCircle />,
    //     cName: 'nav-text'
    // }
];