"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { events } from "../event";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { TransactionButton } from "thirdweb";
import {
  prepareContractCall,
  sendTransaction,
  createThirdwebClient,
  getContract,
  readContract,
} from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { useActiveWalletConnectionStatus } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { download } from "thirdweb/storage";

const EventDes = () => {
  const router = useRouter();
  // const eventId = router.query?.eventId;
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isConnected = useActiveWalletConnectionStatus();
  const accountDetails = useActiveAccount();
  const [eventImage, setEventImage] = useState(null);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const client = createThirdwebClient({
    clientId: "3a1b881fdf47d438ea101e2972c175fa",
  });
  const account = accountDetails?.address;

  const chainId = 919;
  const contractAddress = "0x24933eB4854f95285e54F641bb67D6C0D8bD6C91";

  useEffect(() => {
    if (id) {
      // Fetch the event data from localStorage or another data source
      const events = JSON.parse(localStorage.getItem("events"));
      const event = events.find((e) => e.eventId === id);
      setEvent(event);

      if (event && event.eventImageIPFSHash) {
        const fetchImage = async () => {
          try {
            // Convert IPFS hash to URL
            const ipfsHash = event.eventImageIPFSHash.replace("ipfs://", "");
            const url = `https://ipfs.io/ipfs/${ipfsHash}`;
console.log(ipfsHash);
            const response = await fetch(url);
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            setEventImage(objectUrl); // Set the image URL
          } catch (error) {
            console.error("Error downloading image:", error);
          }
        };

        fetchImage();
      }
    }
  }, [id]);

  if (!event) {
    return <p>Loading...</p>;
  }
  // console.log(event.ticketPrice)
  const convertWeiToEth = (wei) => {
    const eth = parseFloat(wei) / Math.pow(10, 18);
    return eth; 
  };
  const convertEthToWei = (eth) => {
    return BigInt(Math.floor(parseFloat(eth) * Math.pow(10, 18))).toString();
  };

  const contract = getContract({
    client,
    chain: defineChain(chainId),
    address: contractAddress,
  });

  const _ticketImageIPFSHash = eventImage;

  const handleTransaction = async () => {
    const _eventId = id;
    setLoading(true); // Start the spinner
    // Set the ticket price in Ether

    try {
      const ticketPriceInWei = convertEthToWei(event.ticketPrice);

console.log(ticketPriceInWei)

      const transaction = await prepareContractCall({
        contract,
        method:
          "function buyTicket(uint256 _eventId, string _ticketImageIPFSHash) payable",
        params: [_eventId, _ticketImageIPFSHash],
      });

      const { transactionHash } = await sendTransaction({
        transaction,
        account,
        value: event.ticketPrice,
        onTransactionSent: (result) => {
          console.log("Transaction submitted", result.transactionHash);
          toast.success(
            `Transaction Initiated: Hash- ${result.transactionHash}`
          );
          setIsOpen(true);
        },
        onTransactionConfirmed: (receipt) => {
          console.log("Transaction confirmed", receipt.transactionHash);
          toast.success(
            `Transaction Confirmed: Hash- ${receipt.transactionHash}`
          );
        },
        onError: (error) => {
          console.error("Transaction error", error);
          toast.error(`Error Buying Ticket - ${error}`);
        },
      });

      setHash(transactionHash);
      console.log(`Transaction hash: ${transactionHash}`);
    } catch (error) {
      console.error(error);
      toast.error(`Error Buying Ticket - ${error}`);
    } finally {
      setLoading(false); // Stop the spinner
    }
  };

  return (
    <div className="lg:flex w-full gap-2 border">
      <div className="w-full">
        <img
          className="h-96 w-full rounded-lg object-cover object-center"
          src={eventImage}
          alt="nature image"
        />
        <div className="py-10 lg:px-40 px-10 flex text-black flex-col gap-3 shadow ">
          <p className="lg:text-2xl  text-blue-gray-700">
            ETH {convertWeiToEth(event.ticketPrice)} / ticket
          </p>
          <h1 className="lg:text-3xl font-bold text-xl text-cyan-700 pb-5">
            {event.name}
          </h1>
          <p className="">{event.description}</p>
          <p>
            {event.date} at {event.time}
          </p>
          <p>Organised by:</p>
          <div className="py-4 flex">
            <Button
              onClick={handleTransaction}
              className="bg-cyan-700 lg:m-3 flex gap-2 m-auto "
            >
              Buy Ticket {loading && <Spinner color="white" />}{" "}
            </Button>
            <span className="bg-yellow-800 text-black m-3 gap-5 p-4 flex">
              <p>Available Tickets </p>
              <span className="font-bold flex text-2xl ">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 m-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                  />
                </svg>
                {event.availableTickets}
              </span>
            </span>
            <span className="bg-blue-800 text-white m-3 gap-5 p-4 flex">
              <p>Total Tickets </p>
              <span className="font-bold flex text-2xl ">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 m-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                  />
                </svg>
                {event.totalTickets}
              </span>
            </span>
          </div>
        </div>
        <div className="lg:px-40 px-10 py-10 my-5 border ">
          <h1 className="lg:text-2xl  text-blue-gray-500  ">
            {event.organizer}
          </h1>
          <p>Organizers Address</p>
        </div>
      </div>
      <div className="w-96  bg-cyan-50 p-3 flex flex-col gap-5">
        <span>
          <p>Location</p>
          <p className="text-xl font-bold">{event.location}</p>
        </span>
        <span>
          <p>Date and time</p>
          <p className="text-xl font-bold">
            {event.date} at {event.time}
          </p>
        </span>
        <span>
          <p>Addres</p>

          <p className="text-xl font-bold">{event.address}</p>
        </span>
        <span>
          <p>Country</p>

          <p className="text-xl font-bold">{event.country}</p>
        </span>
        <div className="border bg-blue-gray-200 h-96"></div>
      </div>
      {isOpen && (
        <div className="dialog-container top-0 left-0 absolute w-full h-full bg-blue-gray-500/50 flex">
          {/* Dialog content */}
          <div className="dialog-content w-96 p-10 shadow m-auto bg-white">
            <div class="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-cyan-700 text-center">
              Successfully Bought Ticket
            </div>{" "}
            <div class="relative p-4 my-4 font-sans text-base antialiased font-light leading-relaxed border-t text-wrap border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
              <p className="text-wrap">Transaction Hash: {hash}</p>
            </div>
            <div className="dialog-actions flex gap-5">
              <Button onClick={closeDialog} className="text-red">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const url = `https://sepolia.explorer.mode.network/tx/${hash}`;
                  window.open(url, "_blank");
                }}
                className="bg-cyan-700"
              >
                View on Etherscan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDes;
