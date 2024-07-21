"use client"
// import React from 'react'
// import {
//   Card,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Chip,
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
//   Alert,
// } from "@material-tailwind/react";
// import {
//   PresentationChartBarIcon,
//   ShoppingBagIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
//   InboxIcon,
//   PowerIcon,
// } from "@heroicons/react/24/solid";
// import {
//   ChevronRightIcon,
//   ChevronDownIcon,
//   CubeTransparentIcon,
// } from "@heroicons/react/24/outline";
 
//const page = () => {
  //return (
    // <div>
    //      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
    //   <div className="mb-2 flex items-center gap-4 p-4">
    //     <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
    //     <Typography variant="h5" color="blue-gray">
    //       Sidebar
    //     </Typography>
    //   </div>
    //   <List>
    //     <Accordion
    //       open={open === 1}
    //       icon={
    //         <ChevronDownIcon
    //           strokeWidth={2.5}
    //           className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
    //         />
    //       }
    //     >
    //       <ListItem className="p-0" selected={open === 1}>
    //         <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
    //           <ListItemPrefix>
    //             <PresentationChartBarIcon className="h-5 w-5" />
    //           </ListItemPrefix>
    //           <Typography color="blue-gray" className="mr-auto font-normal">
    //             Dashboard
    //           </Typography>
    //         </AccordionHeader>
    //       </ListItem>
    //       <AccordionBody className="py-1">
    //         <List className="p-0">
    //           <ListItem>
    //             <ListItemPrefix>
    //               <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //             </ListItemPrefix>
    //             Analytics
    //           </ListItem>
    //           <ListItem>
    //             <ListItemPrefix>
    //               <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //             </ListItemPrefix>
    //             Reporting
    //           </ListItem>
    //           <ListItem>
    //             <ListItemPrefix>
    //               <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //             </ListItemPrefix>
    //             Projects
    //           </ListItem>
    //         </List>
    //       </AccordionBody>
    //     </Accordion>
    //     <Accordion
    //       open={open === 2}
    //       icon={
    //         <ChevronDownIcon
    //           strokeWidth={2.5}
    //           className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
    //         />
    //       }
    //     >
    //       <ListItem className="p-0" selected={open === 2}>
    //         <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
    //           <ListItemPrefix>
    //             <ShoppingBagIcon className="h-5 w-5" />
    //           </ListItemPrefix>
    //           <Typography color="blue-gray" className="mr-auto font-normal">
    //             E-Commerce
    //           </Typography>
    //         </AccordionHeader>
    //       </ListItem>
    //       <AccordionBody className="py-1">
    //         <List className="p-0">
    //           <ListItem>
    //             <ListItemPrefix>
    //               <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //             </ListItemPrefix>
    //             Orders
    //           </ListItem>
    //           <ListItem>
    //             <ListItemPrefix>
    //               <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
    //             </ListItemPrefix>
    //             Products
    //           </ListItem>
    //         </List>
    //       </AccordionBody>
    //     </Accordion>
    //     <hr className="my-2 border-blue-gray-50" />
    //     <ListItem>
    //       <ListItemPrefix>
    //         <InboxIcon className="h-5 w-5" />
    //       </ListItemPrefix>
    //       Inbox
    //       <ListItemSuffix>
    //         <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
    //       </ListItemSuffix>
    //     </ListItem>
    //     <ListItem>
    //       <ListItemPrefix>
    //         <UserCircleIcon className="h-5 w-5" />
    //       </ListItemPrefix>
    //       Profile
    //     </ListItem>
    //     <ListItem>
    //       <ListItemPrefix>
    //         <Cog6ToothIcon className="h-5 w-5" />
    //       </ListItemPrefix>
    //       Settings
    //     </ListItem>
    //     <ListItem>
    //       <ListItemPrefix>
    //         <PowerIcon className="h-5 w-5" />
    //       </ListItemPrefix>
    //       Log Out
    //     </ListItem>
    //   </List>
    //   <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
    //     <CubeTransparentIcon className="mb-4 h-12 w-12" />
    //     <Typography variant="h6" className="mb-1">
    //       Upgrade to PRO
    //     </Typography>
    //     <Typography variant="small" className="font-normal opacity-80">
    //       Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features
    //       and premium.
    //     </Typography>
    //     <div className="mt-4 flex gap-3">
    //       <Typography
    //         as="a"
    //         href="#"
    //         variant="small"
    //         className="font-medium opacity-80"
    //         onClick={() => setOpenAlert(false)}
    //       >
    //         Dismiss
    //       </Typography>
    //       <Typography as="a" href="#" variant="small" className="font-medium">
    //         Upgrade Now
    //       </Typography>
    //     </div>
    //   </Alert>
    // </Card>
    // </div>
    //<>  </>
  //)
//}

//export default page

// src/app/dashboard/page.js
// src/app/dashboard/page.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>X</button>
      <div className="sidebar-content">
        <h2>Welcome back!</h2>
        <h3>User</h3>
        <ul>
          <li>My Tickets</li>
          <li>Upcoming Events</li>
          <li>Past Events</li>
          <li>My Listings</li>
          <li>My Digital Collectibles</li>
          <li>My Profile</li>
          <li>My Settings</li>
          <li>Sign Out</li>
        </ul>
        <button className="dashboard-button">
          <FontAwesomeIcon icon={faUser} /> Dashboard
        </button>
        <button className="help-button">Need Help?</button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSidebarOpen = () => {
    setIsOpen(true);
  };

  const handleSidebarClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleSidebarOpen} className="open-sidebar-button">
        Open Sidebar
      </button>
      <Sidebar isOpen={isOpen} onClose={handleSidebarClose} />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard!</p>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard;











