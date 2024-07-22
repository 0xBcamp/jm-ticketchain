import { Montserrat } from "next/font/google";
import "./globals.css";

import Header from "./components/header/header";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Ticketchain",
  description: "Say no to ticket lies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <QueryClientProvider client={queryClient}> */}
        <body className={montserrat.className}>
          <Header />
          {children}
        </body>
      {/* </QueryClientProvider>{" "} */}
    </html>
  );
}
