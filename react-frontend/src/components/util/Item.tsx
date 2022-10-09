interface Props {
  text: string;
  icon?: string;
  size: string;
  variant?: 'ROUND' | 'SQUARE';
}

const Item = (props: Props) => {
  const { text, icon, size, variant = 'SQUARE' } = props;

  return (
    <div className='flex items-center truncate font-normal text-c-1'>
      {icon !== undefined &&
        (icon ? (
          <img
            src={icon}
            alt={text}
            className={`mr-4 ${size} ${variant === 'ROUND' ? 'rounded-full object-cover' : ''}`}
          />
        ) : (
          <div
            className={`mr-4 grid place-items-center rounded-full bg-amber-800 text-sm text-white ${size}`}
          >
            {text.slice(0, 1).toUpperCase()}
          </div>
        ))}
      {text}
    </div>
  );
};

export default Item;
