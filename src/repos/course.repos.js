const { courseState } = require("../utils/states");
const courseDetails = require("../database/models/courseDetails");
const user = require("../database/models/user");
const userCourse = require("../database/models/userCourse");
const { Op } = require("sequelize");
const comment = require('../database/models/comments')
const courseTopic = require('../database/models/courseTopic')
const topic = require('../database/models/topic')
const subCategory_topic = require('../database/models/subCategory_topic')
const subCategory = require('../database/models/subCategory')
const category = require('../database/models/category')
class courseRepos {
  constructor(course) {
    this.course = course;
  }
  async addCourse(course) {
    return await this.course.create(course);
  }
  async getCourse(courseId) {
    let condicion = {};
    if (courseId) condicion.courseId = courseId;
    return await this.course.findAll({
      where: condicion,
      attributes: { exclude: ["deletedAt", "createdAt","userId"] },
      include: [
        {
          model: courseDetails,
          attributes: { exclude: ["courseId"] },
        },
        {
          model: comment,
        },
        {
          model: user,
          attributes: ['userId','image','nameUser', 'family_name'],
        },
      ],
    });
  }
  async getCoursesByTopic(topicName){
    return await this.course.findAll({
      where : {
        '$courseTopics.topic.description$' : topicName
      },
      include :[
        {
          model: user,
          attributes: ['userId','image','nameUser', 'family_name'],
        },
        {
        model :courseTopic,
        attributes: { exclude: ['courseTopicId','courseId', 'topicId'] },
        include : {
          model : topic,
          attributes: { exclude: ['topicId', 'description'] },
        }
      }]
    })
  }
  async updateCourse(updatedCourse, courseId) {
    return await this.course.update(updatedCourse, {
      where: {
        courseId: courseId,
      },
    });
  }
  async getTotalStudents() {
    const total = await this.course.findAll({
      include: {
        model: userCourse,
        
      },
    });
    return total.length;
  }

  async updateCourseImage(image, courseId) {
    return await this.course.update(image, {
      where: {
        courseId: courseId,
      },
    });
  }
  async deleteCourse(courseId) {
    const currentDate = new Date();
    return await this.course.update(
      { deletedAt: currentDate, state: courseState[3] },
      {
        where: {
          courseId: courseId,
        },
      }
    );
  }

  async listCategoryAndSubs(){
   return await category.findAll({
    include : {
      model : subCategory,
      include : {
        model : subCategory_topic,
        attributes: { exclude: ['topicId','subCategoryId'] },
        include : {
          model : topic
        }
      }
    }
   })
  }
  
  async getCategoryAndSubs(categoryValue,subCategoryValue){
    let condition = {
      '$courseTopics.topic.subCategory_topics.subCategory.category.description$' : categoryValue
    }

    if (subCategoryValue) {
      const condi = {
        [Op.and] : [
          {'$courseTopics.topic.subCategory_topics.subCategory.category.description$' : categoryValue},
          {'$courseTopics.topic.subCategory_topics.subCategory.description$' : subCategoryValue}
        ]
      }
      condition = {...condi}
    }

    
    return await this.course.findAll({
      where: condition,
      attributes: { exclude: 'userId' },
      include: [
        {
          model: user,
          attributes: ['userId','image','nameUser', 'family_name'],
        },
        {
          model: courseTopic,
          attributes: { exclude: ['courseTopicId','courseId', 'topicId'] },
          include: {
            model: topic,
            attributes: { exclude: ['topicId', 'description'] },
            include : {
              model : subCategory_topic,
              attributes: { exclude: ['subCategory_topicId','topicId','subCategoryId'] },
              include : {
                model : subCategory,
                attributes: { exclude: ['categoryId','description','subCategoryId'] },
                include : {
                  model : category,
                  attributes: { exclude: ['categoryId', 'description'] },
                }
              }
            }
          },
        },
      ],
    });
  }

  async buscarCurso(courseName) {
    return await this.course.findAll({
      where: {
        [Op.or]: [
          {
            tittle: { [Op.like]: `%${courseName}%` },
          },
          {
            description: { [Op.like]: `%${courseName}%` },
          },
          {
            '$courseTopics.topic.description$': { [Op.like]: `%${courseName}%` },
          },
          {
            '$courseTopics.topic.subCategory_topics.subCategory.description$': { [Op.like]: `%${courseName}%` },
          },
          {
            '$courseTopics.topic.subCategory_topics.subCategory.category.description$': { [Op.like]: `%${courseName}%` },
          },
        ],
      },
      attributes: { exclude: 'userId' },
      include: [
        {
          model: user,
          attributes: ['userId','image','nameUser', 'family_name'],
        },
        {
          model: courseTopic,
          attributes: { exclude: ['courseTopicId','courseId', 'topicId'] },
          include: {
            model: topic,
            attributes: { exclude: ['topicId', 'description'] },
            include : {
              model : subCategory_topic,
              attributes: { exclude: ['subCategory_topicId','topicId','subCategoryId'] },
              include : {
                model : subCategory,
                attributes: { exclude: ['categoryId','description','subCategoryId'] },
                include : {
                  model : category,
                  attributes: { exclude: ['categoryId', 'description'] },
                }
              }
            }
          },
        },
      ],
    });
  }
}

module.exports = { courseRepos };
