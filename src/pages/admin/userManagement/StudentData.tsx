import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import { useState } from "react";
import { TQueryParams } from "../../../types/global.type";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudentTableData } from "../../../types/userManagement.type";
import { Link } from "react-router-dom";

const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: studentData,
    isFetching,
    isLoading,
  } = useGetAllStudentQuery([
    { name: "limit", value: "10" },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, email, emergencyContactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      emergencyContactNo,
    })
  );

  const columns: TableColumnsType<TStudentTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "RollNo",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      dataIndex: "emergencyContactNo",
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  if (isLoading) {
    return <p>loading..</p>;
  }
  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        align="center"
        style={{ marginTop: "10px" }}
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.totalDocuments}
      />
    </>
  );
};

export default StudentData;
