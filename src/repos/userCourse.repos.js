
class userCourseRespos{
    constructor(userCourse){
        this.userCourse = userCourse
    }
    async addUserCourse(userCourse,transaction){
        return await this.userCourse.bulkCreate(userCourse,{transaction : transaction})
    }
    async getUserCourse(){
        return await this.userCourse.findAll()
    }
}

module.exports = {userCourseRespos}