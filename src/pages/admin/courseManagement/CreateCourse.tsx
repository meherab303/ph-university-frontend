

import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import PHFormInput from "../../../components/form/PHFormInput";
import { useAddCoursesMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TCourses } from "../../../types/courseManagement.type";

const CreateCourse = () => {
    const [createCourses]=useAddCoursesMutation()
  const {data:courseData} = useGetAllCoursesQuery(undefined)
  const preRequisiteoptions=courseData?.data?.map((course)=>({
    value:course._id,
    label:course.title
  }))
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    const courseData = {
      ...data,
      code:Number(data.code),
      credits:Number(data.credits),
      preRequisiteCourses:data.preRequisiteCourses?data.preRequisiteCourses.map((item:string)=>({course:item,isDeleted:false})):[],
      isDeleted:false
    };
    try {
      const res = (await createCourses(
        courseData
      )) as TResponse<TCourses>;
      console.log(res,'course res')

      if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("course created", { id: toastId, duration: 2000 });
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
           <PHFormInput
                type="text"
                name="title"
                label="Title"
              ></PHFormInput>
           <PHFormInput
                type="text"
                name="prefix"
                label="Prefix"
              ></PHFormInput>
           <PHFormInput
                type="text"
                name="code"
                label="Code"
              ></PHFormInput>
           <PHFormInput
                type="text"
                name="credits"
                label="credits"
              ></PHFormInput>
          <PHSelect
            label="PreRequisiteCourses"
            name="preRequisiteCourses"
            options={preRequisiteoptions}
            mode="multiple"
          ></PHSelect>
        
          <Button htmlType="submit">submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
