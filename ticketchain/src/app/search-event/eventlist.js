"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Badge,
} from "@material-tailwind/react";
import {events} from "../search-event/event.js";
import { useState } from "react";
import Link from "next/link";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { prepareEvent, getContractEvents } from "thirdweb";
import { useReadContract } from "thirdweb/react";


const Eventlist = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

 
  const client = createThirdwebClient({ 
    clientId: "3a1b881fdf47d438ea101e2972c175fa"
   });

   const contract = getContract({ 
    client, 
    chain: defineChain(919), 
    address: "0x24933eB4854f95285e54F641bb67D6C0D8bD6C91"
  });

  const { data, isLoading } = useReadContract({ 
    contract, 
    method: "function events(uint256) view returns (uint256 eventId, string name, uint256 date, uint256 time, string location, uint256 ticketPrice, uint256 totalTickets, uint256 availableTickets, address organizer, uint256 funds, string eventImageIPFSHash)", 
    params: [] 
  });
  
  useEffect(() => {
    if (!isLoading && data) {
      setSearchQuery(data);
    }
  }, [data, isLoading]);



  return (
    <div className="flex flex-col justify-center">
      <div className="flex border  rounded-xl px-2 m-auto mb-10 border-cyan-800 lg:w-2/5 w-full ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-10 m-auto p-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by event name or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className=" w-full p-6   text-xl"
        />
        
      </div>
      <div className="flex flex-wrap justify-center gap-6 lg:pt-10 pt-20 pb-20">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="mt-6 w-96">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <div className="flex justify-between gap-4">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {event.name}
                </Typography>
                <Button
                  disabled
                  className="flex bg-yellow-800 text-black text-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 m-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                    />
                  </svg>
                  {event.tickets}
                </Button>
              </div>
              <Typography className=" text-right">Avail. Tickets</Typography>

              <Typography>{event.description}</Typography>
              <Typography
                variant="subtitle2"
                color="gray"
                className="mt-2 flex text-black font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                  />
                </svg>
                {event.date} at {event.time}
              </Typography>
              <Typography
                variant="subtitle2"
                color="gray"
                className="flex text-black font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                {event.location}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Link href={`../search-event/${event.id}`}>
              <Button className="bg-cyan-700">Buy Ticket</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Eventlist;
