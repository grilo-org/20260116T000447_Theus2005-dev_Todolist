import { ReactElement } from "react";

type buttonProps = {
  onClick?: () => void;
  texto: string;
};
export default function SubmitButton({ onClick, texto }: buttonProps) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="bg-blue-500 rounded-xl p-2 w-50 mt-4 text-2xl shadow-xl"
    >
      {texto}
    </button>
  );
}
