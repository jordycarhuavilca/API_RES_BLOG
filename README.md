# API_RES_BLOG
API RES con Node-Express-Sequelize-Mysql
method  endPoints
get     /comment/:courseId/list-comments
post    /comment/:courseId/create-comment
put     /comment/:commentId/update-comment


post    /course/create-course
post    /course/edit-photo/:courseId
get     /course/list-courses
get     /course/:courseId
delete  /course/:courseId
put     /course/:courseId

post    /payment/checkout/express/course/:courseId

post    /user/create-user
post    /user/edit-photo/:userId
get     /user/:userId
get     /user/:userId/my-courses
get     /user/:userId/list-courses
delete  /user/:userId
put     /user/:userId
