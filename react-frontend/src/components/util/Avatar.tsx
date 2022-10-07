interface Props {
  src?: string;
  name: string;
  title?: string;
  className?: string;
  onClick?: () => void;
}

function Avatar(props: Props) {
  const { src, name, title, className, onClick } = props;
  return (
    <div
      className={`relative grid shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full bg-green-600 ${
        className ?? 'h-8 w-8 border-[1px]'
      }`}
      title={title ?? name}
      onClick={onClick}
    >
      <div className=''>{name.at(0)}</div>
      {src && <img src={src} alt={name} className='absolute block h-full object-cover' />}
    </div>
  );
}

export default Avatar;
