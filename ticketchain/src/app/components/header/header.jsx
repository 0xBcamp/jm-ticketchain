"use client"
import Link from "next/link";
import React from "react";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider, ConnectButton, lightTheme, } from "thirdweb/react";



const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const client = createThirdwebClient({ clientId: '3a1b881fdf47d438ea101e2972c175fa' });

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 primary-text">
      <Typography
        as="li"
        variant="medium"

        className="p-1 font-normal"
      >
        <Link href="/about" className="flex items-center">
          About
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="medium"

        className="p-1 font-normal"
      >
        <Link href="/login" className="flex items-center">
          Solution
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        className="p-1 font-normal"
      >
        <Link href="#" className="flex items-center">
          Pricing
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        className="p-1 font-normal"
      >
        <Link href="/search-event" className="flex items-center">
          Browse Events
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div className="w-full ">
      <div className=" ">
        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between">
            <Typography
              className="mr-4 cursor-pointer py-1.5 font-medium primary-text"
            >
              <Link href="/">
                <h1 className="text-left text-2xl m-auto ">
                  <span className=" font-extrabold">Ticket</span>
                  <span>chain</span>
                </h1></Link>
            </Typography>
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-4">

              <div className="flex items-center gap-x-1">
                {/* <Button
                  variant="text"
                  size="md"
                  className="hidden lg:inline-block border border-cyan-700 primary-text"
                >
                  <span>Sign up</span>
                </Button>
                <Link href="/login" >

                  <Button
                    //   variant="gradient"
                    size="md"
                    className="hidden lg:inline-block bg-cyan-700"
                  >
                    <span>Login </span>
                  </Button>
                </Link> */}
                <ThirdwebProvider>
                  <ConnectButton client={client} theme={lightTheme({
                    colors: {
                      accentText: "#39a3c6",
                      accentButtonBg: "#39a3c6",
                      primaryText: "#2a7483",
                      primaryButtonBg: "#2e94a8",
                    },
                  })} />
                </ThirdwebProvider>
              </div>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit bg-cyan-700 hover:bg-blue-gray-500 focus:bg-cyan-700 active:bg-cyan-700 lg:hidden p-4"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <MobileNav open={openNav}>
            {navList}
            <div className="flex items-center gap-x-1">
              {/* <Button fullWidth variant="text" size="md" className="border border-cyan-700 primary-text">
                <span>Sign up</span>
              </Button>
              <Link href="/login" >

                <Button fullWidth size="md" className="bg-cyan-700">
                  <span>Log in</span>
                </Button>

              </Link> */}
              <ThirdwebProvider>
                <ConnectButton client={client} />
              </ThirdwebProvider>
            </div>
          </MobileNav>
        </Navbar>

      </div>
    </div>
  );
};

export default Header;