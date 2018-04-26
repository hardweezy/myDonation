import env from '../config'
import PersistedStorage from '../plugins/storage';
import store from '../config/store'
import AuthService from '../services/authfactory'

const $storage = new PersistedStorage();

var PaymentService = {
    /**
     * [createPaymentAccount description]
     * @param  {[type]} context  [description]
     * @param  {[type]} data     [description]
     * @param  {[type]} redirect [description]
     * @return {[type]}          [description]
     */
	createPaymentAccount : function(context, data, redirect){
		var $self = this;
        axios({
            method: 'post',
            url: env.appAPI + 'create-payment-details',
            data: data,
            headers: env.appAPIHeaders,
            headers: AuthService.getAuthHeader()
        })
        .then(function(res){
            if(res.data.status_code == 200){

                context.data = {};
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
	 * [fetchPaymentDetails description]
	 * @param  {[type]} context [description]
	 * @return {[type]}         [description]
	 */
	fetchPaymentDetails: function(context) {
		var $self = this;
        axios({
            method: 'get',
            url: env.appAPI + 'fetch-payment-details',
            headers: env.appAPIHeaders,
            headers: AuthService.getAuthHeader()
        })
        .then(function(res){
        	if(res.data.status_code == 200) {
        		context.data = res.data.message
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
	}

}
export default PaymentService;