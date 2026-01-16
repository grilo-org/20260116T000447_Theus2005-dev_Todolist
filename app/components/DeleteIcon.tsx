import { MdDelete } from "react-icons/md";
type deleteTask = {
  id: number;
  onClick: (id: number) => void;
};
export default function DeleteIcon({ id, onClick }: deleteTask) {
  return (
    <button className="cursor-pointer" onClick={() => onClick(id)}>
      <MdDelete className="text-2xl text-red-500" />
    </button>
  );
}
