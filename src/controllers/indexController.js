const anuncioService = require('../model/service/anuncioService')

const indexController = {
    index: (req,res) =>{
        let anuncios = anuncioService.getAll();
        res.render('index',{'anuncios': anuncios})
    }
}
module.exports = indexController;