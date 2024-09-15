import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
type TPhSelectWithSelect = {
  label: string;
  name: string;
  options: { value: string; label: string }[] | undefined;
  disabled?: boolean;
  mode?:'multiple'|'tags'|undefined;
  onValueChange:React.Dispatch<React.SetStateAction<string>>
  };

const PHSelectWithWatch = ({ label, name, options, disabled,mode,onValueChange}: TPhSelectWithSelect) => {
    const {control}=useFormContext()
    const inputValue=useWatch({
        control,
        name
    })
    useEffect(() => {
        onValueChange(inputValue);
      },[inputValue]);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
          mode={mode}
            {...field}
            style={{ width: "100%" }}
            options={options}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelectWithWatch;
