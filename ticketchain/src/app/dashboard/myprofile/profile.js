"use client";

import React, { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Typography, Card } from "@material-tailwind/react";
import Web3 from "web3";
import { Avatar } from "@material-tailwind/react";
import { useWalletBalance, getChain } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { getChainMetadata } from "thirdweb/chains";
import { defineChain } from "thirdweb/chains";

const animalAvatars = [
  "https://openseauserdata.com/files/ffbc878edaea7d3b74148555daa428f0.svg",
  "https://openseauserdata.com/files/f4cd4a0f807985f10e680a88e17ca7cd.svg",
  "https://openseauserdata.com/files/84d0d6a1b7a70cdedb9a24c6293ca458.svg",
  "https://openseauserdata.com/files/24cbf60971433dce0e6159f4c7805c9b.svg",
  "https://raw.seadn.io/files/ec99cc982c2323be3452f86c41e9996c.svg",
  "https://openseauserdata.com/files/dae2a8a8d5b957674ccce041d6967235.svg",
];
const Profile = () => {
  const [address, setAddress] = useState(null);
  // const [balance, setBalance] = useState(null);
  // const [network, setNetwork] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const account = useActiveAccount();
  const [chainDetails, setChainDetails] = useState(null);
  const client = createThirdwebClient({
    clientId: "3a1b881fdf47d438ea101e2972c175fa",
  });

  const chainId = 919;
  const contractAddress = "0x24933eB4854f95285e54F641bb67D6C0D8bD6C91";
  const chain = defineChain({ id: 919 });

  useEffect(() => {
    const fetchUserData = async () => {
      if (account && account.address) {
        setAddress(account.address);

        const storedAvatar = localStorage.getItem(`avatar-${account.address}`);
        if (storedAvatar) {
          setAvatar(storedAvatar);
        } else {
          const newAvatar =
            animalAvatars[Math.floor(Math.random() * animalAvatars.length)];
          setAvatar(newAvatar);
          console.log(avatar)
          localStorage.setItem(`avatar-${account.address}`, newAvatar);
        }

        const chainData = await getChainMetadata(chain);
        console.log(chainData);
        setChainDetails(chainData);
       
      }
    };

    fetchUserData();
  }, [account]);

  const {
    data: balance,
    isLoading,
    isError,
  } = useWalletBalance({
    chain: chainId,
    address,
    client,
    // tokenAddress,
  });

  return (
    <div className="min-h-screen ">
      <div className=" m-auto">
        <div className="text-center py-10">
          <h1 className="text-3xl text-center text-cyan-700 m-auto font-bold py-5">
            My Profile
          </h1>
          {address ? (
            <div className="py-10">
              {/* Display avatar */}

              {avatar ? (
                <div className="p-10">
                  <Avatar
                    src= {avatar}
                    alt="avatar"
                    className="border shadow "
                    size="xxl"
                  />
                 
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">No Avatar</span>
                </div>
              )}
              <div className="flex gap-10 flex-wrap text-white m-auto justify-center">
                <Card className="p-10 h-40 bg-cyan-700/50 w-96">
                  <p className="text-gray-800 break-all">
                    Address: <br></br>
                    <span className="text-xl font-bold">{address}</span>
                  </p>
                </Card>
                <Card className="p-10 h-40 bg-yellow-700 w-96 ">
                  <p className="text-gray-800 mt-2">
                    Balance:{" "}
                    <span className="text-xl font-bold">
                      {balance?.displayValue} {chainDetails?.chain}
                    </span>
                  </p>
                </Card>
                <Card className="p-10 h-40 bg-blue-800/50 w-96 text-left">
                  <ul>
                    <li>
                      <p className="text-gray-800 mt-2">
                        Chain ID: {" "}
                        <span className="text-xl font-bold">
                          {chainDetails?.chainId || "Not connected"}
                        </span>
                      </p>
                    </li>
                    <li>
                      <p className="text-gray-800 ">
                        Network:{" "}
                        <span className="text-xl font-bold">
                          {chainDetails?.name || "Not connected"}
                          {/* <Avatar src={chainDetails?.icon} size="md"  alt="avatar"/> */}
                        </span>
                      </p>
                    </li>
                    <li>
                      <p className="text-gray-800 ">
                        Chain: {" "}
                        <span className="text-xl font-bold">
                          {chainDetails?.chain || "Not connected"}
                        </span>
                      </p>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">
              Please connect your MetaMask wallet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
