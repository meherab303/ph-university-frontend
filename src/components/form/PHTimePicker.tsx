import {  Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";
type TTimePicker = {
  name: string;
  label: string;
};
const PHTimePicker = ({ name, label }: TTimePicker) => {
  return (
    <div style={{ marginBottom: "8px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <TimePicker {...field}  format='HH:mm' style={{width:'100%',height:"33px"}} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
