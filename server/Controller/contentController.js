var Service = require('../Service/contentService')
var ObjectID = require('mongodb').ObjectId

// insert One Content
var InsertContent = function (payload) {
    return new Promise((resolve, reject) => {
        console.log(payload)
        Service.insertContent(payload, function(err, data){
            if (err) {
                console.log("Error: "+ err)
                reject(err);
            } else {
                console.log("Added: "+ data );
                resolve(data)
            }
        })
    })
}

// insert Drone Content
var InsertDroneContent = function (payload) {
    return new Promise((resolve, reject) => {
        Service.addDroneContent(payload, function(err, data){
            if (err) {
                console.log("Error: "+ err)
                return reject(err);
            } else {
                console.log("Added: "+ data );
                return resolve(data);
            }
        })
    })
}

// Create an Array of Contents
var CreateContent = function (payload) {
    return new Promise((resolve, reject) => {
        Service.addManyContents(payload, function(err, data){
            if (err) return reject(err)
            return resolve(data)
        })
    })
}

// Returnn contents
var GetContent = function (criteria, projection, options) {
    return new Promise((resolve, reject) => {
        Service.getContents(criteria, projection, options, function(err, data){
            if (data < 1) return reject('Not Found');
            return resolve(data)
        })
    })
}

var getDroneContent = function (criteria, projection, options) {
    return new Promise((resolve, reject) => {
        Service.getDroneContent(criteria, projection, options, function(err, data){
            if (data < 1) return reject('Not Found');
            return resolve(data)
        })
    })
}

// Edit Contents
var EditContent = function (newData){
    var contentID = new ObjectID(newData._id)
    console.log(contentID)
    var criteria = {
        "_id": contentID,
    };
    var dataToUpdate = {
        $set: {
            type : newData.type,
            name : newData.name,
            icon : newData.icon,
            position: [
                {
                    coordinates: [newData.position[0].coordinates[0], newData.position[0].coordinates[1]],
                    height : newData.position[0].height,
                }
            ],
            imgs: [{
                imgSrc: newData.imgs[0].imgSrc,
                picSrc: newData.imgs[0].picSrc,
            }],
            link: newData.link,
            desc : newData.desc,
            show : newData.show,
        }
    }
    return new Promise((resolve, reject) => {
        console.log(criteria)
        Service.editContents(criteria, dataToUpdate, {}, function(err, data){

            if (err) {
                console.log(err)
                return reject(err);
            }
            console.log(data);
            return resolve(data);
        })
    })
}
// Delete a Content
var DeleteContent =  function (id){
    var contentID = new ObjectID(id)
    var criteria = {
        "_id": contentID,
    };
    console.log(contentID)
    return new Promise((resolve, reject) => {
        Service.deleteContent(criteria, function(err, data){
            if (err) {
                console.log(err)
                return reject(err);
            } else if (data === null || data === ""){
                return reject("No Such Document was Found")
            }
            console.log(data);
            return resolve(`${data.name} was Successfully Deleted`)

        })
    })
}

module.exports = {
    insertContent : InsertContent,
    createContent : CreateContent,
    addDroneContent: InsertDroneContent,
    getContent : GetContent,
    getDroneContent : getDroneContent,
    EditContent : EditContent,
    deleteContent : DeleteContent,
}
