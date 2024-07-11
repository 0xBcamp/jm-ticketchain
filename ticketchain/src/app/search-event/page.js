

import dynamic from "next/dynamic";
import Eventlist from "./eventlist";
// const Input =../components/header/eventlist => import("@material-tailwind/react").then((mod) => mod.Input), { ssr: false });

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
        
        </figure>
      </div>
      <div className="w-full">
        <Eventlist />
      </div>
    </div>
  );
};

export default searchEvent;
