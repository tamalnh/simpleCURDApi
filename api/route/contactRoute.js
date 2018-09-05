const express = require('express')
const route = express.Router();

const contactController = require('./../controller/contactController')

route.get('/', contactController.getAllContacts)

route.post('/', contactController.createNewContacts)

route.get('/:id', contactController.getSingleContact)

route.patch('/:id', contactController.updateContact)

route.delete('/:id', contactController.deleteContact)

module.exports = route;