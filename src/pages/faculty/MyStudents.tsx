import { useParams } from "react-router-dom";
import { useGetFacultyEnrolledCourseQuery, useUpdateCourseCourseMutation } from "../../redux/features/faculty/facultyCourse.api";
import { Button, Modal, Table, TableColumnsType } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

import PHForm from "../../components/form/PHForm";
import { useState } from "react";
import PHFormInput from "../../components/form/PHFormInput";
import { toast } from "sonner";
import { TResponse } from "../../types/global.type";

type  TStudentInfo ={
   studentInfo:{
    key: string;
    name: string;
    offeredCourse: string;
    role: string;
    semesterRegistration: string;
    student: string;
   }
}


const MyStudents = () => {
    const {semesterRegistrationId,courseId}=useParams()
    console.log(semesterRegistrationId,courseId)
    const {data:facultyEnrolledData,isLoading}=useGetFacultyEnrolledCourseQuery([{name:'semesterRegistration',value:semesterRegistrationId},{name:'course',value:courseId}])
    console.log(facultyEnrolledData)

    const tableData = facultyEnrolledData?.data?.map(({ _id, student ,semesterRegistration,offeredCourse}) => ({
        key: _id,
        name:student.fullName,
        role:student.id,
        student:student._id,
        semesterRegistration:semesterRegistration._id,
        offeredCourse:offeredCourse._id
      }));
      const columns: TableColumnsType = [
        {
          title: "Name",
          dataIndex:"name",
          showSorterTooltip: { target: "full-header" },
        },
        {
          title: "Role",
          dataIndex: "role",
        },
        {
          title: "Action",
          render:(item)=>{
            return (
                <UpdateCourseModal studentInfo={item}></UpdateCourseModal>
            )
          }
        },
      ];
    
      if (isLoading) {
        return <p>loading..</p>;
      }
    return (
        <Table
      
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    );
};



const UpdateCourseModal=(item:TStudentInfo)=>{
const [updateMarks]=useUpdateCourseCourseMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit:SubmitHandler<FieldValues>=async(data)=>{
     const updateCourseMarksData={
        semesterRegistration:item.studentInfo.semesterRegistration,
        offeredCourse:item.studentInfo.offeredCourse,
        student:item.studentInfo.student,
        courseMarks:{
            classTest1:Number(data.classTest1),
            classTest2:Number(data.classTest2),
            midTerm:Number(data.midTerm),
            finalTerm:Number(data.finalTerm)
        }
     }
     
     const toastId=toast.loading('loading...')
        try {
          const res = await updateMarks(updateCourseMarksData)as TResponse<any>
    
          if (res?.error?.data?.message) {
            toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
          } else {
            toast.success("marks updated", { id: toastId, duration: 2000 });
            setIsModalOpen(false);
          }
        } catch (err: any) {
          toast.error(err.message, { id: toastId, duration: 2000 });
        }
    }
      
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return(<>
        <Button  onClick={showModal}>
        Update Marks
        </Button>
        <Modal title="Basic Modal" open={isModalOpen} footer={null} onCancel={handleCancel}>
         <PHForm onSubmit={handleSubmit}>
            <PHFormInput type="text" name="classTest1" label="ClassTest 1"></PHFormInput>
            <PHFormInput type="text" name="classTest2" label="ClassTest 2"></PHFormInput>
            <PHFormInput type="text" name="midTerm" label="Mid Term"></PHFormInput>
            <PHFormInput type="text" name="finalTerm" label="finlalTerm"></PHFormInput>
           
            <Button htmlType="submit">Submit</Button>
            
        </PHForm>
        </Modal>
      </>)}


export default MyStudents;