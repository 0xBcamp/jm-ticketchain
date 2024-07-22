"use client";

import dynamic from "next/dynamic";
import Eventlist from "./eventlist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const client = createThirdwebClient({
  clientId: "3a1b881fdf47d438ea101e2972c175fa",
});

const chainId = 919;
const contractAddress = "0x24933eB4854f95285e54F641bb67D6C0D8bD6C91";

const SearchEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const contract = getContract({
          client,
          chain: defineChain(chainId),
          address: contractAddress,
        });

        const totalEvents = 20; // Assume we want to fetch the first 10 events
        const eventPromises = [];

        for (let eventId = 0; eventId < totalEvents; eventId++) {
          eventPromises.push(
            readContract({
              contract,
              method:"function events(uint256) view returns (uint256 eventId, string name, uint256 date, uint256 time, string location, uint256 ticketPrice, uint256 totalTickets, uint256 availableTickets, address organizer, uint256 funds, string eventImageIPFSHash)",
              params: [eventId],

            })
          );
        }
        const eventData = await Promise.all(eventPromises);
        const formattedEventData = eventData.map(event => {

          const date = new Date(Number(event[2]) * 1000); // Convert seconds to milliseconds
          const time = new Date(Number(event[3]) * 1000); // Convert seconds to milliseconds
          const formattedDate = date.toLocaleDateString();
          const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return {
            eventId: event[0].toString(),
            name: event[1],
            date: formattedDate,
            time: formattedTime,
            location: event[4],
            ticketPrice: event[5].toString(),
            totalTickets: event[6].toString(),
            availableTickets: event[7].toString(),
            organizer: event[8],
            funds: event[9].toString(),
            eventImageIPFSHash: event[10],
          };
        });

        setEvents(formattedEventData);
        console.log(formattedEventData)

      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEventData();
  }, []);

  return (
    <div className="">
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg lg:p-6 p-0 lg:overflow-visible">
        <figure className="relative w-full h-96">
          <img
            className="object-cover object-center w-full h-full rounded-xl"
            src="/img/images/crowd.jpg"
            alt="Crowd"
          />
          <div className="absolute top-20 items-center flex p-20 w-full">
            <h1 className="lg:text-5xl text-2xl text-white text-center font-extrabold">
              Browse Events
            </h1>
          </div>
        </figure>
      </div>
      <div className="w-full">
        <ThirdwebProvider clientId="3a1b881fdf47d438ea101e2972c175fa">
          <QueryClientProvider client={queryClient}>
            <Eventlist events={events} />
          </QueryClientProvider>
        </ThirdwebProvider>
      </div>
    </div>
  );
};

export default SearchEvent;
