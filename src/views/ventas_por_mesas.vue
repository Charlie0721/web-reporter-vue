<template>
  <div id="ventas por mesas">
    <navigation></navigation>
    <div class="container">
      <center>
        <h2 class="display-5">
          <small class="text-muted"> INFORME VENTAS POR UBICACIONES </small>
        </h2>
      </center>

      <br />
      <div class="card-body">
        <form v-on:submit.prevent="consultarVentasMesas">
          <div class="form-group col-md-3">
            <h2 class="display-5">
              <small class="text-muted">Fecha inicial </small>
            </h2>
            <input
              type="date"
              placeholder="AAAAMMDD"
              class="form-control text-uppercase input-header"
              v-model="ventasMesas.fechaIni"
            />
            <h2 class="display-5">
              <small class="text-muted"> Fecha final </small>
            </h2>
            <input
              type="date"
              placeholder="AAAAMMDD"
              class="form-control text-uppercase input-header"
              v-model="ventasMesas.fechaFin"
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

        <br />
        <div class="table-responsive-sm table-bordered">
          <table
            class="
              table table-bordered table-sm table-ligth
              display
              nowrap
              text-white
            "
            cellspacing="0"
            style="background-color: #82230c"
          >
            <thead>
              <tr>
                <th scope="col">FECHA</th>
                <th scope="col">UBICACIONES OCUPADAS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in Ocupacion_mesas" :key="item.fecha">
                <td scope="row">{{ item.fecha }}</td>
                <td scope="row">{{ item.mesasocupadas }}</td>
              </tr>
            </tbody>
          </table>

          <br />
          <br />

          <div
            class="alert alert-danger text-white"
            role="alert"
            style="background-color: #eb4e2d"
            v-for="item in ventas_mesas"
            :key="item.nomubicacion"
          >
            {{ item.nomarea }}---- {{ item.nomubicacion }}--- TOTAL VENTAS : ${{
              new Intl.NumberFormat("de-DE").format(item.total)
            }}
          </div>
          <div
            class="alert alert-danger text-white"
            role="alert"
            style="background-color: #82230c"
            v-if="this.totalVentasMesa"
          >
            TOTAL TODAS LAS UBICACIONES: ${{
              new Intl.NumberFormat("de-DE").format(this.totalVentasMesa)
            }}
          </div>
        </div>
        <br />
        <img
          alt="reiniciaVal"
          class="reiniciaVal"
          src="../assets/Boton_reiniciar_valores.png"
          v-on:click="reloadPage"
        />
      </div>
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
      ventas_mesas: [],
      Ocupacion_mesas: [],
      usuario: new Object(),
      totalVentasMesa: null,
      totalVentas: null,
      ventasMesas: new Object(),
      fechas: [],
    };
  },
  methods: {
    consultarVentasMesas() {
      let fechaIni = this.ventasMesas.fechaIni;
      let fechaFin = this.ventasMesas.fechaFin;
      var data = {
        fechaIni: fechaIni.replace(/-/gi, ""),
        fechaFin: fechaFin.replace(/-/gi, ""),
      };
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios
        .post(
          this.$conexion + "/consulta-ventas-por-mesas/" + this.usuario._id,
          data
        )
        .then((response) => {
          this.ventas_mesas = response.data.rows;
          this.AlertaSatisfactoria();
          for (let index = 0; index < this.ventas_mesas.length; index++) {
            this.totalVentasMesa += this.ventas_mesas[index].total;
          }
        })
        .catch((err) => console.log(err));

      axios
        .post(
          this.$conexion +
            "/ocupacion-mesas-periodos-de-tiempo/" +
            this.usuario._id,
          data
        )
        .then((res) => {
          this.Ocupacion_mesas = res.data.rows;
        })
        .catch((err) => console.log(err));
    },
    reloadPage() {
      location.reload();
    },
    AlertaSatisfactoria() {
      this.$swal(
        "Confirmación!",
        "Ventas entre " +
          this.ventasMesas.fechaIni +
          " y " +
          this.ventasMesas.fechaFin +
          " Encontrada satisfactoriamente",
        "success"
      );
    },
  },
};
</script>