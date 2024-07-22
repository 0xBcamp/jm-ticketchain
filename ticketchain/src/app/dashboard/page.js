// src/app/dashboard/DefaultSidebar.js

"use client";


import React from "react";

import Sidebar from "../components/sidebar";

export default function DefaultSidebar({ children }) {
  return (
    <div className="flex w-full">
    <h1 className="text-3xl text-center m-auto font-bold">Welcome to your Dashboard</h1> 
    </div>
  );
}


