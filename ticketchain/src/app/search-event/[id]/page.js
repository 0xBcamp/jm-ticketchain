"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { events } from "../event";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { TransactionButton } from "thirdweb";
import { prepareContractCall, sendTransaction, createThirdwebClient, getContract, readContract } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";

const EventDes =  () => {
  const router = useRouter();
  // const eventId = router.query?.eventId;
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  const client = createThirdwebClient({
    clientId: "3a1b881fdf47d438ea101e2972c175fa",
  });
  
  const chainId = 919;
  const contractAddress = "0x24933eB4854f95285e54F641bb67D6C0D8bD6C91";

  
  useEffect(() => {
    if (id) {
      const foundEvent = events.find((event) => event.id === parseInt(id, 10));
      setEvent(foundEvent);
    }
  }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (id) {
      // Fetch the event data from localStorage or another data source
      const events = JSON.parse(localStorage.getItem("events"));
      const event = events.find((e) => e.eventId === id);
      setEvent(event);
    }
  }, [id]);

  if (!event) {
    return <p>Loading...</p>;
  }

  const convertWeiToEth = (wei) => {
    const eth = parseFloat(wei) / Math.pow(10, 18);
    return eth.toFixed(4); // Ensures 18 decimal places
  };

  const contract = getContract({
    client,
    chain: defineChain(chainId),
    address: contractAddress,
    });

    const TransactionButton = () => {
      const onClick = async () => {
        const transaction = await prepareContractCall({
          contract,
          method: "function buyTicket(uint256 _eventId, string _ticketImageIPFSHash) payable",
          params: [_eventId, _ticketImageIPFSHash],
        });
        sendTransaction(transaction, {
          onTransactionSent: (result) => {
            console.log("Transaction submitted", result.transactionHash);
          },
          onTransactionConfirmed: (receipt) => {
            console.log("Transaction confirmed", receipt.transactionHash);
          },
          onError: (error) => {
            console.error("Transaction error", error);
          },
        });
      }};


  return (
    <div className="lg:flex w-full gap-2 border">
      <div className="w-full">
        <img
          className="h-96 w-full rounded-lg object-cover object-center"
          src={event.image}
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
            {/* <TransactionButton
              // transaction={transaction}
            >
              Confirm Transaction
            </TransactionButton> */}
            <Button onClick={TransactionButton} className="bg-cyan-700 lg:m-3">Buy Ticket</Button>
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
    </div>
  );
};

export default EventDes;
