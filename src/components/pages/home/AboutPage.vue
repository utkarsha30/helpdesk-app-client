<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-sm mt-4 mb-3">
        <b-card class="extra-css text-center">
          <img
            class="w-25"
            src="../../../assets/images/project.svg"
            alt="Business Intelligence"
          />
          <b-card-title>Business Intelligence</b-card-title>
          <b-card-text>
            Fynd Helpdesk App is a help providing service center to tackle all
            the issue faced by students during their training period. Instead of
            randomly bombarding the questions to any fynd employee. This
            ticketing system helps students solve their issues quickly by
            providing the tickets to relevant fynd employee.<br />
            This project is my attempt to make the fynd training program
            smoother and avoid majorly faced problems by students
          </b-card-text>
        </b-card>
      </div>
      <div class="col-sm mb-3">
        <b-card class="extra-css text-center">
          <img
            class="w-25"
            src="../../../assets/images/aboutus.svg"
            alt="About Us"
          />
          <b-card-title>About Us</b-card-title>
          <b-card-text>
            Fynd Helpdesk App is build by Utkarsha Kshirsagar as a part of MEVN
            FullStack training.<br />
            This project has full functional frontend and backend system.<br />
            Technologies used:<br />
            FrontEnd: Vue2,BootstrapVue<br />
            Backend: Nodejs, Express, MongoDB
          </b-card-text>
          <b-card-text class="text-center">
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
                  height="50"
                  width="55" /></a
            ></small>
          </b-card-text>
        </b-card>
      </div>
      <div class="col-sm mt-4 mb-3">
        <b-card class="extra-css text-center">
          <img
            class="w-25"
            src="../../../assets/images/futurescope.svg"
            alt="Future Scope"
          />
          <b-card-title>Project Scope</b-card-title>
          <b-card-text>
            This project consists of 3 roles namely student, admin and agent.<br />
            Student: raise and manage tickets, add comments on tickets<br />
            Admin: Manage data of agents and students. Assign tickets to agents,
            create faq's<br />
            Agent: Resolved tickets assigned, communicate to client about ticket
            via comments<br />
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.card-title {
  color: #033b59;
}
.card-text {
  color: #8760b4;
  text-align: left;
  margin-top: 20px;
}
.extra-css {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
}
.extra-css:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}
</style>