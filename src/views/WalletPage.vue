<template>

<div class="container"> 

    <br>

    <p class="fw-bold fs-4 text-white"> Wallet </p>

<div class="card bg_orange box">
<div class="card-body">


<div class="row">

<div class="col-10">

  <p class="fs-6 fw-bold text-white"> 
    Wallet Balance  <i class="bi bi-eye-fill text-white fs-5 clickable_sign"></i>
    <br>
    ₦5,000.00
  </p>

</div>



<div class="col-2">
    <i class="bi bi-plus-square-fill fs-1 text-white clickable_sign"> </i> 
</div>

</div>


</div>
</div>

</div>


<br>
<br>


<div class="container"> 

<p class="fw-bold fs-4 text-white"> Recent Transaction </p>

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

<p class="fw-bold fs-6 text-white clickable_sign text-end"> See More </p>


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