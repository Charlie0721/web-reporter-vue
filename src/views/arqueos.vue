<template>
  <div id="arqueos">
    <navigation></navigation>
    <div class="container">
      <center>
        <h2 class="display-4">
          <small class="text-muted"> ARQUEOS CAJA</small>
        </h2>
      </center>

      <form v-on:submit.prevent="ObtenerArqueos">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Consultar Fecha Apertura</small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="ConsuArqueo.fechaIni"
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

      <table class="table table-hover table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">FECHA APERTURA</th>
            <th scope="col">FECHA CIERRE</th>
            <th scope="col">ALMACEN</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in arqueos"
            :key="item.idarqueo"
            v-on:click="verDetalle(item.idarqueo)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Ver detalle factura"
          >
            <th scope="row">
              {{
                new Date(item.fechaap).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour12: true,
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </th>
            <th scope="row">
              {{
                new Date(item.fechacie).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour12: true,
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </th>
            <th scope="row">
              {{ item.nomalmacen }}
            </th>
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
      arqueos: [],
      usuario: new Object(),
      ConsuArqueo: new Object(),
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },
  methods: {
    ObtenerArqueos() {
      let fechaIni = this.ConsuArqueo.fechaIni;
      var data = {
        fechaIni: fechaIni,
      };
      console.log(data);
      axios
        .post(this.$conexion + "/api/arqueoscaja/" + this.usuario._id, data)
        .then((response) => {
          this.arqueos = response.data.rows;
        })
        .catch((e) => console.log(e));
    },
    verDetalle(idarqueo) {
      this.$router.push("/informe/arqueos-caja/" + idarqueo);
    },
  },
};
</script>