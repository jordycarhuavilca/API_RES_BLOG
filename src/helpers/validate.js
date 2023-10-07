const validator = require("validator");
const validateArticle = ( tittle, description,iduser) => {
  console.log(`${tittle}-${description}-${iduser}`)
  const lengthOkay = validator.isLength(tittle, { min: 5, max: undefined });
  const isEmptyDesc = validator.isEmpty(description);
  const isEmptyIdUser = validator.isEmpty(iduser)

  if(!lengthOkay || isEmptyDesc || isEmptyIdUser) throw new Error('No se ha validado la informacion !!')
  
};

module.exports = {
  validateArticle,
};
