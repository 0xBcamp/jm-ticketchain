import React from "react";
import dynamic from "next/dynamic";

// const Input = dynamic(() => import("@material-tailwind/react").then((mod) => mod.Input), { ssr: false });

const searchEvent = () => {
  return (
    <div className="">
      <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg lg:p-6 p-0 lg:overflow-visible">
        <figure class="relative w-full h-96">
          <img
            class="object-cover object-center w-full h-full rounded-xl"
            src="/img/images/crowd.jpg"
            alt="Crowd"
          />
          <div className="absolute top-20 items-center flex p-20 w-full">
            <h1 className="lg:text-5xl text-2xl text-white text-center font-extrabold">
              Browse Events
            </h1>
          </div>
          <figcaption class="absolute bottom-10 left-2/4 flex  -translate-x-2/4 justify-center rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div className=" ">
              <div className="w-full flex  bg-white/50">
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
                  label="Search"
                  className="p-3 lg:text-2xl  text-xl  bg-transparent text-black"
                  placeholder="Search by City or Event Name"
                />
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
      <div className="w-full"></div>
    </div>
  );
};

export default searchEvent;
