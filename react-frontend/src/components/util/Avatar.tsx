interface Props {
  src?: string;
  name: string;
  title?: string;
  className?: string;
  onClick?: () => void;
  style?: {};
}

function Avatar(props: Props) {
  const { src, name, title, className, onClick, style } = props;
  return (
    <div
      className={`relative grid shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full bg-green-600 ${
        className ?? 'h-8 w-8 border-[1px]'
      }`}
      title={title ?? name}
      {...{ style, onClick }}
    >
      <div>{name.at(0)}</div>
      {src && <img src={src} alt={name} className='absolute block h-full w-full object-cover' />}
    </div>
  );
}

export default Avatar;
