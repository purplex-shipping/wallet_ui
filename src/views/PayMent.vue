<template>
  <div class="d-flex flex-column justify-content-center align-items-center vh-100">

    <div class="card bg_black text-center mb-4">
      <div class="card-body">
        <p class="fs-4 fw-bold orange_color clickable_sign d-inline" @click="goBack"> 
          <i class="bi bi-arrow-left text-white text-start"></i>
          Back
        </p>
      </div>
    </div>

    <div class="text-center" v-if="loading">
      <p class="fs-5 fw-bold text-white"> 
        Select Payment Type
      </p>

      <button 
        type="button" 
        class="btn btn-lg orange_color border border-5 m-3" 
        @click="selectPayment('coin')"
        :class="{ 'faded': paymentMethod == 'coin' }"> 
        <i class="bi bi-currency-bitcoin"></i>
        <br>
        Bitcoin
      </button>

      <button 
        type="button" 
        class="btn btn-lg orange_color border border-5 m-3"
        @click="selectPayment('online')"
        :class="{ 'faded': paymentMethod == 'online' }"> 
        <i class="bi bi-cash-coin"></i>
        <br>
        Online
      </button>

      <div class="input-group mb-3 container">
        <span class="input-group-text fw-bold" id="inputGroup-sizing-default">Amount</span>
        <input 
          type="number" 
          class="form-control" 
          aria-label="Sizing example input" 
          aria-describedby="inputGroup-sizing-default" 
          v-model="amount">
      </div>

      <div class="d-grid gap-2 container" v-if="paymentMethod == 'online'">
        <button 
          class="btn bg_orange fw-bold text-white" 
          :disabled="amount < 50 && paymentMethod !== null"
          @click="makePayment" 
          type="button">
          Continue
          <i class="bi bi-arrow-right fw-bold"></i> 
        </button>
      </div>

      <div class="d-grid gap-2 container" v-if="paymentMethod == 'coin'">
        <button 
          class="btn bg_orange fw-bold text-white" 
          :disabled="amount < 50 && paymentMethod !== null"
          data-bs-toggle="modal" data-bs-target="#exampleModal"
          type="button">
          Continue
          <i class="bi bi-arrow-right fw-bold"></i> 
        </button>
      </div>
          
          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered"> <!-- Added 'modal-dialog-centered' -->
                  <div class="modal-content">
                      <div class="modal-header justify-content-center"> <!-- Center the header -->
                          <h2 class="modal-title text-center" id="exampleModalLabel">
                            <!--
                              <i class="bi bi-check-square-fill fw-5 orange_color"></i>
                          -->
                              <p class="fw-bold"> {{  'Make Payment' }} </p>
                          </h2>
                      </div>

                      <div class="modal-body text-center"> <!-- Center the body content -->

                        <ul class="list-group">
                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                  Amount 
                                  <span class="badge bg_orange_plain rounded-pill"> $ {{ amount }}</span>
                              </li>
                        </ul>  

                        <br>

                        <p> Send Bitcoin to the address below: <br>
                          <strong>{{ walletAddress }}</strong>
                          <br>
                          <!-- QR Code Canvas -->
                          <canvas ref="qrcode" class="qrcode"></canvas>
                        </p>

                        <p> You can pay {{ amount }} to the address above or pay any amount of your choice and it will trigger here </p>
                          
                      </div>

                      <div class="modal-footer justify-content-center"> <!-- Center the footer buttons -->
                          <button type="button" class="btn bg_orange_plain text-white fw-bold" data-bs-dismiss="modal"> Close </button>
                      </div>

                  </div>
              </div>
          </div>



    </div>

    

  
    <div class="loader-container" v-if="!loading">
      <PulseLoader :color="color" :size="size"></PulseLoader>
    </div>

  </div>
</template>

<script>
import { useAuthUser } from '@/store/authenticate';
import axiosInstance from '@/axiosInstance';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'; // Import PulseLoader component
import QRCode from 'qrcode'; // Import the QRCode library

