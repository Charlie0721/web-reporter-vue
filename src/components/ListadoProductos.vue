<template>
  <div>
    <br /><br />
    <div class="container">
      <center><h1 class="display-5 text-dark">LISTADO DE PRODUCTOS</h1></center>
      <br /><br />
      <div class="input-group">
        <div class="input-group-prepend">
          <img
            alt="Logo CXPOS"
            class="btn-buscar"
            src="../assets/Buscar_producto.png"
          />
          <input
            type="search"
            class="form-control text-uppercase b"
            name="buscar"
            style="width: 750px"
            v-model="busqueda_producto"
          />
        </div>
      </div>
      <br />
      <table class="table table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">NOMBRE</th>
            <th scope="col">BARRAS</th>
            <th scope="col">PRECIO</th>
            <th scope="col">PRECIO1</th>
            <th scope="col">PRECIO2</th>
            <th scope="col">COSTO</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in searchProductos"
            :key="item.idproducto"
            v-on:click="editar(item.idproducto)"
            class="tabla123"
          >
            <th scope="row">{{ item.descripcion }}</th>
            <td scope="row">{{ item.barcode }}</td>
            <td scope="row">
              $ {{ new Intl.NumberFormat("de-DE").format(item.precioventa) }}
            </td>
            <td scope="row">
              ${{ new Intl.NumberFormat("de-DE").format(item.precioespecial1) }}
            </td>
            <td scope="row">
              ${{ new Intl.NumberFormat("de-DE").format(item.precioespecial2) }}
            </td>
            <td scope="row">
              ${{ new Intl.NumberFormat("de-DE").format(item.ultcosto) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListadoProductos",
  props: {
    msg: String,
  },
  data() {
    return {
      busqueda_producto: "",
      ListadoProductos: [],
      usuario: new Object(),
    };
  },
  mounted() {
    this.ObtenerProductos();
  },
  methods: {
    ObtenerProductos() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios
        .get(this.$conexion + "/todos/productos/" + this.usuario._id)
        .then((response) => {
          this.ListadoProductos = response.data.rows;
        })
        .catch((e) => console.log(e));
    },

    editar(id) {
      this.$router.push("/editar/" + id);
    },
  },
  computed: {
    searchProductos: function () {
      return this.ListadoProductos.filter(
        (item) =>
          item.descripcion.includes(this.busqueda_producto.toUpperCase()) ||
          item.barcode.includes(this.busqueda_producto)
      );
    },
  },
};
</script>

<style>
h1 {
  text-decoration: underline rgb(12, 12, 12);
}

tr[class="tabla123"] {
  background: #fdc830; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f37335,
    #fdc830
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f37335,
    #fdc830
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

img[class="btn-buscar"] {
  width: 20%;
}
</style>
