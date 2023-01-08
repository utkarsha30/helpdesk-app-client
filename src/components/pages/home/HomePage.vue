<template>
  <!-- <div>-->
  <div>
    <div class="row no-gutters p-3">
      <div class="col-md-6">
        <img
          src="../../../assets/images/icon.svg"
          class="custome-css"
          alt="Help Desk Icon"
        />
      </div>
      <div class="col-md-6">
        <div class="card-body card-css">
          <p class="text-center a">Online Helpdesk</p>

          <p class="lead text-center b">
            Managing tickets and improving customer service
          </p>
          <b-form-group class="text-center">
            <b-button type="submit" to="/about">know more</b-button>
          </b-form-group>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <footer class="container-fluid text-center">
        <div class="footer row copyright">
          <div class="col-md-12 text-center">
            <small class="block"
              >&copy; 2023 Utkarsha Kshirsagar<br />
              All Rights Reserved.</small
            >
            <br />
            <small class="block"
              ><a
                href="https://www.linkedin.com/in/utkarsha-kshirsagar-34b0bb170"
                ><img
                  src="../../../assets/images/linkedin.svg"
                  height="40"
                  width="40" /></a
              >&nbsp;&nbsp;<a href="mailto: msutkarsha@gmail.com"
                ><img
                  src="../../../assets/images/email.svg"
                  height="55"
                  width="55" /></a
            ></small>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {},
};
</script>

<style scoped>
.wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.wave {
  position: relative;
  display: block;
  width: calc(140% + 1.3px);
  height: 171px;
}

.wave {
  fill: #ffffff;
}
.foot {
  position: relative;
  background-color: #472673;
  color: white;
  height: auto;
  overflow-x: hidden;
  padding-bottom: 30px;
}
.svg-style {
  position: relative;
}

.card-css {
  padding-top: 20%;
}
.btn-secondary {
  background-color: #ed0a71 !important;
  border-color: #f0036e !important;
}
.btn-secondary:hover {
  background-color: #ec599b !important;
  border-color: #f0036e !important;
}
.a {
  color: #8760b4;
  display: block;
  font-size: 50px;
  margin: 0;
}
.b {
  color: #8760b4;
  display: block;
}
/* @media only screen and (max-width: 600px){ 
 h1{
  display: 6px;
 }
} */
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
  background-image: linear-gradient(to bottom right, #d4ece5, #f8edf5);
  color: #472673;
}
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
.custome-css {
  width: 95%;
  animation: 1s ease-out 0s 1 slideInFromLeft;
}
</style>
