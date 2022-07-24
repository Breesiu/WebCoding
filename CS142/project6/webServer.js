/* jshint node: true */

/*
 * This builds on the webServer of previous projects in that it exports the current
 * directory via webserver listing on a hard code (see portno below) port. It also
 * establishes a connection to the MongoDB named 'cs142project6'.
 *
 * To start the webserver run the command:
 *    node webServer.js
 *
 * Note that anyone able to connect to localhost:portNo will be able to fetch any file accessible
 * to the current user in the current directory or any of its children.
 *
 * This webServer exports the following URLs:
 * /              -  Returns a text status message.  Good for testing web server running.
 * /test          - (Same as /test/info)
 * /test/info     -  Returns the SchemaInfo object from the database (JSON format).  Good
 *                   for testing database connectivity.
 * /test/counts   -  Returns the population counts of the cs142 collections in the database.
 *                   Format is a JSON object with properties being the collection name and
 *                   the values being the counts.
 *
 * The following URLs need to be changed to fetch there reply values from the database.
 * /user/list     -  Returns an array containing all the User objects from the database.
 *                   (JSON format)
 * /user/:id      -  Returns the User object with the _id of id. (JSON format).
 * /photosOfUser/:id' - Returns an array with all the photos of the User (id). Each photo
 *                      should have all the Comments on the Photo (JSON format)
 *
 */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var async = require('async');

var express = require('express');
var app = express();

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');

// XXX - Your submission should work without this line. Comment out or delete this line for tests and before submission!
// var cs142models = require('./modelData/photoApp.js').cs142models;

mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));


app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});

/*
 * Use express to handle argument passing in the URL.  This .get will cause express
 * To accept URLs with /test/<something> and return the something in request.params.p1
 * If implement the get as follows:
 * /test or /test/info - Return the SchemaInfo object of the database in JSON format. This
 *                       is good for testing connectivity with  MongoDB.
 * /test/counts - Return an object with the counts of the different collections in JSON format
 */
app.get('/test/:p1', function (request, response) {
    // Express parses the ":p1" from the URL and returns it in the request.params objects.
    console.log('/test called with param1 = ', request.params.p1);

    var param = request.params.p1 || 'info';

    if (param === 'info') {
        // Fetch the SchemaInfo. There should only one of them. The query of {} will match it.
        SchemaInfo.find({}, function (err, info) {
            if (err) {
                // Query returned an error.  We pass it back to the browser with an Internal Service
                // Error (500) error code.
                console.error('Doing /user/info error:', err);
                response.status(500).send(JSON.stringify(err));
                return;
            }
            if (info.length === 0) {
                // Query didn't return an error but didn't find the SchemaInfo object - This
                // is also an internal error return.
                response.status(500).send('Missing SchemaInfo');
                return;
            }

            // We got the object - return it in JSON format.
            console.log('SchemaInfo', info[0]);
            response.end(JSON.stringify(info[0]));
        });
    } else if (param === 'counts') {
        // In order to return the counts of all the collections we need to do an async
        // call to each collections. That is tricky to do so we use the async package
        // do the work.  We put the collections into array and use async.each to
        // do each .count() query.
        var collections = [
            {name: 'user', collection: User},
            {name: 'photo', collection: Photo},
            {name: 'schemaInfo', collection: SchemaInfo}
        ];
        async.each(collections, function (col, done_callback) {
            col.collection.countDocuments({}, function (err, count) {
                col.count = count;
                done_callback(err);
            });
        }, function (err) {
            if (err) {
                response.status(500).send(JSON.stringify(err));
            } else {
                var obj = {};
                for (var i = 0; i < collections.length; i++) {
                    obj[collections[i].name] = collections[i].count;
                }
                response.end(JSON.stringify(obj));

            }
        });
    } else {
        // If we know understand the parameter we return a (Bad Parameter) (400) status.
        response.status(400).send('Bad param ' + param);
    }
});

/*
 * URL /user/list - Return all the User object.
 */
app.get('/user/list', function (request, response) {
    // response.status(200).send(cs142models.userListModel());
    // console.log(User);

    // eslint-disable-next-line array-callback-return
    User.find(function (err, users){
        let userList = users; //TODO JSON.parse(JSON.stringfy)
        // console.log(users);
        // response.end(JSON.stringify(users));
        // eslint-disable-next-line no-use-before-define
        async.forEachOf(users, processUsers, allDone);

        function processUsers(user, i, callback){//TODO need tobe optimized
            userList[i] = JSON.parse(JSON.stringify(user,function(key,value){
                if(key==='location'||key==='description'||key==='occupation'||key==='__v'){
                    return undefined;
                }else{
                    return value;
                }
            }));
            callback();
        }
        function allDone(){
            if (err) {
                console.error(err);
            } else {
                // console.log(userList);
                response.end(JSON.stringify(userList));
                // configs is now a map of JSON data, e.g.
                // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
            }
        }
        // console.log(users);
        //
        // response.end(JSON.stringify(users));  //TODO users is same as userlist?
        // async.forEachOf(users, processUsers, allDone);
    });

});


