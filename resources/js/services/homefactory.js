import env from '../config'
import PersistedStorage from '../plugins/storage';
import store from '../config/store'
import AuthService from '../services/authfactory'

const $storage = new PersistedStorage();

var HomeService = {
	/**
	 * [getQuickData description]
	 * @param  {[type]} context [description]
	 * @return {[type]}         [description]
	 */
	getQuickData: function(context) {
		var $self = this;
	    axios({
	        method: 'get',
	        url: env.appAPI + 'quick-data',
	        headers: env.appAPIHeaders,
	        headers: AuthService.getAuthHeader()
	    })
	    .then(function(res){
	    	if(res.data.status_code == 200){
	    		context.data = res.data.message
	    	}
	    })
	    .catch(function(err){
	    	console.error(err)
	    })		
	},

	/**
	 * [createReferral description]
	 * @param  {[type]} context [description]
	 * @param  {[type]} data    [description]
	 * @return {[type]}         [description]
	 */
	createReferral: function(context, data) {
		var $self = this;
		axios({
            method: 'post',
            url: env.appAPI + 'create-referral',
            data: data,
            headers: env.appAPIHeaders,
            headers: AuthService.getAuthHeader()
		})
		.then(function(res){
			context.$store.commit('TOGGLE_ISLOADING');                        
			
			if(res.data.status_code == 403){
				context.$snackbar.open({
                    message: res.data.message,
                    type: 'is-danger',
                    position: 'is-bottom',
                    actionText: 'Retry',
                 });
			}
			else if(res.data.status_code == 200) {
				
				context.credentials.email = '';
                $self.getRefData(context)				
				context.$toast.open({
                    message: res.data.message,
                    type: 'is-success'
                })
			}

		})
		.catch(function(err){

		})
	},

	
	/**
	 * [getRefData description]
	 * @param  {[type]} context [description]
	 * @return {[type]}         [description]
	 */
	getRefData: function(context){
		var $self = this;
	    axios({
	        method: 'get',
	        url: env.appAPI + 'referral-data',
	        headers: env.appAPIHeaders,
	        headers: AuthService.getAuthHeader()
	    })
	    .then(function(res){
	    	if(res.data.status_code == 200){

	    		var refData = res.data.message
	    		context.refData.shared = refData.shared;
	    		context.refData.registered = refData.registered;

	    	}
	    })
	    .catch(function(err){
	    	console.error(err)
	    })		
	},	
}

export default HomeService;