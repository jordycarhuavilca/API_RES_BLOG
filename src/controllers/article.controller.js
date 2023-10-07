// const modelArticle = require("../models/Articulo.js");
const article = require("../models/Article.js");
const user = require("../models/User.js");
const helper = require("../helpers/validate.js");
const crearArticle = async (req, res) => {
  const body = req.body;
  console.log(body)
  try {
    if(!body)  return res.status(400).json({ message: 'complete all your data' });

    helper.validateArticle(...Object.values(body));
    console.log('validating ...')
    const newArticle =  article.build(body);
    const done = await newArticle.save()
    console.log('validated c:')
    return res.status(200).json({ done });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const listArticle = async (req, res) => {
  const consulta = await article.findAll();
  console.log(consulta)
  if (!consulta)
    return res.status(404).json({
      status: "error",
      mensaje: "no se han encontrado articulos!!",
    });
  return res.status(200).send({
    status: "success",
    consulta,
  });
};

const getArticle = async (req, res) => {
  const numArticle = req.params.idArticle;
  console.log(numArticle);
  try {
    if (!numArticle)return res.status(404).json({ message: "it cannot find article" });
      const articulo = await article.findByPk(numArticle);
      return res.status(200).send(articulo);
    
  } catch (err) {
    return res.status(404).json({ message: "it cannot find article" });
  }
};

const deleteArticle = async (req, res) => {
  const numArticle = req.params.idArticle;

  try {
    const isDeleted = await article.destroy({
      where: {
        numArticle: numArticle,
      },
    });
    console.log('deleted cod ' + isDeleted)
    if (isDeleted) return res.sendStatus(200).send(isDeleted);
    res.sendStatus(404)
    return res.json({ message: "error at moment to delete it" });
  } catch (err) {
    return res.sendStatus(500).json({ message: "error at moment to delete it" });
  }
};

const updateArticle = async (req, res) => {
  const numArticle = req.params.idArticle;
  try {
    helper.validateArticle(...Object.values(req.body));
    const updateArticle = await article.update(req.body, {
      where: {
        numArticle: numArticle,
      },
    });
    return res.sendStatus(200).send(updateArticle);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error at moment to update it" });
  }
};
const uploadImg = async (req, res) => {
  const numArticle = req.params.idArticle;
  try {
    const updated = await article.update(
      { image: req.nameImg },
      {
        where: {
          numArticle: numArticle,
        },
      }
    );

    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(404).json({ message: "not found" });
  }
};
module.exports = {
  listArticle,
  crearArticle,
  getArticle,
  deleteArticle,
  updateArticle,
  uploadImg,
};
