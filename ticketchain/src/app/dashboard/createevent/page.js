"use client";

import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";

const Page = () => {
  const [_name, setName] = useState("");
  const [_date, setDate] = useState(0);
  const [_time, setTime] = useState(0);
  const [_location, setLocation] = useState("");
  const [_ticketPrice, setTicketPrice] = useState(0);
  const [_totalTickets, setTotalTickets] = useState(0);
  const [_eventImageIPFSHash, setEventImageIPFSHash] = useState("");
  const account = useActiveAccount();

  // console.log(account);
  const client = createThirdwebClient({
    clientId: "3a1b881fdf47d438ea101e2972c175fa",
  });

  const chainId = 919;
  const contractAddress = "0x24933eB4854f95285e54F641bb67D6C0D8bD6C91";

  const contract = getContract({
    client,
    chain: defineChain(chainId),
    address: contractAddress,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const transaction = await prepareContractCall({
        contract,
        method: "function createEvent(string _name, uint256 _date, uint256 _time, string _location, uint256 _ticketPrice, uint256 _totalTickets, string _eventImageIPFSHash)",
        params: [
          _name,
          _date,
          _time,
          _location,
          _ticketPrice,
          _totalTickets,
          _eventImageIPFSHash,
        ],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      console.log(`Transaction hash: ${transactionHash}`);
      toast("Event Created")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full p-20">
      <h1 className="text-3xl text-center m-auto font-bold py-10">
        Create event
      </h1>

      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <Input
            type="text"
            value={_name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date:
          <Input
            type="number"
            value={_date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Time:
          <Input
            type="number"
            value={_time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <br />
        <label>
          Location:
          <Input
            type="text"
            value={_location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <br />
        <label>
          Ticket Price:
          <Input
            type="number"
            value={_ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Total Tickets:
          <Input
            type="number"
            value={_totalTickets}
            onChange={(e) => setTotalTickets(e.target.value)}
          />
        </label>
        <br />
        <label>
          Event Image IPFS Hash:
          <Input
            type="text"
            value={_eventImageIPFSHash}
            onChange={(e) => setEventImageIPFSHash(e.target.value)}
          />
        </label>
        <br />
        <Button type="submit">Create Event</Button>
      </form>
    </div>
  );
};

export default Page;
