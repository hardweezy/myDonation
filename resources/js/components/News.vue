<template>
  <div class="column">
    <div class="columns is-multiline">
      <referral></referral>
      <div class="column is-4"  v-for="item in news">
        <div class="card article">
          <div class="card-content">
            <img :src="item.image"  alt="Placeholder image">
            <div class="media">
              <!-- <div class="media-center">
                <img :src="item.image" class="author-image" alt="Placeholder image">
                </div> -->
              <div class="media-content has-text-centered">
                <p class="title article-title">{{item.title}}</p>
              </div>
            </div>
            <div class="content article-body" v-html="item.description">
            </div>
          </div>
          <footer class="card-footer" v-if="item.button">
            <router-link :to="item.url" class="card-footer-item is-uppercase">{{item.button}}</router-link>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import news from '../files/news'
import Referral from './Referral'

export default{
  components: {Referral},
	data(){
		return{
			news: news
		}
	}
}
</script>