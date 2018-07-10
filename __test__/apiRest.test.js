const fetch = require("node-fetch");

var siteUrl = "http://127.0.0.1:8080/api/bears";

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



//casi di test
/*
test('basic post and get', () => {
    return postAssignments(exampleAssignment)
        .then(postResponse => { return postResponse.json() })
        .then(postResponseJson => {
            exampleAssignment.assignmentID = postResponseJson.assignmentID
            return getOneAssignment(exampleAssignment.assignmentID)
        })
        .then(getResponse => {return getResponse.json()})
        .then(jsonResponse => {expect(jsonResponse.assignmentResult).toEqual(exampleAssignment.assignmentResult)})
        //.catch(e => {console.log(e)})
});


doGetOne(siteUrl,''+req.params.id).then(result => {
    return result.json()
}).then(jsonResponse => {res.status(200).json(jsonResponse)})*/

//delete
/*
doDelete(siteUrl,''+req.params.id).then(result => {
    return result.json()
}).then(jsonResponse => {res.status(200).json(jsonResponse)})

test('delete by assignmentID - basic response', () => {
    return deleteAssignments(exampleAssignment.assignmentID)
        .then(response => {   expect(response.status).toBe(204) })
        //.catch(e => {console.log(e)})

        
});*/

test('adds 1 + 2 to equal 3', () => {
    expect(3).toBe(3);
  });

var idbear
test('creazione orso con post', () => {  //POST
    return doPost(siteUrl,{name:"bruno da post test"})
        .then(result => {
            return result.json()
        })
        .then(jsonResponse => {
            idbear = jsonResponse._id;
            expect(jsonResponse.name).toBe("bruno da post test")
        })

});

test('ricezione orso con get', () => {  //GET
    return doGetOne(siteUrl,idbear)
        .then(result => {
            return result.json()
        })
        .then(jsonResponse => {
            expect(jsonResponse.name).toBe("bruno da post test")
        })

});

test('modifica nome con put', () => {   //PUT
    return doPut(siteUrl,{name:"bruno rinominato da put"},idbear)
        .then(result => {
            return result.json()
        })
        .then(jsonResponse => {
            expect(jsonResponse.name).toBe("bruno rinominato da put")
        })

});

test('delete orso', () => {   //DELETE orso esistente
    return doDelete(siteUrl,idbear)
        .then(result => {
            expect(result.status).toBe(204)
        })

});

test('ricezione orso con get che non ce più' , () => {  //GET su oggetto mancante
    return doGetOne(siteUrl,idbear)
        .then(result => {
            expect(result.status).toBe(404)
        })

});