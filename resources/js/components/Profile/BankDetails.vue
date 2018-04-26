<template>
	<div>
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
            <div class="media">
                <div class="media-content">
                    <div class="field is-pulled-right">
                        <p class="control">
                            <button class="button is-primary">
                              Edit Details
                            </button>
                        </p>                
                    </div>              
                </div>          
            </div>	        
	      </div>
	    </div>		
	</div>
</template>

<script>
import PaymentService from '../../services/paymentfactory'

	export default{
		data(){
			return{
				data: {}
			}
		},
		methods:{
			fetchPaymentDetails: function(){
				this.$store.commit('TOGGLE_ISLOADING', true);
				PaymentService.fetchPaymentDetails(this);
				return;
			}
		},
		created: function() {
			this.fetchPaymentDetails();
		}	
	}
</script>