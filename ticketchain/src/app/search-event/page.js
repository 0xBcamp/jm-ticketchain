import React from 'react';

const searchEvent = () => {
  return (
    <div className=''>
        <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
  <figure class="relative w-full h-96">
    <img class="object-cover object-center w-full h-full rounded-xl"
src="/img/images/crowd.jpg" alt="Crowd" />
<div className="absolute bottom-20">
    <h1 className="text-4xl text-white">Browse Events</h1>
</div>
    <figcaption
      class="absolute bottom-30 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
      <div>
        <h5
          class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Sara Lamalo
        </h5>
        <p class="block mt-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          20 July 2022
        </p>
      </div>
      <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        Growth
      </h5>
    </figcaption>
  </figure>
</div>
     <div className='w-full'>
     </div>
    </div>
  );
};

export default searchEvent;
