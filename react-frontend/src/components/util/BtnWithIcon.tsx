import { Icon } from '@iconify/react';

type Props = { icon: string; text: string; iconSize?: number };

const BtnWithIcon = ({ icon, text, iconSize }: Props) => {
  return (
    <li className='flex cursor-pointer items-center rounded-[3px] px-3 py-[10px] text-left text-light-c-3 duration-200 hover:bg-light-c-5 active:bg-light-c-2'>
      <Icon width={iconSize ?? 22} icon={icon} />
      <span className='ml-3 text-[15px]'>{text}</span>
    </li>
  );
};

export default BtnWithIcon;
