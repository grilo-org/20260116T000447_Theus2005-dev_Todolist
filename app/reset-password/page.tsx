"use client";
// react hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// infra
import { supabase } from "../util/supabase/supabase-client";
// components
import Modal from "../components/Modal";

export default function ResetPassword() {
  // states
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Digite sua nova senha");
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const email =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("email")
      : null;
  const handleResetPassword = async (e: React.FormEvent) => {
    if (!email) {
      setMessage("Email não encontrado na URL.");
      setOpenModal(true);
      return;
    }

    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "Aplication/json" },
        body: JSON.stringify({ email, newPassword: senha }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao atualizar senha");

      setMessage("Senha atualizada com sucesso!");
      setOpenModal(true);

      setTimeout(() => router.push("/usuario/usuarioLogin"), 2000);
    } catch (err: any) {
      setMessage(err.message);
      setOpenModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-300">
      <form
        onSubmit={handleResetPassword}
        className="flex flex-col items-center justify-center"
      >
        <h1 className="text-2xl font-bold">{message}</h1>
        <label htmlFor="senha">Nova senha:</label>
        <input
          type="password"
          id="senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <button
          className="bg-blue-500 rounded-xl  w-50 mt-4 text-2xl shadow-xl"
          type="submit"
        >
          Salvar nova senha
        </button>
      </form>
      {openModal && (
        <Modal message={message} onClick={() => setOpenModal(false)} />
      )}
    </main>
  );
}
