"use client";
import Header from "@/app/components/Header";
import { error } from "console";
import { useForm } from "react-hook-form";
import { supabase } from "@/app/util/supabase/supabase-client";
import { useState } from "react";
import { AuthError } from "@supabase/supabase-js";
import SubmitButton from "@/app/components/ButtonSubmit";
type Form = {
  email: string;
  senha: string;
};
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = async (form: Form) => {
    const email = form.email;
    const senha = form.senha;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      alert(error);
      return;
    }
    window.location.href = "/dashboard";
  };
  return (
    <main className="bg-gray-300 w-full h-screen">
      <section className=" mt-30 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center bg-white w-[90%] sm:w-[50%] rounded-xl shadow-xl h-100"
        >
          <div className="mt-5">
            <label htmlFor="email" className="text-2xl">
              {" "}
              Email:
            </label>
            <input
              className="border b-black rounded-xl w-[100%] h-10 text-black"
              type="email"
              id="email"
              {...register("email", {
                required: "Email é orbigatório",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email inválido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">Email é obrigatório.</p>
            )}
          </div>
          <div className="mt-5">
            <label htmlFor="senha" className="text-2xl">
              {" "}
              Senha:
            </label>
            <input
              className="border b-black rounded-xl w-[100%] h-10 text-black"
              type="password"
              id="senha"
              {...register("senha", { required: true })}
            />
            {errors.senha && (
              <p className="text-red-500">Senha é obrigatória.</p>
            )}
          </div>
          <span>
            <a href="../forgot-password">Esqueci minha senha</a>
          </span>
          <SubmitButton texto={"Entrar"}></SubmitButton>
        </form>
      </section>
    </main>
  );
}
