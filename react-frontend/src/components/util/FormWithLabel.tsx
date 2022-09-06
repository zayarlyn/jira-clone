type Props = {
  label: string;
  labelClass?: string;
  children: JSX.Element;
};

const FormWithLabel = (props: Props) => {
  const { label, labelClass, children: Children } = props;
  return (
    <div className='mb-5'>
      {label && (
        <span className={'font-semibold text-[13px] text-gray-600 mb-1 block ' + labelClass}>
          {label}
        </span>
      )}
      {Children}
    </div>
  );
};

export default FormWithLabel;
