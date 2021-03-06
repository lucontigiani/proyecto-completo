const db = require('../src/database/models');
const { Op } = require("sequelize");
const sequelize = db.sequelize;
const {Image} = require('../src/database/models');

const imagesController = {

    // Función para crear en masa
    bulkCreate: async (id, images) => {
    try{
        // Agrego a cada una de las imagenes el ID de producto.
        images.forEach(image => image.productId = id);
    
        // Rafaga de Creates.
        return await Image.bulkCreate(images);
    } catch (error) {
        res.send(error)
    }
    },

    detail: async (productId) => {
        try{
        let imagenes = await Image.findAll(
            {
                where: {productId: productId}
            },
            {
                order: [['id', 'ASC']]
            }
            );

        return imagenes;
    } catch (error) {
        res.send(error)
    }
    },
    update: async (imageId, imageName) => {
        try{
        let image = await Image.update({
            name: imageName
            },{
            where: {id: imageId}
        });

        return image;
    } catch (error) {
        res.send(error)
    }
    },


    bulkEdit: async (productId, images) => {
        try{
            let imagesCh=[];
            let numImg = 0;
            let imagesOld = await imagesController.detail(productId);
    
            images.forEach(image => {
                numImg = image.image_num - 1;
                imagesCh.push(imagesController.update(imagesOld[numImg].id, image.name));
            });
    
            return imagesCh;
        } catch (error) {
            res.send(error)
        }
    }
};


module.exports = imagesController;