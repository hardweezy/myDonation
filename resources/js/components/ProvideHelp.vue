<template>
	<div>
    <account-verification v-if="$store.state.details.email_active == 0"></account-verification>
    <payment-details v-else-if="$store.state.details.email_active == 1 && $store.state.details.member_active == 0"></payment-details>
    <create-dream v-else></create-dream>

	</div>
</template>


<script>
import CreateDream from './ProvideHelp/CreateDream'
import AccountVerification from './Home/AccountVerification'
import PaymentDetails from './Home/PaymentDetails'

	export default{
  components: {AccountVerification, 
CreateDream, PaymentDetails},


	methods:{
		  // beforeCreate: function(){
		  //   if (this.$store.state.authenticated) {
		  //       this.$router.back();
		  //   }
		  // },		
	}		
	}
</script>