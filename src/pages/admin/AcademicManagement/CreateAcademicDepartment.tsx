import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import {
  useAddAcademicDepartmentMutation,
  useGetAllFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global.type";
import { academicDepartment } from "../../../schema/academicManagement.schema";
import { departmentOptions } from "../../../constants/departmentOptions";

const CreateAcademicDepartment = () => {
  const { data: facultyData } = useGetAllFacultyQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const facultyOptions = facultyData?.data?.map(({ _id, name }) => ({
    value: _id,
    label: name,
  })) as { value: string; label: string }[];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = (await addAcademicDepartment(
        data
      )) as TResponse<TAcademicDepartment>;
      if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("AcademicDepartment Created ", {
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
        <PHForm onSubmit={onSubmit} resolver={zodResolver(academicDepartment)}>
          <PHSelect
            label="Department"
            name="name"
            options={departmentOptions}
          ></PHSelect>
          <PHSelect
            label="Faculty"
            name="academicFaculty"
            options={facultyOptions}
          ></PHSelect>
          <Button htmlType="submit">submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
