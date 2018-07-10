var express = require('express');
var bodyParser = require('body-parser');
const fetch = require('node-fetch');

var routerGetPost = express.Router();
var siteUrl = "https://bearrestoriginale.herokuapp.com/api/bears";
routerGetPost.get('/', function (req, res) {
    res.json({ message: 'parte get/post/put/delete da node!' });
});

const doPost = function (url,body) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

const doPut = function (url,body,id) {
    return fetch(url +'/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

const doDelete = function (url,id) {
    return fetch(url+'/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }//,
    })
}

/*function doGet(url) {
	return fetch(url)
		.then(response => {
			return response.json();
		})
		.then(jsonResult => {
			return jsonResult;
    });
}*/

const doGetOne = function (url,id) {
    return fetch(siteUrl+'/'+id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    })
}

const doGetMany = function (url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    })
}



/*routerGetPost.route('/get')
    .get(function (req, res) {
        console.log(doGet("https://randomuser.me/api/?results=10").then(result => {
			res.status(200).json(result);
        }))
    });*/

routerGetPost.route('/getOne/:id')
    .get(function (req, res) {
        console.log("getOne")
        console.log(doGetOne(siteUrl,''+req.params.id).then(result => {
            return result.json()
        }).then(jsonResponse => {res.status(200).json(jsonResponse)}) )
    });

routerGetPost.route('/getMany')
    .get(function (req, res) {
        console.log(doGetMany(siteUrl).then(result => {
            return result.json()
        }).then(jsonResponse => {res.status(200).json(jsonResponse)}))
    });

routerGetPost.route('/post/:nome')
    .get(function (req, res) { 
        console.log(doPost(siteUrl,{name:''+req.params.nome}).then(result => {
            return result.json()
        }).then(jsonResponse => {res.status(200).json(jsonResponse)}))
    });

routerGetPost.route('/put/:id')
    .get(function (req, res) {
        console.log(doPut(siteUrl,{name:'plutodaPut'},''+req.params.id).then(result => {
			return result.json()
        }).then(jsonResponse => {res.status(200).json(jsonResponse)}))
    });

routerGetPost.route('/delete/:id')
    .get(function (req, res) {
        console.log(doDelete(siteUrl,''+req.params.id).then(result => {
			return result.json()
        }).then(jsonResponse => {
            res.status(200).json(jsonResponse)
        }))
    });

    module.exports = routerGetPost;