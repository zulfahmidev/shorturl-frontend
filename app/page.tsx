'use client'

import Items from "./components/items/items";
import Detail from "./components/detail/detail";
import { useState } from "react";
import URL from "./models/URL";

export default function Home() {
  const [item, setItem] = useState<URL | null>(null)
  // Wrapper
  return (
    <div className="h-screen pt-16">
      <div className="grid md:grid-cols-3 container p-5 mx-auto h-full">
        {/* Items */}
        <Items setItem={setItem} />
    
        {/* Detail */}
        <Detail item={item} setItem={setItem} />
      </div>
    </div>
  );
}
