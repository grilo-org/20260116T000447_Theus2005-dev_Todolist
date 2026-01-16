"use client";
// import state
import { useState, useEffect } from "react";
// import infra
import { supabase } from "../util/supabase/supabase-client";
import { Task } from "@/domain/entities/tasks";
type descProps = {
  id: number;
  onClick: () => void;
};

export default function DescriptionTask({ id, onClick }: descProps) {
  const [task, setTask] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  async function getDescTask(id: number) {
    try {
      setLoading(true);
      const { data: Task, error } = await supabase
        .from("Task")
        .select()
        .eq("id", id);
      setLoading(false);
      if (error) {
        return alert("erro ao carrega informações da task.");
      }
      setTask(Task);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDescTask(id);
  }, [id]);
  return (
    <div className="flex flex-col rounded-xl bg-white shadow-xl w-[100%] sm:w-[50%]">
      {loading && (
        <p className="text-2xl text-red-500">Carregando descrição...</p>
      )}
      {!loading &&
        task.length > 0 &&
        task.map((task) => (
          <div key={task.id} className="text-center">
            <div className="flex justify-between text-center">
              <h3 className="text-2xl text-black">
                <span className="font-bold">Título: </span>
                {task.titulo}
              </h3>
              <button
                className="text-2xl text-red-500 font-bold cursor-pointer"
                onClick={onClick}
              >
                X
              </button>
            </div>

            <p className="text-xl text-black">
              <span className="font-bold">Descrição</span>: <br />
              {task.descricao}
            </p>
            <p className="text-xl text-black">
              <span className="font-bold">Data conclusão: </span>:
              {task.status == "concluido" ? task.data_conclusao : "Não finalizado"}
            </p>
            <p className="text-xl text-black">
              <span className="font-bold">Finalizar até:</span>
              {task.data_encerramento}
            </p>
            <p className="text-xl text-black">
              <span className="font-bold">Status: </span>
              {task.status}
            </p>
          </div>
        ))}
    </div>
  );
}
