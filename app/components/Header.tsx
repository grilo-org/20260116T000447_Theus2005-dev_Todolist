"use client";
import SearchIcon from "../icons/Search";
import Menu from "../icons/Menu";
import { useState } from "react";
export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <header className="flex w-full h-25 bg-blue-500 items-center text-white justify-between text-2xl">
        <div>
          <img
            className="rounded-xl w-20 h-20"
            src="../images/logo.png"
            alt="logo"
          />
        </div>
        <Menu onClick={() => setShowMenu((prev) => !prev)} />

        <div className="flex bg-white rounded-xl w-[50%]">
          <input
            className="text-black text-xl w-[100%]"
            type="text"
            name="tituloTask"
            placeholder="Título da tarefa"
          />
          <SearchIcon />
        </div>
        <nav className="hidden sm:block">
          <ul className="flex gap-10 mr-10">
            <li>
              <a href="./task/createTask">Criar Tarefa</a>
            </li>
            <li>
              <a href="../dashboard">Tarefas</a>
            </li>
          </ul>
        </nav>
      </header>
      {showMenu && (
        <section>
          <ul>
            <li>
              <a href="../dashboard">Tarefas</a>
            </li>
            <li>
              <a href="../task/createTask">Criar tarefas</a>
            </li>
          </ul>
        </section>
      )}
    </>
  );
}
