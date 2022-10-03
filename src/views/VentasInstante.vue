<template>
  <div class="ventasInstante">
   <navigation></navigation>
    <div class="container">
      <br>
      <center>
        <h1 class="display-5">
          <small class="text-muted"> INFORME VENTAS DIA </small>
        </h1>
      </center>
      <br /><br />

      <form v-on:submit.prevent="buscarVi">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Consultar Fecha </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="ventasInstante.fechaIni"
          />

          <br />
          <button
            type="submit"
            class="btn btn-dark btn-block"
            style="background-color: #82230c"
          >
            Buscar
          </button>
        </div>
      </form>
      <table class="table table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">FECHA</th>
            <th scope="col">ID ALMACEN</th>
            <th scope="col">ALMACEN</th>
            <th scope="col">SUBTOTAL</th>
            <th scope="col">TOTAL</th>
            <th scope="col">FACTURAS</th>
            <th scope="col">PROD VENDIDOS</th>
            <th scope="col">COSTO</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in datosEncontrados"
            :key="item.idalamacen"
            v-on:click="verFacturas(item.fecha, item.idalmacen)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Ver formas de pago" 
          >
            <td class="tr-ventas-dia" scope="row">{{ item.fecha }}</td>
            <td class="tr-ventas-dia" scope="row" >{{ item.idalmacen }}</td>
            <td class="tr-ventas-dia">{{ item.nomalmacen }}</td>
            <td class="tr-ventas-dia">$ {{ new Intl.NumberFormat("de-DE").format(item.subtot) }}</td>
            <td class="tr-ventas-dia">$ {{ new Intl.NumberFormat("de-DE").format(item.total) }}</td>
            <td class="tr-ventas-dia">{{ item.cantfact }}</td>
            <td class="tr-ventas-dia">{{ item.prodvendid }}</td>
            <td class="tr-ventas-dia">
              $ {{ new Intl.NumberFormat("de-DE").format(item.costoacum) }}
            </td>
          </tr>
        </tbody>
      </table>
      <h4 class="display-5" v-if="this.totalV">
        <small class="text-muted"
          >TOTAL VENTAS: $
          {{ new Intl.NumberFormat("de-DE").format(this.totalV) }}</small
        >
      </h4>
      <h4 class="display-5" v-if="this.prodVendidos">
        <small class="text-muted"
          >TOTAL PRODUCTOS: {{ this.prodVendidos }}</small
        >
      </h4>
      <h4 class="display-5" v-if="this.cantFacturas">
        <small class="text-muted"
          >TOTAL FACTURAS: {{ this.cantFacturas }}</small
        >
      </h4>
      <h4 class="display-5" v-if="this.costoAcum">
        <small class="text-muted"
          >COSTO: $
          {{ new Intl.NumberFormat("de-DE").format(this.costoAcum) }}</small
        >
      </h4>
      <h4 class="display-5" v-if="this.cantFacturas">
        <small class="text-muted"
          >UTILIDAD: $
          {{ new Intl.NumberFormat("de-DE").format(this.utilidad) }}</small
        >
      </h4>
      <br />
     <img
        alt="reiniciaVal"
        class="reiniciaVal"
        src="../assets/Boton_reiniciar_valores.png"
        v-on:click="refreshPage()"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import  navigation from "@/components/navigation"
export default {
    components: {
    navigation,
  },
  data() {
    return {
      ventasInstante: [],
      datosEncontrados: [],
      totalV: null,
      prodVendidos: null,
      cantFacturas: null,
      usuario: new Object(),
      costoAcum: null,
      utilidad: null,
      dataNotFind: null,
      sub_total: null
    };
  },

  methods: {
    buscarVi() {
      let fechaIni = this.ventasInstante.fechaIni;
      var data = {
        fechaIni: fechaIni.replace(/-/gi, ""),
      };
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios
        .post(this.$conexion + "/ventas-instantaneas/" + this.usuario._id, data)
        .then((res) => {
          const venInstante = res.data.rows;

          this.AlertaSatisfactoria();

          if (venInstante != null || venInstante.length > 0) {
            for (let i = 0; i <= venInstante.length; i++) {
              localStorage.setItem("venInstante", JSON.stringify(venInstante));

              this.totalV += venInstante[i].total;
              this.costoAcum += venInstante[i].costoacum;
              this.prodVendidos += venInstante[i].prodvendid;
              this.cantFacturas += venInstante[i].cantfact;
              this.sub_total+= venInstante[i].subtot
              this.utilidad = this.sub_total - this.costoAcum;
              this.datosEncontrados = JSON.parse(
                localStorage.getItem("venInstante")
              );
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    AlertaSatisfactoria() {
      this.$swal("Confirmación!", "Información encontrada", "success");
    },

    verFormasPago(fecha) {
      this.$router.push("/ventas-instante/" + fecha);
    },
    verFacturas(fecha, idalmacen) {
      this.$router.push("/ventas-instante/" + fecha + "/" + idalmacen);
    },

    refreshPage() {
      location.reload();
    },
  },
};
</script>
<style>

td[class="tr-ventas-dia"] {
background: #8e9eab;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #eef2f3, #8e9eab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

</style>