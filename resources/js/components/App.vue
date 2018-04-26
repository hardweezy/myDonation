<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav id="sidebar" 
      :class="{'active':active}" 
      v-if="user.authenticated">
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <h3 class="is-capitalized">{{$store.state.details.name}}</h3>
        <strong class="is-uppercase">{{$store.state.details.username.charAt(0)}}</strong>
      </div>
      <!-- Sidebar Links -->
      <transition-group 
        tag="ul" 
        class="list-unstyled components" 
        name="company" 
        v-if="!active">
        <li v-for="(menu,index) in menus" 
          v-if="menu.userCanView" 
          class="active" 
          :key="index">
          <a @click.stop="routeView(menu, index, $event)">
            <i :class="menu.icon" v-if="menu.icon"></i>
            {{menu.name}}
            <span class="pull-right">
            <i class="ti-angle-down" v-if="menu.isMultiLevel && !menu.isOpened"></i>
            <i class="ti-angle-up" v-if="menu.isMultiLevel && menu.isOpened"></i>
            </span>
            <ul class="list-unstyled" :id="index" v-if="menu.isMultiLevel && menu.isOpened">
              <li v-for="subMenu in menu.level">
          <a @click.stop="routeView(subMenu, index, $event, true)">{{subMenu.name}}</a></li>
          </ul>
          </a>
        </li>
      </transition-group>
      <transition-group 
        tag="ul" 
        class="list-unstyled components" 
        name="company" 
        v-else>
        <li v-for="(menu,index) in menus" 
          v-if="menu.userCanView" 
          class="active" 
          :key="menu.name">
          <a @click.stop="routeView(menu, index, $event)">
            <i :class="menu.icon" v-if="menu.icon"></i>
            <ul class="list-unstyled" :id="index" v-if="menu.isMultiLevel && menu.isOpened">
              <li v-for="subMenu in menu.level">
          <a @click.stop="routeView(subMenu, index, $event, true)">{{subMenu.name}}</a></li>
          </ul>
          </a>
        </li>
      </transition-group>
    </nav>
    <!-- Page Content -->
    <div id="content">
      <section class="hero is-fullwidth is-default" 
        :class="{'is-fullheight': !user.authenticated}">
        <div class="hero-head navbar has-shadow" 
          v-if="user.authenticated">
          <input type="checkbox" 
            :checked="active" 
            @click.stop="toggleSidebar">
          <div class="hamburger"></div>
        </div>
        <div class="hero-body" 
          :class="{'is-paddingless':user.authenticated}">
          <div class="hero is-info welcome is-small" 
            :class="{'is-hidden':!user.authenticated}">
            <div class="hero-body">
              <div class="is-pulled-left">
                <h1 class="title is-capitalized">
                  Hello, {{user.details.username}}.
                </h1>
                <h2 class="subtitle">
                  I hope you are having a great day?
                </h2>
              </div>
            </div>
          </div>
          <router-view></router-view>
        </div>
        <div class="hero-foot" v-if="!user.authenticated">
          <div class="container">
            <div class="tabs is-pulled-left">
              <ul>
                <li><a>ABOUT US</a></li>
                <li><a>SUPPORT</a></li>
              </ul>
            </div>
            <div class="tabs is-pulled-right">
              <ul>
                <li><a>&copy; 2018 - Hustler's Zone</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <b-loading :active.sync="$store.state.isLoading" :canCancel="false"></b-loading>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/authfactory'

export default {
  data() {
    return {
      user: this.$store.state,
      menus: this.$store.state.menus,
      active: false
    }
  },
  methods: {

    routeView(menu, index, event, subChild) {
      event.stopPropagation();
      
      if (subChild !== undefined && subChild !== null) {
        if (menu.url !== "#") {
          this.$router.push(menu.url);
          return;
        }
      } else {
        for (var i = 0; i < this.menus.length; i++) {
          if (this.menus[i] !== this.menus[index] && this.menus[i].isOpened) {
            this.$store.commit('CHANGE_MENU_STATE', i);
          }
        }
        if (menu.isMultiLevel) {
          if (menu.isOpened) {
            this.$store.commit('CHANGE_MENU_STATE', index, false);
          } else {
            this.$store.commit('CHANGE_MENU_STATE', index, true);
          }
          return;
        } else {
          if (menu.url == "logout") {
            AuthService.logout(this);
          } else {
            this.$router.push(menu.url);
          }
          return;
        }
      }
    },

    toggleSidebar(event) {
      event.stopPropagation();
      this.active = !this.active;
      return;
    }
  },
  
  watch: {
    active: function (newValue) {
      this.$nextTick(() => {
        for (var i = 0; i < this.menus.length; i++) {
          if (this.menus[i].isOpened) {
            this.$store.commit('CHANGE_MENU_STATE', i, false);
          }
        }
      })
    }
  }
}
</script>
