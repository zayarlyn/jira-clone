const Item = ({ text, icon, className }: { text: string; icon?: string; className: string }) => (
  <div className='flex items-center font-normal truncate'>
    {icon !== undefined &&
      (icon ? (
        <img src={icon} alt={text} className={className} />
      ) : (
        <div className='bg-amber-800 text-white grid place-items-center w-5 h-5 mr-2 rounded-full'>
          {text.slice(0, 1).toUpperCase()}
        </div>
      ))}
    {text}
  </div>
);

export default Item;
