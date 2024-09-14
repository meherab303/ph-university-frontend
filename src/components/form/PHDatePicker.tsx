import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
type TDatePicker = {
  name: string;
  label: string;
};
const PHDatePicker = ({ name, label }: TDatePicker) => {
  return (
    <div style={{ marginBottom: "8px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker {...field} id={name} style={{ width: "100%" }} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
