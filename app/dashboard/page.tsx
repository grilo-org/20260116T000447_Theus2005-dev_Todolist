"use client";
import { useState } from "react";
import ListTask from "../components/ListTasks";
export default function Dashboard() {
  const [modelView, setModelView] = useState<string>("table");

  return (
    <main className="h-screen w-full bg-gray-300 flex ">
      <ListTask />
    </main>
  );
}
