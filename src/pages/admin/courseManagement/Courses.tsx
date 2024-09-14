

import { Button, Modal, Table, TableColumnsType } from "antd";


import { useAssignFacultiesMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TCourseTableData } from "../../../types/courseManagement.type";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TResponse } from "../../../types/global.type";
import { toast } from "sonner";

const Courses = () => {
  const {
    data: courseData,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(undefined);
  const tableData = courseData?.data?.map(({ _id, title,code,credits,prefix }) => ({
    key: _id,
    title,
    code:`${prefix} ${code}`,
    credits,
  }));
  const columns: TableColumnsType<TCourseTableData> = [
    {
      title: "Name",
      dataIndex:"title",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Credit",
      dataIndex: "credits",
    },

    {
      title: "Action",
      render: (item) => {
        return (
         <AddFacultyModal item={item.key}></AddFacultyModal>
        );
      },
    },
  ];

  if (isLoading) {
    return <p>loading..</p>;
  }
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

const AddFacultyModal=(item)=>{
    const {data:facultyData}=useGetAllFacultiesQuery(undefined)
    const [assignFaculties]=useAssignFacultiesMutation()
    const facultyOptions=facultyData?.data?.map((faculty)=>(
        {
            value:faculty._id,
            label:faculty.fullName
        }
    ))
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit:SubmitHandler<FieldValues>=async(data)=>{
        const assignFacultiesData={
            courseId:item.item,
            facultiesId:{
                faculties:data.faculties,
            }
        }
        const toastId=toast.loading('loading...')
        try {
          const res = (await assignFaculties(
            assignFacultiesData
          )) as TResponse<any>;
    
          if (res?.error?.data?.message) {
            toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
          } else {
            toast.success("faculty assigned", { id: toastId, duration: 2000 });
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
        Assign Faculties
        </Button>
        <Modal title="Basic Modal" open={isModalOpen} footer={null} onCancel={handleCancel}>
         <PHForm onSubmit={handleSubmit}>
            <PHSelect mode="multiple"
            options={facultyOptions} name="faculties" label="Faculty">
            </PHSelect>
            <Button htmlType="submit">Submit</Button>
            
        </PHForm>
        </Modal>
      </>)
}

export default Courses;
