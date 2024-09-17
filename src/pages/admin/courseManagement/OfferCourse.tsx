import { Button, Col, Flex,} from "antd";
import PHForm from "../../../components/form/PHForm";
import {FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import PHFormInput from "../../../components/form/PHFormInput";
import { useAddOfferCoursesMutation, useGetAllAsignFacultiesWithCourseQuery, useGetAllCoursesQuery, useGetAllRegisteredSemisterQuery, } from "../../../redux/features/admin/courseManagement.api";
import { useGetAllDepartmentQuery, useGetAllFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { daysOptions } from "../../../constants/global.daysOptions";
import PHTimePicker from "../../../components/form/PHTimePicker";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import moment from "moment";
import { TResponse } from "../../../types/global.type";
import { toast } from "sonner";

const OfferCourse = () => {
    const [id,setId]=useState('')
    const {data:registeredData}=useGetAllRegisteredSemisterQuery(undefined)
    const {data:departmentData}=useGetAllDepartmentQuery(undefined)
    const{data:acadmicFacultyData}=useGetAllFacultyQuery(undefined)
    const{data:courseData}=useGetAllCoursesQuery(undefined)
    const {data:facultyUnderCourseData,isFetching:isFacultyFetching}=useGetAllAsignFacultiesWithCourseQuery(id,{skip:!id})
    const[createOfferCourse]=useAddOfferCoursesMutation()
    const registeredSemesterOptions=registeredData?.data?.map((semester)=>({
        value:semester._id,
        label:`${semester.academicSemester.name} ${semester.academicSemester.year}`
      }))
    const departmentDataOptions=departmentData?.data?.map((department)=>({
        value:department._id,
        label:department.name
      }))
    const facultyDataOptions=acadmicFacultyData?.data?.map((faculty)=>({
        value:faculty._id,
        label:faculty.name
      }))
      const courseDataOptions=courseData?.data?.map((course)=>({
        value:course._id,
        label:course.title
      }))
    const facultyUnderCourseDataOptions=facultyUnderCourseData?.data?.faculties?.map((faculty)=>({
        value:faculty._id,
        label:faculty.fullName
      }))
   

    const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        const offerCourseData={
            ...data,
            section:Number(data.section),
            maxCapacity:Number(data.maxCapacity),
            startTime:moment(new Date(data.startTime)).format('HH:mm'),
            endTime:moment(new Date(data.endTime)).format('HH:mm')
        }
        createOfferCourse(offerCourseData)
        const toastId=toast.loading('loading...')
        try {
          const res = (await createOfferCourse(offerCourseData)) as TResponse<any>;
          if (res?.error?.data?.message) {
            toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
          } else {
            toast.success("offererd course created ", { id: toastId, duration: 2000 });
           
          }
        } catch (err: any) {
          toast.error(err.message, { id: toastId, duration: 2000 });
        }
    }
    return (
        <Flex justify="center" align="center">
          <Col span={6}>
            <PHForm
              onSubmit={onSubmit}>
              <PHSelect
                label="Semester registration"
                name="semesterRegistration"
                options={registeredSemesterOptions}
              ></PHSelect>
              <PHSelect
                label="Acdemic Department"
                name="academicDepartment"
                options={departmentDataOptions}
              ></PHSelect>
              <PHSelect
                label="Academic Faculty"
                name="academicFaculty"
                options={facultyDataOptions}
              ></PHSelect>
              <PHSelectWithWatch   label="Courses"
                name="course"
                options={courseDataOptions} 
                 onValueChange={setId}>
                </PHSelectWithWatch>
              <PHSelect  label="Faculty"
                name="faculty"
                options={facultyUnderCourseDataOptions}
                disabled={!id ||isFacultyFetching}>
                </PHSelect>
                <PHFormInput
                type="text"
                name="section"
                label="Section"
              ></PHFormInput>
              <PHFormInput
                type="text"
                name="maxCapacity"
                label="Max Capacity"
              ></PHFormInput>
              <PHSelect mode="multiple" name='days' label='Days' options={daysOptions} ></PHSelect>
             <PHTimePicker name='startTime' label='Start Time'></PHTimePicker>
             <PHTimePicker name='endTime' label='End Time'></PHTimePicker>
              <Button htmlType="submit">submit</Button>
            </PHForm>
          </Col>
        </Flex>
      );
};

export default OfferCourse;