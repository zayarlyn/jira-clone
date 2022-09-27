type Props = {
  label: string;
  labelClass?: string;
  children: JSX.Element;
  margin?: string;
};

const WithLabel = (props: Props) => {
  const { label, margin, labelClass, children: Children } = props;
  return (
    <div className={margin ?? 'mt-5'}>
      {label && (
        <span className={'font-medium text-[14px] text-gray-900 mb-1 block ' + labelClass}>
          {label}
        </span>
      )}
      {Children}
    </div>
  );
};

export default WithLabel;
