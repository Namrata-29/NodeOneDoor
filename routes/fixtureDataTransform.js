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
        