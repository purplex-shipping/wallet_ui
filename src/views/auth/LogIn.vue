<template>

  <div class="bg_black d-flex justify-content-center align-items-center">
  
  
  <div class="card bg_black text-center">
    <div class="card-body">
  
      <p class="fs-4 fw-bold orange_color" > Welcome back to Paper Bill
        <br>
        <span class="fs-5 fw-bold orange_color text-white" > Hello there,sign in to continue </span>
      </p>

      <br>
  
      <br>
      <br>
  
      <div :class="error.email == null ? '' : 'has-validation'">
    <input type="email" class="form-control" :class="error.email == null ? 'border border-light' : 'is-invalid'" id="inputEmail" placeholder="Email" v-model="form.email">
    <div class="invalid-feedback">
    {{  error.email == null ? '' : error.email[0] }}
     </div>
    </div>  
      <br>
  
      <div :class="error.password == null ? '' : 'has-validation'">
    <input type="password" class="form-control" :class="error.password == null ? 'border border-light' : 'is-invalid'" id="inputPassword" placeholder="password" v-model="form.password">
    <div class="invalid-feedback">
    {{  error.password == null ? '' : error.password[0] }}
    </div>
   </div>

      <br>
  
      <p class="fs-6 fw-bold text-white clickable_sign" @click="navigateToForgetPassword">
        Forget your password
      </p>
  
      <div>
      <div class="d-grid gap-2" v-if="status == false" @click="submit">
         <button class="btn bg_orange fw-bold text-white" 
         type="button"> 
         Sign In
         <i class="bi bi-arrow-right fw-bold"></i> 
        </button>
      </div>

      <div class="spinner-border justify-content-center orange_color" role="status" v-else>
            <span class="visually-hidden">Loading...</span>
      </div>
      </div>

      <br>
      
      <p class="fs-6 fw-bold text-white">
        Don't have an account? <span class="orange_color clickable_sign" @click="navigateToSignUp"> Sign Up </span>
      </p>

      <br>
      <br>
      
    </div>
  </div>

  <br>
  <br>
  
  
  </div>
  
  </template>
  

  <script>
  import axiosInstance from '@/axiosInstance';
  
  export default {
    data() {
      return {
  
        form : {
          email: null,
          password: null,
        },
  
        error: {},
        status: false,
        
      }
    },
  
  
    methods: {
  
      async submit() {
      this.status = true

      try {
        const requestData = {
          email: this.form.email,
          password: this.form.password,
        };
        const response = await axiosInstance.post('/login', requestData);
        localStorage.setItem('bearerToken', response.data.data.token);
        console.log(typeof response.data.data.token)

        this.$router.push({ name: 'home' });

      } catch (error) {
        this.status = false
        this.error = error.response.data.error.message
        this.toast('error', 'Please Recheck Login Details')
      }
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

    navigateToForgetPassword() {
        this.$router.push({ name: 'forget-password' });
    },

    navigateToSignUp() {
        this.$router.push({ name: 'register' });
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

</style>
