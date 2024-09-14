import { zodResolver } from "@hookform/resolvers/zod";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";

import { Button, Col, Flex } from "antd";
import { academicFaculty } from "../../../schema/academicManagement.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { facultyOptions } from "../../../constants/facultyOptions";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = (await addAcademicFaculty(
        data
      )) as TResponse<TAcademicFaculty>;
      if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("AcademicFaculty Created ", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId, duration: 2000 });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit} resolver={zodResolver(academicFaculty)}>
          <PHSelect
            label="Faculty"
            name="name"
            options={facultyOptions}
          ></PHSelect>
          <Button htmlType="submit">submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
