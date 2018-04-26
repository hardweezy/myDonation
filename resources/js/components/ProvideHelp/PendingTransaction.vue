<template>
	<div>
		 <quick-view></quick-view>
	<div class="column">
        <b-table
            :data="isEmpty ? [] : data"
            :hoverable="true"            
            :mobile-cards="true"
            detailed
            @detail-key="(row) => { row.slug }"        	
        	@details-open="(row, index) => calculateRate(row.p_amount)"
            >
            <template slot-scope="props">
                <b-table-column field="p_endtimer" label="Timer" sortable>
                    {{ calendarTime(props.row.p_endtimer) }}
                </b-table-column>             	
                <b-table-column field="slug" label="Ref" sortable>
                    {{ props.row.slug }}
                </b-table-column>                
                <b-table-column field="username" label="Username" class="is-capitalized" sortable>
                    {{ props.row.username }}
                </b-table-column>                             
                <b-table-column field="amount" label="Amount" sortable>
                    {{ props.row.p_amount }}
                </b-table-column>  
                                                                     
            </template>                       		
			<template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>No data available in table</p>
                    </div>
                </section>
            </template>
	        <template slot="detail" slot-scope="props">
               <div class="columns">
				    <div class="column">
				      <div class="box content">
				        <div class="media">
				          <div class="media-content">
				            <p class="title is-4 is-capitalized">Payment Details</p>
				            <p class="subtitle is-6">Bank, Bitcoin and Etherum</p>
				          </div>
				        </div>
				        <div class="media" v-if="props.row.bank_name">
				          <div class="media-left">
				            <p class="image is-32x32">
				              <img src="/images/general/bank.png">
				            </p>
				          </div>
				          <div class="media-content">
				            <div class="content">
				              <p>
				                {{props.row.bank_name}}
				              </p>
				            </div>
				          </div>
				        </div>
				        <div class="media" v-if="props.row.bank_account_name">
				          <div class="media-left">
				            <p class="image is-32x32">
				              <img src="/images/general/holder.png">
				            </p>
				          </div>
				          <div class="media-content">
				            <div class="content">
				              <p>
				                {{props.row.bank_account_name}}
				              </p>
				            </div>
				          </div>
				        </div>
				        <div class="media" v-if="props.row.bank_account_number">
				          <div class="media-left">
				            <p class="image is-32x32">
				              <img src="/images/general/account_number.png">
				            </p>
				          </div>
				          <div class="media-content">
				            <div class="content">
				              <p>
				                {{props.row.bank_account_number}}
				              </p>
				            </div>
				          </div>
				        </div>
				        <div class="media" v-if="props.row.bank_branch_name">
				          <div class="media-left">
				            <p class="image is-32x32">
				              <img src="/images/general/branch_name.png">
				            </p>
				          </div>
				          <div class="media-content">
				            <div class="content">
				              <p>
				                {{props.row.bank_branch_name}}
				              </p>
				            </div>
				          </div>
				        </div>
				        <div class="media" v-if="props.row.bank_branch_code">
				          <div class="media-left">
				            <p class="image is-32x32">
				              <img src="/images/general/code.png">
				            </p>
				          </div>
				          <div class="media-content">
				            <div class="content">
				              <p>
				                {{props.row.bank_branch_code}}
				              </p>
				            </div>
				          </div>
				        </div>
				        <div class="media" v-if="props.row.bank_account_type">
				          <div class="media-left">
				            <p class="image is-32x32">
				              <img src="/images/general/type.png">
				            </p>
				          </div>
				          <div class="media-content">
				            <div class="content">
				              <p>
				                {{props.row.bank_account_type}}
				              </p>
				            </div>
				          </div>
				        </div>
				        <div class="media" v-if="props.row.bitcoin_wallet">
				          <div class="media-left">
				            <p class="image is-32x32">
				              <img src="/images/general/bitcoin.jpg">
				            </p>
				          </div>
				          <div class="media-content">
				            <div class="content">
				              <p>
				                {{props.row.bitcoin_wallet}}
				              </p>
				            </div>
				          </div>
				        </div>
				        <div class="media" v-if="props.row.etherum_wallet">
				          <div class="media-left">
				            <p class="image is-32x32">
				              <img src="/images/general/etherum.png">
				            </p>
				          </div>
				          <div class="media-content">
				            <div class="content">
				              <p>
				                {{props.row.etherum_wallet}}
				              </p>
				            </div>
				          </div>
				        </div>
				      </div>
				    </div>
				    <div class="column">
				      <div class="box content">
				        <div class="media" v-if="props.row.name && props.row.username">
				          <div class="media-content">
				            <p class="title is-4 is-capitalized">{{props.row.name}}</p>
				            <p class="subtitle is-6">@{{props.row.username}}</p>
				            <div class="media"  v-if="props.row.cell && props.row.dialCode">
				              <div class="media-left">
				                <p class="image is-32x32">
				                  <img src="/images/general/phone.png">
				                </p>
				              </div>
				              <div class="media-content">
				                <div class="content">
				                  <p>
				                    {{ cell(props.row.dialCode, props.row.cell) }}
				                  </p>
				                </div>
				              </div>
				            </div>
				            <div class="media" v-if="props.row.email">
				              <div class="media-left">
				                <p class="image is-32x32">
				                  <img src="/images/general/mail.png">
				                </p>
				              </div>
				              <div class="media-content">
				                <div class="content">
				                  <p>
				                    {{props.row.email}}
				                  </p>
				                </div>
				              </div>
				            </div>
					        <div class="media" v-if="props.row.bank_name">
					          <div class="media-left">
					            <p class="image is-32x32">
					              <img src="/images/general/bank.png">
					            </p>
					          </div>
					          <div class="media-content">
					            <div class="content">
					              <p>
					                {{props.row.p_amount}}
					              </p>
					            </div>
					          </div>
					        </div>        
					        <div class="media" v-if="finalConversion[1] && props.row.bitcoin_wallet">
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
					        <div class="media" v-if="finalConversion[0] && props.row.etherum_wallet">
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
							<div class="media" v-if="status(props.row.p_endtimer)">
								<div class="media-content">
									<div class="field is-pulled-right">
							            <p class="control">
							                <button @click.prevent="secureDonation(data[0].pId)" class="button is-primary">
							                  Secure Donation
							                </button>
							            </p>				
									</div>				
								</div>			
							</div> 				            
				          </div>
				        </div>
				      </div>
				    </div>				                          	
               </div>	            	
	        </template>                                 
         </b-table>		
	</div>		
	</div>
