
var express = require('express');
var router = express.Router();
var Phonebook = require('../models/phonebook');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Phonebook GET route.');	
 });

router.post('/', function(req, res, next) {
	console.log('Phonebook POST route.');	
});


/*  Basic routes for an API 
 __________________________________________________________________________
|                               |            |                             |
| Route                         | HTTP Verb  |  Description                |
|_______________________________|____________|_____________________________|
|                               |            |                             |
| /api/phonebooks               | POST       | Create a phonebook          |  
|_______________________________|____________|_____________________________|
|                               |            |                             |
| /api/phonebooks               | GET        | Get all the phonebooks      |
|_______________________________|____________|_____________________________|
|                               |            |                             |
| /api/phonebooks/:phonebook_id | GET        | Get a single phonebook      |
|_______________________________|____________|_____________________________|
|                               |            |                             |        
| /api/phonebooks/:phonebook_id | PUT        | Update a single phonebook   |
|_______________________________|____________|_____________________________|
|                               |            |                             |
| /api/phonebooks/:phonebook_id | DELETE     | Delete a single phonebook   |
|_______________________________|____________|_____________________________|

*/

router.route('/phonebooks')
 
    // create a phonebook (accessed at POST /api/phonebooks 
    // params e.g. firstname, lastname, phonebook)
    .post(function(req, res) {
        
        var pbInstance = new Phonebook();      // create a new instance of the Phonebook model
        
        pbInstance.firstname = req.body.firstname;  
        pbInstance.lastname = req.body.lastname;  
        pbInstance.phonenumber = req.body.phonenumber;  

        // save the phonebook and check for errors
        pbInstance.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'phonebook created!' });
        });
    })
    
    // Get all phonebook (accessed at GET /api/phonebooks 
    .get(function(req, res) {
       
        Phonebook.find(function(err, phonebooks) {
            if (err)
                res.send(err);

            res.json(phonebooks);
        });
    });    
 
 router.route('/phonebooks/:phonebook_id')

    // get the phonebook with that id (accessed at GET /api/phonebooks/:phonebook_id)
    .get(function(req, res) {
        Phonebook.findById(req.params.phonebook_id, function(err, phonebook) {
            if (err)
                res.send(err);
            res.json(phonebook);
        });
    })

    // update the phonebook with this id (accessed at PUT /api/phonebooks/:phonebook_id)
    .put(function(req, res) {

        // use our phonebook model to find the phonebook we want
        Phonebook.findById(req.params.phonebook_id, function(err, phonebook) {

            if (err)
                res.send(err);

           // update the phonebook info
            phonebook.firstname = req.body.firstname;  
            phonebook.lastname = req.body.lastname;  
            phonebook.phonenumber = req.body.phonenumber;  

            // save the phonebook
            phonebook.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'phonebook updated!' });
            });

        });
    })

     // delete the phonebook with this id (accessed at DELETE /api/phonebooks/:phonebook_id)
    .delete(function(req, res) {
        Phonebook.remove({
            _id: req.params.phonebook_id
        }, function(err, phonebook) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



module.exports = router;