const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, path.join(__dirname,'../../public/img/imgUsuarios'))
    },
    filename:(req,file,cb) =>{
        console.log(file);
        const newFileName = 'imgUsuarios-' +  Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const uploadFile = multer({ storage });

module.exports = uploadFile ;