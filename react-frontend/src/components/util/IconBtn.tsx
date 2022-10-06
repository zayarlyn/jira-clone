import { Icon } from "@iconify/react";

interface Props {
  icon: string;
  onClick?: () => void;
  title?: string;
}

const IconBtn = (props: Props) => {
  const { icon, onClick, title } = props;

  return (
    <button
      {...{ title, onClick }}
      className="rounded-full p-[5px] hover:bg-[#4c3fd1] active:bg-chakra-blue"
    >
      <Icon className="text-2xl text-white" icon={icon} />
    </button>
  );
};

export default IconBtn;
