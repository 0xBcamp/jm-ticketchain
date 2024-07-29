"use client";

// import React, { useState, useEffect } from "react";
// import { useActiveAccount } from "thirdweb/react";
// import { Typography, Card } from "@material-tailwind/react";
// import Web3 from "web3";
// import { Avatar } from "@material-tailwind/react";
// import { useWalletBalance } from "thirdweb/react";
// import { createThirdwebClient } from "thirdweb";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./profile";
import { ThirdwebProvider } from "thirdweb/react";

// const animalAvatars = [
//   "https://openseauserdata.com/files/ffbc878edaea7d3b74148555daa428f0.svg",
//   "https://openseauserdata.com/files/f4cd4a0f807985f10e680a88e17ca7cd.svg",
//   "https://openseauserdata.com/files/84d0d6a1b7a70cdedb9a24c6293ca458.svg",
//   "https://openseauserdata.com/files/24cbf60971433dce0e6159f4c7805c9b.svg",
//   "https://raw.seadn.io/files/ec99cc982c2323be3452f86c41e9996c.svg",
//   "https://openseauserdata.com/files/dae2a8a8d5b957674ccce041d6967235.svg",
// ];

const Page = () => {
  // const [address, setAddress] = useState(null);
  // const [balance, setBalance] = useState(null);
  // const [network, setNetwork] = useState(null);
  // const [avatar, setAvatar] = useState(null);
  // const account = useActiveAccount();

  // const client = createThirdwebClient({
  //   clientId: "3a1b881fdf47d438ea101e2972c175fa",
  // });

  // const chainId = 919;
  // const contractAddress = "0x24933eB4854f95285e54F641bb67D6C0D8bD6C91";

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (account && account.address) {
  //       setAddress(account.address);

  //       const storedAvatar = localStorage.getItem(`avatar-${account.address}`);
  //       if (storedAvatar) {
  //         setAvatar(storedAvatar);
  //       } else {
  //         const newAvatar =
  //           animalAvatars[Math.floor(Math.random() * animalAvatars.length)];
  //         setAvatar(newAvatar);
  //         localStorage.setItem(`avatar-${account.address}`, newAvatar);
  //       }

  //       if (typeof window.ethereum === "undefined") {
  //         console.error("MetaMask is not installed.");
  //         return;
  //       }

  //       const web3 = new Web3(window.ethereum);

  //       try {
  //         const userBalance = await web3.eth.getBalance(account.address);
  //         const formattedBalance = web3.utils.fromWei(userBalance, "ether");
  //         setBalance(formattedBalance);

  //         const networkId = await web3.eth.net.getId();
  //         console.log("Network ID:", networkId);
  //         setNetwork(networkId);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //   };

  //   fetchUserData();
  // }, [account]);

  // const { data, isLoading, isError } = useWalletBalance({
  //   chain : chainId,
  //   address,
  //   client,
  //   // tokenAddress,
  // });
  const queryClient = new QueryClient();

  return (
    <div className="min-h-screen ">
      <ThirdwebProvider clientId="3a1b881fdf47d438ea101e2972c175fa">
        <QueryClientProvider client={queryClient}>
          <Profile />
        </QueryClientProvider>
      </ThirdwebProvider>
    </div>
  );
};

export default Page;
