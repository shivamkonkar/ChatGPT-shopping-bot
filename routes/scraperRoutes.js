const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config()
const { spawn } = require('child_process');
var loadingSpinner = require('loading-spinner');

// var fs = require('fs');
// var filePath = './public.py/sample.json'


const pythonProcess = spawn('python', ["/py/aafil.py"]);

// router.post('/save-query', async (req, res) => {
//     const receivedData = req.body;
    
//     // console.log(receivedData)
//     userMessage = receivedData
// });

router.get('/', (req, res) => {

    // pythonProcess.stdout.on('data', (data) => {
    //     console.log(data.toString());
    // });

    // pythonProcess.stdout.on('data', (data) => {
    //     console.log(`stdout: ${data}`);
    // });

    // pythonProcess.stderr.on('data', (data) => {
    //     console.error(`stderr: ${data}`);
    // });

    // pythonProcess.on('close', (code) => {
    //     console.log(`child process exited with code ${code}`);
    // });

    const userMessage = ''

    

    const { exec } = require("child_process");

    exec(`python C:/Users/shiva/OneDrive/Documents/GitHub/ExpressJs-StarterProject/public/py/aafil.py ${userMessage}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);


    
    });
    
    
    var dary = function() {
        loadingSpinner.stop();
      
        process.stdout.write('DA-RY !');
      };
      
      var legend = function() {
        process.stdout.write('It\'s gonna be LE-GEN... Wait for it... ');
      
        loadingSpinner.start(100, {
          clearChar: true
        });
      
        setTimeout(dary, 1000);
      };
      
      legend();
      res.redirect('/card')
    //   fs.unlinkSync(filePath);



})




module.exports = router