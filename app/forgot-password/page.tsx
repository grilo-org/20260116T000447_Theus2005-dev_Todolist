"use client";
// react hooks
import { useState, useEffect } from "react";

// infra
import { supabase } from "../util/supabase/supabase-client";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `https://todolist-ebnb.vercel.app/reset-password?email=${email}`,
    });

    setLoading(false);
    if (error) {
      alert(error);
      return;
    }
  };

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <header></header>
      <form
        onSubmit={handleSubmit}
        className="border b-2 rounded-md w-100 h-50 flex flex-col items-center gap-5 shadow-xl"
      >
        <h1 className="bg-gray-300 w-full text-center font-bold text-2xl">
          Recuperar Senha
        </h1>
        <input
          type="email"
          className="w-full border p-2 rounded-sm mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="exemplo@gmail.com"
        />
        <button
          className="bg-blue-500 rounded-xl  w-50 mt-4 text-2xl shadow-xl"
          type="submit"
        >
          {loading ? "Enviando..." : "Enviar Link"}
        </button>
      </form>
    </main>
  );
}
