"use client";

import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
import { useState, useEffect } from "react";
// import { download } from "thirdweb/storage";
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
import ticketimg from "../../../../public/img/brand/ticket.png";
import Image from "next/image";

const queryClient = new QueryClient();

const client = createThirdwebClient({
  clientId: "3a1b881fdf47d438ea101e2972c175fa",
});

const chainId = 919;
const contractAddress = "0x24933eB4854f95285e54F641bb67D6C0D8bD6C91";
const MyTicket = () => {
  const account = useActiveAccount();

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const contract = getContract({
          client,
          chain: defineChain(chainId),
          address: contractAddress,
        });

        const totalTickets = 15; // Define the range of ticket IDs you want to fetch
        const ticketPromises = [];

        for (let ticketId = 0; ticketId < totalTickets; ticketId++) {
          ticketPromises.push(
            readContract({
              contract,
              method:
                "function tickets(uint256) view returns (uint256 ticketId, uint256 eventId, address owner, bool used, string ticketImageIPFSHash)",
              params: [ticketId],
            })
          );
        }

        const ticketData = await Promise.all(ticketPromises);

        const formattedTicketData = ticketData.map((ticket) => {
          return {
            ticketId: ticket[0].toString(),
            eventId: ticket[1].toString(),
            owner: ticket[2].toLowerCase(),
            used: ticket[3],
            ticketImageIPFSHash: ticket[4],
          };
        });

        // Optionally filter tickets by the account address
        const filteredTickets = formattedTicketData.filter(
          (ticket) =>
            ticket.owner.toLocaleLowerCase() ===
            account.address.toLocaleLowerCase()
        );
        setTickets(filteredTickets);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    };

    fetchTicketData();
  }, [account, client, contractAddress, chainId]);

  return (
    <div>
      <h1 className="text-3xl text-center m-auto font-bold py-10">
        My Tickets ({tickets.length})
      </h1>
      <div className="flex flex-wrap gap-10 m-auto p-20">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div key={ticket.ticketId} className="">
              <Card className="w-full max-w-[30rem] flex-row text-wrap bg-yellow-200">
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="m-0 w-2/5 shrink-0 rounded-r-none"
                >
                  <Image
                    src={ticketimg}
                    alt="card-image"
                    className="h-full w-full object-cover"
                  ></Image>
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h6"
                    color="gray"
                    className="mb-4 uppercase"
                  >
                    Ticket ID: {ticket.ticketId}
                  </Typography>
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                  Event ID: {ticket.eventId}                  </Typography>
                  <Typography color="gray" className="mb-8 font-normal text-wrap ">
                  Owner: {ticket.owner}
                  </Typography>
                  Used: {ticket.used ? "Yes" : "No"}
                  <a href="#" className="inline-block">
                    <Button variant="text" className="flex items-center gap-2">
                      info
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Button>
                  </a>
                </CardBody>
              </Card>
              <p></p>
              {/* <p>Image IPFS Hash: {ticket.ticketImageIPFSHash}</p> */}
            </div>
          ))
        ) : (
          <p>No tickets found for this account.</p>
        )}
      </div>
    </div>
  );
};

export default MyTicket;
