import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TFormInput = {
  type: string;
  name: string;
  label: string;
};
const PHFormInput = ({ type, name, label }: TFormInput) => {
  return (
    <div style={{ marginBottom: "8px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHFormInput;
