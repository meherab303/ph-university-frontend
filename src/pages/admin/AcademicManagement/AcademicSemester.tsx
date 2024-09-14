import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemesterTableData } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParams } from "../../../types/global.type";

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {
    data: semesterData,
    isFetching,
    isLoading,
  } = useGetAllSemesterQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, name, year, code, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      code,
      startMonth,
      endMonth,
    })
  );

  const columns: TableColumnsType<TAcademicSemesterTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "summer",
          value: "summer",
        },
        {
          text: "autumn",
          value: "autumn",
        },
        {
          text: "fall",
          value: "fall",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
        {
          text: "2028",
          value: "2028",
        },
      ],
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
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

  const onChange: TableProps<TAcademicSemesterTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log(filters, extra);
    const queryParams: TQueryParams[] = [];
    if (extra.action === "filter") {
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
    }

    if (extra.action === "filter") {
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
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

export default AcademicSemester;
