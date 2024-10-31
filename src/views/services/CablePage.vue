<template>
    <div v-if="loading" class="loader-container">
      <PulseLoader :color="color" :size="size" />
    </div>
  
    <div v-else class="container my-5">
      <div class="card bg_black text-center mx-auto" style="max-width: 600px;">
        <div class="card-body">
          <!-- Go Back -->
          <p class="fs-4 fw-bold orange_color clickable_sign text-center" @click="goBack">
            <i class="bi bi-arrow-left text-white"></i> Cable TV
          </p>
  
          <!-- Select Provider -->
          <div class="row justify-content-center g-2 mb-4">
            <p class="fs-5 fw-bold text-white">Select Provider</p>
            <div
              class="col-3 clickable_sign"
              v-for="(data, index) in listDataProvider"
              :key="index"
              @click="handleProviderClick(index, data.serviceID)">
              <img
                :src="data.image"
                class="img-thumbnail"
                :class="{ 'faded': selectedImage === index }"
                alt="Provider">
            </div>
          </div>
  
          <!-- Select Amount -->
          <div class="row justify-content-center g-3 mb-4">
            <p class="fs-5 fw-bold text-white">Select Cable Plan</p>
            <div class="col-6" v-for="(data, index) in  listDataVariation" :key="index" @click="handleDataClick(index, data.variation_amount, data.variation_code)">
              <div class="card clickable_sign"
              :class="{ 'faded': selectData == index }">
                <div class="card-body fs-5 fw-bold orange_color">
                  {{ data.name }}
                </div>
              </div>
            </div>
          </div>
  
          <!-- Inputs -->
          <input type="number" class="form-control mb-2" placeholder="Enter Smart Card Number" v-model="smartCard" @input="verifyMerchant">
          <input type="number" class="form-control mb-3" placeholder="Enter Phone" v-model="phoneNumber">
  
          <!-- Continue Button -->
          <div class="d-grid gap-2">
            <button
              class="btn bg_orange fw-bold text-white"
              type="button"
              ref="closeButton" 
              :disabled="dataAmount < 50 || phoneNumber.length < 10"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal">
              
              Continue <i class="bi bi-arrow-right fw-bold"></i>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content text-center">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel"> {{ dataAmount > balance ? 'Insufficient Funds Deposit' : 'Make Payment' }}</h1>
            </div>
            <div class="modal-body">
  
              <button
                type="button"
                class="btn btn-lg orange_color border border-5 m-3"
                v-if="dataAmount < balance"
                @click="payServiceWallet">
                <i class="bi bi-wallet"></i><br>Wallet
              </button>
  
              <button
                type="button"
                class="btn btn-lg orange_color border border-5 m-3"
                data-bs-dismiss="modal"
                v-if="dataAmount > balance" @click="paymentRoute">
                <i class="bi bi-currency-bitcoin"></i><br>Bitcoin
              </button>
  
              <button
                type="button"
                class="btn btn-lg orange_color border border-5 m-3"
                data-bs-dismiss="modal"
                v-if="dataAmount > balance" @click="paymentRoute">
                <i class="bi bi-cash-coin"></i><br>Online
              </button>
  
            </div>
  
            <div class="modal-footer">
              <button type="button" class="btn bg_orange fw-bold text-white" data-bs-dismiss="modal">Close</button>
            </div>
  
          </div>
        </div>
      </div>
  
  
  <!-- Modal 2-->
  <button type="button" 
  class="btn btn-primary" 
  data-bs-toggle="modal" 
  ref="closeButton2" 
  data-bs-target="#exampleModal2" v-show="false">
  </button>
               <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered"> <!-- Added 'modal-dialog-centered' -->
                    <div class="modal-content">
                        <div class="modal-header justify-content-center"> <!-- Center the header -->
                            <h2 class="modal-title text-center" id="exampleModalLabel2">
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
  
                        <div class="modal-footer justify-content-center" @click="homeRoute"> <!-- Center the footer buttons -->
                            <button type="button" class="btn bg_orange_plain text-white fw-bold" data-bs-dismiss="modal"> Dashboard </button>
                        </div>
  
                        <div class="modal-footer justify-content-center"> <!-- Center the footer buttons -->
                            <button type="button" class="btn bg_orange_plain text-white fw-bold" data-bs-dismiss="modal"> Close </button>
                        </div>
  
  
                    </div>
                </div>
            </div>
  
  
  
  
    </div>
  
  </template>
  
  <script>
  import { useAuthUser } from '@/store/authenticate';
  import axiosInstance from '@/axiosInstance';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
  import moment from 'moment';
  
  export default {
  
    name: 'DataPage',
  
    props: {
      service: {
        type: String,
        required: true,
      },
    },
  
    components: { PulseLoader },
  
    data() {
      return {
  
        listDataProvider: [],
        listDataVariation: [],
        selectedImage: null,
        dataAmount: 0,
        phoneNumber: '',
        balance: 0,
        serviceID: null,
        reference: '',
        viewTransaction: {},
        selectData: null,
        variationCode: null,
  
        loading: true,
        color: '#FF5733',
        size: '25px',
  
      };
    },
  
    mounted() {
      this.fetchServiceProvider();
      this.getAuthUser();
    },
  
    methods: {
  
    handleProviderClick(index, serviceID) {
      this.fetchServiceVariation(serviceID);
      this.selectImage(index);
      this.serviceID = serviceID
     },
  
     handleDataClick(index, amount, code) {
      this.dataAmount = amount;
      this.selectData = index;
      this.variationCode = code
     },

     async verifyMerchant() {

        try {
          const requestData = {
            service_id: this.serviceID,
            biller_code: this.smartCard,
      
          };
          const response = await axiosInstance.post('/services/verify-merchant', requestData);
          console.log(response)
          this.toast('success', 'Smarcard Found')
  
          } catch (error) {
          this.toast('error', 'Invalid Smartcard Number')
          }
        
     },
  
      fetchServiceVariation(variation) {
        this.loading = true
        axiosInstance.get(`/services/variation/${variation}`)
          .then(response => {
            this.listDataVariation = response.data.content.varations;
            this.loading = false
          })
          .catch(error => {
            console.error('Error fetching categories variation:', error);
            this.loading = false
          });
      },
    
  
      formatTime(time) {
          // Format time as 'May 04, 2024 9:40AM'
          return moment(time).format('MMM DD, YYYY h:mma');
      },
  
      paymentRoute() {
          this.$router.push({ name: 'payment' });
      },
  
      homeRoute() {
          this.$router.push({ name: 'home' });
      },
  
      goBack() {
        if (window.history.length > 1) {
          this.$router.go(-1);
        } else {
          this.$router.push('/');
        }
      },
  
      selectImage(index) {
        this.selectedImage = index;
      },
  
      fetchServiceProvider() {
        axiosInstance.get(`/services/${this.$route.params.service}`)
          .then(response => {
            this.listDataProvider = response.data.content;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      },
  
      async payServiceWallet() {
  
      const lagosTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" }));
      const year = lagosTime.getFullYear();
      const month = String(lagosTime.getMonth() + 1).padStart(2, '0');
      const day = String(lagosTime.getDate()).padStart(2, '0');
      const hours = String(lagosTime.getHours()).padStart(2, '0');
      const minutes = String(lagosTime.getMinutes()).padStart(2, '0');
      
      // Timestamp + Random Alphanumeric String
      const timestamp = `${year}${month}${day}${hours}${minutes}`;
      const randomString = Math.random().toString(36).substring(2, 10);
  
       this.reference = `${timestamp}${randomString}`;
  
        try {
          const requestData = {
            amount: this.dataAmount,
            phone: this.phoneNumber,
            service_id: this.serviceID,
            request_id: this.reference,
            transaction_type: "Cable",
            transaction_id: this.reference,
            description: this.serviceID,
            biller_code: this.smartCard,
            variation_code: this.variationCode,
            subscription_type: 'change',
          };
          const response = await axiosInstance.post('/services/pay', requestData);
          this.viewTransaction = response.data.transaction
          this.$refs.closeButton.click();
          this.$refs.closeButton2.click();
  
          } catch (error) {
          this.status = false
          this.$refs.closeButton.click();
          this.toast('error', 'Cable Purchase Unsuccesfull')
          }
  
      },
  
      async getAuthUser() {
        await useAuthUser().fetchUserData();
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
  
  
    },
  
  };
  </script>
  
  <style scoped>
  
  .faded {
    opacity: 0.5;
  }
  
  .img-thumbnail {
    transition: opacity 0.3s ease; /* Add smooth transition for fading effect */
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
    cursor: pointer;
  }
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>
  