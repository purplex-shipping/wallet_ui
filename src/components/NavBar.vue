<template>

<div class="container d-none d-md-block">


<nav class="navbar navbar-expand-lg bg_orange">

  <div class="container">

    <a class="navbar-brand" href="index.html">
          <img src="@/assets/images/icons/logo_black.png" alt="Paper Bill" width="70" height="65">
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item">
          <a class="nav-link fw-bold text-white" aria-current="page" href="#"> Bill </a>
        </li>

        <li class="nav-item">
          <a class="nav-link fw-bold text-white" aria-current="page" href="#"> Gift Card </a>
        </li>

        <li class="nav-item">
          <a class="nav-link fw-bold text-white" aria-current="page" href="#"> Airtime </a>
        </li>

        <li class="nav-item">
          <a class="nav-link fw-bold text-white" aria-current="page" href="#"> Data </a>
        </li>

      </ul>

      <button type="button" class="btn bg_black text-white fw-bold btn-lg mr-3"> 
        Fund Wallet
      </button>

    </div>
  </div>
</nav>

</div>

</template>


<script>

  export default {
    name: 'NavBar',
  
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

.bg_black {
  background-color: black;
}


</style>
