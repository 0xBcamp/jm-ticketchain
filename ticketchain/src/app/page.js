"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import ticket from "/public/img/brand/ticket.png";
// import Header from "./components/header/header";
export default function Home() {
  return (
    <>
      <main className="lg:flex flex-wrap  w-full lg:px-40 px-10 py-20 justify-between items-center ">
        <div className="flex flex-col gap-10 lg:justify-left lg:w-1/2 ">
          <h1 className="font-extrabold lg:text-5xl text-3xl  ">
            Transparent solution for event ticketing
          </h1>
          <h1 className=" lg:text-5xl text-3xl ">Say goodbye to ticket lies</h1>
          <div>
            <div className="flex items-center gap-10 ">
              <Button
                variant="text"
                size="lg"
                className=" lg:inline-block border border-cyan-700 primary-text"
              >
                <span>Sign up</span>
              </Button>
              <Link href="/login" >

              <Button
                //   variant="gradient"
                size="lg"
                className=" lg:inline-block bg-cyan-700"
              >
                <span>Login </span>
              </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 ">
          <Image src={ticket}></Image>
        </div>
      </main>
      <div className="bg-cyan-800 h-30 w-full flex items-center p-5">
        <h1 className="text-white  text-3xl text-center ">Decentralized ticketing platform built on Mode Blockchain </h1>
      </div>
    </>
  );
}
