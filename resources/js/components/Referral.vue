<template>
		<div class="column is-4">
        <div class="card article">
          <div class="card-content">
            <img src="/images/news/ill_referral.png"  alt="Placeholder image">
            <div class="media">
              <!-- <div class="media-center">
                <img :src="item.image" class="author-image" alt="Placeholder image">
                </div> -->
              <div class="media-content has-text-centered">
                <p class="title article-title">Referral Link</p>
              </div>
            </div>
            <div class="content article-body has-text-centered">Share Your Link with your friends
            </div>
            <div class="columns content article-body has-text-centered">
            	<div class="column">
            		<span class="subtitle">{{refData.shared}}</span>
                	<span class="subtitle">Shared</span>         	
            	</div>
            	<div class="column">
            		<span class="subtitle">{{refData.registered}}</span>
                	<span class="subtitle">Registered</span>           	
            	</div>            	
            </div>
          	<b-field 
            :type="error.email.type" 
            :message="error.email.message">
	            <b-input
	              type="email"
	              placeholder="yourfriends@friends.com"
	              v-model="credentials.email"
	              required></b-input>
          	</b-field>
          	<button class="button is-block is-info is-default is-fullwidth" @click.prevent="submitForm(credentials.email)">Share Link</button> 
          </div>
        </div>
      </div> 
</template>

<script>
import HomeService from '../services/homefactory'
import $util from '../plugins/util'

	export default{
		data(){
			return{
		      credentials: {
		        email: '',
		      },
		      refData: {
		      	shared : 0,
		      	registered : 0
		      },				
		      error: {
		        email: {
		          type: '',
		          message: '',
		          hasError: false,
		        },
		      }				
			}
		},

		methods:{

		    submitForm: function (email) {
		      if (email) {
		        var check_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		        if (!check_email.test(email)) {
		          this.error.email.type = "is-danger";
		          this.error.email.message = "";
		          this.error.email.hasError = true;
		        } else {
        			this.$store.commit('TOGGLE_ISLOADING', true);
					HomeService.createReferral(this, {email:email});
		        }
		      }else{
		      	 this.$snackbar.open({
                    message: `Please enter a valid email address`,
                    type: 'is-danger',
                    positon: 'is-bottom-right',
                    actionText: 'Retry',
                });
		      }
		    },
		    getRefData: function() {
		    	HomeService.getRefData(this)
		    }		
		},

	    created: function() {
	      this.getRefData();
	    }		
	}
</script>