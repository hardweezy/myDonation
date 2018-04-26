<template>
	<div>
		 <quick-view></quick-view>
	<div class="column">
        <b-table
            :data="isEmpty ? [] : data"
            :hoverable="true"
            :mobile-cards="true"
            >
            <template slot-scope="props">
                <b-table-column field="slug" label="Ref" sortable>
                    {{ props.row.slug }}
                </b-table-column>
                <b-table-column field="name" label="Name" class="is-capitalized" sortable>
                    {{ props.row.name }}
                </b-table-column>                 
                <b-table-column field="username" label="Username" class="is-capitalized" sortable>
                    {{ props.row.username }}
                </b-table-column>  
                <b-table-column field="payout" label="Email" sortable>
                    {{ props.row.email }}
                </b-table-column>                              
                <b-table-column field="mobile" label="Mobile" sortable>
                    {{ cell(props.row.dialCode, props.row.cell) }}
                </b-table-column>               
                <b-table-column field="received" label="Received" sortable>
                    {{ props.row.d_amount }}
                </b-table-column>  
				<b-table-column field="action" label="">
                    <button class="button is-primary is-small" @click.prevent="goToDonate(props.row.slug)">Donate Now</button>
                </b-table-column>                                                                     
            </template>
			<template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>Nobody to donate to at this moment. Check back later</p>
                    </div>
                </section>
            </template>                       
         </b-table>		
	</div>
	</div>
</template>

<script>
import QuickView from '../Home/QuickView'
import ProvideHelpService from '../../services/providehelpfactory'

export default{
	components: {QuickView},
	data(){
		return {
			data: [],
            sortField: '',
            sortOrder: 'desc',
            isEmpty : false,
		}
	},
	created: function(){
		this.fetchDonationList(true);
	},
	methods:{
		fetchDonationList: function($state){
			this.$store.commit('TOGGLE_ISLOADING', $state);
			ProvideHelpService.fetchDonationList(this);
			return;
		},
        cell: function(dialcode, cell){
        	var cell = '+'+dialcode+cell.substr(1);
        	return cell;
        },
        goToDonate: function(slug) {
            if(slug) {
                this.$router.push({ path: `/view-donation/${slug}` });
            }
        }				
	},
    watch: {
       isEmpty: function(newValue) {
        this.$nextTick(() => {
            this.$store.commit('CHANGE_DONATION_LIST_STATE', newValue);
        })
       } 
    }    
	
}
</script>