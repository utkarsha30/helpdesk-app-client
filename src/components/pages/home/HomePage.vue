<template>
  <div class="card mb-3 extra-css p-5" >
  <div class="row no-gutters">
    <div class="col-md-4 ">
      <img src="../../../assets/images/icon.png" class="w-75 custome-css"  alt="Help Desk Icon" >
    </div>
    <div class="col-md-8 ">
      <div class="card-body">
        <h1 class="display-4 ml-4">Online Helpdesk</h1><br/>

      <p class="lead ml-4">Managing tickets and improving customer service</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name:'HomePage'

}
</script>

<style scoped>
/* @media only screen and (max-width: 600px){ 
 h1{
  display: 6px;
 }
} */
.extra-css{
    box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
    background-image: linear-gradient(to bottom right, #d4ece5, #f8edf5);
    color: #472673;
}
.custome-css{
  padding-left:60px;
}
</style>