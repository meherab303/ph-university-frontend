import { Button, Dropdown, Space, Table, TableColumnsType, TableProps, Tag } from "antd";
import { useState } from "react";
import { TQueryParams, TResponse } from "../../../types/global.type";
import { useGetAllRegisteredSemisterQuery, useUpdateSemsterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import { dropDownDataType, TSemesterRegistration, TSemesterRegistrationTableData} from "../../../types/courseManagement.type";
import moment from "moment";
import { DownOutlined} from '@ant-design/icons';
import { toast } from "sonner";




const items= [
    {
      label: 'Upcoming',
      key: 'UPCOMING',
    },
    {
      label: 'Ongoing',
      key: 'ONGOING',
    },
    {
      label: 'Ended',
      key: 'ENDED',
    },
 
  ];
  
 
const RegisteredSemester = () => {
    const [semesterId,setSemesterId]=useState('')
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {
    data: RegisteredSemesterData,
    isFetching,
    isLoading,
  } = useGetAllRegisteredSemisterQuery(params)
  const [updateSemesterRegistration]=useUpdateSemsterRegistrationMutation()
  const tableData = RegisteredSemesterData?.data?.map(
    ({ _id,academicSemester,status,startDate,endDate }) => ({
      key: _id,
      academicSemester:`${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate:moment(new Date(startDate)).format('MMMM'),
      endDate:moment(new Date(endDate)).format('MMMM')     
    })
  );
 
  const handleMenuClick=async(data:dropDownDataType) => {
   
    const updatedRegistrationData={
        semesterId:semesterId,
        data:{
            status:data?.key 
        }
    }
    const toastId = toast.loading("Loading...");
    try{
        const res =await  updateSemesterRegistration(
            updatedRegistrationData
          )as TResponse<TSemesterRegistration>
        
          if (res?.error?.data?.message) {
            toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
          } else {
            toast.success("semester Registration updated", { id: toastId, duration: 2000 });
          }


    }catch(err:any){toast.error(err.message, { id: toastId, duration: 2000 });}
    
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const columns: TableColumnsType<TSemesterRegistrationTableData> = [
    {
      title: "Academic Semester",
      dataIndex:"academicSemester",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Status",
      dataIndex:"status",
      filters: [
        {
          text: "Upcoming",
          value: "UPCOMING",
        },
        {
          text: "Ongoing",
          value: "ONGOING",
        },
        {
          text: "Ended",
          value: "ENDED",
        },
        
      ],
      render:(item)=>{
        let color;
        if(item==='UPCOMING'){
          color='blue'
        }
        if(item==='ONGOING'){
          color='green'
        }
        if(item==='ENDED'){
          color='red'
        }
        
        return <Tag color={color}>{item}</Tag>
      }
    },
    {
      title: "Start Date",
      dataIndex:"startDate",
    },
    {
      title: "End Date",
      dataIndex:"endDate",
    },
    {
      title: "Action",
      render: (item) => {
        return (
            <Dropdown menu={menuProps}  trigger={['click']}>
            <Button onClick={()=>setSemesterId(item.key)}>
              <Space>
                Button
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const onChange: TableProps<TSemesterRegistrationTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log(filters, extra);
    const queryParams: TQueryParams[] = [];
    if (extra.action === "filter") {
      filters.status?.forEach((item) =>
        queryParams.push({ name: "status", value: item })
      );
    }
    setParams(queryParams);
  };
  if (isLoading) {
    return <p>loading..</p>;
  }
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemester;
