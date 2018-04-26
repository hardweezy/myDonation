<template>
<div>
    <pending-transaction v-if="!$store.state.pendingConfirmationState"></pending-transaction>
    <confirm-pending-donations v-else-if="!$store.state.pendingDonationState"></confirm-pending-donations>  
    <donate v-else-if="!$store.state.donationListState"></donate>
    <quick-view v-else></quick-view>
    <news></news>
</div>
</template>

<script>
import AuthService from '../services/authfactory'
import Donate from './ProvideHelp/Donate'
import PendingTransaction from './ProvideHelp/PendingTransaction'
import ConfirmPendingDonations from './GetHelp/ConfirmPendingDonations'
import News from './News'
import QuickView from './Home/QuickView'


export default {
  components: {Donate, News, ConfirmPendingDonations, QuickView, PendingTransaction},
  data() {
    return {
      quote: '',
      user: this.$store.state,
    }
  },

  methods: {

  },


}
</script>