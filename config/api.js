let apiai = require('apiai');

// read the api.ai docs : https://api.ai/docs/

//Enter your API Key
let app = apiai("ec2df258337c449f847c8cfa86cfcdd6");

// Function which returns speech from api.ai
let getRes = function (query) {
    let request = app.textRequest(query, {
        sessionId: 'ef4a030cabb74bffbfd6e3b8240da9b4\n'
    });
    const responseFromAPI = new Promise(
        function (resolve, reject) {
            request.on('error', function (error) {
                reject(error);
            });
            request.on('response', function (response) {
                resolve(response.result);
            });
        });
    request.end();
    return responseFromAPI;
};

// test the command :
getRes('hello').then(function (res) {
    //console.log(res)
});

module.exports = {getRes};
