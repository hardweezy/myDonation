<template>
  <div class="columns" v-if="data.user_id">
	    <div class="column">
	      <div class="box content">
	        <div class="media" v-if="data.name && data.username">
	          <div class="media-content">
	            <p class="title is-4 is-capitalized">{{data.name}}</p>
	            <p class="subtitle is-6">@{{data.username}}</p>
	            <div class="media"  v-if="data.cell && data.dialCode">
	              <div class="media-left">
	                <p class="image is-32x32">
	                  <img src="/images/general/phone.png">
	                </p>
	              </div>
	              <div class="media-content">
	                <div class="content">
	                  <p>
	                    {{ cell(data.dialCode, data.cell) }}
	                  </p>
	                </div>
	              </div>
	            </div>
	            <div class="media" v-if="data.email">
	              <div class="media-left">
	                <p class="image is-32x32">
	                  <img src="/images/general/mail.png">
	                </p>
	              </div>
	              <div class="media-content">
	                <div class="content">
	                  <p>
	                    {{data.email}}
	                  </p>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>
	    <div class="column">
	      <div class="box content">
	        <div class="media">
	          <div class="media-content">
	            <p class="title is-4 is-capitalized">Payment Details</p>
	            <p class="subtitle is-6">Bank, Bitcoin and Etherum</p>
	          </div>
	        </div>
	        <div class="media" v-if="data.bank_name">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/bank.png">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{data.bank_name}}
	              </p>
	            </div>
	          </div>
	        </div>
	        <div class="media" v-if="data.bank_account_name">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/holder.png">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{data.bank_account_name}}
	              </p>
	            </div>
	          </div>
	        </div>
	        <div class="media" v-if="data.bank_account_number">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/account_number.png">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{data.bank_account_number}}
	              </p>
	            </div>
	          </div>
	        </div>
	        <div class="media" v-if="data.bank_branch_name">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/branch_name.png">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{data.bank_branch_name}}
	              </p>
	            </div>
	          </div>
	        </div>
	        <div class="media" v-if="data.bank_branch_code">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/code.png">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{data.bank_branch_code}}
	              </p>
	            </div>
	          </div>
	        </div>
	        <div class="media" v-if="data.bank_account_type">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/type.png">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{data.bank_account_type}}
	              </p>
	            </div>
	          </div>
	        </div>
	        <div class="media" v-if="data.bitcoin_wallet">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/bitcoin.jpg">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{data.bitcoin_wallet}}
	              </p>
	            </div>
	          </div>
	        </div>
	        <div class="media" v-if="data.etherum_wallet">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/etherum.png">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{data.etherum_wallet}}
	              </p>
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>
	    <div class="column">
	      <div class="box content">
	        <div class="media">
	          <div class="media-content">
	            <p class="title is-4 is-capitalized">Donate Details</p>
	            <p class="subtitle is-6">Your today's quest</p>
	          </div>
	        </div>
 	        <!-- <div class="media" v-if="data.dream_payout">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/donate.png">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{donate.dream_amount ? parseFloat(data.dream_payout) - parseFloat(donate.dream_amount) :data.dream_payout}}
	              </p>
	            </div>
	          </div>
	        </div> 
	        <div class="media" v-if="data.d_amount">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/glass.png">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{donate.dream_amount ? parseFloat(data.d_amount)+ parseFloat(donate.dream_amount) :data.d_amount}}
	              </p>
	            </div>
	          </div>
	        </div>  -->
	        <div class="media" v-if="data.bank_name &&  donate.dream_amount">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/bank.png">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{donate.dream_amount}}
	              </p>
	            </div>
	          </div>
	        </div>        
	        <div class="media" v-if="finalConversion[1] && data.bitcoin_wallet">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/bitcoin.jpg">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{finalConversion[1]}}
	              </p>
	            </div>
	          </div>
	        </div>
	        <div class="media" v-if="finalConversion[0] && data.etherum_wallet">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/etherum.png">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                {{finalConversion[0]}}
	              </p>
	            </div>
	          </div>
	        </div>     
	        <div class="media">
	          <div class="media-left">
	            <p class="image is-32x32">
	              <img src="/images/general/write.png">
	            </p>
	          </div>
	          <div class="media-content">
	            <div class="content">
	              <p>
	                <b-select 
	                    required
	                    v-model="donate"
	                    >
	                    <option disabled value="">-Select Dream to Pay With-</option>
	                    <option v-for="opt in meta" :value="opt">{{opt.dream_title +' - R'+opt.dream_amount}}</option>
	                 </b-select>
	              </p>
	            </div>
	          </div>         
	        </div>
			<div class="media">
				<div class="media-content">
					<div class="field is-pulled-right">
			            <p class="control">
			                <button @click.prevent="reserveDonation()" class="button is-primary" :disabled="confirmBalance() ||  donate.dream_amount === undefined">
			                  Donate Now
			                </button>
			            </p>				
					</div>				
				</div>			
			</div>       
	      </div>
	    </div>
  </div>

  <div class="columns" v-else>
  	<div class="column">
	  	<div class="box">
	  		<div class="media">
	  			<div class="media-content">
			      <h2 class="subtitle">
				  	Cannot find any Transaction history for this reference <b>{{$route.params.id}}</b>.
				  	<br>
				  	<br>
				  	Kindly try again when you have a valid reference or contact Support on support@hustlerszone.net
			      </h2>	  				
	  			</div>
	  		</div>
	  	</div>  		
  	</div>
  </div>
