<template>

<div class="bg_black d-flex justify-content-center align-items-center">

<div class="card bg_black text-center">
  <div class="card-body">

    <p class="fs-4 fw-bold orange_color" > Welcome to Paper Bill
      <br>
      <span class="fs-5 fw-bold orange_color text-white" > Hello there,create new account </span>
    </p>

    <img class="img-fluid" src="@/assets/images/illustrator/undraw_undraw_undraw_undraw_sign_up.svg" width="250" height="100">

    <br>
    <br>

    <div :class="error.email == null ? '' : 'has-validation'">
    <input type="email" class="form-control" :class="error.email == null ? 'border border-light' : 'is-invalid'" id="inputEmail" placeholder="Email" v-model="form.email">
    <div class="invalid-feedback">
    {{  error.email == null ? '' : error.email[0] }}
     </div>
    </div>

    <br>

    <div :class="error.name == null ? '' : 'has-validation'">
    <input type="text" class="form-control" :class="error.name == null ? 'border border-light' : 'is-invalid'" id="inputName" placeholder="Full Name" v-model="form.name">
    <div class="invalid-feedback">
    {{  error.name == null ? '' : error.name[0] }}
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

    <p class="fs-6 fw-bold text-white">
      By tapping sign up you agree to the terms and use of privacy policy
    </p>


  <div>
    <div class="d-grid gap-2" v-if="status == false" @click="submit">
       <button class="btn bg_orange fw-bold text-white " 
       type="button"> 
       Sign Up 
       <i class="bi bi-arrow-right fw-bold"></i> 
      </button>
    </div>

    <div class="spinner-border justify-content-center orange_color" role="status" v-else>
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <br>
    
    <p class="fs-6 fw-bold text-white">
      Have an account? <span class="orange_color clickable_sign" @click="navigateToLogin"> Sign In </span>
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
  name: 'SignUp',

  data() {
    return {

      form : {
        email: null,
        password: null,
        name: null,
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
          name: this.form.name,
          password: this.form.password,
          password_confirmation: this.form.password
        };
        const response = await axiosInstance.post('/register', requestData);
        localStorage.setItem('bearerToken', response.data.data.token);
        this.toast('success', 'Registration Succesfull Enter OTP')
        this.$router.push({ name: 'reset-code' });
      } catch (error) {
        this.status = false
        this.error = error.response.data.error.message
        this.toast('error', 'Please Recheck SignUp Details')
      }
    },

    navigateToLogin() {
        this.$router.push({ name: 'login' });
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
    