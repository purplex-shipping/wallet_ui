<template>

    <div class="bg_black d-flex justify-content-center align-items-center">
    
    
    <div class="card bg_black text-center">
      <div class="card-body">
    
        <p class="fs-4 fw-bold orange_color" > User verification
          <br>
          <span class="fs-5 fw-bold orange_color text-white" > OTP has been sent to your email </span>
        </p>
  
        <br>
    
        <img class="img-fluid" src="@/assets/images/illustrator/undraw_safe_re_kiil.svg" width="200" height="100">
  
        <br>
        <br>
    
        <input type="number" class="form-control" id="inputOTP" placeholder="OTP Code" v-model="form.otp">
        <div class="form-text clickable_sign text-white fw-bold text-end" @click="resendCode"> Resend Code </div>

        <br>
    
        <div>
        <div class="d-grid gap-2" v-if="status == false" @click="submit">
           <button class="btn bg_orange fw-bold text-white" 
           type="button"> 
           Verify
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

        
      </div>
    </div>
    
    
    </div>
    
    </template>
    
  
  <script>

import axiosInstance from '@/axiosInstance';
import { useAuthUser } from '@/store/authenticate';
  
    export default {
      name: 'ResetCode',
    
      data() {
        return {
          
        form : {
          otp: null,
        },

        user: {},
        status: false,
        error: {},

        };
      },
    
    
      mounted() {
        this.getAuthUser();
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
            this.status = true

         try {
           const requestData = {
             otp: this.form.otp,
         };
          const response = await axiosInstance.post('/verify/otp', requestData);
          localStorage.setItem('bearerToken', response.data.data.token);
          this.toast('success', 'Code Verified Succesfully')
          this.$router.push({ name: 'home' });
        } catch (error) {
          this.status = false
          this.error = error.response.data.error.message
          this.toast('error', this.error)
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

    async resendCode() {
            this.status = true

         try {
           const requestData = {
            email: this.userData.email,
         };
          const response = await axiosInstance.post('/resend/otp', requestData);
          this.status = false
          this.toast('success', 'Code Resent Succesfully')
          console.log(response)
        } catch (error) {
          this.status = false
          this.error = error.response.data.error.message
          this.toast('error', this.error)
       }
     },


    async getAuthUser() {
    await useAuthUser().fetchUserData();
    this.user = useAuthUser().userData
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
  