import { Button, Table, TableColumnsType } from "antd";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFacultyTableData } from "../../../types/academicManagement.type";

const AcademicFaculty = () => {
  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetAllFacultyQuery(undefined);
  const tableData = facultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));
  const columns: TableColumnsType<TAcademicFacultyTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },

    {
      title: "Action",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
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

export default AcademicFaculty;
