export type TMyOffereCourse ={
    _id: string
    semesterRegistration: string
    academicSemester: string
    academicFaculty: string
    academicDepartment: string
    course:TCourse
    faculty: string
    maxCapacity: number
    section: number
    days: string[]
    startTime: string
    endTime: string
    createdAt: string
    updatedAt: string
    __v: number
    enrolledCourse: any[]
    isAlreadyEnrolled: boolean
    completedCourses: any[]
    completedCourseIds: any[]
    isPreRequisitesFulFilled: boolean
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