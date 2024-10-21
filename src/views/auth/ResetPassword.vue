<template>

    <div class="bg_black d-flex justify-content-center align-items-center">
    
    
    <div class="card bg_black text-center">
      <div class="card-body">
    
        <p class="fs-4 fw-bold orange_color" > Reset Password
          <br>
          <span class="fs-5 fw-bold orange_color text-white" > Please enter the OTP sent to your email </span>
        </p>
  
        <br>
    

        <img class="img-fluid" src="@/assets/images/illustrator/undraw_safe_re_kiil.svg" width="200" height="100">
  
        <br>
        <br>
    
        <div :class="error.otp == null ? '' : 'has-validation'">
        <input type="number" class="form-control" :class="error.otp == null ? 'border border-light' : 'is-invalid'" id="inputOTP" placeholder="OTP Code" v-model="form.otp">
        <div class="invalid-feedback">
          {{  error.otp == null ? '' : error.otp[0] }}
        </div>
        </div>

        <br>

        <div :class="error.password == null ? '' : 'has-validation'">
        <input type="password" class="form-control" :class="error.password == null ? 'border border-light' : 'is-invalid'" id="inputPassword" placeholder="New Password" v-model="form.password">
        <div class="invalid-feedback">
         {{  error.password == null ? '' : error.password[0] }}
        </div>
        </div>
    
        <br>

        <div :class="error.password_confirmation == null ? '' : 'has-validation'">
        <input type="password" class="form-control" :class="error.password_confirmation == null ? 'border border-light' : 'is-invalid'" placeholder="Confirm Password" v-model="form.passwordConfirmation">
        <div class="invalid-feedback">
          {{  error.password_confirmation == null ? '' : error.password_confirmation[0] }}
        </div> 
        </div>

        <br>

    
        <div>
        <div class="d-grid gap-2" v-if="status == false" @click="submit">
           <button class="btn bg_orange fw-bold text-white" 
           type="button"> 
           Reset Password
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

        <p class="fs-6 fw-bold text-white">
          Have an account? <span class="orange_color clickable_sign" @click="navigateToLogin"> Sign In </span>
       </p>

       <br>
       <br>
        
      </div>
    </div>
    
    
    </div>
    
    </template>
    
  
  <script>
  import axiosInstance from '@/axiosInstance';
  
    export default {
      name: 'LogIn',
    
      data() {
        return {
          
      form : {
        otp: null,
        password: null,
        passwordConfirmation: null,
      },

        error: {},
        status: false,

      };
      },
    
    
      mounted() {
        // Code to execute after the component has been mounted
        console.log('Component has been mounted!');
      },
  
methods: {
          
          navigateToDashBoard() {
              this.$router.push({ name: 'home' });
          },
  
          navigateToForgetPassword() {
              this.$router.push({ name: 'forget-password' });
          },
  
          navigateToSignUp() {
              this.$router.push({ name: 'register' });
          },

          navigateToLogin() {
            this.$router.push({ name: 'login' });
         },

  async submit() {
        this.status == true

      try {
        const requestData = {
          email: this.form.email,
          password: this.form.password,
          otp: this.form.otp,
          password_confirmation: this.form.passwordConfirmation,
        };
        const response = await axiosInstance.post('/reset/password', requestData);
        this.toast('success', 'Password Change Succesfully Login')
         this.$router.push({ name: 'login' })
         console.log(response)
      } catch (error) {
        this.status = false
        this.error = error.response.data.error.message
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
  