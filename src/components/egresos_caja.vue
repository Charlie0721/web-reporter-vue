<template>
  <div id="ingresos caja">
    <div class="container">
      <center>
        <h2 class="display-4">
          <small class="text-muted"> INFORME EGRESOS CAJA </small>
        </h2>
      </center>
      <br />
      <form v-on:submit.prevent="consultaSalidasCaja">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Fecha inicial </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="datosSalidaCaja.fechaIni"
          />
          <h2 class="display-5">
            <small class="text-muted"> Fecha final </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="datosSalidaCaja.fechaFin"
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
         <img
      alt="reiniciaVal"
      class="reiniciaVal"
      src="../assets/Boton_reiniciar_valores.png"
      v-on:click="reloadPage"
    />
      </form>
      <br />
      <br />
      <table class="table table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">FECHA</th>
            <th scope="col">MOTIVO</th>
            <th scope="col">TERCERO</th>
            <th scope="col">VALOR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in salidasCaja" :key="item.idsalida">
            <th scope="row">{{ item.fecha }}</th>
            <td>{{ item.motivo }}</td>
            <td>{{ item.nomtercero }}</td>
            <td>$ {{ new Intl.NumberFormat("de-DE").format(item.valor) }}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <tr class="display-4 ml-auto" v-if="totalSalidasCaja">
        <small class="text-dark"
          >Total Egresos Caja:${{
            new Intl.NumberFormat("de-DE").format(this.totalSalidasCaja)
          }}</small
        >
        <br />
      </tr>
    </div>
   
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "egresos_caja",
  props: {
    msg: String,
  },
  data() {
    return {
      salidasCaja: [],
      datosSalidaCaja: new Object(),
      totalSalidasCaja: null,
      usuario: new Object(),
    };
  },

  methods: {
    consultaSalidasCaja() {
      let fechaIni = this.datosSalidaCaja.fechaIni;
      let fechaFin = this.datosSalidaCaja.fechaFin;
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      var data = {
        fechaIni: fechaIni.replace(/-/gi, ""),
        fechaFin: fechaFin.replace(/-/gi, ""),
      };

      axios
        .post(
          this.$conexion + "/api/informe/egresos-de-caja/" + this.usuario._id,
          data
        )
        .then((response) => {
          this.salidasCaja = response.data.rows;

          for (let i = 0; i <= this.salidasCaja.length; i++) {
            if (this.salidasCaja != null) {
              localStorage.setItem(
                "VentasAcumulado",
                JSON.stringify(this.salidasCaja)
              );
              this.totalSalidasCaja += this.salidasCaja[i].valor;
            }
          }
        })
        .catch((error) => console.log(error));
    },
    reloadPage() {
      location.reload();
    },
  },
};
</script>