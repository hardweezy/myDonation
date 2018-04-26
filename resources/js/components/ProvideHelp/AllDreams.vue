<template>
	<div   class="column">
        <b-table
            :data="isEmpty ? [] : data"
            :hoverable="true"
            :mobile-cards="true"

            paginated
            backend-pagination
            :total="meta.total"
            :per-page="meta.per_page"
            @page-change="onPageChange"
            >
            <template slot-scope="props">
                <b-table-column field="slug" label="Ref" sortable>
                    {{ props.row.slug }}
                </b-table-column>
                <b-table-column field="title" label="Title" sortable>
                    {{ props.row.dream_title }}
                </b-table-column>               
                <b-table-column field="amount" label="Donation" sortable>
                    {{ props.row.dream_amount }}
                </b-table-column>
                <b-table-column field="period" label="Period" sortable>
                    {{ props.row.dream_duration }}
                </b-table-column>                
                <b-table-column field="interest" label="Interest" sortable>
                    {{ props.row.dream_interest }}
                </b-table-column>  
                <b-table-column field="payout" label="Pay Out" sortable>
                    {{ props.row.dream_payout }}
                </b-table-column>
                <b-table-column field="maturity date" label="Mature On" sortable>
                    {{ props.row.dream_matured_date | moment('MMMM D, YYYY') }}
                </b-table-column>
                <b-table-column field="action" label="Status" sortable>
                    <span class="tag is-success click-status" v-if="status(props.row.dream_matured_date)">
                        {{ 'Witdraw' }}
                    </span>
                    <span class="tag is-danger click-status" v-else>
                        {{ 'Pending' }}
                    </span>                    
                </b-table-column>                                                                      
            </template>
			<template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>No data available in table</p>
                    </div>
                </section>
            </template>                       
         </b-table>		
	</div>
</template>

<script>
import DreamService from '../../services/dreamfactory'

	export default{
		data(){
			return{
				data : [],
				meta : {},
                sortField: '',
                sortOrder: 'desc',
                isEmpty : false,								
			}
		},
		beforeCreate: function(){

		},
		created: function(){
			this.fetchAllDonations();
		},
		methods:{
			fetchAllDonations: function($perpage, $fetchCount){
				this.$store.commit('TOGGLE_ISLOADING', true);
				DreamService.fetchAllDreams(this, {page : $perpage, fetchCount: $fetchCount});
				return;

			},

            onSort(field, order) {
                this.sortField = field
                this.sortOrder = order
                this.fetchAllDonations(this.meta.current_page)
            },

            status: function(value){
            	var value = (value != undefined && value != null) ? this.$moment(value) : this.$moment();

            	if(this.$moment().format() >= value.format()){
            		return true;
            	}

            	return false;
            },

            onPageChange(page) {
                this.meta.current_page = page
                this.fetchAllDonations(this.meta.current_page)
            },            			
		}
	}
</script>