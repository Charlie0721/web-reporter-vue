<template>
  <div id="ingresos caja">
  
    <div class="container">
      <center>
        <h2 class="display-4">
          <small class="text-muted"> INFORME INGRESOS CAJA </small>
        </h2>
      </center>
      <br />
      <form v-on:submit.prevent="consultaIngresosCaja">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Fecha inicial </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="datosIngresoCaja.fechaIni"
          />
          <h2 class="display-5">
            <small class="text-muted"> Fecha final </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="datosIngresoCaja.fechaFin"
          />

          <br />
          <button type="submit" class="btn btn-dark btn-block" style="background-color: #82230C;">
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
          <tr v-for="item in ingresosCaja" :key="item.idsalida">
            <th scope="row">{{ item.fecha }}</th>
            <td>{{ item.motivo }}</td>
            <td>{{ item.nomtercero }}</td>
            <td>$ {{ new Intl.NumberFormat("de-DE").format(item.valor) }}</td>
          </tr>
        </tbody>
      </table>
      <br />

       <tr class="display-4 ml-auto" v-if="totalIngresosCaja">
        <small class="text-dark">Total Ingresos Caja:${{ new Intl.NumberFormat("de-DE").format(this.totalIngresosCaja)  }}</small>
        <br />
      </tr>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ingresos_caja",
  props: {
    msg: String,
  },
  data() {
    return {
      ingresosCaja: [],
      datosIngresoCaja: new Object(),
      totalIngresosCaja: null,
      usuario: new Object()
    };
  },

  methods: {
    consultaIngresosCaja() {
      let fechaIni = this.datosIngresoCaja.fechaIni;
      let fechaFin = this.datosIngresoCaja.fechaFin;
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      var data = {
        fechaIni: fechaIni.replace(/-/gi, ""),
        fechaFin: fechaFin.replace(/-/gi, ""),
      };

      axios
        .post(this.$conexion + "/api/informe/ingresos-caja/"+this.usuario._id, data)
        .then((response) => {
          this.ingresosCaja = response.data.rows;

          for (let i = 0; i <= this.ingresosCaja.length; i++) {
            if (this.ingresosCaja != null) {
              localStorage.setItem(
                "VentasAcumulado",
                JSON.stringify(this.ingresosCaja)
              );
        this.totalIngresosCaja+= this.ingresosCaja[i].valor
   
            }
          }

        })
        .catch((error) => console.log(error));
    },
  },
};
</script>