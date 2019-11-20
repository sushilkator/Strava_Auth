const strava = require('strava-v3');
const stravaKey = require('./config');
const request = require('request');
strava.config(stravaKey);
const stravaAPi = {
    getAuthToken: (code) => {
        const options = {
            method: 'POST',
            url: stravaKey.authUrl,
            headers:{
                'cache-control': 'no-cache',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
            formData:{
                client_id: stravaKey.client_id,
                client_secret: stravaKey.client_secret,
                code: code,
                //code: '9b69b4c3ea6eddd889222*****74c153af2b90fb9dc',// auth code form user 
                grant_type: 'authorization_code'
            }
        };
        console.log(options);
        return new Promise((resolve,reject)=>{
            request(options,(error, response, body)=> {
                if (error)
                reject(error)
                resolve(body)
            });
        })
        
    },
    getAthletData : (data)=>{
        const id = data.id//;
        let url = data.url//`https://www.strava.com/api/v3/athletes/${id}/stats?page=&per_page="`
        let options ={ 
          headers:
           { 'User-Agent': 'node-strava-v3 v2.0.2',
             Authorization: `Bearer ${data.token}`}, // token : referese Token after postman call
          url: url,
          resolveWithFullResponse: true,
          simple: true,
        };        
         //console.log(options); 
        return new Promise((resolve,reject)=>{
            request(options,(error, response, body)=> {
                request.get(options, (error, response, body)=> {
                    
                    if (!error && response.statusCode == 200) {
                        const info = JSON.parse(body);
                        console.log(info);
                        resolve(info)
                    }else{
                        reject(error)
                    }
                  });
            });
        })        
    }


};
module.exports = stravaAPi;