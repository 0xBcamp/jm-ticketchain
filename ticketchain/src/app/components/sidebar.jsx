"use client";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThirdwebProvider, ConnectButton, lightTheme } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { useActiveWalletConnectionStatus } from "thirdweb/react";

const Sidebar = () => {
  const isConnected = useActiveWalletConnectionStatus();

  const client = createThirdwebClient({
    clientId: "3a1b881fdf47d438ea101e2972c175fa",
  });

  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Handle window resize to adjust sidebar state
  useEffect(() => {
    // Function to handle resize events
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // Open sidebar on large screens
      } else {
        setIsSidebarOpen(false); // Close sidebar on small screens
      }
    };

    // Check if window is defined to avoid server-side rendering issues
    if (typeof window !== "undefined") {
      // Set initial state based on window size
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    // Cleanup listener on unmount
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div className="flex">
      {/* Sidebar component */}
      <div
        className={`fixed top-20 left-0 h-full w-72 p-4 shadow-xl bg-cyan-800 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-10`} // z-index to overlay above content
      >
        <Card className="h-full w-full p-4 bg-cyan-800 shadow-blue-gray-900/5">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="white">
              Dashboard
            </Typography>
          </div>
          <List>
            <ListItem>
              <Link href="/dashboard/mytickets" className="flex items-center w-full text-white">
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5 text-white" />
                </ListItemPrefix>
                My Tickets
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/dashboard/myprofile" className="flex items-center w-full text-white">
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5 text-white" />
                </ListItemPrefix>
                Profile
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/dashboard/createevent" className="flex items-center w-full text-white">
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5 text-white" />
                </ListItemPrefix>
                Create Event
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/dashboard/myevents" className="flex items-center w-full text-white">
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5 text-white" />
                </ListItemPrefix>
                My Events
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/settings" className="flex items-center w-full text-white">
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5 text-white" />
                </ListItemPrefix>
                Settings
              </Link>
            </ListItem>
            <ListItem>
              <ThirdwebProvider>
                <ConnectButton
                  client={client}
                  theme={lightTheme({
                    colors: {
                      accentText: "#39a3c6",
                      accentButtonBg: "#39a3c6",
                      primaryText: "#2a7483",
                      primaryButtonBg: "#2e94a8",
                    },
                  })}
                />
              </ThirdwebProvider>
            </ListItem>
          </List>
        </Card>
        {isConnected === "connected" ? (
          ""
        ) : (
          <div className="w-full h-full absolute top-0 bg-gray-900/50 flex">
            <div className="m-auto">
              <h1>Connect wallet to see Dashboard</h1>
              <ThirdwebProvider>
                <ConnectButton
                  client={client}
                  theme={lightTheme({
                    colors: {
                      accentText: "#39a3c6",
                      accentButtonBg: "#39a3c6",
                      primaryText: "#2a7483",
                      primaryButtonBg: "#2e94a8",
                    },
                  })}
                />
              </ThirdwebProvider>
            </div>
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className={`flex-4 mt-20 transition-all duration-300 ${isSidebarOpen ? "ml-72" : "ml-0"}`}>
        <IconButton variant="text" size="lg" onClick={toggleSidebar} className="ml-3 bg-cyan-800 text-white">
          {isSidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
