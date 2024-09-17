import { Button, Row } from "antd";

import { FieldValues, } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHFormInput from "../components/form/PHFormInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const defaultValues = {
    id: "2028020001",
    password: "student123",
  };
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("logging");
    try {
      const res = await login(data).unwrap();
      console.log(res,'afterlogin')
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("logged in", { id: toastId, duration: 2000 });
      if(res.data.needPasswordChange){
        navigate(`/needs-password-changes`);
      }else{
        navigate(`/${user.role}/dashboard`);
      }
  
    } catch (err:any) {
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHFormInput type="text" name="id" label="ID:" />
        <PHFormInput type="text" name="password" label="Password:" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
