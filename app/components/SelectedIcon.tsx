import { GrCheckboxSelected } from "react-icons/gr";
type selected = {
  id: number;
  concluido: boolean;
  onClick: (id: number) => void;
};
export default function SelectIcon({ concluido, onClick, id }: selected) {
  return (
    <GrCheckboxSelected
      onClick={() => onClick(id)}
      className={
        concluido
          ? "text-green-500 mt-10 text-2xl"
          : "text-2xl text-black mt-10"
      }
    />
  );
}
