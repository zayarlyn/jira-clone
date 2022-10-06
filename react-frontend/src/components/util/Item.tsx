const Item = ({
  text,
  icon,
  className,
}: {
  text: string;
  icon?: string;
  className: string;
}) => (
  <div className="flex items-center truncate font-normal text-c-1">
    {icon !== undefined &&
      (icon ? (
        <img src={icon} alt={text} className={className} />
      ) : (
        <div className="mr-2 grid h-5 w-5 place-items-center rounded-full bg-amber-800 text-sm text-white">
          {text.slice(0, 1).toUpperCase()}
        </div>
      ))}
    {text}
  </div>
);

export default Item;
