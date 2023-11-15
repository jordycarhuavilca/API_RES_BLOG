function sendResponse({ statusCode, message }, data) {
    const response = {};
    if(data) response.data = data;
    else response.data = {}
    response.message = message;
    response.statusCode = statusCode;
    return response;
}
function response(response,res){
    const length = Object.values(response).length
    if(length > 2){
        const {message,statusCode,data} = response
        return res.status(statusCode).json({message,data})
    }else{
        const {message,statusCode} = response
        return res.status(statusCode).json({message : message,data:{}})
    }

}
module.exports = {sendResponse,response}