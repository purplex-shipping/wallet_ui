<template>

  <br>
  
  <div class="" v-if="loading == false">
      <div class="container">
          <div class="row">
              <div class="col-10">
                  <p class="fw-bold text-white fs-3"> Welcome {{ user.name.split(' ')[0] }}</p>
              </div>
          
          </div>
      </div>
  
      <div class="container" v-for="wallet in user.wallets" :key="wallet.id"> 
        <br>
          <div class="card bg_orange box">
              <div class="card-body">
                  <div class="row">
                      <div class="col-10">
                          <p class="fs-6 fw-bold text-white"> 
                              <span> Balance </span> 
                              <br>
                              <span> {{ wallet.currency }} {{ wallet.balance }} </span>
                           
                          </p>
                      </div>
                      <div class="col-2">
                          <i class="bi bi-plus-square-fill fs-1 text-white m-3 clickable_sign" data-bs-toggle="modal" data-bs-target="#depositModal" @click="pickWallet(wallet.currency)"> </i> 
                          <i class="bi bi-send fs-1 text-white m-3 clickable_sign" data-bs-toggle="modal" data-bs-target="#transferModal" @click="pickWallet(wallet.currency)"> </i> 
                      </div>
                  </div>
              </div>
          </div>
      </div>



      <!-- Modal One-->
<div class="modal fade" id="depositModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Deposit Payment </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeButton" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <input type="number" class="form-control" placeholder="Amount" v-model="amount">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" @click="deposit"> Deposit </button>
      </div>
    </div>
  </div>
</div>



      <!-- Modal Two-->
      <div class="modal fade" id="transferModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel"> Transfer {{ this.currency }} </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeButtonTwo" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <input type="number" class="form-control" placeholder="Amount" v-model="amount">
        <br>
        <input type="email" class="form-control" placeholder="Recipent Email" v-model="recipentEmail">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" @click="transfer"> Transfer </button>
      </div>
    </div>
  </div>
</div>


  
  </div>
  
  <div class="loader-container" v-if="loading == true">
      <div class="text-white fs-5"> <!-- Loading... --> </div> <!-- Add loading message -->
      <PulseLoader :color="color" :size="size"></PulseLoader>
  </div>

  </template>
  
  <script>
  import { useAuthUser } from '@/store/authenticate';
  import axiosInstance from '@/axiosInstance';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'; // Import PulseLoader component
  
  export default {
      name: 'HomePage',
  
      components: {
          PulseLoader
      },
    
      data() {
          return {
              user: {},
              amount: null,
              recipentEmail: null,
              currency: null,
  
              loading: true, // Control loading state
              color: '#FF5733', // Loader color (replace with your desired color)
              size: '25px' // Loader size (adjust as needed)
          };
      },
    
      mounted() {
          this.getAuthUser();
      },
  
      methods: {

        pickWallet(currency) {
            this.currency = currency
        },
  
          async getAuthUser() {
              await useAuthUser().fetchUserData();
              this.user = useAuthUser().userData;
              this.loading = false;
          },

    async deposit() {
      try {
        const requestData = {
          amount: this.amount,
          currency: this.currency,
        };
        const response = await axiosInstance.post('/deposit', requestData);
        console.log(response);
        this.$refs.closeButton.click();
        this.getAuthUser()
      } catch (error) {
        console.log(error);
      }
    },

    async transfer() {
      try {
        const requestData = {
          amount: this.amount,
          currency: this.currency,
          recipient_email: this.recipentEmail
        };
        const response = await axiosInstance.post('/transfer', requestData);
        console.log(response);
        this.$refs.closeButtonTwo.click();
        this.getAuthUser()
      } catch (error) {
        console.log(error);
      }
    },
  
    }
  
  }
  </script>


<style scoped>

.bg_orange {
  background-color: #FF5733;
  box-shadow: 5px 5px 10px #FF5733; /* Add a background shadow */
}

.bg_orange_plain {
  background-color: #FF5733;
}

.bg_black {
  background-color: #2D2C2D;
}

.clickable_sign {
    cursor: pointer; /* Change the cursor to a pointer on hover */
}

.orange_color {
    color: #FF5733;
}

.border-radius {
    border: 5px solid #fff;
    border-radius: 5px;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust height as needed for full-page centering */
}

</style>