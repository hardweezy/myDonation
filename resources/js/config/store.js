import Vue from 'vue'
import Vuex from 'vuex'
import PersistedStorage from '../plugins/storage';
import menu from '../files/menu'

const $storage = new PersistedStorage();
var $menus = menu;

Vue.use(Vuex)


var fetchStorageItem = function(){
    var f = $storage.getItem('user_data', []);
        f =  (f !== null && f !== undefined && f.length) ? JSON.parse(f) : [];

    return f;
} 

var returnedMenu = function(){
    var u = fetchStorageItem();

    var hideMenu = ['tools', 'news', 'messages'];

    if(u.email_active == 1 && u.blacklist == 0){
      $menus.forEach(function(x,y){
        if(hideMenu.indexOf(x.name.toLowerCase()) == -1){
            if(x.userCanView == false){
              x.userCanView = true;
            }            
        }
      })
    }

    return $menus;
}

const state = {
    authenticated: !!$storage.getItem('token'),
    details : fetchStorageItem(),
    menus : returnedMenu(),
    isLoading: false,
    pendingDonationState : false,
    donationListState : false,
    pendingConfirmationState: false,
}

const mutations = {
    LOGIN_USER (state, payload) {
        state.authenticated = true;
        state.menus = returnedMenu();

        if(payload !== undefined && payload !== null){
            state.details = payload   
        }
    },
    
    LOGOUT_USER (state) {
        state.authenticated = false
        state.details = {}
    },

    ACTIVATE_USER(state){
        state.details = fetchStorageItem();
        state.menus = returnedMenu();
    },

    TOGGLE_ISLOADING(state,payload){
        if(payload !== undefined && payload !== null){
            state.isLoading = payload;   
        }else{
            state.isLoading = false;
        }        
    },

    SET_MENUS(state, menu, index) {
        state.menus[index] = menu;
    },

    CHANGE_MENU_STATE(state, index, newState){
        if(newState !== undefined && newState !== null){
            state.menus[index].isOpened = newState;
        }else{
            state.menus[index].isOpened = !state.menus[index].isOpened; 
        }
    },

    CHANGE_DONATION_LIST_STATE(state, payload){
        if(payload !== undefined && payload !== null){
            state.donationListState = payload;   
        }else{
            state.donationListState = false;
        }  
    },

    CHANGE_PENDING_CONFIRMATION_LIST_STATE(state, payload){
        if(payload !== undefined && payload !== null){
            state.pendingDonationState = payload;   
        }else{
            state.pendingDonationState = false;
        }  
    },
 
    CHANGE_PENDING_TRANSACTION_STATE(state, payload){
        if(payload !== undefined && payload !== null){
            state.pendingConfirmationState = payload;   
        }else{
            state.pendingConfirmationState = false;
        }  
    },           
}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    mutations
})