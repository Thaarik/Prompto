import React from "react";
import "@styles/globals.css";
import Nav from "@components/Nav"; // because we are going to reuse this in all pages.
import Provider from "@components/Provider";
export const metadata = {
  title: "Prompto",
  description: "Discover and Share AI Prompts",
};
const RootLayout = ({ children }) => {
  return (
    <html land="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
