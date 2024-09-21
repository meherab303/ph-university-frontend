import { Button, Col, Flex } from "antd";
import { useGetFacultyEnrolledCourseQuery } from "../../redux/features/faculty/facultyCourse.api";
import PHForm from "../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../components/form/PHSelect";
import { useNavigate } from "react-router-dom";


const FacultyEnrolledCourse = () => {
    const navigate=useNavigate()
    const {data:facultyEnrolledData}=useGetFacultyEnrolledCourseQuery(undefined)
    console.log(facultyEnrolledData)
    const semesterOptions=facultyEnrolledData?.data?.map(item=>({
        label:`${item.academicSemester.name} ${item.academicSemester.year}`,
        value:item?.semesterRegistration._id
    }))
    const courseOptions=facultyEnrolledData?.data?.map(item=>({
        label:item?.course?.title,
        value:item?.course?._id
    }))
    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`)
    }
    return (
        <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit} >
          <PHSelect
            label="Semester"
            name="semesterRegistration"
            options={semesterOptions}
          ></PHSelect>
          <PHSelect
            label="Course"
            name="course"
            options={courseOptions}
          ></PHSelect>
          <Button htmlType="submit">submit</Button>
        </PHForm>
      </Col>
    </Flex>
    );
};

export default FacultyEnrolledCourse;