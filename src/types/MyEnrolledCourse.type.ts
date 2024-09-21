export type TMyEnrolledCourse= {
    _id: string
    semesterRegistration: TSemesterRegistration
    academicSemester: TAcademicSemester
    academicFaculty: TAcademicFaculty
    academicDepartment: string
    offeredCourse: TOfferedCourse
    course: TCourse
    student: string
    faculty: TFaculty
    isEnrolled: boolean
    courseMarks: TCourseMarks
    grade: string
    gradePoints: number
    isCompleted: boolean
  }
  
  export type TSemesterRegistration= {
    _id: string
    academicSemester: string
    status: string
    startDate: string
    endDate: string
    minCredit: number
    maxCredit: number
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export type TAcademicSemester= {
    _id: string
    name: string
    year: string
    code: string
    startMonth: string
    endMonth: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export type TAcademicFaculty= {
    _id: string
    name: string
    __v: number
  }
  
  export type TOfferedCourse= {
    _id: string
    semesterRegistration: string
    academicSemester: string
    academicFaculty: string
    academicDepartment: string
    course: string
    faculty: string
    maxCapacity: number
    section: number
    days: string[]
    startTime: string
    endTime: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export type TCourse= {
    _id: string
    title: string
    prefix: string
    code: number
    credits: number
    preRequisiteCourses: any[]
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export type TFaculty= {
    _id: string
    id: string
    user: string
    designation: string
    name: TName
    gender: string
    dateOfBirth: string
    email: string
    contactNo: string
    emergencyContactNo: string
    bloodGroup: string
    presentAddress: string
    permanentAddress: string
    profileImg: string
    academicDepartment: string
    academicFaculty: string
    isDeleted: boolean
    __v: number
    fullName: string
  }
  
  export type TName= {
    firstName: string
    middleName: string
    lastName: string
    _id: string
  }
  
  export type TCourseMarks= {
    classTest1: number
    midTerm: number
    classTest2: number
    finalTerm: number
  }