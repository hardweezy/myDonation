
import Home from '../components/Home.vue'
import SecretQuote from '../components/SecretQuote.vue'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'

//Provide Help Components
import ProvideHelp from '../components/ProvideHelp.vue'
import Donate from '../components/ProvideHelp/Donate.vue'
import PendingTransaction from '../components/ProvideHelp/PendingTransaction.vue'
import ViewDonationDetails from '../components/ProvideHelp/ViewDonationDetails.vue'

//Get Help Components
import AllDreams from '../components/GetHelp/AllDreams.vue'
import WithdrawDreams from '../components/GetHelp/WithdrawDreams.vue'
import ConfirmPendingDonations from '../components/GetHelp/ConfirmPendingDonations.vue'

//General
import BankDetails from '../components/Profile/BankDetails.vue'



import AuthService from '../services/authfactory'

const routes = [
    {
      path: '/home',
      component: Home,
      beforeEnter: AuthService.requireAuth
    },
     {
      path: '/secretquote',    
      component: SecretQuote,
      beforeEnter: AuthService.requireAuth
    },
     {
      path: '/create-dream',    
      component: ProvideHelp,
      beforeEnter: AuthService.requireAuth
    },
     {
      path: '/donate',    
      component: Donate,
      beforeEnter: AuthService.requireAuthAndRestriction
    },    
    {
      path: '/view-dreams',    
      component: AllDreams,
      beforeEnter: AuthService.requireAuthAndRestriction
    },
    {
      path: '/view-withdraw',    
      component: WithdrawDreams,
      beforeEnter: AuthService.requireAuthAndRestriction
    },
    {
      path: '/pending-transactions',    
      component: PendingTransaction,
      beforeEnter: AuthService.requireAuthAndRestriction
    },  
    {
      path: '/view-donation/:id',    
      component: ViewDonationDetails,
      beforeEnter: AuthService.requireAuthAndRestriction
    },
    {
      path: '/donations-dashboard',    
      component: ConfirmPendingDonations,
      beforeEnter: AuthService.requireAuthAndRestriction
    },
    {
      path: '/payment-details',    
      component: BankDetails,
      beforeEnter: AuthService.requireAuthAndRestriction
    },    
    {
      path: '/login',    
      component: Login,
    },    
    {
      path: '/signup',    
      component: Signup
    },
    {
      path: '*',
      redirect: '/home'
    }
  ];

export default routes
