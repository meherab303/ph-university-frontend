import { Card, Col, Row } from "antd";
import { useGetMyEnrolledCourseQuery } from "../../redux/features/student/studentCourse.api";
import { TMyEnrolledCourse } from "../../types/MyEnrolledCourse.type";

  const gridStyle1: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
    display:'flex',
   alignItems:'center',
   justifyItems:"center"
  
  };
  const gridStyle2: React.CSSProperties = {
    width: '12.5%',
    textAlign: 'center',
    display:'flex',
   alignItems:'center',
   justifyItems:"center"
   
  };
const MyEnrolledCourse = () => {
    const {data:enrollCourseData}=useGetMyEnrolledCourseQuery(undefined)
    console.log(enrollCourseData)
    return enrollCourseData?.data?.map((item:TMyEnrolledCourse,index:number)=>{
        return <>
        <Card key={index} style={{textAlign:'center'}} title={item.course.title}>
        <Card.Grid style={gridStyle1}> <Col>Section: {item.offeredCourse.section}</Col></Card.Grid>
        <Card.Grid style={gridStyle1}> <Col>StartTime: {item.offeredCourse.startTime}</Col></Card.Grid>
        <Card.Grid style={gridStyle2}> <Col>EndTime: {item.offeredCourse.endTime}</Col></Card.Grid>
        <Card.Grid style={gridStyle2}> <Col>Credits: {item.course.credits}</Col></Card.Grid>
        <Card.Grid style={gridStyle2}> <Col>Faculty: {item.faculty.fullName}</Col></Card.Grid>
         <Card.Grid style={gridStyle2}> <Col>{item?.offeredCourse?.days.map((item:string,idx:number)=>{
        return(<>
        <Row key={idx}>
        {
          item
          } 
        </Row></>)
         })}</Col></Card.Grid>
      </Card></>
      })
};

export default MyEnrolledCourse;