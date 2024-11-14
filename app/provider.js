"use client"
import React from 'react'

import { ConvexProvider, ConvexReactClient } from "convex/react";

const Provider = ({children}) => {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <div>
        <ConvexProvider client={convex}>
      {children}
      </ConvexProvider>
    </div>
  )
}

export default Provider

//only reason we are doing this because we want layout.js on server side and provider on client side
