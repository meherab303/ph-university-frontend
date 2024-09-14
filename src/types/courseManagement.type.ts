import { TAcademicSemester } from "./academicManagement.type";
import { SyntheticEvent } from 'react';
export type TSemesterRegistration = {
    academicSemester: TAcademicSemester;
    status: "UPCOMING" | "ONGOING" | "ENDED";
    startDate: Date;
    endDate: Date;
    updatedAt: string;
    createdAt: string;
    minCredit: number;
    maxCredit: number;
    _id:string;
  };
  export type TSemesterRegistrationTableData={
    status:string;
    startDate:string;
    endDate:string;
    academicSemester:string
}
  export type dropDownDataType={
  key: string; 
  keyPath: string[];
  domEvent: SyntheticEvent;
  item?: any;
}
export type TPreRequisiteCourse= {
  course: string
  isDeleted: boolean
  _id: string
}
export type TCourses= {
  code: number
  createdAt: string
  credits: number
  isDeleted: boolean
  preRequisiteCourses: TPreRequisiteCourse[]
  prefix: string
  title: string
  updatedAt: string
  __v: number
  _id: string
}



export type TCourseTableData={
  key:string;
  title:string;
  code:number;
  credits:number
  prefix:string
}
  
