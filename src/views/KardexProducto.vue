<template>
  <div id="kardeProdcuto">
    <div class="container">
      <center>
        <h4 class="display-5" v-if="this.KardexTotal">
          <small class="text-muted">
            DETALLE DEL PRODUCTO: {{ KardexTotal.descripcion }}
          </small>
        </h4>
      </center>
      <br />
      <button class="btn btn-dark" v-on:click="volver">volver</button>
      <br /><br />
      <table class="table table-responsive">
        <thead>
          <tr>
            <th scope="col">MOVIMIENTO</th>
            <th scope="col">FECHA</th>
            <th scope="col">CANTIDAD</th>
            <th scope="col">COSTO</th>
            <th scope="col">SALDO ANTERIOR</th>
            <th scope="col">NUEVO SALDO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataKardex" :key="item.idkardex">
            <th scope="row">{{ item.detallemov }}</th>
            <td>{{ item.fechamov }}</td>
            <td>{{ item.cantidad }}</td>
            <td>${{ new Intl.NumberFormat("de-DE").format(item.costo) }}</td>
            <td>{{ item.saldoant }}</td>
            <td>{{ item.saldocant }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataKardex: [],
      KardexTotal: "",
      usuario: new Object(),
    };
  },
  methods: {
    volver() {
      this.$router.push("/informe/kardex");
    },
  },

  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.dataKardex.idproducto = this.$route.params.idproducto;
    this.dataKardex.idalmacen = this.$route.params.idalmacen;
    axios
      .get(
        this.$conexion +
          "/informes/Kardex/resumido/" +
          
          this.dataKardex.idproducto +
          "/" +
          this.dataKardex.idalmacen +
          "/" +
          this.usuario._id
      )
      .then((response) => {
        this.dataKardex = response.data.rows;
        this.KardexTotal = response.data.data1;

        if (this.dataKardex != null) {
          localStorage.setItem("dataKardex", JSON.stringify(this.dataKardex));
        }
      });
  },
};
</script>