export default {
  name: 'PayMent',

  components: {
    PulseLoader
  },

  data() {
    return {
      user: null,
      balance: 0,
      paymentConfirmed: false,
      clicked: false,
      paymentMethod: null,
      amount: 0,
      reference: '',
      loading: true, // Control loading state
      color: '#FF5733', // Loader color (replace with your desired color)
      size: '25px', // Loader size (adjust as needed)
      walletAddress: "bc1qrxymlcthzhtj5kzqjvt8yj7fhttg65ug3kf4gc",
      error: null,
      transactions: [],
    };
  },

  mounted() {
    this.getAuthUser();
    this.generateQRCode();
  },

  methods: {
    selectPayment(name) {
      this.paymentMethod = name;
    },

    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },

    generateQRCode() {
      QRCode.toCanvas(this.$refs.qrcode, this.walletAddress, (error) => {
        if (error) console.error('QR Code generation failed:', error);
      });
    },

    async recordDeposit(data) {
      try {
        const requestData = {
          amount: data.amount,
          transaction_id: data.tx_ref,
          payment_gateway: this.paymentMethod
        };
        const response = await axiosInstance.post('/wallet/deposit', requestData);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    async checkTransactions() {
      if (!this.walletAddress) {
        this.error = 'Wallet address not available. Please fetch the address first.';
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(
          `https://api.blockcypher.com/v1/btc/test3/addrs/${this.walletAddress}/full`
        ); // Using BlockCypher API for transaction data

        if (!response.ok) {
          throw new Error('Failed to fetch transaction data.');
        }

        const data = await response.json();
        if (data.txs && data.txs.length > 0) {
          this.transactions = data.txs.map((tx) => ({
            hash: tx.hash,
            total: tx.total,
            confirmed: tx.confirmations > 0,
          }));
        } else {
          this.transactions = [];
        }
      } catch (error) {
        this.error = 'Error checking transactions. Please try again later.';
        console.error('Error checking transactions:', error);
      } finally {
        this.loading = false;
      }
    },

    async getAuthUser() {
      await useAuthUser().fetchUserData();
      this.user = useAuthUser().userData;
      this.balance = useAuthUser().userBalance;
    },

    toast(type, message) {
      this.$toast.open({
        message: message,
        type: type,
        duration: 7000,
        dismissible: true,
        position: 'top-right',
      })
    },

    makePayment() {
      const prefix = 'txref-'; // Your desired prefix
      const randomString = Math.random().toString(36).substring(2, 10); // Generate a random alphanumeric string
      const timestamp = Date.now().toString().slice(-5); // Add part of a timestamp for uniqueness
      this.reference = `${prefix}${randomString}${timestamp}`;
      const self = this; // Store 'this' in a variable

      window.FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-02b9b5fc6406bd4a41c3ff141cc45e93-X",
        tx_ref: this.reference,
        amount: this.amount,
        currency: "NGN",
        payment_options: "card, banktransfer, ussd",

        customer: {
          email: this.user.email,
          name: this.user.name,
        },
        customizations: {
          title: "Deposit",
          description: "Paper Bill Deposit",
          logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
        },
        callback: function (data) {
          self.recordDeposit(data);
          self.$router.push({ name: 'home' });
          //console.log("payment callback:", data);
        },
        onclose: function () {
          //self.toast('error', 'Payment unsuccesfull')
          //console.log("Payment cancelled!");
        },
      });
    },
  }
}
</script>

<style scoped>
.faded {
  opacity: 0.5;
}

.bg_black {
  background-color: black;
}

.bg_orange_plain {
  background-color: #FF5733;
}

.orange_color {
  color: #FF5733;
}

.bg_orange {
  background-color: #FF5733;
}

.clickable_sign {
  cursor: pointer; /* Change the cursor to a pointer on hover */
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust height as needed for full-page centering */
}
</style>
