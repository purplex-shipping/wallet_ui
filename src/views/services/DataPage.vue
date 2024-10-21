<template>

<div class="bg_black d-flex justify-content-center align-items-center" v-if="loading == false">
  
  
  <div class="card bg_black text-center">
    <div class="card-body">
  
      <p class="fs-4 fw-bold orange_color clickable_sign" @click="goBack"> 
      <i class="bi bi-arrow-left text-white text-start"></i>
       Data Bundle
      </p>
  
      <p class="fs-6 fw-bold text-white clickable_sign">
          Select Network
          <select class="form-select" aria-label="Default select example" v-model="selectedOption" @change="fetchBillerInfo">
          <option :value="billers.biller_code" selected v-for="billers in billers.data" :key="billers.id"> {{ billers.name }}</option>
        </select>
      </p>

      <br>


      <select class="form-select" aria-label="Default select example">
        <option selected> Select Data Plan </option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <br>

      <input type="number" class="form-control" id="inputEmail" placeholder="Amount" readonly>
      <br>
  
      <div class="d-grid gap-2">
         <button class="btn bg_orange fw-bold text-white" 
         type="button"> 
         Continue
         <i class="bi bi-arrow-right fw-bold"></i> 
        </button>
      </div>
      
      
    </div>
  </div>
  
  
  </div>

  <div class="loader-container" v-if="loading == true">
    <PulseLoader :color="color" :size="size"></PulseLoader>
  </div>
  
  </template>
  


  <script>

import { useAuthUser } from '@/store/authenticate';
import axiosInstance from '@/axiosInstance';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'; // Import PulseLoader component

  
    export default {
      name: 'CablePage',

      components: {
        PulseLoader
      },
  
    
      data() {
        return {
          // data

          billers: [],
          selectedOption: null,
          selectedBillerOption: null,
          billerInfo: [],
          billerSelectLoader: true,

          loading: true, // Control loading state
          color: '#FF5733', // Loader color (replace with your desired color)
          size: '25px' // Loader size (adjust as needed)

        };
      },
    
    
      mounted() {
        this.getAuthUser();
        this.fetchBiller();
       },
  
      methods: {
  
      goBack() {
          if (window.history.length > 1) {
              this.$router.go(-1);
            } else {
              this.$router.push('/');
            }
      },

      fetchBiller() {
      axiosInstance.get(`/billers/${this.$route.params.service}`)
        .then(response => {
          this.billers = response.data; // Assuming API returns an array of categories
          this.loading = false
        })
        .catch(error => {
          console.error('Error fetching billing categories:', error);
          this.loading = false
        });
    },

    async getAuthUser() {
      await useAuthUser().fetchUserData();
        this.user = useAuthUser().userData
    },

    fetchBillerInfo() {
      axiosInstance.get(`/biller/${this.selectedOption}/item`)
        .then(response => {
          this.billerInfo = response.data; // Assuming API returns an array of categories
          this.billerSelectLoader = false
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },

  }
    
}

</script>
  
  
  <style scoped>
  
  .bg_black {
     background-color: black;
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
