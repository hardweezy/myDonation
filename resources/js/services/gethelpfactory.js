import env from '../config'
import PersistedStorage from '../plugins/storage';
import store from '../config/store'
import AuthService from '../services/authfactory'

const $storage = new PersistedStorage();

var GetHelpService = {

	/**
	 * [approveDonation description]
	 * @param  {[type]} context [description]
	 * @param  {[type]} data    [description]
	 * @return {[type]}         [description]
	 */
	approveDonation: function(context, data){
        var $self = this;		
	    axios({
	        method: 'post',
	        url: env.appAPI + 'approve-donation',
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
                $self.fetchPendingDonationList(context)                                            
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
	 * [fetchAllDreams description]
	 * @param  {[type]} context [description]
	 * @param  {[type]} params  [description]
	 * @return {[type]}         [description]
	 */
    fetchAllDreams: function(context, params){
    	var $self = this;
	    axios({
	        method: 'get',
	        url: env.appAPI + 'fetch-all-dreams',
	        params: params,
	        headers: env.appAPIHeaders,
	        headers: AuthService.getAuthHeader()
	    })
	    .then(function(res){
	        if(res.data.status_code == 200){
	            if(res.data.message.length < 1){
	                context.isEmpty = true
	            }
	            context.data = res.data.message
	            context.meta = res.data.meta
	        }else{
	            context.data = []
	            context.meta = {}
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
	 * [fetchWithdrawDreams description]
	 * @param  {[type]} context [description]
	 * @param  {[type]} params  [description]
	 * @return {[type]}         [description]
	 */
    fetchWithdrawDreams: function(context, params){
        var $self = this;    	
	    axios({
	        method: 'get',
	        url: env.appAPI + 'fetch-withdraw-dreams',
	        params: params,
	        headers: env.appAPIHeaders,
	        headers: AuthService.getAuthHeader()
	    })
	    .then(function(res){
	        if(res.data.status_code == 200){
	            if(res.data.message.length < 1){
	                context.isEmpty = true
	            }
	            context.data = res.data.message
	            context.meta = res.data.meta
	        }else{
	            context.data = []
	            context.meta = {}
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
	 * [fetchPendingDonationList description]
	 * @param  {[type]} context [description]
	 * @return {[type]}         [description]
	 */
	fetchPendingDonationList: function(context) {
        var $self = this;
        axios({
            method: 'get',
            url: env.appAPI + 'fetch-donation-dashboard',
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
	 * [withdrawDream description]
	 * @param  {[type]} context [description]
	 * @param  {[type]} data    [description]
	 * @return {[type]}         [description]
	 */
	withdrawDream: function(context, data){
		var $self = this;
	    axios({
	        method: 'post',
	        url: env.appAPI + 'withdraw-dream',
	        data: data,
	        headers: env.appAPIHeaders,
	        headers: AuthService.getAuthHeader()
	    })
	    .then(function(res){
	    	if(res.data.status_code == 200){
	    		var index = context.data.findIndex(x => x.slug.toLowerCase() == data.ref.toLowerCase())
	    		context.data[index].listed = context.data[index].activated = 1
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
	}		
}

export default GetHelpService;