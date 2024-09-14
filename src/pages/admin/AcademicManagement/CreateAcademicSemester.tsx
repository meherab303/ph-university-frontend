import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schema/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { semesterOptions } from "../../../constants/semesterOption";
import { yearOptions } from "../../../constants/yearOptions";
import { monthsOption } from "../../../constants/global.monthOption";

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    const semesterData = {
      name: semesterOptions[Number(data.name) - 1].label,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await addAcademicSemester(
        semesterData
      )) as TResponse<TAcademicSemester>;

      if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("semester created", { id: toastId, duration: 2000 });
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
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            label="Name"
            name="name"
            options={semesterOptions}
          ></PHSelect>
          <PHSelect label="Year" name="year" options={yearOptions}></PHSelect>
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthsOption}
          ></PHSelect>
          <PHSelect
            label="End Month"
            name="endMonth"
            options={monthsOption}
          ></PHSelect>
          <Button htmlType="submit">submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
