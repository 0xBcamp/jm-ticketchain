"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { upload } from "thirdweb/storage";

const Page = () => {
  const [_name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [_location, setLocation] = useState("");
  const [ticketPrice, setTicketPrice] = useState(0);
  const [_totalTickets, setTotalTickets] = useState(0);
  const [_eventImageIPFSHash, setEventImageIPFSHash] = useState("");
  const account = useActiveAccount();
  const [showModal, setShowModal] = useState(false);
  const [hash, setHash] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  console.log(account);
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
    setLoading(true); // Start the spinner

    try {
      const dateParts = date.split("-");

      if (dateParts.length !== 3) {
        throw new Error("Invalid date format. Please use MM/DD/YYYY.");
      }
      const formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
      const dateE = new Date(formattedDate);

      if (isNaN(dateE.getTime())) {
        throw new Error("Invalid date. Please enter a valid date.");
      }

      const newdate = new Date(formattedDate);
      if (isNaN(newdate.getTime())) {
        throw new Error("Invalid date. Please enter a valid date.");
      }

      const dateBigInt = BigInt(Math.floor(newdate.getTime() / 1000)); // Convert to seconds

      // Convert time to Unix timestamp in seconds and then to BigInt
      const timeParts = time.split(/[:\s]/); // Split by colon and space
      const hour =
        (Number(timeParts[0]) % 12) + (timeParts[2] === "PM" ? 12 : 0); // Adjust for 12-hour format
      const baseDate = new Date(1970, 0, 1, hour, Number(timeParts[1]), 0); // Use a base date
      const timeBigInt = BigInt(Math.floor(baseDate.getTime() / 1000)); // Convert to seconds

      const _date = dateBigInt;
      const _time = timeBigInt;

      const convertEthToWei = (eth) => {
        const wei = BigInt(parseFloat(eth) * Math.pow(10, 18));
        return wei.toString();
      };
      const ethValue = ticketPrice;

      const _ticketPrice = convertEthToWei(ethValue);

        if (selectedImage) {
          try {
            const uri = await upload({
              client,
              files: [selectedImage]
            });
            setEventImageIPFSHash(uri);
            console.log('Image uploaded successfully:', uri);
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      


      const transaction = await prepareContractCall({
        contract,
        method:
          "function createEvent(string _name, uint256 _date, uint256 _time, string _location, uint256 _ticketPrice, uint256 _totalTickets, string _eventImageIPFSHash)",
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
      setHash(transactionHash);
      console.log(`Transaction hash: ${transactionHash}`);

      setIsOpen(true);
      setLoading(false);

      toast.success(`Event Created: Hash- ${transactionHash}`);
    } catch (error) {
      console.error(error);
      toast.error("Error creating Event");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    } else {
      alert('Image size should be less than 100KB');
    }
  };

  return (
    <div className="w-full lg:p-20 p-5 relative">
      <Card className="bg-yellow-100">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {" "}
            Note
          </Typography>
          <Typography color="red">
            {" "}
            Ensure youre connected to Mode Sepolia Chain to create event
            Otherwise it Fails. Visit{" "}
            <a
              target="_blank"
              className="text-blue-500"
              href="https://rpc.info/mode-testnet"
            >
              https://rpc.info/mode-testnet
            </a>{" "}
            to add network to metamask
            <span></span>
          </Typography>
        </CardBody>
      </Card>
      <h1 className="text-3xl text-center m-auto font-bold py-5">
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
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Time:
          <Input
            type="time"
            value={time}
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
          Ticket Price: ( e.g 0.05 - price in eth )
          <Input
            type="number"
            placeholder="e.g 0.05 (price in eth)"
            value={ticketPrice}
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
          Event Image :

          <input id="imageup" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          <Input
            type="text"
            disabled
            value={_eventImageIPFSHash}
            onChange={(e) => setEventImageIPFSHash(e.target.value)}
          />

        </label>
<label htmlFor="imageup" className="border block rounded-lg p-20 bg-cyan-50">
<Typography className="text-center">Click here to upload Image</Typography>
<div className="flex m-auto">{imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px' }} />}
</div>
</label>
        <br />
        <Button type="submit" className="flex gap-2 m-auto bg-cyan-700">
          Create Event{loading && <Spinner color="white" />}
        </Button>
      </form>

      {/* Dialog container */}
      {isOpen && (
        <div className="dialog-container top-0 left-0 absolute w-full h-full bg-blue-gray-500/50 flex flex-wrap">
          {/* Dialog content */}
          <div className="dialog-content w-96 p-10 shadow m-auto bg-white">
            <div class="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-cyan-700 text-center">
              Successfully Created Event
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

export default Page;