</template>

<script>
import ProvideHelpService from '../../services/providehelpfactory'
import QuickView from '../Home/QuickView'

	export default{
		components: {QuickView},
		data(){
			return{
				data: [],
	            sortField: '',
	            sortOrder: 'desc',
	            isEmpty : false,
	            finalConversion: [],
	            crypto: [],
			}
		},
		created: function(){
			this.fetchPendingList(true);
			this.fetchCryptoRate();
		},		
		methods:{
			fetchPendingList: function($state){
				this.$store.commit('TOGGLE_ISLOADING', $state);
				ProvideHelpService.fetchPendingList(this);
				return;
			},
			fetchCryptoRate: function() {
				ProvideHelpService.fetchCryptoRate(this);
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
	        calendarTime: function(time) {
	        	if(time){
	        		return this.$moment(time).fromNow();
	        	}
	        },				
	        cell: function(dialcode, cell){
	        	var cell = '+'+dialcode+cell.substr(1);
	        	return cell;
	        },
            status: function(value){
            	var value = (value != undefined && value != null) ? this.$moment(value) : this.$moment();

            	if(this.$moment().format() >= value.format()){
            		return false;
            	}

            	return true;
            },
            secureDonation: function(){
            	var slug = this.data[0].pId;

				this.$store.commit('TOGGLE_ISLOADING', true);
				ProvideHelpService.secureDonation(this, {slug: slug});
				return;
            }	        			
		},
	    watch: {
	       isEmpty: function(newValue) {
	        this.$nextTick(() => {
	            this.$store.commit('CHANGE_PENDING_TRANSACTION_STATE', newValue);
	        })
	       } 
	    }		

	}
</script>