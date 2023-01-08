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
            <b-button type="submit">know more</b-button>
          </b-form-group>
        </div>
      </div>
    </div>
    <div class="foot">
      <svg
        class="svg-style"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#472673"
          fill-opacity="1"
          d="M0,160L60,138.7C120,117,240,75,360,64C480,53,600,75,720,117.3C840,160,960,224,1080,208C1200,192,1320,96,1380,48L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <!-- <div class="footer">
        <p>@utkarsha</p>
        <p>hsdvkjsbgldfglkdrhgldkfhg</p>
      </div> -->
      <footer class="container-fluid text-center">
        <div class="footer row copyright">
          <div class="col-md-12 text-center">
            <small class="block"
              >&copy; 2021 Utkarsha Kshirsagar<br />
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
                  height="40"
                  width="40" /></a
            ></small>
          </div>
        </div>
      </footer>
    </div>
  </div>
  <!-- <svg xmlns="http://www.w3.org/2000/svg" class="a" viewBox="0 0 1440 300">
        <path
          fill="#472673"
          fill-opacity="1"
          d="M0,64L80,90.7C160,117,320,171,480,208C640,245,800,267,960,272C1120,277,1280,267,1360,261.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </div> -->

  <!-- <svg xmlns="http://www.w3.org/2000/svg" class="b" viewBox="0 0 1440 320">
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,256L34.3,266.7C68.6,277,137,299,206,282.7C274.3,267,343,213,411,197.3C480,181,549,203,617,181.3C685.7,160,754,96,823,101.3C891.4,107,960,181,1029,181.3C1097.1,181,1166,107,1234,74.7C1302.9,43,1371,53,1406,58.7L1440,64L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
      ></path>
    </svg> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.svg-style {
  position: relative;
}
.footer {
  display: block;
  width: 100%;

  text-align: center;
  background-color: rgba(255, 255, 0, 0.288);
  color: white;
  position: absolute;
  top: 700px;
}
@media (max-width: 768px) {
  .footer {
    display: block;
    width: 100%;
    height: 10%;
    text-align: center;
    background-color: rgba(255, 255, 0, 0.288);
    position: absolute;
    top: 735px;
  }
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
