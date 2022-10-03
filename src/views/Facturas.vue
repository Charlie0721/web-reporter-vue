<template>
  <div id="todas las facturas">
    <navigation></navigation>
    <div class="container">
      <br />
      <center>
        <h2 class="display-4">
          <small class="text-muted"> TODAS LAS FACTURAS </small>
        </h2>
      </center>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Buscar Factura </span>
        </div>
        <input
          type="search"
          class="form-control text-uppercase"
          placeholder="Buscar"
          name="buscar"
          style="width: 300px"
          v-model="buscarFactura"
        />
      </div>

      <table class="table table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">N° FACTURA</th>
            <th scope="col">FECHA</th>
            <th scope="col">SUBTOTAL</th>
            <th scope="col">IMPUESTO</th>
            <th scope="col">VALOR TOTAL</th>
            <th scope="col">HORA</th>
            <th scope="col">ALMACEN</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in BuscarFacturas"
            :key="item.idalamacen"
            v-on:click="verDetalle(item.numero, item.idalmacen)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Ver detalle factura"
          >
            <td class="tr-todas-facturas" scope="col">{{ item.numero }}</td>
            <td class="tr-todas-facturas">{{ item.fecha }}</td>
            <td class="tr-todas-facturas">
              $ {{ new Intl.NumberFormat("de-DE").format(item.subtotal) }}
            </td>
            <td class="tr-todas-facturas">
              ${{ new Intl.NumberFormat("de-DE").format(item.valimpuesto) }}
            </td>
            <td class="tr-todas-facturas">
              $ {{ new Intl.NumberFormat("de-DE").format(item.valortotal) }}
            </td>
            <td class="tr-todas-facturas">{{ item.hora }}</td>
            <td class="tr-todas-facturas">{{ item.nomalmacen }}</td>
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
      listadoFacturas: [],
      buscarFactura: "",
      usuario: new Object(),
    };
  },
  mounted() {
    this.ObtFacturas();
  },
  methods: {
    ObtFacturas() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios
        .get(this.$conexion + "/facturas/" + this.usuario._id)
        .then((response) => {
          this.listadoFacturas = response.data.rows;
        })
        .catch((e) => console.log(e));
    },
    verDetalle(numero, idalmacen) {
      this.$router.push("/todas-las-facturas/" + numero + "/" + idalmacen);
    },
  },
  computed: {
    BuscarFacturas: function () {
      return this.listadoFacturas.filter(
        (item) =>
          item.fecha.includes(this.buscarFactura) ||
          item.nomalmacen.includes(this.buscarFactura.toUpperCase()) ||
          item.numero.toString().includes(this.buscarFactura.toUpperCase()) ||
          item.valortotal.toString().includes(this.buscarFactura.toUpperCase())
      );
    },
  },
};
</script>
<style>
td[class="tr-todas-facturas"] {
 background: #f0efeb;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #EAEAEA, #f7f5f5, #f7f0f0, #d8d7cf);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #fffdfd, #eeecec, #F2F2F2, #dbdbda); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>