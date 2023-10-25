const {courseState} = require('../utils/states')
const courseDetails = require('../database/models/courseDetails')
const userCourse = require('../database/models/userCourse')


class courseRepos{
    constructor(course){
        this.course=course
    }
    async addCourse(course){
       return await this.course.create(course)
    }
    async getAllCourses(){
        const data =  await this.course.findAll({
            include : {
                model : courseDetails,
                attributes :{ exclude : ['courseId']}
            }
       })
       return data
    }
    async getCourse(courseId){
        return await this.course.findAll({
            where : {
                courseId : courseId
            },
            attributes :{exclude : ['deletedAt','createdAt']},
            include : {
                model : courseDetails,
                attributes :{ exclude : ['courseId']}
            }
        })
    }
    async updateCourse(updatedCourse,courseId){
        return await this.course.update(updatedCourse,{
            where : {
                courseId : courseId
            }
        })
    }
    async getTotalStudents(){
        const total = await this.course.findAll({
            include: {
                model : userCourse,
            }
        })
        console.log('lenght ' + total.length)
        return total.length
    }
   
    async updateCourseImage(image,courseId){
        return await this.course.update(image,{
            where : {
                courseId : courseId
            }
        })
    }
    async deleteCourse(courseId){
        const currentDate = new Date()
        return await this.course.update({deletedAt : currentDate, state : courseState[3]},{
            where : {
                courseId : courseId
            }
        })
    }
}

module.exports = {courseRepos}