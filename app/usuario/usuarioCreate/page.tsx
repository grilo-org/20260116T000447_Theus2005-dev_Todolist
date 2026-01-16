"use client";
// components
import Header from "@/app/components/Header";
import SubmitButton from "@/app/components/ButtonSubmit";
import Modal from "@/app/components/Modal";
// states
import { useForm } from "react-hook-form";
import { useState } from "react";
// infra
import { supabase } from "@/app/util/supabase/supabase-client";
import { singUpUser } from "@/app/util/supabase/auth";
import { UserLogin } from "@/app/util/supabase/auth";
import { InsertUser } from "@/app/util/supabase/user";

type FormData = {
  nome: string;
  email: string;
  senha: string;
};

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const onSubmit = async (form: FormData) => {
    try {
      // singUp User
      const email = form.email;
      const senha = form.senha;
      const nome = form.nome;

      // user singUp
      const { data, error } = await singUpUser({ email, senha, nome });
      if (error) {
        setMessage(
          "erro ao cadastrar usuário. Não se preocupe, erro não foi seu :)."
        );
        setShowModal(true);
      }
      // user singIn
      await UserLogin({ email, senha });
      // get user data
      const user = data.user;
      // logar na tabela Usuário
      const { error: insertError } = await InsertUser(user!.id, nome, email);
      console.log("Session: ", await supabase.auth.getSession());

      if (insertError) return console.log(insertError);

      setMessage("Usuário criado.");
      setShowModal(true);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 5000);
    } catch (err) {
      console.log("error: ", err);
    }
  };
  return (
    <main className="bg-gray-300 w-full h-screen">
      <Header></Header>
      <hr className="mt-1" /> <br />
      <section className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center bg-white w-[90%] sm:w-[50%] rounded-xl shadow-xl h-100"
        >
          <div className="mt-5">
            <label htmlFor="nome" className="text-2xl">
              {" "}
              Nome:
            </label>
            <input
              className="border b-black rounded-xl w-[100%] h-10 text-black"
              type="text"
              id="nome"
              {...register("nome", { required: true })}
            />
            {errors.nome && <p className="text-red-500">Nome obrigatório</p>}
          </div>
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
          <button
            type="submit"
            className="bg-blue-500 rounded-xl p-2 w-50 mt-4 text-2xl shadow-xl"
          >
            Cadastrar
          </button>
        </form>
        {showModal && (
          <Modal onClick={() => setShowModal(false)} message={message} />
        )}
      </section>
    </main>
  );
}
