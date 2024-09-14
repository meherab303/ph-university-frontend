import { useState } from "react";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TAcademicDepartmentTableData } from "../../../types/academicManagement.type";
import { TQueryParams } from "../../../types/global.type";

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {
    data: departmentData,
    isFetching,
    isLoading,
  } = useGetAllDepartmentQuery(params);

  const tableData = departmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );

  const columns: TableColumnsType<TAcademicDepartmentTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "AcademicFaculty",
      dataIndex: "academicFaculty",
      filters: [
        { text: "Faculty of Arts", value: "66dd6c8cdf792cd6206c0b28" },
        {
          text: "Faculty of Social Sciences",
          value: "66dd4467df792cd6206c0a75",
        },
        { text: "Faculty of Law", value: "66dd43b0df792cd6206c0a70" },
        { text: "Faculty of Fine Arts", value: "66ddb519df792cd6206c0b4f" },
        {
          text: "Faculty of Business Studies",
          value: "66dd448adf792cd6206c0a7a",
        },
        { text: "Faculty of Science", value: "66dd6958df792cd6206c0aa3" },
        { text: "Faculty of Pharmacy", value: "66dd6995df792cd6206c0aaa" },
        {
          text: "Faculty of Earth and Environmental Sciences",
          value: "66ddb528df792cd6206c0b5d",
        },
        {
          text: "Faculty of Engineering and Technology",
          value: "66ddb52cdf792cd6206c0b61",
        },
        { text: "Faculty of Education", value: "66dd4497df792cd6206c0a7e " },
        { text: "Faculty of Medicine", value: "66ddb534df792cd6206c0b68" },
        {
          text: "Faculty of Postgraduate Medical Sciences and Research",
          value: "66dd6baddf792cd6206c0aec",
        },
      ],
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

  const onChange: TableProps<TAcademicDepartmentTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    const queryParams: TQueryParams[] = [];
    if (extra.action === "filter") {
      filters.academicFaculty?.forEach((item) =>
        queryParams.push({ name: "academicFaculty", value: item })
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

export default AcademicDepartment;
