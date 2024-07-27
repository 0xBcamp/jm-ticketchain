"use client";

import React, { useState, useEffect } from 'react';
import { useActiveAccount } from 'thirdweb/react'; 
import { Typography, Card } from '@material-tailwind/react';
import Web3 from 'web3';

const animalAvatars = [
  'https://placekitten.com/200/200',   
  'https://placepuppy.net/200/200',   
  'https://placebear.com/200/200',    
  'https://placeimg.com/200/200/animals', 
  'https://loremflickr.com/200/200/cat', 
  'https://loremflickr.com/200/200/dog', 
];

const Page = () => {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const account = useActiveAccount(); 

  useEffect(() => {
    const fetchUserData = async () => {
      if (account && account.address) {
        setAddress(account.address);

        const storedAvatar = localStorage.getItem(`avatar-${account.address}`);
        if (storedAvatar) {
          setAvatar(storedAvatar);
        } else {
          const newAvatar = animalAvatars[Math.floor(Math.random() * animalAvatars.length)];
          setAvatar(newAvatar);
          localStorage.setItem(`avatar-${account.address}`, newAvatar);
        }

        if (typeof window.ethereum === 'undefined') {
          console.error("MetaMask is not installed.");
          return;
        }

        const web3 = new Web3(window.ethereum);
        
        try {
          const userBalance = await web3.eth.getBalance(account.address);
          const formattedBalance = web3.utils.fromWei(userBalance, 'ether');
          setBalance(formattedBalance);
          
          const networkId = await web3.eth.net.getId();
          console.log("Network ID:", networkId); 
          setNetwork(networkId);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchUserData();
  }, [account]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 bg-white shadow-lg rounded-lg">
          <div className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-4 font-semibold">
              User Profile:
            </Typography>
            {address ? (
              <div>
                {/* Display avatar */}
                {avatar ? (
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600">No Avatar</span>
                  </div>
                )}
                <p className="text-gray-800 break-all">Address: {address}</p>
                <p className="text-gray-800 mt-2">Balance: {balance} ETH</p>
                <p className="text-gray-800 mt-2">Network ID: {network !== null ? network : 'Loading...'}</p>
              </div>
            ) : (
              <p className="text-gray-600">Please connect your MetaMask wallet.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
