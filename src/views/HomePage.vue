


<template>
  <br>
  <div class="" v-if="loading == false">
      <div class="container">
          <div class="row">
              <div class="col-10">
                  <p class="fw-bold text-white fs-3"> Welcome {{ user.name }}</p>
              </div>
              <div class="col-2">
                  <i class="bi bi-bell-fill fs-3 text-white text-end clickable_sign"></i>
              </div>
          </div>
      </div>
  
      <div class="container"> 
          <br>
          <div class="card bg_orange box">
              <div class="card-body">
                  <div class="row">
                      <div class="col-10">
                          <p class="fs-6 fw-bold text-white"> 
                              <span> Balance </span> 
                              <i class="bi bi-eye-fill text-white fs-5 clickable_sign ml-2" @click="hideBalance"></i>
                              <br>
                              <span v-if="hide == false"> ₦ {{ balance }} </span>
                              <span v-if="hide == true">
                                  <i class="bi bi-asterisk"></i>
                                  <i class="bi bi-asterisk"></i>
                                  <i class="bi bi-asterisk"></i>
                                  <i class="bi bi-asterisk"></i>
                              </span>
                          </p>
                      </div>
                      <div class="col-2">
                          <i class="bi bi-plus-square-fill fs-1 text-white clickable_sign" @click="paymentRoute"> </i> 
                      </div>
                  </div>
              </div>
          </div>
      </div>
  
      <div class="container">
          <br>
          <p class="fw-bold fs-4 text-white"> Services </p>
          <ul class="nav nav-pills nav-fill">
              <li class="nav-item fw-bold border-radius m-3 clickable_sign" 
                  v-for="category in sliceCategoriesOne" 
                  :key="category.id" @click="goToService(category.identifier)">
                  <i class="bi bi-phone-fill fs-1 orange_color" v-if="category.identifier == 'airtime'"></i> 
                  <i class="bi bi-wifi fs-1 orange_color" v-if="category.identifier == 'data'"></i> 
                  <i class="bi bi-tv fs-1 orange_color" v-if="category.identifier == 'tv-subscription'"></i> 
                  <br>
                  <span class="orange_color"> {{ category.name }} </span>
              </li>
          </ul>
          <ul class="nav nav-pills nav-fill">
              <li class="nav-item fw-bold border-radius m-3 clickable_sign" 
                  v-for="category in sliceCategoriesTwo" 
                  :key="category.id" @click="goToService(category.identifier)">
                  <i class="bi bi-lightning-charge-fill fs-1 orange_color" v-if="category.identifier == 'electricity-bill'"></i> 
                  <i class="bi bi-book fs-1 orange_color " v-if="category.identifier == 'education'"></i> 
                  <br>
                  <span class="orange_color"> {{ category.name }} </span>
              </li>
          </ul>
      </div>
  
      <div class="container"> 
          <p class="fw-bold fs-4 text-white"> Recent Transaction </p>
          <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center bg_black clickable_sign m-1" 
                  v-for="(transaction, index) in transactions.data" :key="index" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="fetchSingleTransaction(transaction.id)">
                  <i class="bi bi-arrow-down-left-circle-fill"
                      :class="transaction.type == 'deposit' ? 'text-success' : 'orange_color'"> 
                      <span class="text-white fw-bold"> 
                          {{ transaction.transaction_type }}
                          <br>
                          <span class="text-white form-text"> {{ formatTime(transaction.created_at) }} </span>
                      </span>
                  </i>   
                  <span class="badge"
                      :class="transaction.type == 'deposit' ? 'bg-success' : 'bg_orange_plain'">
                      {{ transaction.type == 'deposit' ? `+${transaction.amount}` : `-${transaction.amount}`}}
                  </span>
              </li>
          </ul>
  
          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered"> <!-- Added 'modal-dialog-centered' -->
                  <div class="modal-content">
                      <div class="modal-header justify-content-center"> <!-- Center the header -->
                          <h2 class="modal-title text-center" id="exampleModalLabel">
                              <i class="bi bi-check-square-fill fw-5 orange_color"></i>
                              <p class="fw-lighter"> Success! </p>
                          </h2>
                      </div>
                      <div class="modal-body text-center"> <!-- Center the body content -->
                          <ul class="list-group">
                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                  Ref Number
                                  <span class="badge bg_orange_plain rounded-pill"> {{ viewTransaction.transaction_id }}</span>
                              </li>
                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                  Payment Service
                                  <span class="badge bg_orange_plain rounded-pill"> {{ viewTransaction.transaction_type }} / {{ viewTransaction.description }} </span>
                              </li>
                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                  Payment Date
                                  <span class="badge bg_orange_plain rounded-pill"> {{ formatTime(viewTransaction.created_at) }}</span>
                              </li>
                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                  Payment Amount
                                  <span class="badge bg_orange_plain rounded-pill"> {{ viewTransaction.amount }}</span>
                              </li>
                          </ul>   
                      </div>
                      <div class="modal-footer justify-content-center"> <!-- Center the footer buttons -->
                          <button type="button" class="btn bg_orange_plain text-white fw-bold" data-bs-dismiss="modal"> Close </button>
                      </div>
                  </div>
              </div>
          </div>
  
          <br>
          <br>
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
  import moment from 'moment';
  
  export default {
      name: 'HomePage',
  
      components: {
          PulseLoader
      },
    
      data() {
          return {
              user: {},
              categories: null,
              sliceCategoriesOne: null,
              sliceCategoriesTwo: null,
              balance: 0,
              hide: false,
              transactions: [],
              viewTransaction: {},
  
              loading: true, // Control loading state
              color: '#FF5733', // Loader color (replace with your desired color)
              size: '25px' // Loader size (adjust as needed)
          };
      },
    
      mounted() {
          this.getAuthUser();
          this.fetchCategories();
          this.fetchCTransactions();
      },
  
      methods: {
        
          formatTime(time) {
              // Format time as 'May 04, 2024 9:40AM'
              return moment(time).format('MMM DD, YYYY h:mma');
          },
  
          hideBalance() {
              this.hide = !this.hide;
          },
  
          navigateToTransaction() {
              this.$router.push({ name: 'transaction' });
          },
  
          paymentRoute() {
              this.$router.push({ name: 'payment' });
          },
  
          fetchCategories() {
              axiosInstance.get('/services')
                  .then(response => {
                      this.categories = response.data; // Assuming API returns an array of categories
                      this.sliceCategoriesOne = this.categories.content.slice(0, 3);
                      this.sliceCategoriesTwo = this.categories.content.slice(3, 5);
                      this.loading = false;
                  })
                  .catch(error => {
                      console.error('Error fetching categories:', error);
                      this.loading = false;
                  });
          },
  
          fetchCTransactions() {
              axiosInstance.get('/wallet/transactions')
                  .then(response => {
                      this.transactions = response.data.data; // Assuming API returns an array of transactions
                  })
                  .catch(error => {
                      console.error('Error fetching transactions:', error);
                  });
          },
  
          fetchSingleTransaction(id) {
              axiosInstance.get(`/wallet/transaction/${id}`)
                  .then(response => {
                      this.viewTransaction = response.data.data; // Assuming API returns the transaction details
                  })
                  .catch(error => {
                      console.error('Error fetching transactions:', error);
                  });
          },
  
          async getAuthUser() {
              await useAuthUser().fetchUserData();
              this.user = useAuthUser().userData;
              this.balance = useAuthUser().userBalance;
          },
  
          goToService(name) {
             this.$router.push({ name: name, params: { service: name } });
          }

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