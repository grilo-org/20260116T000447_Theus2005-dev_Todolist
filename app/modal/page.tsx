"use client";
import Modal from "../components/Modal";
import { useState } from "react";
export default function ShowModal() {
  const [message, setMessage] = useState("Título");
  return <Modal message={message} onClick={() => setMessage("Título 2")} />;
}
