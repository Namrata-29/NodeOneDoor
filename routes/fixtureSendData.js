

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
