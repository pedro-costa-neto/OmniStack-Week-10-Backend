const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response){
        // Buscar todos os devs num raio de 10km
        // Filtro por tecnologia
        const { latitude, longitude, techs } = request.query
        const techsArray = parseStringAsArray(techs)
        const dev = await Dev.find({
            techs:{
                $in: techsArray,
            },
        })

        return response.json({devs:[]})
    }
}