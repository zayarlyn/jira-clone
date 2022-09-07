const Item = ({ text, icon, className }: { text: string; icon?: string; className: string }) => (
  <div className='flex items-center font-normal truncate'>
    {icon && <img src={icon} alt={text} className={className} />}
    {text}
  </div>
);

export default Item;
