const validator = require("validator");

const validate = {
    isEmpty: (value)=>{

        if(Array.isArray(value)){
            value.length > 0?false:true
        }

        if (typeof value == "object") {
            return Object.keys(value).length > 0? false : true
        }
        return validator.isEmpty(value)
    },
    isEqual : (list,value,name)=>{
        for (let i = 0; i < list.length; i++) {
            if (list[i][name] == value) {
                return true
            }
        }
        return false
    }
}

module.exports = validate 


