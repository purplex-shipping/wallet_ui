<template>


<div class="container fixed-bottom">

<ul class="nav nav-pills nav-fill bg_orange">

  <li class="nav-item fw-bold">
    <router-link class="nav-link fw-bold" :to="{name:'home'}"> 
        <i class="bi bi-house-door-fill fs-2 text-white"></i> 
    </router-link>
  </li>

  <li class="nav-item fw-bold">
    <router-link class="nav-link fw-bold" :to="{name:'profile'}"> 
        <i class="bi bi-view-list fs-2 text-white"></i>
    </router-link>
  </li>

  <li class="nav-item fw-bold">
    <router-link class="nav-link fw-bold" :to="{name:'profile'}"> 
        <i class="bi bi-wallet2 fs-2 text-white"></i>
    </router-link>
  </li>

  <li class="nav-item fw-bold">
    <router-link class="nav-link fw-bold" :to="{name:'profile'}"> 
        <i class="bi bi-currency-exchange fs-2 text-white"></i>
    </router-link>
  </li>

  <li class="nav-item fw-bold">
    <router-link class="nav-link fw-bold" :to="{name:'profile'}"> 
        <i class="bi bi-person-fill-gear fs-2 text-white"></i>
    </router-link>
  </li>

</ul>

</div>
    
    </template>
    
    
    <script>
    
      export default {
        name: 'FooterNav',
      
        data() {
          return {
            CancelToggle: false,
          };
        },
      
      
        mounted() {
          // Code to execute after the component has been mounted
          console.log('Component has been mounted!');
        },
    
        methods: {
            
            CancelIconToggle() {
                this.CancelToggle = !this.CancelToggle 
            },
    
        }
      
      
      
      }
      </script>
    
    
    <style scoped>
    
    .bg_orange {
      background-color: #FF5733;
    }

    .orange_color {
      color: #FF5733;
    }
    
    .bg_black {
      background-color: black;
    }
    
    </style>
    