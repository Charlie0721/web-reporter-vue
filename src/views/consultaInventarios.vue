<template>
  <div id="consuInv">
    <navigation></navigation>  <br /><br />
    <div class="container">
      <center>
        <h1 class="display-4">
          <small class="text-muted"> CONSULTAR CANTIDADES</small>
        </h1>
      </center>
  <br /><br />
      <div class="input-group mb-3">
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
            v-model="buscarCantidaes"
          />
        </div>
      </div>

      <table class="table table-responsive">
        <thead>
          <tr>
            <th scope="col">DESCRIPCION</th>
            <th scope="col">CANTIDAD</th>
            <th scope="col">ALMACEN</th>
            <th scope="col">BARRAS</th>
            <th scope="col">CODIGO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in searchInve" :key="item.item" class="tabla1234">
            <th scope="row">{{ item.descripcion }}</th>
            <td>{{ item.cantidad }}</td>
            <td>{{ item.nomalmacen }}</td>

            <td>{{ item.barcode }}</td>
            <td>{{ item.codigo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import navigation from "@/components/navigation";
export default {
  components: {
    navigation,
  },
  data() {
    return {
      buscarCantidaes: "",
      ProdInventarios: [],
      usuario: new Object(),
    };
  },
  mounted() {
    this.ObtenerInventarios();
  },

  methods: {
    ObtenerInventarios() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios
        .get(
          this.$conexion +
            "/consultar-cantidades-inventario/" +
            this.usuario._id
        )
        .then((res) => {
          this.ProdInventarios = res.data.rows;
        })
        .catch((e) => console.log(e));
    },
  },
  computed: {
    searchInve: function () {
      return this.ProdInventarios.filter(
        (item) =>
          item.descripcion.includes(this.buscarCantidaes.toUpperCase()) ||
          item.barcode.includes(this.buscarCantidaes.toUpperCase()) ||
          item.codigo.includes(this.buscarCantidaes.toUpperCase()) ||
          item.nomalmacen.includes(this.buscarCantidaes.toUpperCase())
      );
    },
  },
};
</script>

<style>
img[class="btn-buscar"] {
  width: 20%;
}
tr[class="tabla1234"] {
background: #ECE9E6;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


}


</style>







