const {studentState} = require('../../utils/states')

class studentRepos{
    constructor(student){
        this.student = student
    }
    async addStudent(student){
        return await this.student.create(student)
    }
    async getStudent(studentId){
        return await this.student.findAll({
            where :{
                studentId : studentId
            }
        })
    }
    async getStudentCourses(studentId){
        return await this.student.findAll({
            where:{
                studentId : studentId
            },
            include:{
                model:"studentCourse"
            }
        })
    }
    async updateStudent(updateStudent,studentId){
        return await this.student.update(updateStudent,{
            where:{
                studentId : studentId 
            }
        })

    }
    async updateStudentImage(image,studentId){
        return await this.student.update(image,{
            where : {
                studentId : studentId
            }
        })
    }
    async deleteStudent(studentId){
        return await this.student.update({state:studentState[1]},{
            where : {
                studentId : studentId
            }
        })
    }
}
module.exports = {studentRepos}