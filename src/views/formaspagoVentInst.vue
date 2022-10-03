<template>
  <div>
    <div class="container">
      <div class="card" style="width: 20rem">
        <ul
          class="list-group list-group-flush"
          v-for="item in datosFormasPago"
          :key="item.nomalmacen"
        >
          <li class="list-group-item">
            <h5 class="display-5">
              <small class="text-dark">
                {{ item.nompago }}: $ {{ item.valor }} <br />
                ALMACEN: {{ item.nomalmacen }}</small
              >
            </h5>
          </li>
        </ul>
        <div class="card-footer" v-if="this.totalFormasPago">
          <h5 class="display-5">
            <small class="text-dark">
              TOTAL FORMAS DE PAGO: ${{ this.totalFormasPago }}</small
            >
          </h5>
          <button
            type="submit"
            class="btn btn-warning btn-block"
            v-on:click="salir()"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fecha: "",
      datosFormasPago: [],
      totalFormasPago: null,
    };
  },
  mounted() {
    this.datosFormasPago.fecha = this.$route.params.fecha;
    axios
      .get(
        this.$conexion + "/ventas-instantaneas/" + this.datosFormasPago.fecha
      )
      .then((datos) => {
        this.datosFormasPago = datos.data.rows;

        for (let index = 0; index < this.datosFormasPago.length; index++) {
          if (this.datosFormasPago != null) {
            localStorage.setItem(
              "datosFormasPago",
              JSON.stringify(this.datosFormasPago)
            );

            this.totalFormasPago += this.datosFormasPago[index].valor;
            this.datosFormasPago = JSON.parse(
              localStorage.getItem("datosFormasPago")
            );
          }
        }
      })
      .catch((e) => console.log(e));
  },
  methods: {
    salir() {
      this.$router.push("/ventas-instante");
    },
  },
};
</script>