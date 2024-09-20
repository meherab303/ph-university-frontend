
import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourse.api";

const StudentOfferedCourse = () => {
  const {data:offerCourseData}=useGetAllOfferedCoursesQuery(undefined)
  // console.log(offerCourseData)
  const modifiedData=offerCourseData?.data?.reduce((acc,item)=>{
    const key=item.course.title
    acc[key]=acc[key] || {courseTitle:key,sections:[]}
    acc[key].sections.push({section:item.section,_id:item._id,startTime:item.startTime,endTime:item.endTime})
    return acc
  },{})
  const finalResult=(Object.values(modifiedData?modifiedData:{}))
  console.log(finalResult)
  return <div>student offered course</div>;
};

export default StudentOfferedCourse;


// [{course:{title:mpc},section:1},{course:{title:mpc},section:2}]
// [

// {courseTitle:mpc,sections:[{section:1,_id:'dsbehb'},{section:2,_id:'dsbehbvv'}]}
// 



// ]