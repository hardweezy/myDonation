<template>
	<div>
		 <quick-view></quick-view>
	<div class="column">
        <b-table
            ref="table"
            :data="isEmpty ? [] : data"
            :hoverable="true"
            :mobile-cards="true"
            detailed
            detail-key="slug"
            >
            <template slot-scope="props">
                <b-table-column field="p_endtimer" label="Timer" sortable>
                    {{ calendarTime(props.row.p_endtimer) }}
                </b-table-column>                 
                <b-table-column field="slug" label="Ref" sortable>
                    {{ props.row.slug }}
                </b-table-column>
                <b-table-column field="lenders" label="Contributors" sortable>
                    {{ props.row.donators }}
                </b-table-column>                                 
                <b-table-column field="donations" label="Donations*" sortable>
                    <b>{{ props.row.donatedAmount }}</b>
                </b-table-column>                
                <b-table-column field="dream" label="Dream" sortable>
                    {{ props.row.dream_amount }}
                </b-table-column>
                <b-table-column field="payout" label="Interest" sortable>
                    {{ props.row.dream_interest }}
                </b-table-column>
                <b-table-column field="total" label="PayOut*" sortable>
                    {{ parseFloat(props.row.dream_amount) + parseFloat(props.row.dream_interest)}}
                </b-table-column>                                                                      
            </template>
			<template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>No pending payment awaiting your approval. Check back later</p>
                    </div>
                </section>
            </template> 
            <template slot="detail" slot-scope="props">
               <div class="columns">
                    <div class="column is-4" v-for="(item,index) in props.row.details" :key="index">
                      <div class="box content">
                        <div class="media" v-if="item.name && item.username">
                          <div class="media-content">
                            <p class="title is-4 is-capitalized">{{item.name}}</p>
                            <p class="subtitle is-6">@{{item.username}}</p>
                            <div class="media"  v-if="item.cell && item.dialCode">
                              <div class="media-left">
                                <p class="image is-32x32">
                                  <img src="/images/general/phone.png">
                                </p>
                              </div>
                              <div class="media-content">
                                <div class="content">
                                  <p>
                                    {{ cell(item.dialCode, item.cell) }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="media" v-if="item.email">
                              <div class="media-left">
                                <p class="image is-32x32">
                                  <img src="/images/general/mail.png">
                                </p>
                              </div>
                              <div class="media-content">
                                <div class="content">
                                  <p>
                                    {{item.email}}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="media" v-if="props.row.donatedAmount">
                              <div class="media-left">
                                <p class="image is-32x32">
                                  <img src="/images/general/bank.png">
                                </p>
                              </div>
                              <div class="media-content">
                                <div class="content">
                                  <p>
                                    {{item.p_amount}}
                                  </p>
                                </div>
                              </div>
                            </div>                                
                            <div class="media">
                                <div class="media-content">
                                    <div class="field is-pulled-right">
                                        <p class="control">
                                            <button class="button is-primary" @click.prevent="approveDonation(item, props.row)">
                                              Approve Donation
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
import QuickView from '../Home/QuickView'
import GetHelpService from '../../services/gethelpfactory'

export default{
	components: {QuickView},
	data(){
		return {
			data: [],
            approveDetails: [],
            sortField: '',
            sortOrder: 'desc',
            isEmpty : false,
            userData: [],
		}
	},
	created: function(){
		this.fetchPendingDonationList(true);
	},
	methods:{
		fetchPendingDonationList: function($state){
			this.$store.commit('TOGGLE_ISLOADING', $state);
			GetHelpService.fetchPendingDonationList(this);
			return;
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
        approveDonation: function(obj, fullObj) {
            if(typeof obj === 'object' && typeof fullObj === 'object'){
                
                let postData = fullObj;
                postData.details.length = 0;
                postData.details = obj;

                this.$store.commit('TOGGLE_ISLOADING', true);            
                this.$refs.table.toggleDetails(fullObj);      
                GetHelpService.approveDonation(this, postData);
                return;                
            }
        } 				
	},

    watch: {
       isEmpty: function(newValue) {
        this.$nextTick(() => {
            this.$store.commit('CHANGE_PENDING_CONFIRMATION_LIST_STATE', newValue);
        })
       }
    }
	
}
</script>