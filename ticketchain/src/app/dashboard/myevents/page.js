"use client";

import React, { useState, useEffect } from "react";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Badge,
  } from "@material-tailwind/react";
  import { useRouter } from 'next/navigation';
  import Image from "next/image";

const MyEvents = ({ accountDetails }) => {
  const [events, setEvents] = useState([]);
  const [eventImage, setEventImage] = useState(null);
  const router = useRouter();

  const account = useActiveAccount();

  const client = createThirdwebClient({
    clientId: "3a1b881fdf47d438ea101e2972c175fa",
  });
  const chainId = 919;
  const contractAddress = "0x24933eB4854f95285e54F641bb67D6C0D8bD6C91";

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const contract = getContract({
          client,
          chain: defineChain(chainId),
          address: contractAddress,
        });

        const totalEvents = 15; // Assume we want to fetch the first 15 events
        const eventPromises = [];

        for (let eventId = 0; eventId < totalEvents; eventId++) {
          eventPromises.push(
            readContract({
              contract,
              method:
                "function events(uint256) view returns (uint256 eventId, string name, uint256 date, uint256 time, string location, uint256 ticketPrice, uint256 totalTickets, uint256 availableTickets, address organizer, uint256 funds, string eventImageIPFSHash)",
              params: [eventId],
            })
          );
        }

        const eventData = await Promise.all(eventPromises);
        const formattedEventData = eventData.map((event) => {
          const date = new Date(Number(event[2]) * 1000); // Convert seconds to milliseconds
          const time = new Date(Number(event[3]) * 1000); // Convert seconds to milliseconds
          const formattedDate = date.toLocaleDateString();
          const formattedTime = time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return {
            eventId: event[0].toString(),
            name: event[1],
            date: formattedDate,
            time: formattedTime,
            location: event[4],
            ticketPrice: event[5].toString(),
            totalTickets: event[6].toString(),
            availableTickets: event[7].toString(),
            organizer: event[8].toLowerCase(), // Ensure the organizer address is in lowercase
            funds: event[9].toString(),
            eventImageIPFSHash: event[10],
          };
        });
        console.log("Formatted Event Data: ", formattedEventData); // Log the fetched event data
        console.log("Account Address: ", account.address);

        const filteredEvents = formattedEventData.filter(
          (event) =>
            event.organizer.toLocaleLowerCase() ===
            account.address.toLocaleLowerCase()
        );
        console.log("Filtered Events: ", filteredEvents); // Log the filtered events

        setEvents(filteredEvents);
        console.log(filteredEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEventData();
  }, [account]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      for (const event of events) {
        try {
          // Convert IPFS hash to URL
          const ipfsHash = event.eventImageIPFSHash.replace("ipfs://", "");
          const url = `https://ipfs.io/ipfs/${ipfsHash}`;

          const response = await fetch(url);
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          images[event.eventId] = objectUrl; // Assuming each event has a unique id
        } catch (error) {
          console.error("Error downloading image:", error);
        }
      }
      setEventImage(images);

    };

    fetchImages();
  }, [events]);

  const handleCardClick = (eventId) => {
    // Save events data to localStorage or use another data-passing method
    localStorage.setItem('events', JSON.stringify(events));
    router.push(`../search-event/${eventId}`);
  };


  return (
    <div className="flex flex-col justify-center py-20">
           <h1 className="text-3xl text-center m-auto font-bold py-5">
        My Events
      </h1>
      <div className="flex flex-wrap justify-center gap-6 lg:pt-10 pt-20 pb-20">

      {events && events.length > 0 ? (
        events?.map((event, index) => (
          <Card key={index} className="mt-6 w-96">
            <CardHeader color="blue-gray" className="relative h-56">
              {eventImage[event.eventId] ? (
                <Image
                  src={eventImage[event.eventId]}
                  alt={event.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div>Loading image...</div>
              )}
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
                  {event?.totalTickets}
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
              <Button
                onClick={() => handleCardClick(event.eventId)}
                className="bg-cyan-700"
              >
                Buy Ticket
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No events found for this account.</p>
      )}
      </div>
     </div>
  );
 
};

export default MyEvents;
