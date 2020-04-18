const express = require('express');
const router = express.Router();
const pool = require('../common/dbconn.js').client;
const sftpconn = require('../common/odsftpconn.js').ssh;

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('into router');

    pool.on('connect', () => {
        console.log('connected to the db');
    });

    var testDB = function () {
        var request = require('request');
        request({ url: 'https://reqres.in/api/users?page=1', json: true }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = body;

                var queryInsertString = `INSERT INTO "One_Door"."OD_FIXTURE_POSITIONS"("FIXTURE_INFO","CREATE_ID","STATUS_IND", "LAST_UPDATE_ID")VALUES($1, 'ARCH', 'N', 'ARCH')`;
                const values = [info];
                pool.query(
                    queryInsertString, values,
                    (err, res) => {
                        console.log(err, res);

                        pool.end();
                        console.log('áfter dbinsert');
                    }

                );
                console.log('áfter dbinsert');
            }
        })
        var querySelectString = `SELECT "FIXTURE_INFO" as data  FROM "One_Door"."OD_FIXTURE_POSITIONS" WHERE "STATUS_IND"='N'`;
        pool.query(querySelectString, (err, res) => {
            //      done();

            if (err) {
                console.log(err.stack);
            } else {
                const jsonData = JSON.parse(JSON.stringify(res.rows));
                console.log(jsonData);
               
                const transforms = [unwind('data')];
                const fields = ['data.id', 'data.email'];
                const json2csvParser = new Parser({ fields, transforms });
                const csv = json2csvParser.parse([jsonData]);

                console.log(csv);
                fs.writeFile('fixture.csv', csv, function (err) {
                    if (err) throw err;
                    console.log('fixture file saved');
                });
            }
        });
        sftpconn.connect(sftpconn)
            .then(function () {
                // Local, Remote

                sftpconn.putFile('D://Namrata//LogicProjects//OneDoor//Codes//simple-rest-api//onedoorsshkey', '/sftpdata/attw-log-uat2/uploadDir/test.txt').then(function () {
                    console.log("The File thing is done")
                }, function (error) {
                    console.log("Something's wrong")
                    console.log(error)
                })
                // console.log('file transferred success..')
            })

    }

    testDB();

});
module.exports = router;
