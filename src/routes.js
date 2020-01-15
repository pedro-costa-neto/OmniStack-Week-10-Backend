const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros
// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção) 
// Body: request.body (Dados para criação ou alteração de um registro)

// Index: Mostrar uma lista 
// Show: Mostrar um unico registro
// Store: Criar registro
// Update: Atualizar registro
// Destroy: Excluir registro

routes.post('/devs', DevController.store)
routes.get('/devs', DevController.index)
routes.put('/devs/:id', DevController.update)
routes.delete('/devs/:id', DevController.destroy)

routes.get('/search', SearchController.index)



module.exports = routes