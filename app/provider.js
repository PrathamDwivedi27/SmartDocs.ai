"use client";
import React from "react";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Provider = ({ children }) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <div>
      <ConvexProvider client={convex}>
        <PayPalScriptProvider
          options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
        >
          {children}
        </PayPalScriptProvider>
      </ConvexProvider>
    </div>
  );
};

export default Provider;

//only reason we are doing this because we want layout.js on server side and provider on client side
