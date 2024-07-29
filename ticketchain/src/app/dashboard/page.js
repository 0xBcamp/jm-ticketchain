"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import React from "react";

import Sidebar from "../components/sidebar";
const queryClient = new QueryClient();

export default function DefaultSidebar({ children }) {
  return (
          <QueryClientProvider client={queryClient}> 

    <div className="flex w-full">
    <h1 className="text-3xl text-center m-auto font-bold">Welcome to your Dashboard</h1> 
    </div>
         </QueryClientProvider>

  );
}


