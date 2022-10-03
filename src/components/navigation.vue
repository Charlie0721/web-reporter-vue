<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    style="background-color: #82230c"
  >
    <!--   <img alt="Logo CXPOS" src="../assets/Logo_conexion_pos.png" />-->
    <img
      alt="Logo CXPOS"
      class="cxPos-navbar"
      src="../assets/Web_reporter.png"
    />
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-nav ml-auto">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item dropdown" v-if="(this.logueado = true)">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  alt="Logo CXPOS"
                  class="cxPos-inventarios"
                  src="../assets/Boton_inventarios.png"
                />
              
              </a>
              <ul
                class="dropdown-menu"
                style="background-color: #82230c"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a class="dropdown-item">
                    <router-link to="/cantidades-barras"
                      >Consultar cantidades por Codigo de Barras<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li><a class="dropdown-item"></a></li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/productos"
                      >Listado de Productos<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/ingresar-compras"
                      >Cargar Compras<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/consultar-cantidades-inventario"
                      >Consultar Inventarios<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/movimientos-inventario"
                      >Cargar Inventarios<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/informe/kardex"
                      >Informe Kardex<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
              
                <li>
                  <a class="dropdown-item">
                    <router-link to="/compras"
                      >Consultar Compras<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/costeo/inventario"
                      >Informe de Inventarios<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/fecha-vencimiento-lotes"
                      >Informe Fechas vencimiento Lotes<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown" v-if="(this.logueado = true)">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                 <img
                  alt="Logo CXPOS"
                  class="cxPos-facturacion"
                  src="../assets/Boton_facturacion.png"
                />
              </a>
              <ul
                class="dropdown-menu"
                style="background-color: #82230c"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a class="dropdown-item">
                    <router-link to="/informe-formas-de-pago"
                      >Informe Formas de pago
                      <a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li><a class="dropdown-item"></a></li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/ventas-instante"
                      >Informe Ventas por Día
                      <a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/todas-las-facturas"
                      >Consultar Facturas
                      <a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/informe/iva-ventas"
                      >Informes Iva Ventas<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/consulta-ventas-acumuladas"
                      >Informe Ventas Acumulado<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/consulta-ventas-vendedor"
                      >Informe Ventas por Vendedor<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
              
                <li>
                  <a class="dropdown-item">
                    <router-link to="/cuentas-por-cobrar"
                      >Informe CxC<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/info/cuentas-por-pagar"
                      >Informe CxP<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/informe/egresos-de-caja"
                      >Informe Egresos Caja<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/informe/arqueos-caja"
                      >Consultar Arqueos<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/informe/ventas-mesas"
                      >Informe Ventas por Mesas<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/informe-estados-domicilios"
                      >Informe Estados de Domicilios<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/pedidos-por-documento"
                      >Pedidos Comerciales por Documento<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/pedidos-por-productos"
                      >Pedidos Comerciales por Productos<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/pedidos-por-formas-pago"
                      >Pedidos Comerciales por Formas Pago<a
                        class="navbar-brand"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
              </ul>
            </li>
            <li></li>
            <li class="nav-item dropdown" v-if="(this.logueado = true)">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  alt="Logo CXPOS"
                  class="cxPos-salir"
                  src="../assets/Boton_salir.png"
                />
              </a>
              <ul
                class="dropdown-menu"
                style="background-color: #82230c"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a class="dropdown-item">
                    <router-link to="/"
                      >Ingresar<a
                        class="navbar-brand ml-auto"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item">
                    <router-link to="/usuadmin"
                      >Registrar Usuario<a
                        class="navbar-brand ml-auto"
                        aria-current="page"
                        tabindex="-1"
                      ></a></router-link
                  ></a>
                </li>
                <li>
                  <a class="dropdown-item" v-on:click="cerrarSesion">
                    <router-link to="/"> cerrar sesion </router-link></a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  name: "navegacion",
  props: {
    msg: String,
  },
  data() {
    return {
      usuario: new Object(),
      logueado: true,
    };
  },

  methods: {
    cerrarSesion() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios
        .get(this.$conexion + "/api/logout/" + this.usuario._id)
        .then((data) => {
          console.log("Sesión finalizada", data);
        });

      this.logueado = false;
    },
  },
};
</script>
<style>
.navbar li a,
.navbar .navbar-brand {
  color: #fff !important;
}
img[class="cxPos-navbar"] {
  width: 30% !important;
}
img[class="cxPos-facturacion"] {
  width: 50% !important;
}
img[class="cxPos-inventarios"] {
  width: 50% !important;
  
}
img[class="cxPos-salir"] {
  width: 20% !important;
}
</style>