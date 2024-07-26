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
import { useState ,useMemo} from "react";
import Link from "next/link";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { prepareEvent, getContractEvents } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { useEffect } from "react";
import { readContract } from "thirdweb";
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { download } from "thirdweb/storage";
import Image from "next/image";




const Eventlist =   ({events}) => {

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const [eventImages, setEventImages] = useState({});

  const currentDateTime = new Date();
  const currentDate = currentDateTime.toLocaleDateString();

  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  };
  const handleCardClick = (eventId) => {
    // Save events data to localStorage or use another data-passing method
    localStorage.setItem('events', JSON.stringify(events));
    router.push(`../search-event/${eventId}`);
  };

 
  
  const client = createThirdwebClient({
    clientId: "3a1b881fdf47d438ea101e2972c175fa",
  });

  const filteredEvents = useMemo(() => {
    return events.filter(
      (event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [events, searchQuery]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      for (const event of filteredEvents) {
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
      setEventImages(images);
            console.log(filteredEvents)

    };

    fetchImages();
  }, [filteredEvents]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const images = {};
  //     for (const event of filteredEvents) {
  //       try {
  //         const file = await download({
  //           client,
  //           uri: event.eventImageIPFSHash,
  //         });
  //         const blob = new Blob([file]);
  //         const url = URL.createObjectURL(blob);
  //         images[event.eventId] = url; // Assuming each event has a unique id
  //       } catch (error) {
  //         console.error("Error downloading image:", error);
  //       }
  //     }
  //     setEventImages(images);
  //     console.log(images[9])

  //   };

  //   fetchImages();
  // }, [filteredEvents]);
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
      {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents?.map((event, index) => (
            <Card key={index} className="mt-6 w-96">
              <CardHeader color="blue-gray" className="relative h-56">
              {eventImages[event.eventId] ? (
                <Image
                  src={eventImages[event.eventId]}
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
                  {parseDate(currentDate) > parseDate(event.date) && (
                <p className="text-red-500  p-2 font-bold">Event Ended</p>
              )}
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
                  <Button onClick={() => handleCardClick(event.eventId)} className="bg-cyan-700">Buy Ticket</Button>
                  <p>{event.price}</p>
              </CardFooter>
            </Card>
          )))
        :""}
      </div>
    </div>
  );
};

export default Eventlist;
