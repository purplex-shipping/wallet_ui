<template>

    <div class="bg_black d-flex justify-content-center align-items-center">
    
    
    <div class="card bg_black text-center">
      <div class="card-body">
    
        <p class="fs-4 fw-bold text-white text-start" > Profile </p>

    
        <p class="fs-6 fw-bold text-white text-start" > General Setting </p>
    

<ul class="list-group">

  <li class="list-group-item d-flex justify-content-between align-items-center bg_black border border-0 text-white fw-bold fs-6 clickable_sign">
    <i class="bi bi-person-add"> Personal Info </i> 
    <i class="bi bi-caret-right fs-6 orange_color"></i> 
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center bg_black border border-0 text-white fw-bold fs-6 clickable_sign">
    <i class="bi bi-gear"> Settings </i> 
    <i class="bi bi-caret-right fs-6 orange_color"></i> 
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center bg_black border border-0 text-white fw-bold fs-6 clickable_sign">
    <i class="bi bi-people"> My Referral </i> 
    <i class="bi bi-caret-right fs-6 orange_color"></i>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center bg_black border border-0 text-white fw-bold fs-6 clickable_sign">
    <i class="bi bi-wechat"> Support </i> 
    <i class="bi bi-caret-right fs-6 orange_color"></i>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center bg_black border border-0 text-white fw-bold fs-6 clickable_sign">
    <i class="bi bi-briefcase"> Legal </i> 
    <i class="bi bi-caret-right fs-6 orange_color"></i>
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center bg_black border border-0 text-white fw-bold fs-6 clickable_sign">
    <i class="bi bi-box-arrow-left"> Sign Out </i> 
    <i class="bi bi-caret-right fs-6 orange_color"></i>
  </li>

</ul>



        
        
      </div>
    </div>
    
    
    </div>
    
    </template>
    
  
  <script>
  
    export default {
      name: 'LogIn',
    
      data() {
        return {
          // data
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
  