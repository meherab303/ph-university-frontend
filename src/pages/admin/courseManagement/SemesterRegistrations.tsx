import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHFormInput from "../../../components/form/PHFormInput";
import { statusOptions } from "../../../constants/global.statusOptions";
import { useAddSemsterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { TSemesterRegistration } from "../../../types/courseManagement.type";

const SemesterRegistrations = () => {
  const [addSemesterRegistration,]=useAddSemsterRegistrationMutation()
  const {data:academicSemesterData}=useGetAllSemesterQuery([{name:'sort',value:'year'}])
  const academicSemesterOptions=academicSemesterData?.data?.map((semester)=>({
    value:semester._id,
    label:`${semester.name} ${semester.year}`
  }))
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
    const semesterRegistrationData={
      ...data,
      minCredit:Number(data.minCredit),
      maxCredit:Number(data.maxCredit),
    }
    const toastId = toast.loading("Loading...");
    try {
      const res = (await addSemesterRegistration(
        semesterRegistrationData
      )) as TResponse<TSemesterRegistration>;

      if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("semester Registration created", { id: toastId, duration: 2000 });
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          
        >
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          ></PHSelect>
          <PHSelect
            label="Status"
            name="status"
            options={statusOptions}
          ></PHSelect>
          <PHDatePicker name="startDate" label=" Start Date"></PHDatePicker>
          <PHDatePicker name="endDate" label=" End Date"></PHDatePicker>
          <PHFormInput
            type="text"
            name="minCredit"
            label="Min Credit"
          ></PHFormInput>
          <PHFormInput
            type="text"
            name="maxCredit"
            label="Max Credit"
          ></PHFormInput>

          <Button htmlType="submit">submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistrations;
