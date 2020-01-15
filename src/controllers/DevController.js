const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index (request, response) {
        const dev = await Dev.find();

        return response.json(dev)
    },

    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body
    
        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    
            const { name = login, avatar_url, bio } = apiResponse.data
        
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs : techsArray,
                location,
            })
        }

        
    
        return response.json(dev)
    },

    async update(request, response){
        const { bio, techs, latitude, longitude } = request.body
        const { id } = request.params 
        const techsArray = parseStringAsArray(techs)
        const location = {
            type: "Point",
            coordinates: [longitude, latitude]
        }

        await Dev.updateOne({_id: id}, {
            bio,
            location,
            techs: techsArray,
        })

        const dev = await Dev.findOne({_id: id})

        return response.json(dev)
    },

    async destroy(request, response){
        const { id } = request.params 
        await Dev.deleteOne({ _id: id })
        let dev = await Dev.findOne({ _id: id })
        
        if(dev){
            dev = {
                "message" : "Ocorreu um erro ao exluir!"
            }
        }else{
            dev = {
                "message" : "Excluido com sucesso!"
            }
        }

        return response.json(dev)
    },
}