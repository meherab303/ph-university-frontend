import { Button, Row } from "antd";
import PHForm from "../../components/form/PHForm";
import PHFormInput from "../../components/form/PHFormInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { usePassWordChangeMutation } from "../../redux/features/admin/userManagement.api";

import {logout, } from "../../redux/features/auth/authSlice";

import {useNavigate } from "react-router-dom";
import { useAppDispatch, } from "../../redux/hooks";
import { TResponse } from "../../types/global.type";


const NeedsPasswordChanges = () => {
    const [changePassword]=usePassWordChangeMutation()
    const dispatch=useAppDispatch()
    const navigate=useNavigate()
    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
          const res = await changePassword(data) as TResponse<any>
         if(res?.data?.success){
            toast.success("password changed", {  duration: 2000 });
            dispatch(logout())
            navigate('/login')
         }else{
            toast.error(res?.error?.data?.message,{ duration: 2000 })
         }
        
    }
    return (
        <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHFormInput type="text" name="oldPassword" label="Old Password" />
        <PHFormInput type="text" name="newPassword" label=" New Password:" />
        <Button htmlType="submit">Password Change</Button>
      </PHForm>
    </Row>
    );
};

export default NeedsPasswordChanges;