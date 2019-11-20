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
