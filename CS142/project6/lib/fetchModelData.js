
var Promise = require("Promise");

/**
  * FetchModel - Fetch a model from the web server.
  *     url - string - The URL to issue the GET request.
  * Returns: a Promise that should be filled
  * with the response of the GET request parsed
  * as a JSON object and returned in the property
  * named "data" of an object.
  * If the requests has an error the promise should be
  * rejected with an object contain the properties:
  *    status:  The HTTP response status
  *    statusText:  The statusText from the xhr request
  *
*/


function fetchModel(url) {
  return new Promise(function(resolve, reject) {
      console.log(url);
      // setTimeout(() => reject({status: 501, statusText: "Not Implemented"}),1000);
      // setTimeout(() => reject({status: 501, statusText: "Not Implemented"}),0); //TODO setTimeOut  "0" will fail

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
          var DONE = 4;
          var OK = 200;
          if(xhr.readyState === DONE) {
              if(xhr.status === OK) {
                  resolve({data: JSON.parse(xhr.responseText)});
              } else{
                  reject({status: xhr.status, statusText: xhr.statusText});
              }
          }
      };
      xhr.open("GET", url, true);
      xhr.send();


      // On Success return:
      // resolve({data: getResponseObject});
  });
}
// function xhrHandler(resolve, reject){
//     var DONE = 4;
//     var OK = 200;
//     if(xhr.readyState === DONE) {
//         if(this.status === OK) {
//             resolve({data: JSON.parse(this.responseText)});
//         } else{
//             reject({status: this.status, statusText: this.statusText});
//         }
//     }
// }

// function fetchModel(url) {
//     return new Promise(function(resolve, reject) {
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url);
//         xhr.send();
//
//         xhr.onreadystatechange = function() {
//             if (this.readyState != 4) {
//                 return;
//             }
//             if (this.status != 200) {
//                 reject({ status: xhr.status, statusText: xhr.statusText });
//             } else {
//                 resolve({ data: JSON.parse(this.responseText) });
//             }
//         };
//     });
// }
export default fetchModel;
