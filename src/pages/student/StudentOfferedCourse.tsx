
import { Button, Card, Col, Row } from "antd";
import { useEnrollCourseMutation, useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourse.api";
import { toast } from "sonner";
type TCourse={
  [index:string]:any
}
const gridStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  
};
const gridStyle2: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
  display:'flex',
 alignItems:'center',
 justifyItems:"center"

};
const gridStyle3: React.CSSProperties = {
  width: '12.5%',
  textAlign: 'center',
  display:'flex',
 alignItems:'center',
 justifyItems:"center"
 
};

const StudentOfferedCourse = () => {
  const {data:offerCourseData}=useGetAllOfferedCoursesQuery(undefined)
  const [createEnrollCourse]=useEnrollCourseMutation()
  const modifiedObject=offerCourseData?.data?.reduce((acc:TCourse,item)=>{
    const key=item.course.title
    acc[key]=acc[key] || {courseTitle:key,sections:[]}
    acc[key].sections.push({section:item.section,_id:item._id,startTime:item.startTime,endTime:item.endTime,days:item.days})
    return acc
  },{})
  const finalResult=(Object.values(modifiedObject?modifiedObject:{}))
 const handleSubmit=async(id:string)=>{
const enrolldata={
    offeredCourse:id
  }

 const toastId= toast.loading('course enrolling')
await createEnrollCourse(enrolldata)
toast.success('course enrolled',{id:toastId,duration:4000})
 }
  return finalResult?.map((item,index)=>{
    return <>
    <Card key={index} style={{textAlign:'center'}} title={item.courseTitle}>
    <Card.Grid style={gridStyle}>{item.sections.map((item)=>{
      return <>
     <Row key={item._id}>
     <Card.Grid style={gridStyle2}> <Col>section: {item.section}</Col></Card.Grid>
     <Card.Grid style={gridStyle2}> <Col>StartTime: {item.startTime}</Col></Card.Grid>
     <Card.Grid style={gridStyle2}> <Col>EndTime: {item.endTime}</Col></Card.Grid>
     <Card.Grid style={gridStyle3}> <Col>{item?.days.map((item:string,idx:number)=>{
    return(<>
    <Row key={idx}>
    {
      item
      } 
    </Row></>)
     })}</Col></Card.Grid>
     
     <Card.Grid onClick={()=>handleSubmit(item._id)}  style={gridStyle3}> <Button>Enroll</Button></Card.Grid>
     </Row>
     
      </>
    })}</Card.Grid>
  </Card></>
  })
};

export default StudentOfferedCourse;


// [{course:{title:mpc},section:1},{course:{title:mpc},section:2}]
// [

// {courseTitle:mpc,sections:[{section:1,_id:'dsbehb'},{section:2,_id:'dsbehbvv'}]}
// 



// ]