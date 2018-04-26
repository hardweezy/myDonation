import env from '../config'
import PersistedStorage from '../plugins/storage';
import store from '../config/store'

const $storage = new PersistedStorage();

var AuthService = {
    /**
     * [checkAuth description]
     * @return {[type]} [description]
     */
    checkAuth: function () {
        var self = this;
        var jwt = $storage.getItem('token');

        if (jwt) {
            store.commit('LOGIN_USER');
        } else {
            store.commit('LOGOUT_USER');
        }
    }, 

    /**
     * [confirmVerification description]
     * @param  {[type]} context [description]
     * @param  {[type]} code    [description]
     * @return {[type]}         [description]
     */
    confirmVerification: function(context, code){
        var $self = this;
        axios({
            method: 'post',
            url: env.appAPI + 'verify-user',
            data: code,
            headers: env.appAPIHeaders,
            headers: $self.getAuthHeader()
        })
        .then(function(res){
            if(res.data.status_code == 200){

                context.token.code = '';
                $storage.removeItem('user_data');
                $storage.setItem('user_data', JSON.stringify(res.data.user));

                store.commit('ACTIVATE_USER');
                
                context.$toast.open({
                    message: res.data.message,
                    type: 'is-success'
                })                

            }else{

                context.$snackbar.open({
                    message: res.data.message,
                    type: 'is-danger',
                    positon: 'is-bottom-right',
                    actionText: 'Retry',
                });  

            }
            context.$store.commit('TOGGLE_ISLOADING');            
        })
        .catch(function(err){
            context.$store.commit('TOGGLE_ISLOADING');
            context.$snackbar.open({
                message: `problem processing this request`,
                type: 'is-danger',
                positon: 'is-bottom-right',
                actionText: 'Retry',
            });            
        })
    }, 

    /**
     * [getAuthHeader description]
     * @return {[type]} [description]
     */
    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + $storage.getItem('token')
        }
    },    

    /**
     * [login description]
     * @param  {[type]} creds    [description]
     * @param  {[type]} redirect [description]
     * @return {[type]}          [description]
     */
    login: function (context, creds, redirect) {
        var self = this;
        axios({
                method: 'post',
                url: env.authURL,
                data: creds,
                headers: env.appAPIHeaders
            })
            .then(function (res) {
                if (res.data) {

                    $storage.setItem('token', res.data.token);
                    $storage.setItem('user_data', JSON.stringify(res.data.user.original));
                    
                    store.commit('LOGIN_USER', res.data.user.original)
                    
                    if (redirect) {
                        context.$router.push(redirect)
                    }
                
                    context.$store.commit('TOGGLE_ISLOADING');                    
                }
            })
            .catch(function (err) {
                context.$store.commit('TOGGLE_ISLOADING');
                context.error = true;
                context.errorMessage = self.loginError(err.response.data.status_code);
            })
    },

    /**
     * [LoginError description]
     * @param {[type]} status [description]
     */
    loginError(status) {
        var status = (status !== undefined) ? status : 404;
        var statusMessage = undefined;

        switch(status){
            case 403:
                statusMessage = "The details you entered doesn't belong to an account. Please check your details and try again.";
                break;
            case 500:
                statusMessage = "There was an error encountered while processing this request. Try again";
                break;
            default:
                statusMessage = "Invalid Request sent, Try again";
                break;
        }

        return statusMessage;
    },    

    /**
     * [logout description]
     * @return {[type]} [description]
     */
    logout(context) {
        store.commit('LOGOUT_USER')

        if (store.state.authenticated === false ) {
            $storage.removeItem('token');
            $storage.removeItem('user_data');
        }

        context.$router.push('/login');

    },    

    /**
     * [requireAuth description]
     * @param  {[type]}   to   [description]
     * @param  {[type]}   from [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    requireAuth: function (to, from, next) {
        var self = this;
        if (store.state.authenticated !== true) {
            next({
                path: ('/login'),
                query: {
                    redirect: to.fullPath
                }
            });
        }else {
            next();
        }

    },

    requireAuthAndRestriction: function (to, from, next) {
        var self = this;
        if (store.state.authenticated !== true) {
            next({
                path: ('/login'),
                query: {
                    redirect: to.fullPath
                }
            });
        }else if(store.state.details.blacklist == 1){
            next({
                path: from.fullPath
            });
        }else if(store.state.details.member_active != 1){
            next({
                path: ('/create-dream'),
            });
        }else {
            next();
        }

    },       

    resendCode: function(context){
        var $self = this;
        axios({
            method: 'post',
            url: env.appAPI + 'resend-code',
            headers: env.appAPIHeaders,
            headers: $self.getAuthHeader()
        })
        .then(function(res){
            if(res.data.status_code == 200){

                context.token.code = '';

                context.$toast.open({
                    message: res.data.message,
                    type: 'is-success'
                })

            }else{

                context.$toast.open({
                    message: res.data.message,
                    type: 'is-danger'
                })              
            }
            context.$store.commit('TOGGLE_ISLOADING');            
        })
        .catch(function(err){
            context.$store.commit('TOGGLE_ISLOADING');
            context.$snackbar.open({
                message: `problem processing this request`,
                type: 'is-danger',
                positon: 'is-bottom-right',
                actionText: 'Retry',
            });            
        })
    },  

    /**
     * [signup description]
     * @param  {[type]} creds    [description]
     * @param  {[type]} redirect [description]
     * @return {[type]}          [description]
     */
    signup: function (context, creds, redirect) {
        var self = this;
        axios({
                method: 'post',
                url: env.registerURL,
                data: creds,
                headers: env.appAPIHeaders
            })
            .then(function (res) {
                if (res.data) {
                    context.$store.commit('TOGGLE_ISLOADING');
                    $storage.setItem('token', res.data.token);
                    $storage.setItem('user_data', JSON.stringify(res.data.user.original));

                    store.commit('LOGIN_USER', res.data.user.original)
                    
                    self.login(context, creds, redirect);
                }
            })
            .catch(function (err) {
                context.$store.commit('TOGGLE_ISLOADING');
                context.error = true;
                context.errorMessage = self.loginError(err.response.data.status_code)
            })
    },

    /**
     * [validateEmail description]
     * @param  {[type]} context [description]
     * @param  {[type]} error   [description]
     * @param  {[type]} email   [description]
     * @return {[type]}         [description]
     */
    validateEmail: function(context, error, email){
        var $self = this;
        axios({
            method: 'post',
            url: env.appAPI + 'validate/email',
            data: email,
            headers: env.appAPIHeaders,
            headers: $self.getAuthHeader()
        })
        .then(function(res){
            if(res.data.status_code == 400){
                error.type = "is-danger";
                error.message = res.data.message;
                error.hasError = true;
            }else if(res.data.status_code == 200){
                error.type = "is-success";
                error.message = "";
                error.hasError = false;
            }

        })
        .catch(function(err){
            context.$snackbar.open({
                message: `problem processing this request`,
                type: 'is-danger',
                positon: 'is-bottom-right',
                actionText: 'Retry',
            });            
        })
    },

    /**
     * [validateUsername description]
     * @param  {[type]} context  [description]
     * @param  {[type]} error    [description]
     * @param  {[type]} username [description]
     * @return {[type]}          [description]
     */
    validateUsername: function(context, error, username){
        var $self = this;
        axios({
            method: 'post',
            url: env.appAPI + 'validate/username',
            data: username,
            headers: env.appAPIHeaders,
            headers: $self.getAuthHeader()
        })
        .then(function(res){
            if(res.data.status_code == 400){
                error.type = "is-danger";
                error.message = res.data.message;
                error.hasError = true;                
            }else if(res.data.status_code == 200){
                error.type = "is-success";
                error.message = "";
                error.hasError = false;                
            }
        })
        .catch(function(err){
            context.$snackbar.open({
                message: `problem processing this request`,
                type: 'is-danger',
                positon: 'is-bottom-right',
                actionText: 'Retry',
            });            
        })
    },

    /**
     * [validateCell description]
     * @param  {[type]} context [description]
     * @param  {[type]} error   [description]
     * @param  {[type]} cell    [description]
     * @return {[type]}         [description]
     */
    validateCell: function(context, error, cell){
        var $self = this;
        return axios({
            method: 'post',
            url: env.appAPI + 'validate/cell',
            data: cell,
            headers: env.appAPIHeaders,
            headers: $self.getAuthHeader()
        })

    },    

};

export default AuthService