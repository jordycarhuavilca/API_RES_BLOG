
class courseDetailsRepos{
    constructor(courseDetails){
        this.courseDetails = courseDetails
    }
    async addCourseDetails(courseDetails){
        return await this.courseDetails.create(courseDetails)
    }
    async getCourseDetails(courseId){
         return await this.courseDetails.findAll({
             where : {
                courseId : courseId
             }
         })
     }
    async updateCourseDetails(updatedCourse,courseId){
        return await this.courseDetails.update(updatedCourse,{
            where : {
                courseId : courseId
            },
            attributes : { exclude:['courseId']}
        })
    }
}
module.exports = {courseDetailsRepos}