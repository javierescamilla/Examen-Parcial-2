let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );

let app = express();

let server;

/* Tu código va aquí */
app.put('/api/bookmarks/:id', jsonParser, (req, res, next) => {
	let bodyID = req.body.id;
	let bodyTitle = req.body.title;
	let bodyDescription = req.body.description;
	let bodyURL = req.body.url;
    if(!bodyID) {
        res.statusMessage = "Missing id";
        return res.status(406).json({
        	"error" : "Missing id",
            "status" : 406
       });
	}
	if(bodyID != paramId){
        res.statusMessage = "Missmatching IDs";
        return res.status(406).json({
           "error" : "Missmatching IDs",
           "status" : 409
       });		
	}
	if(!bodyTitle & !bodyDescription & !bodyURL){
		res.statusMessage = "Missing field to update";
		return res.status(406).json({
			"error" : "Missing field to update",
			"status" : 406
		})
	}
    modelMethods.put({ id : filterID }, req.body)
       .then(bookmark => {
           res.status(202).json(bookmark);
       })
       .catch(err => {
           res.statusMessage = "Missing field in body";
           return res.status(500).json({
               "error" : "Something went wrong",
               "status" : 500
           });
       });
});


function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}