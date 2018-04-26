<template>
  <div class="column is-7">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Create Payment Details
        </p>
      </header>
      <header class="card-header">
        <div class="card-header-title is-pull-right">
          <b-checkbox v-model="checkboxGroup"
            native-value="Bank">
            Bank Account
          </b-checkbox>
          <b-checkbox v-model="checkboxGroup"
            native-value="Bitcoin">
            Bitcoin 
          </b-checkbox>
          <b-checkbox v-model="checkboxGroup"
            native-value="Etherum">
            Etherum
          </b-checkbox>
        </div>
      </header>
      <div class="card-content">
        <form @submit.prevent="addAccount($event)">
          <div class="fields" style="margin-bottom: 0.75rem !important;" v-if="addRequiredOption('Bank')">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Bank Name</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded">
                    <b-select 
                      required
                      v-model="bankObj.name"
                      >
                      <option disabled value="">-Select Bank Name-</option>
                      <option value="ABSA">ABSA</option>
                      <option value="African Bank">African Bank</option>
                      <option value="Bidvest">Bidvest</option>
                      <option value="Capitec">Capitec</option>
                      <option value="FNB">FNB</option>
                      <option value="Investec">Investec</option>
                      <option value="Nedbank">Nedbank</option>
                      <option value="Sasfin">Sasfin</option>
                      <option value="Standard Bank">Standard Bank</option>
                      <option value="Teba">Teba</option>
                      <option value="Ubank">Ubank</option>
                    </b-select>
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Account Holder</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded">
                    <b-field>
                      <b-input 
                        placeholder="Adam Doe"
                        v-model="bankObj.holder"
                        :required="addRequiredOption('Bank')"></b-input>
                    </b-field>
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Account Number</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded">
                    <b-field>
                      <b-input 
                        v-model="bankObj.number"
                        :required="addRequiredOption('Bank')"></b-input>
                    </b-field>
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Branch Name</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded">
                    <b-field>
                      <b-input 
                        v-model="bankObj.branchName"
                        :required="addRequiredOption('Bank')"></b-input>
                    </b-field>
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Branch Code</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded">
                    <b-field>
                      <b-input 
                        v-model="bankObj.branchCode"
                        :required="addRequiredOption('Bank')"></b-input>
                    </b-field>
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Type</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded">
                    <b-select 
                      v-model="bankObj.accountType"
                      >
                      <option disabled value="">Select Account Type</option>
                      <option value="Savings Account">Savings Account</option>
                      <option value="Current Account">Current Account</option>
                      <option value="Cheque Account">Cheque Account</option>
                      <option value="Investment Account">Investment Account</option>
                    </b-select>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal" v-if="addRequiredOption('Bitcoin')">
            <div class="field-label is-normal">
              <label class="label">Bitcoin Address</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <b-field>
                    <b-input
                      v-model="bitcoinObj.bitcoinWallet" 
                      :required="addRequiredOption('Bitcoin')"></b-input>
                  </b-field>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal" v-if="addRequiredOption('Etherum')">
            <div class="field-label is-normal">
              <label class="label">Etherum Address</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <b-field>
                    <b-input
                      v-model="etherumObj.etherumWallet"
                      :required="addRequiredOption('Etherum')"></b-input>
                  </b-field>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-grouped is-grouped-centered" v-if="checkboxGroup.length">
            <p class="control">
              <button class="button is-primary">
              Create Payment Account
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentService from '../../services/paymentfactory'
export default {
  data() {
    return {
      checkboxGroup: ['Bank'],
      bankObj: {
        name: '',
        holder: '',
        number: '',
        branchName: '',
        branchCode: '',
        accountType: '',
      },
      bitcoinObj: {
        bitcoinWallet: ''
      },
      etherumObj: {
        etherumWallet: ''
      }
    }
  },
  methods: {
    addRequiredOption: function (item) {
      if (this.checkboxGroup.indexOf(item) !== -1) {
        return true;
      }
      return false;
    },
    mergeObject: function () {
      return Object.assign({}, this.bankObj, this.bitcoinObj, this.etherumObj);
    },
    addAccount: function (event) {
      event.preventDefault();
      this.$store.commit('TOGGLE_ISLOADING', true);
      PaymentService.createPaymentAccount(this, this.mergeObject())
    },
    checkLastValue: function (value, oldValue) {
      if (value.length < 1) {
        return this.checkboxGroup[0] = oldValue[0];
      }
    }
  },
  watch: {
    checkboxGroup: function (newValue, oldValue) {
      var $this = this;
      $this.checkLastValue(newValue, oldValue);
      this.$nextTick(() => {
        if (newValue.indexOf('Bank') === -1) {
          $this.bankObj = {
            name: '',
            holder: '',
            number: '',
            branchName: '',
            branchCode: '',
            accountType: '',
          }
        }
        if (newValue.indexOf('Bitcoin') === -1) {
          $this.bitcoinObj = {
            bitcoinWallet: ''
          }
        }
        if (newValue.indexOf('Etherum') === -1) {
          $this.etherumObj = {
            etherumWallet: ''
          }
        }
      })
    }
  }
}
</script>