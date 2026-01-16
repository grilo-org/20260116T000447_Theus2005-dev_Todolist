type modalProps = {
  onClick: () => void;
  message: string;
};

export default function Modal({ onClick, message }: modalProps) {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/40 backdrop-blur-sm flex justify-center items-center">
      <div className="relative w-[370px] rounded-sm bg-white p-6">
        <button
          onClick={onClick}
          className="absolute right-3 top-3 text-2xl font-bold text-red-500 cursor-pointer"
        >
          X
        </button>

        <h1 className="text-2xl text-center text-black">Notificação</h1>
        <span className="text-xl text-center font-bold mt-5 mb-4 block">
          {message}
        </span>
      </div>
    </div>
  );
}
