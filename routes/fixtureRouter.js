const Router = require('express-promise-router');
const db = require('../db');
const axios = require('axios');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;
router.post('/insertData', async (req, res) => {
 
    console.log('Receive request to inser data : ', req.body);

    let httpResponse=null;
    try{

        //fetching data
        httpResponse= await axios.get('https://reqres.in/api/users?page=1');
         console.log('Data received from api : ',httpResponse.data);
         
         const fixtureInfo=  httpResponse;
        //Now inserting into DB
         const insertQuery= `INSERT INTO "One_Door"."OD_FIXTURE_POSITIONS"("FIXTURE_INFO","CREATE_ID","STATUS_IND", "LAST_UPDATE_ID")VALUES($1, 'ARCH', 'N', 'ARCH')`;
         const  dbResponse = await db.query( insertQuery,[ fixtureInfo]);
         console.log('Db response : ', dbResponse);
         



    } catch(err){
    console.error('Some error occure : ',err);
    res.send(err);
    return ;
    }
    
    res.send('Request completed successfully');
});