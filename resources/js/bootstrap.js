import env from './config'

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery');

    // require('bootstrap-sass');
    //require('bulma');
} catch (e) {}


/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

//window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * evaluates if the browser supports the storage (one of 'sessionStorage' or 'localStorage')
 * 
 * @param storage - one of 'sessionStorage' or 'localStorage'
 * 
 * @return true if this browser supports the storage
 */
let hasStorage = function(storage) {
    try {

        window[storage].setItem("exists", "1");
        window[storage].getItem("exists");
        window[storage].removeItem("exists");

        return (true);
    }
    catch (ex) { }

    return (false);
}

let getRefreshToken = function() {
    return window.axios({
            method: 'post',
            url: env.appAPI + 'oauth/refresh',
            headers: {
               'Authorization' : 'Bearer ' + getToken() 
            }
        })
}

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let getToken = function(){
    var token = undefined;
    if(hasStorage('sessionStorage')){
        token = window.sessionStorage.getItem('token');
    }else if (hasStorage('localStorage')){
        token = window.localStorage.getItem('token');
    }   
    
    return token; 
}

let setToken = function(name, payload){
    var token = undefined;
    if(hasStorage('sessionStorage')){
        token = window.sessionStorage.setItem(name, payload);
    }else if (hasStorage('localStorage')){
        token = window.localStorage.getItem(name, payload);
    }      
    return token; 
}



if (getToken() !== undefined && getToken() !== null) {
    //inclusive in call header
    //window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();
} else {
    console.error('JWT token not found: http://appdie');
}

window.axios.interceptors.response.use(function (response) {
  return response;
}, function(error){

    const originalRequest = error.config;

    if(error.response.status === 401 && error.response.config){
        return getRefreshToken()
                .then(function(res){
                    originalRequest.headers['Authorization'] = 'Bearer ' + res.data.token;
                    setToken('token', res.data.token)
                    return window.axios(originalRequest);
                })
                .catch(function(err){
                    throw error
                })
    }
    return Promise.reject(error);
})