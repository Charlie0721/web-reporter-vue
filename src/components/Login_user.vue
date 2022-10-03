<template>
  <div id="Registro-de-Usuarios">
    <br />
    <br />

    <div class="col-xs-12">
      <div class="center-block">
        <center>
          <img
            alt="Logo cel"
            class="logoCel"
            src="../assets/Logo_celulares.png"
          />
        </center>
        <br />
        <center>
          <img
            alt="Logo CXPOS"
            class="cxPos"
            src="../assets/Web_reporter.png"
          />
        </center>
      </div>
    </div>

    <br />
    <br />
    <center>
      <div class="col-md-4">
        <form v-on:submit.prevent="ingresarApp()">
          <div class="form-group">
            <input
              type="email"
              class="form-control email"
              placeholder="Correo electrónico"
              autofocus
              v-model="login.email"
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              class="form-control password"
              placeholder="Contraseña"
              v-model="login.password"
            />
          </div>
         
          <div class="form-group">
            <button type="submit" class="btn btn-dark login">Ingresar</button>
          </div>
        </form>
      </div>
    </center>
    <br />
  
  
  
    <center>
      <img
        alt="Logo ConexionXPOS"
        class="cxPosLogo"
        src="../assets/Logo_cx_pos_blanco.png"
      />
    </center>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  props: {
    msg: String,
  },
  data() {
    return {
      login: new Object(),
      user: new Object(),
    };
  },
  methods: {
    async ingresarApp() {
      var data = {
        email: this.login.email,
        password: this.login.password,
      };

      if (this.login.email == "" || this.login.email == " ") {
        this.Alertaemail();
        return false;
      }
      if (
        this.login.password == "" ||
        this.login.password == " " ||
        this.login.password == null
      ) {
        this.AlertaNit();
        return false;
      } else {
        await axios
          .post(this.$conexion + "/api/login/users", data)
          .then((res) => {
            var usuario = res.data.rows[0][0];
            console.log(typeof usuario, usuario);
            if (usuario) {
              this.AlertaIngreso();
              localStorage.setItem("usuario", JSON.stringify(usuario));

              const this_ = this;
              setTimeout(function () {
                this_.$router.push("/productos");
                this_.getConexion();
              }, 0.5 * 1000);
            } else {
              this.Alertauser();
              return false;
            }
          })
          .catch((err) => console.log(err));
      }
    },
    getConexion() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios
        .get(this.$conexion + "/api/ver-conexiones/" + this.usuario._id)
        .then((res) => {
          console.log(res);
        });
    },
    AlertaIngreso() {
      this.$swal(
        "Usuario Confirmado!",
        "Bienvenido a Web Reporter",

        "success"
      );
    },
    Alertauser() {
      this.$swal(
        "Atencion!",
        "Usuario no encontrado",

        "warning"
      );
    },
    AlertaNit() {
      this.$swal(
        "Atencion!",
        "Ingrese la contraseña",

        "warning"
      );
    },
    Alertaemail() {
      this.$swal(
        "Atencion!",
        "Ingrese e-mail",

        "warning"
      );
    },
  },
};
</script>
<style  >
img[class="cxPos"] {
  width: 50% !important;
}
img[class="logoCel"] {
  width: 20% !important;
}
img[class="cxPosLogo"] {
  width: 20% !important;
}
input[class="form-control password"] {
  width: 60%;
  padding: 15px 40px;
  margin: 10px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 700px;
  box-sizing: border-box;
  font-size: 15px;
}
input[class="form-control email"] {
  width: 60%;
  padding: 15px 40px;
  margin: 10px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 700px;
  box-sizing: border-box;
  font-size: 15px;
}
button[class="btn btn-dark login"] {
  width: 50%;
  padding: 8px 40px;
  border-radius: 15px;
  font-size: 15px;
  background-color: #fff;
  color: #82230c;
}
#Registro-de-Usuarios {
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  background: url("../assets/Fondo.png") no-repeat center top;
  background-size: cover;
  font-family: sans-serif;
  height: 100vh;
}
</style>
