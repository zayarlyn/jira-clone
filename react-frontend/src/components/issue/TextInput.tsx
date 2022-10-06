import { ChangeEvent, useState } from "react";
import RTAutosize from "react-textarea-autosize";
import { UpdateIssueType } from "../../api/apiTypes";
import WithLabel from "../util/WithLabel";
import type { DispatchMiddleware } from "./IssueDetailModal";

interface Props {
  type: UpdateIssueType;
  label?: string;
  placeholder?: string;
  defaultValue: string;
  className?: string;
  isRequired?: boolean;
  apiFunc: (data: DispatchMiddleware) => void;
}

const TextInput = (props: Props) => {
  const {
    type,
    label,
    defaultValue,
    placeholder,
    apiFunc,
    className,
    isRequired,
  } = props;
  const [value, setValue] = useState(defaultValue ?? "");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    !isEditing && setIsEditing(true);
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleCancel = () => {
    setValue(defaultValue);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (value === defaultValue || (!value && isRequired)) return;
    apiFunc({ type, value });
  };

  return (
    <div>
      <WithLabel label={label ?? ""} labelClass="sm:ml-3">
        <>
          <RTAutosize
            className={`border-stale-100 w-full resize-none rounded-[3px] border-2 px-3 py-1 outline-none hover:bg-[#f4f5f7] focus:border-chakra-blue sm:border-transparent sm:py-2 ${
              className ?? "font-medium"
            }`}
            minRows={1}
            onChange={handleChange}
            {...{ value, placeholder }}
          />
          {isEditing && (
            <>
              <hr className="mx-3 mt-3 mb-2 border-t-[.5px] border-gray-400" />
              <div className="flex justify-end">
                <button onClick={handleCancel} className="btn-crystal">
                  cancel
                </button>
                <button onClick={handleSave} className="btn">
                  save
                </button>
              </div>
            </>
          )}
        </>
      </WithLabel>
    </div>
  );
};

export default TextInput;
