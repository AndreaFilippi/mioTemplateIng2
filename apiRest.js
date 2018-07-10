var express = require('express');
var bodyParser = require('body-parser');
var Data = require('./data');

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'api funzionante!' });
});

// route /bears
router.route('/bears')
    // create a bear
    // accessed at POST http://localhost:8080/api/bears
    .post(function (req, res) {
        // create a new instance of the Bear model
        var bear = new Data();
        // set the bears name (comes from the request)
        bear.name = req.body.name;
        // save the bear and check for errors
        bear.save(function (err) {
            if (err) { res.send(err); }
            res.json(bear);
        });

    })
    // get all the bears
    // accessed at GET http://localhost:8080/api/bears
    .get(function (req, res) { 
        Data.find(function (err, bears) {
            if (err) { res.send(err); }
            res.json(bears);
        });
    });


// route /bears/bear
router.route('/bears/:bear_id')

    // get the bear with that id
    // (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function (req, res) {
        if (!req.params.bear_id) res.sendStatus(404)
        else{
            //res.status=200
            Data.findById(req.params.bear_id, function (err, bear) {
                if (err) { res.sendStatus(404) }
                if(bear===null){
                    res.sendStatus(404)
                }else{
                res.json(bear);
                }
            });
        }
    })

    // update the bear with this id
    // (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function (req, res) {
        if (!req.params.bear_id) res.sendStatus(404)
        // use our bear model to find the bear we want
        Data.findById(req.params.bear_id, function (err, bear) {
            if (err) { res.send(err); }
            console.log(bear)
            // update the bears info
            bear.name = req.body.name;
            // save the bear
            bear.save(function (err) {
                if (err) { res.send(err); }
                res.json(bear);
            });

        });
    })

    // delete the bear with this id
    // (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function (req, res) {
        if (!req.params.bear_id) res.sendStatus(404)
        else{
            Data.remove({
                _id: req.params.bear_id
            }, function (err, bear) {
                if (err) { 
                    res.sendStatus(404) 
                    console.log("errore eliminazione")
                }
                if (bear===null){ 
                    res.sendStatus(404)
                    console.log("bear è null")
                }
                res.sendStatus(204);
            });
        }
    });




module.exports = router;