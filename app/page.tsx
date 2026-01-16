// import components
import Image from "next/image";
import Header from "./components/Header";
// import pages
import Login from "./usuario/usuarioLogin/page";
export default function Home() {
  return (
    <div className="w-full h-screen bg-gray-300">
      <main>
        <header className="flex w-full h-25 bg-blue-500 items-center text-white justify-between text-2xl">
          <div>
            <img
              className="rounded-xl w-20 h-20"
              src="../images/logo.png"
              alt="logo"
            />
          </div>
          <nav className="sm:block">
            <ul className="flex gap-10 mr-10">
              <li>
                <a>Home</a>
              </li>
              <li>
                <a href="./usuario/usuarioLogin">Login</a>
              </li>
              <li>
                <a href="./usuario/usuarioCreate">Cadastro</a>
              </li>
            </ul>
          </nav>
        </header>
        <Login />
      </main>
    </div>
  );
}
