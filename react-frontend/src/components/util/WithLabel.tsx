type Props = {
  label: string;
  labelClass?: string;
  children: JSX.Element;
  margin?: string;
};

const WithLabel = (props: Props) => {
  const { label, margin, labelClass, children: Children } = props;
  return (
    <div className={margin ?? "mt-5"}>
      {label && (
        <span
          className={
            "mb-2 block text-[14px] font-medium text-c-1 " + labelClass
          }
        >
          {label}
        </span>
      )}
      {Children}
    </div>
  );
};

export default WithLabel;
