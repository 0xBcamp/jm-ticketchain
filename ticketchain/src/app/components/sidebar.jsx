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
import { Avatar } from "@material-tailwind/react";

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
import { ThirdwebProvider, ConnectButton, lightTheme } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { useActiveWalletConnectionStatus } from "thirdweb/react";
const Sidebar = () => {

    const isConnected = useActiveWalletConnectionStatus();

    const client = createThirdwebClient({
      clientId: "3a1b881fdf47d438ea101e2972c175fa",
    });
  
    React.useEffect(() => {
      // Check Thirdweb connection status
      const checkConnection = async () => {
        if (client && client.isConnected) {
          const isConnected = client.isConnected;
          setIsConnected(isConnected);
          console.log(isConnected);
        }
      };
  
      checkConnection();
    }, [client]);

  return (
    <div> <div className=" left-0 h-screen w-72 p-4 shadow-xl shadow-blue-gray-900/5 z-50 bg-cyan-800">
    <Card className="h-full w-full p-4 bg-cyan-800 shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="white">
          Dashboard
        </Typography>
      </div>
      <List>
        <ListItem>
          <Link
            href="/dashboard/mytickets"
            className="flex items-center w-full text-white"
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            Tickets
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="/dashboard/myprofile"
            className="flex items-center w-full text-white"
          >
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            Profile
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="/settings"
            className="flex items-center w-full text-white"
          >
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
      <div className="w-full h-full absolute top-0  bg-gray-900/50 flex">
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
          </ThirdwebProvider></div>
      </div>
    )}
  </div>
  </div>
  )
}

export default Sidebar