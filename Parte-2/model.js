let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

/* Tu código va aquí */
let Schema = mongoose.Schema({
    id : {type : uuid, required : true},
    title : {type : String},
    description : {type : String},
    url : {type : String}
});

let  = mongoose.model('bookmarks', Schema);

let modelMethods = {
    get : function(id, jsonBody){
        return bookmarks.updateOne(id, jsonBody) 
                .then( response => {
                        return response;
                })
                .catch( error => {
                        throw Error( error );
                });
        }
}

module.exports = { modelMethods };