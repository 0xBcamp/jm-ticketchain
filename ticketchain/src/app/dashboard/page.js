// src/app/dashboard/DefaultSidebar.js

"use client";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

const DefaultSidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-72 p-4 shadow-xl shadow-blue-gray-900/5 z-50 bg-white">
      <Card className="h-full w-full p-4 bg-white shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color ="cyan-700">
            Dashboard
          </Typography>
        </div>
        <List>
          <ListItem>
            <Link href="/dashboard" className="flex items-center w-full text-cyan-700">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5 text-cyan-700" />
              </ListItemPrefix>
              Tickets
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/profile" className="flex items-center w-full text-cyan-700">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5 text-cyan-700" />
              </ListItemPrefix>
              Profile
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/settings" className="flex items-center w-full text-cyan-700">
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5 text-cyan-700" />
              </ListItemPrefix>
              Settings
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/logout" className="flex items-center w-full text-cyan-700">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 text-cyan-700" />
              </ListItemPrefix>
              Log Out
            </Link>
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default DefaultSidebar;



//export default page

// src/app/dashboard/page.js
// src/app/dashboard/page.js

// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import './sidebar.css';

// const Sidebar = ({ isOpen, onClose }) => {
//   return (
//     <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//       <button className="close-button" onClick={onClose}>X</button>
//       <div className="sidebar-content">
//         <h2>Welcome back!</h2>
//         <h3>User</h3>
//         <ul>
//           <li>My Tickets</li>
//           <li>My Listings</li>
//           <li>My Profile</li>
//           <li>Sign Out</li>
//         </ul>
//         <button className="dashboard-button">
//           <FontAwesomeIcon icon={faUser} /> Dashboard
//         </button>
//         <button className="help-button">Need Help?</button>
//       </div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const handleSidebarOpen = () => {
//     setIsOpen(true);
//   };

//   const handleSidebarClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div>
//       <button onClick={handleSidebarOpen} className="open-sidebar-button">
//         Open Sidebar
//       </button>
//       <Sidebar isOpen={isOpen} onClose={handleSidebarClose} />
//       <div className="dashboard-content">
//         <h1>Dashboard</h1>
//         <p>Welcome to the dashboard!</p>
//         {/* Add your dashboard content here */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;











