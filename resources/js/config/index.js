//myDonation Endpoint
const apiEndPoint = "https://api.md.dev/api/";

const env = {

    appAPI: apiEndPoint,
    authURL: apiEndPoint + 'oauth/me',
    registerURL: apiEndPoint + 'oauth/signup',
    appAPIHeaders: {
        'Accept': 'application/x.hz.api.v1+json, application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
    
}

export default env;
