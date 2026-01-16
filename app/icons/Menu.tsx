import { IoIosMenu } from "react-icons/io";
type menuProps = {
  onClick: () => void;
};
export default function Menu({ onClick }: menuProps) {
  return (
    <IoIosMenu className="sm:hidden text-2xl text-white" onClick={onClick} />
  );
}
