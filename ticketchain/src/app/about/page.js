import React from "react";
import tourist from "../../../public/img/images/tourist.png";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiSolidity } from "react-icons/si";
import { SiThirdweb } from "react-icons/si";
import Image from "next/image";

const page = () => {
  return (
    <div className="">
      <div
        className="lg:flex flex-wrap lg:h-2/5 relative "
        style={{
          backgroundImage:
            " linear-gradient( 109.6deg,  rgba(24,138,141,1) 11.2%, rgba(96,221,142,1) 91.1% )",
        }}
      >
        <div className="lg:w-1/2 lg:p-20 p-5">
          <h1 className="lg:text-4xl text-2xl text-cyan-200 py-8">About Ticketchain</h1>
          <h1 className="text-cyan-50 lg:text-2xl ">
            Ticketchain addresses critical issues in the ticketing industry by
            providing a secure and transparent platform for both organizers and
            attendees. By eliminating intermediaries and leveraging blockchain
            technology, Ticketchain reduces costs and ensures that all tickets
            are genuine and verifiable. This enhances trust and confidence in
            the ticketing process, benefiting both event organizers and
            attendees.
          </h1>
        </div>
        <div class="lg:w-1/2 relative   overflow-hidden lg:px-20">
          <Image src={tourist} class="object-cover object-center" />
        </div>
        
      </div>
      <div className="lg:flex lg:p-20 p-5">
        <div className="lg:w-1/2 lg:p-20 flex justify-center gap-8 lg:text-6xl  text-4xl m-auto py-4">
          <FaReact />
          <FaNodeJs />
          <SiSolidity />
          <SiThirdweb />
        </div>
        <div className="lg:w-1/2 lg:p-20">
          <h1 className="lg:text-2xl">
            The platform leverages blockchain technology to record all
            transactions and ticket details, ensuring immutability and
            transparency
          </h1>
        </div>
      </div>
    </div>
  );
};

export default page;
