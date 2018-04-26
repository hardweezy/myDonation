import env from '../config'
import PersistedStorage from '../plugins/storage';
import store from '../config/store'
import AuthService from '../services/authfactory'

const $storage = new PersistedStorage();

var ProvideHelpService = {

    /**
     * [createDream description]
     * @param  {[type]} context  [description]
     * @param  {[type]} data     [description]
     * @param  {[type]} redirect [description]
     * @return {[type]}          [description]
     */
    createDream: function(context, data, redirect) {
        var $self = this;
        axios({
            method: 'post',
            url: env.appAPI + 'create-new-dream',
            data: data,
            headers: env.appAPIHeaders,
            headers: AuthService.getAuthHeader()
        })
        .then(function(res){
            if(res.data.status_code == 200){
                context.$store.commit('TOGGLE_ISLOADING');

                if(redirect){
                    context.$router.push(redirect)
                }
            }
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
     * [confirmReserve description]
     * @param  {[type]} context [description]
     * @param  {[type]} data    [description]
     * @return {[type]}         [description]
     */
    confirmReserve: function(context, data, redirect) {
        var $self = this;
        axios({
            method: 'post',
            url: env.appAPI + 'create-reserve-donation',
            data: data,
            headers: env.appAPIHeaders,
            headers: AuthService.getAuthHeader()
        })
        .then(function(res){
            if(res.data.status_code == 200){
                context.$store.commit('TOGGLE_ISLOADING');

                if(redirect){
                    context.$router.push(redirect)
                }
            }
        })
        .catch(function(err){
            context.$store.commit('TOGGLE_ISLOADING');
            context.$snackbar.open({
                message: `Cannot continue with this process`,
                type: 'is-danger',
                positon: 'is-bottom-right',
                actionText: 'Error',
            });            
        })        
    },

    /**
     * [fetchDonationList description]
     * @param  {[type]} context [description]
     * @return {[type]}         [description]
     */
    fetchDonationList: function(context) {
        var $self = this;
        axios({
            method: 'get',
            url: env.appAPI + 'donate-list',
            headers: env.appAPIHeaders,
            headers: AuthService.getAuthHeader()
        })
        .then(function(res){
            if(res.data.status_code == 200){
                if(res.data.message.length < 1){
                    context.isEmpty = true
                }
                context.data = res.data.message
            }else{
                context.data = []
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
     * [fetchDonationDetails description]
     * @param  {[type]} context [description]
     * @param  {[type]} data    [description]
     * @return {[type]}         [description]
     */
    fetchDonationDetails: function(context, data) {
        var $self = this;
        axios({
            method: 'post',
            url: env.appAPI + 'donate-details',
            data: data,
            headers: env.appAPIHeaders,
            headers: AuthService.getAuthHeader()
        })
        .then(function(res){
            if(res.data.status_code == 200) {
                context.data = res.data.message;
                context.meta = res.data.meta;
            }
            else{
                context.data = [];
                context.meta = [];
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
     * [fetchCryptoRate description]
     * @param  {[type]} context [description]
     * @return {[type]}         [description]
     */
    fetchCryptoRate: function(context) {
        var $self = this;
        axios({
            method: 'get',
            url: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC&tsyms=ZAR'
        })
        .then(function(res){
            if(res.status == 200) {
                context.crypto = res.data;     
            }
        })        
        .catch(function(err){
            console.error(err)
        })
    },

    /**
     * [fetchPendingList description]
     * @param  {[type]} context [description]
     * @return {[type]}         [description]
     */
    fetchPendingList: function(context) {
        var $self = this;
        axios({
            method: 'get',
            url: env.appAPI + 'pending-list',
            headers: env.appAPIHeaders,
            headers: AuthService.getAuthHeader()
        })
        .then(function(res){
            if(res.data.status_code == 200){
                if(res.data.message.length < 1){
                    context.isEmpty = true
                }
                context.data = res.data.message
            }else{
                context.data = []
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
     * [secureDonation description]
     * @param  {[type]} context [description]
     * @param  {[type]} data    [description]
     * @return {[type]}         [description]
     */
    secureDonation: function(context, data) {
        var $self = this;
        axios({
            method: 'post',
            url: env.appAPI + 'secure-donation',
            data: data,
            headers: env.appAPIHeaders,
            headers: AuthService.getAuthHeader()
        })
        .then(function(res){
            if(res.data.status_code == 200){
                context.$toast.open({
                    message: res.data.message,
                    type: 'is-success'
                })
                $self.fetchPendingList(context)               
                               
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


}
export default ProvideHelpService;