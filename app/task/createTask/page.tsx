"use client";
// componentes
import Header from "@/app/components/Header";
import SubmitButton from "@/app/components/ButtonSubmit";
//infra
import { useForm } from "react-hook-form";
import { supabase } from "@/app/util/supabase/supabase-client";
import { Task } from "@/domain/entities/tasks";

export default function CreateTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>();

  const onSubmitForm = async (form: Task) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("Task").insert({
      titulo: form.titulo,
      descricao: form.descricao,
      data_encerramento: form.data_encerramento,
      uuid_user: user?.id,
    });
    if (error) {
      console.log(error);
      alert("erro");
      return;
    }
    alert("tarefa inserida");
  };
  return (
    <main className="h-screen bg-gray-300">
      <Header></Header>
      <section className="flex w-full h-screen relative">
        <img
          src="/images/todolist.avif"
          className="absolute object-cover h-full w-full"
          alt="imagem"
        />
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="inset-0 h-[50vh] absolute sm:ml-50 flex mt-10 flex-col bg-white rounded-xl w-full sm:w-[70%] items-center jusitfy-center"
        >
          <h1 className="font-bold text-2xl border-b-2 border-black rounded">
            Criar Tarefa
          </h1>
          <hr className="border-b-3 border-black" />
          <label htmlFor="taskName">Título:</label>
          <input
            className="border b-black rounded-xl w-[100%] h-10 text-black"
            type="text"
            {...register("titulo", { required: true })}
          />
          {errors.titulo && (
            <p className="text-red-500">Título é obrigatório</p>
          )}
          <label htmlFor="taskDesc">Descrição:</label>
          <input
            className="border b-black rounded-xl w-[100%] h-10 text-black"
            type="text"
            {...register("descricao")}
          />
          <label htmlFor="dataEnc">Prazo de finalização:</label>
          <input
            className="border b-black rounded-xl w-[100%] h-10 text-black"
            type="date"
            {...register("data_encerramento")}
          />
          <SubmitButton texto="Salvar Tarefa" />
        </form>
      </section>
    </main>
  );
}
