import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHFormInput from "../../../components/form/PHFormInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { genderOptions } from "../../../constants/global.gender";
import { bloodGroupOptions } from "../../../constants/global.bloodgroup";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAllDepartmentQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { TStudent } from "../../../types/userManagement.type";

const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "Meherab",
      middleName: "hossain",
      lastName: "nahin",
    },
    gender: "male",
    dateOfBirth: "2000-01-01",
    bloodGroup: "O+",

    email: "student4.doe@example.com",
    emergencyContactNo: "+1234567890",
    presentAddress: "123 Main St, Cityville, State, Country",
    permanentAddress: "456 Secondary St, Cityville, State, Country",

    guardian: {
      fatherName: "Robert Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "+0987654321",
      motherName: "Jane Doe",
      motherOccupation: "Teacher",
      motherContactNo: "+1234509876",
    },

    localGuardian: {
      name: "Uncle Sam",
      occupation: "Doctor",
      contactNo: "+1122334455",
      address: "789 Tertiary St, Cityville, State, Country",
    },
    admissionSemester: "66b461ab354021cd927918a4",
    academicDepartMent: "66b4607c354021cd927918a1",
  },
};
// only for development
const studentDefaultValues = {
  name: {
    firstName: "Meherab",
    middleName: "hossain",
    lastName: "nahin",
  },
  gender: "male",
  bloodGroup: "O+",

  email: "student4.doe@example.com",
  emergencyContactNo: "+1234567890",
  presentAddress: "123 Main St, Cityville, State, Country",
  permanentAddress: "456 Secondary St, Cityville, State, Country",

  guardian: {
    fatherName: "Robert Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "+0987654321",
    motherName: "Jane Doe",
    motherOccupation: "Teacher",
    motherContactNo: "+1234509876",
  },

  localGuardian: {
    name: "Uncle Sam",
    occupation: "Doctor",
    contactNo: "+1122334455",
    address: "789 Tertiary St, Cityville, State, Country",
  },
  admissionSemester: "66b461ab354021cd927918a4",
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();
  console.log(data, error);
  const { data: semesterData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined);
  const { data: departmentData, isLoading: dIsLoading } =
    useGetAllDepartmentQuery(undefined);

  const semesterDataOptions = semesterData?.data?.map((semester) => ({
    value: semester._id,
    label: `${semester.name} ${semester.year}`,
  }));
  const departmentDataOptions = departmentData?.data?.map((department) => ({
    value: department._id,
    label: department.name,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("loading", { duration: 2000 });
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.profileImage);
    try {
      const res = (await addStudent(formData)) as TResponse<TStudent>;
      console.log(res, "res");
      if (res?.error?.data?.message)
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      else {
        toast.success("student created", { id: toastId, duration: 2000 });
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="name.firstName"
                label="First Name"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="name.middleName"
                label="Middle Name"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="name.lastName"
                label="Last Name"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={genderOptions}
                name="gender"
                label="Gender"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker
                name="dateOfBirth"
                label=" Date of birth"
              ></PHDatePicker>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="BloodGroup"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImage"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="ProfileImage">
                    <Input
                      {...field}
                      value={value?.filename}
                      type="file"
                      onChange={(e) => onChange(e.target?.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="email"
                name="email"
                label="Email"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="emergencyContactNo"
                label="Emergency ContactNo"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="presentAddress"
                label="PresentAddress"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="permanentAddress"
                label="PermanentAddress"
              ></PHFormInput>
            </Col>
          </Row>
          <Divider>Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="guardian.fatherName"
                label="FatherName"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="guardian.fatherOccupation"
                label="FatherOccupation"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="guardian.fatherContactNo"
                label="FatherContactNo"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="guardian.motherName"
                label="MotherName"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="guardian.motherOccupation"
                label="MotherOccupation"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="guardian.motherContactNo"
                label="MotherContactNo"
              ></PHFormInput>
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="localGuardian.name"
                label="Name"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="localGuardian.contactNo"
                label="ContactNo"
              ></PHFormInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHFormInput
                type="text"
                name="localGuardian.address"
                label="Address"
              ></PHFormInput>
            </Col>
          </Row>
          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterDataOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentDataOptions}
                disabled={dIsLoading}
                name="academicDepartMent"
                label="Admission Department"
              ></PHSelect>
            </Col>
          </Row>
          <Button htmlType="submit">submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
