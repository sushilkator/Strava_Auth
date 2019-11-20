const stravaKey = require('./config');
const request = require('request');
const stravaAPi = require('./strava_athlet');
let getAtheletData = async()=>{
    const code = '9b69b4c3285f3a8400ea6ed74c153af2b90fb9dc';
    let authData = await stravaAPi.getAuthToken(code);
    authData = JSON.parse(authData);
    let data = {url : `https://www.strava.com/api/v3/athletes/${authData.athlete.id}/stats?page=&per_page="`,
        token : authData.access_token
    };
    //console.log(authData.athlete);
    let athleteData = await stravaAPi.getAthletData(data);
    console.log(athleteData)
}
getAtheletData().catch((err)=>{
    console.log(err);
})





// const id = 29846750;
// let url = `https://www.strava.com/api/v3/athletes/${id}/stats?page=&per_page="`
// let options ={ 
//   headers:
//    { 'User-Agent': 'node-strava-v3 v2.0.2',
//      Authorization: 'Bearer 89509df2097166fab13afd97d861c7b798824797'},
//   url: url,
//   resolveWithFullResponse: true,
//   simple: true,
// };

//  //console.log(options);  
// request.get(options, (error, response, body)=> {
//     console.log(response)
//     console.log(response);
//     if (!error && response.statusCode == 200) {
//         console.log('-----------------body -----------');
//         console.log(body);
//       var info = JSON.parse(body);
//       console.log(info);
//     }else{
//         console.log('Error is here ---');
//         console.log(error);
//     }
//   });