/*
 * URL /user/:id - Return the information for User (id)
 */
app.get('/user/:id', function (request, response) {
    var id = request.params.id;
    // var user = cs142models.userModel(id);
    User.find({_id: id}, function (err, user) {//TODO if the useId is not true     findOne can't work
        if (err) {
            // Query returned an error.  We pass it back to the browser with an Internal Service
            // Error (500) error code.
            console.error('Doing /user/info error:', err);
            response.status(400).send(JSON.stringify(err));
            console.log(1);
            return;
        }
        // if (!user) {
        //     // Query didn't return an error but didn't find the SchemaInfo object - This
        //     // is also an internal error return.
        //     console.log('Invalid UserId');
        //     response.status(400).send('Invalid UserId');
        //     return;
        // }
        // console.log(id);
        console.log(JSON.stringify(user) + '/n');
        response.end(JSON.stringify(user[0], function(key, value){
            if(key==='__v') return undefined;
            else return value;
        }));
    });
    // if (user === null) {
    //     console.log('User with _id:' + id + ' not found.');
    //     response.status(400).send('Not found');
    //     return;
    // }
    // response.status(200).send(user);
});

/*
 * URL /photosOfUser/:id - Return the Photos for User (id)
 */
app.get('/photosOfUser/:id', function (request, response) {
    var id = request.params.id;
    Photo.find({user_id: id}, function (err, photos) {//TODO if the useId is not true     findOne can't work
        if (err) {
            // Query returned an error.  We pass it back to the browser with an Internal Service
            // Error (500) error code.
            console.error('Doing /user/info error:', err);
            response.status(400).send(JSON.stringify(err));
            console.log(1);
            return;
        }
        if (photos.length === 0) {
            // Query didn't return an error but didn't find the SchemaInfo object - This
            // is also an internal error return.
            console.log('Invalid UserId');
            response.status(400).send('Invalid UserId');
            return;
        }
        // console.log(id);
        // console.log(photos[0]);
        // let newPhoto = JSON.parse(JSON.stringify(photos[0], ['_id', 'user_id', 'comments', 'file_name','date_time']));
        let newPhotos = JSON.parse(JSON.stringify(photos));

        async.forEachOf(newPhotos, processPhotos, function (err){
            // console.log("shi");
            if (err) {
                console.error(err);
            } else {
                // console.log(userList);
                // console.log(131234);
                // console.log(JSON.stringify(newPhotos) + '/n');
                response.end(JSON.stringify(newPhotos));
                // configs is now a map of JSON data, e.g.
                // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
            }
        });
        function processPhotos(newPhoto, i, callback){
            delete newPhoto.__v;
            async.forEachOf(newPhoto.comments, processComments, function (err){
                // console.log("shi");
                if (err) {
                    console.error(err);
                } else {
                    // console.log(userList);
                    // console.log(131234);
                    newPhotos[i] = newPhoto;
                    // console.log(JSON.stringify(newPhoto.comments) + '/n');
                    // response.end(JSON.stringify(newPhotos));
                    // configs is now a map of JSON data, e.g.
                    // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
                }
                callback();
            });
            // callback();
            // async.each(newPhoto.comments, processComments)
            //     .then(() => {
            //         console.log(131234);
            //         console.log(JSON.stringify(newPhoto.comments) + '/n');
            //         response.end(JSON.stringify(newPhoto));
            //         }
            //     );
            function processComments(comment, i, callback2) {
                User.findOne({_id: comment.user_id}, function (err, user) {//TODO if the useId is not true     findOne can't work
                    if (err) {
                        // Query returned an error.  We pass it back to the browser with an Internal Service
                        // Error (500) error code.
                        console.error('Doing /user/info error:', err);
                        // response.status(400).send(JSON.stringify(err));
                        console.log(1);
                        return;
                    }
                    // console.log("Comment1" + JSON.stringify(comment));
                    let {_id, first_name, last_name} = user;
                    comment.user = {_id, first_name, last_name};
                    delete comment.user_id;
                    // console.log("Comment2" + JSON.stringify(comment));
                    // console.log(newPhoto);
                    newPhoto.comments[i] = comment;
                    callback2();

                });
                // callback2();
            }

            // function AllDone() {
            //     console.log("shi");
            //     if (err) {
            //         console.error(err);
            //     } else {
            //         // console.log(userList);
            //         console.log(131234);
            //         console.log(JSON.stringify(newPhoto.comments) + '/n');
            //         // response.end(JSON.stringify(newPhotos));
            //         // configs is now a map of JSON data, e.g.
            //         // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
            //     }
            // }
        }
        // console.log(JSON.stringify(newPhoto) + '/n');
        // response.end(JSON.stringify(newPhoto));
    });
});


var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});


