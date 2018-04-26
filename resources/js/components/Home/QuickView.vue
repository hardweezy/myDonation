<template>
	<div class="column">
        <div class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">{{abbr(data.earnings)}}</p>
                <p class="subtitle">EARNINGS</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">{{abbr(data.fundsPaid)}}</p>
                <p class="subtitle">FUNDS PAID</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">{{abbr(data.fundsKept)}}</p>
                <p class="subtitle">FUNDS KEPT</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">{{abbr(data.balance)}}</p>
                <p class="subtitle">BALANCE</p>
              </article>
            </div>
          </div>
        </div>
	</div>
</template>


<script>
import HomeService from '../../services/homefactory'
import $util from '../../plugins/util'

	export default{
		data(){
			return{
        data: {
          earnings : '...',         
          fundsKept : '...',
          fundsPaid : '...',
          balance : '...',
        }
			}
		},
		methods:{
      getQuickData: function(){
        HomeService.getQuickData(this)
      },
      abbr: function(number){
        return $util.abbrNum(number,3);
      }
		},

    created: function() {
      this.getQuickData();
    }
	}
</script>