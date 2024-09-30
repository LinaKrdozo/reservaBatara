const anuncioService = require('../model/service/anuncioService');
const juntaService =require('../model/service/juntaService')

const indexController = {
    index: (req,res) =>{
        let anuncios = anuncioService.getAll();
        let junta = juntaService.getAll()
        res.render('index',{'anuncios': anuncios, 'junta': junta})
    }
    
}
module.exports = indexController;