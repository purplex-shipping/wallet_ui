
<template>
    
    <br>
    <br>
    
    
    <div class="container"> 
    
    <p class="fw-bold fs-4 text-white"> Transaction History </p>

<ul class="nav nav-tabs nav-fill">

  <li class="nav-item">
    <a class="nav-link active fw-bold" aria-current="page" href="#" > All</a>
  </li>

  <li class="nav-item">
    <a class="nav-link fw-bold orange_color" href="#"> Completed</a>
  </li>

  <li class="nav-item">
    <a class="nav-link fw-bold orange_color" href="#"> Pending</a>
  </li>

</ul>

<br>
    
    <ul class="list-group">
    
      <li class="list-group-item d-flex justify-content-between align-items-center bg_black clickable_sign">
        <i class="bi bi-arrow-up-right-circle-fill orange_color"> 
            <span class="text-white fw-bold"> 
                Cable TV 
                <br>
            <span class="text-white form-text"> May 12, 2024 3:40PM</span>
            </span>
        </i>   
        <span class="badge bg_orange_plain"> -₦1200</span>
      </li>
    
    
      <li class="list-group-item d-flex justify-content-between align-items-center bg_black clickable_sign">
        <i class="bi bi-arrow-down-left-circle-fill text-success"> 
            <span class="text-white fw-bold"> 
                Gift Card
                <br>
            <span class="text-white form-text"> May 04, 2024 9:40AM</span>
            </span>
        </i>   
        <span class="badge bg-success"> +₦4000</span>
      </li>
    
      <li class="list-group-item d-flex justify-content-between align-items-center bg_black clickable_sign">
        <i class="bi bi-arrow-up-right-circle-fill orange_color"> 
            <span class="text-white fw-bold"> 
                Airtime
                <br>
            <span class="text-white form-text"> May 10, 2024 5:40PM</span>
            </span>
        </i>   
        <span class="badge bg_orange_plain"> -₦4000</span>
      </li>
    
    </ul>
    
    
    
    <br>
    <br>
    
    
    </div>
    
    </template>
    
    
    <style scoped>
    
    .bg_orange {
      background-color: #FF5733;
      box-shadow: 5px 5px 10px #FF5733; /* Add a background shadow */
    }
    
    .bg_orange_plain {
      background-color: #FF5733;
    }
    
    .bg_black {
      background-color: black;
    }
    
    .clickable_sign {
        cursor: pointer; /* Change the cursor to a pointer on hover */
    }
    
    .orange_color {
        color: #FF5733;
    }
    
    .border-radius {
        border: 2px solid #fff;
        border-radius: 5px;
    }
    
    </style>