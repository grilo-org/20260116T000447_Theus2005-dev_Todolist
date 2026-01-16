"use client";
// states
import { useState, useEffect } from "react";

//componentes
import Header from "./Header";
import SelectIcon from "./SelectedIcon";
import DeleteIcon from "./DeleteIcon";
import Modal from "./Modal";
import DescriptionTask from "./DescripitionTask";

// tipagem
import { Task } from "@/domain/entities/tasks";
// infra
import { supabase } from "@/app/util/supabase/supabase-client";

export default function ListTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Suas Tasks");
  const [taskId, setTaskId] = useState<number>();
  const [showModal, setShowModal] = useState(false);

  async function getTasks() {
    try {
      setLoading(true);
      const { data: Task, error } = await supabase.from("Task").select();
      if (error) return setMessage("Erro ao carregar tarefas");
      setTasks(Task);
      setLoading(false);
    } catch (err) {
      console.error("error: ", err);
    }
  }

  async function updateStatus(id: number, status: string) {
    try {
      const { error } = await supabase
        .from("Task")
        .update({
          status: status,
          data_conclusao: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        return console.log(error);
      }
      setMessage(`Status da ${id} atualizado.`);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteTask(id: number) {
    try {
      const { error } = await supabase.from("Task").delete().eq("id", id);
      if (error) return alert("Erro ao deletar task");
      setMessage("task deletada");
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);
  console.log(tasks);
  return (
    <main className="bg-gray-300 h-screen w-full">
      <Header></Header>
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl font-bold border-b-2 border-blue-500">
          Suas Tasks
        </h1>
        <div className="sm:flex gap-2 justify-center">
          <div className="flex flex-col gap-5 justify-center overflow-y-auto max-h-100 w-100 bg-gray-200 rounded-xl">
            {loading && (
              <span className="text-2xl font-bold">Carregando tarefas...</span>
            )}
            {!loading && tasks.length === 0 && (
              <h1 className="text-2xl font-bold text-red-700 bg-red-500">
                Nenhuma Tarefa cadastrada.
              </h1>
            )}
            {!loading &&
              tasks.length > 0 &&
              tasks.map((task) => (
                <div
                  className="flex mb-2 mt-3 ml-5 gap-5 bg-white  rounded-xl h-20 w-[90%]"
                  key={task.id}
                >
                  <label
                    htmlFor=""
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="concluido"
                      id=""
                      checked={task.status == "concluido"}
                      onChange={() => {
                        const novoStatus =
                          task.status !== "concluido"
                            ? "concluido"
                            : "pendente";
                        updateStatus(task.id, novoStatus);

                        setTasks((prev) =>
                          prev.map((t) =>
                            t.id == task.id ? { ...t, status: novoStatus } : t
                          )
                        );
                      }}
                      className=" 
                       appearance-none
      w-6 h-6
      border-2 border-green-700
      rounded-full
      cursor-pointer
      checked:bg-green-700
      checked:border-green-700
      relative
      checked:after:content-['✔']
      checked:after:text-white
      checked:after:text-[12px]
      checked:after:absolute
      checked:after:top-[50%]
      checked:after:left-[50%]
      checked:after:-translate-x-1/2
      checked:after:-translate-y-1/2
                     
                    "
                    />
                  </label>
                  <div className="felx flex-col">
                    <h1 className="text-2xl mt-2">{task.titulo}</h1>
                    <button
                      className="cursor-pointer"
                      onClick={() => setTaskId(task.id)}
                    >
                      descrição
                    </button>
                  </div>
                  <DeleteIcon id={task.id} onClick={deleteTask} />
                </div>
              ))}
          </div>
          {taskId !== 0 && taskId && (
            <DescriptionTask id={taskId} onClick={() => setTaskId(0)} />
          )}
        </div>
        {showModal && (
          <Modal message={message} onClick={() => setShowModal(false)} />
        )}
      </section>
    </main>
  );
}
