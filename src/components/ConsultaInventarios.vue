<template>
  <div class="hello">
    <div class="container">
      <br /><br />
      <h1 class="display-5 text-blue">CONSULTAR CANTIDADES X CODIGO BARRAS</h1>
      <br />
      
      <form v-on:submit.prevent="buscar">
        <input
          class="form-control form-control-lg"
          type="text"
          placeholder="Codigo de barras"
          id="consulInvBarras"
          aria-label=".form-control-lg example"
          v-model="buscarProd.barcode"
        />
        <br />
        <button
          type="submit"
          class="btn btn-dark btn-block"
          style="background-color: #82230c"
        >
          Buscar
        </button>
      </form>

      <div class="card">
        <div class="card-body">
          <h3
            class="display-5"
            v-for="item in productosEncontrados"
            :key="item.nomalmacen"
          >
            <small class="text-muted">{{ item.descripcion }}</small>
            <br />
            <small class="text-muted">ALMACEN: {{ item.nomalmacen }}</small>
            <br />
            <small class="text-muted"> CANTIDAD: {{ item.cantidad }}</small>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      buscarProd: new Object(),
      productosEncontrados: new Object(),
      usuario: new Object(),
    };
  },
  methods: {
    buscar() {
      var data = {
        barcode: this.buscarProd.barcode,
      };
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios

        .post(
          this.$conexion + "/consultar-inventario/" + this.usuario._id,
          data
        )
        .then((res) => {
          var producto = res.data.rows;
          if (producto != null) {
            localStorage.setItem("producto", JSON.stringify(producto));

            this.productosEncontrados = JSON.parse(
              localStorage.getItem("producto")
            );
          }
          this.buscarProd.barcode = "";
        });
    },
  },
};
</script>

<style>
