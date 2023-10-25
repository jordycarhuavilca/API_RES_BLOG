
class userRespos{
    constructor(userCourse){
        this.userCourse = userCourse
    }
    async addUserCourse(userCourse,transaction){
        return await this.userCourse.create(userCourse,{transaction : transaction})
       
    }
}

module.exports = {userRespos}