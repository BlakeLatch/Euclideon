var Models = require('../Models/Contents');
var DroneModels = require('../Models/droneSchema');
// var AddContent = function (objToAdd) {
//     console.log(Models)
//     // new Models.contents(objToAdd).save()
//     new Models.contents(objToAdd).save()
// };

//Insert one Content
var AddContent = function (docs, callback) {
    new Models.contents(docs).save(callback);
};

var AddDroneContent = function (docs, callBack) {
    const model = new DroneModels.contents(docs);
    model.save(callBack);
};

//Insert multiple Content
var AddManyContents = async function (docs, callback) {
    console.log(docs)
    await Models.contents.insertMany(docs, {ordered: true}, callback);
};

//Find a Content
var getContents = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.contents.find(criteria, projection, options, callback);
};

//Find a Content
var getDroneContent = function (criteria, projection, options, callback) {
    options.lean = true;
    DroneModels.contents.find(criteria, projection, options, callback);
};

//Edit a Content
var editContents = function(criteria, newData, options, callback){
    options.lean = true;
    Models.contents.findOneAndUpdate(criteria, newData, options, callback)
}

//Delete a Content
var deleteContent = function (criteria, callback) {
    Models.contents.findOneAndRemove(criteria, callback);
};

module.exports = {
    insertContent : AddContent,
    addManyContents : AddManyContents,
    addDroneContent : AddDroneContent,
    getDroneContent : getDroneContent,
    getContents : getContents,
    editContents : editContents,
    deleteContent : deleteContent,
}
