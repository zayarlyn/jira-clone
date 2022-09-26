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
        <span className={'font-medium text-[14px] text-gray-900 mb-1 block ' + labelClass}>
          {label}
        </span>
      )}
      {Children}
    </div>
  );
};

export default FormWithLabel;
