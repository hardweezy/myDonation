<template>
  <div  class="column is-6">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Create Dream
        </p>
      </header>
      <div class="card-content">
        <form @submit.prevent="addDream($event)">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">My dream</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <b-field>
                    <b-input 
                      placeholder="House, car, renovation etc"
                      v-model="title"
                      required></b-input>
                  </b-field>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Duration amount</label>                
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <b-select 
                    required
                    v-model="dream"
                    >
                    <option v-for="opt in duration" :value="opt">{{opt.amount}} wait for {{opt.month}} {{opt.month > 1 ? 'months':'month'}}</option>
                  </b-select>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Dream interest</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <b-field>
                    <b-input 
                      v-model="dream.totalInterest"
                      disabled></b-input>
                  </b-field>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Payout amount</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <b-field>
                    <b-input 
                      v-model="dream.totalAmount"
                      disabled></b-input>
                  </b-field>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Mature on</label>                
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <b-field>
                    <b-input 
                      v-model="dream.matureFormat"
                      disabled></b-input>
                  </b-field>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-grouped is-grouped-centered">
            <p class="control">
              <button class="button is-primary">
              Add Dream
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ProvideHelpService from '../../services/providehelpfactory'

  export default {
    data() {
      return {
        dream: {},
        title: ''
      }
    },
    computed: {
      duration: function () {
        var $this = this;

        var $duration = [200, 500, 1000, 1500, 2000, 5000, 8000, 10000, 12000, 15000, 18000, 20000, 22000, 25000, 50000]
        var $loopedDuration = [];
        var $n = 1;
        var $r = 100;
        for (var p = 0; p < $duration.length; p++) {
          for (var t = 1; t <= 4; t++) {

            //Object Population happens here
            var $totalAmount = ($duration[p] * Math.pow((1 + ($r / ($n * 100))), ($n * t)));
            var $totalInterest = ($totalAmount - $duration[p]);
            var $matureDate = $this.$moment().add(t, 'months').format();
            var $matureFormat = $this.$moment().add(t, 'months').format('MMMM D, YYYY');
            
            //object creation happens here
            $loopedDuration.push({
              amount: $duration[p],
              month: t,
              totalAmount: $totalAmount,
              totalInterest: $totalInterest,
              matureDate: $matureDate,
              matureFormat: $matureFormat
            });
          }
        }

        $this.dream = $loopedDuration[0];
        return $loopedDuration;
      }
    },
    methods: {
      addDream: function (event) {
        event.preventDefault();

        var $s = Object.assign({}, {title: this.title}, this.dream);
        if($s.title && $s.title.length){
          ProvideHelpService.createDream(this, $s, 'view-dreams');
        }
      }
    },

  }
</script>