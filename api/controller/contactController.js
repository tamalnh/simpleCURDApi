const Contact = require('./../model/contactModel');



const getAllContacts = (req, res, next) => {
    Contact.find()
            .then(result => {
                res.status(200).json({
                    message: `${result.length} contact found`,
                    contacts: result
                })
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: "Error Occurred"
                })
            })
            
}

const createNewContacts = (req, res, next) => {
    let contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })

    contact.save()
            .then(result => {
                if(result){
                    res.status(200).json({
                        message: "Contact created",
                        contact: result
                    })
                }else{
                    res.status(500).json({
                        message: "Contact creation failed!", 
                    })
                }
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: "Error Occurred"
                })
            })
}

const getSingleContact = (req, res, next) => {
    const id = req.params.id;

    Contact.findById(id)
            .then(result => {
                res.status(200).json({
                    message: "Contact found",
                    contact: result
                })
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: "Error Occurred"
                })
            })
}

const updateContact = (req, res, next) => {
    let id = req.params.id;

    Contact.findByIdAndUpdate(id, {$set: req.body})
            .then(result => {
                if(result) {
                    res.status(200).json({
                        message: "contact updated successfully!",
                        contact: result
                    })
                }else{
                    res.status(500).json({
                        error: "Error Occurred"
                    })
                }
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: "Error Occurred"
                })
            })
}

const deleteContact = (req, res, next) => {
     const id = req.params.id;

     Contact.findByIdAndRemove(id)
            .then(result => {
                if(result) {
                    res.status(200).json({
                        message: "Contact deleted successfully",
                        deletedContact: result
                    })
                }else{
                    res.status(500).json({
                        error: "Error Occurred"
                    })
                }
            }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: "Error Occurred"
                })
            })
}

module.exports = {
    getAllContacts,
    createNewContacts, 
    getSingleContact, 
    updateContact, 
    deleteContact
}