</template>

<script>
import ProvideHelpService from '../../services/providehelpfactory'

export default{
	data(){
		return{
			data: [],
			meta: [],
			donate: '',
			crypto: [],
			finalConversion : []
		}
	},
	watch: {
		'donate.dream_amount': function(newValue){
			this.calculateRate(newValue)
		}
	},
	methods:{
		fetchDonationDetails: function(slug){
			this.$store.commit('TOGGLE_ISLOADING', true);
			ProvideHelpService.fetchDonationDetails(this, {slug: slug});
			return;
		},
		fetchCryptoRate: function() {
			ProvideHelpService.fetchCryptoRate(this);
		},
        cell: function(dialcode, cell){
        	var cell = '+'+dialcode+cell.substr(1);
        	return cell;
        },
        calculateRate: function(convertThis){
        	var exchange = [];
        	var finalConversion = [];
        	var value = this.crypto;

        	for (var data in value) {
        		if(value.hasOwnProperty(data)) {
        			exchange[exchange.length] = value[data]['ZAR'];
        		}
        	}

        	exchange.forEach(function(x){
        		var a = (convertThis/x) * 1
        		finalConversion[finalConversion.length] = a;
        	})
        	this.finalConversion = finalConversion
        	return this.finalConversion
        },
        confirmBalance: function() {
        	return parseFloat(this.data.dream_payout) < parseFloat(this.donate.dream_amount)
        },

       	reserveDonation: function() {
       		if (this.confirmBalance() || this.donate.dream_amount === undefined){
	            this.$snackbar.open({
	                message: `Cannot continue with this process`,
	                type: 'is-danger',
	                positon: 'is-bottom-right',
	                actionText: 'Error',
	            });            
       		}else{
       			var data = {
       				receiver : this.data,
       				payee: this.donate
       			};

		      this.$store.commit('TOGGLE_ISLOADING', true);
		      ProvideHelpService.confirmReserve(this, data, '/pending-transactions');
       		}
       	}		
	},
	created: function() {
		this.fetchDonationDetails(this.$route.params.id);
		this.fetchCryptoRate();

	},
	beforeRouteUpdate ( to, from , next ) {
		this.fetchDonationDetails(to.params.id);
		this.fetchCryptoRate();
		next();
	}

}
</script>