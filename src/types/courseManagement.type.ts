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
  
