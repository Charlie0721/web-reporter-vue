<template>
  <div class="ventas por vendedor">
    <navigation></navigation>
    <div class="container">
      <center>
        <h2 class="display-4">
          <small class="text-muted"> INFORME VENTAS X VENDEDOR </small>
        </h2>
      </center>
      <br />
      <button
        type="button"
        class="btn btn-dark ml-auto d-flex"
        style="background-color: #82230c"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
        v-on:click="consultarAlmacenes"
      >
        Selecciona Almacen
      </button>
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel2">
                Seleccionar Almacen
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <table class="table-bordered table-responsive">
                <thead>
                  <tr>
                    <th scope="col">SELECCIONAR</th>
                    <th scope="col">TODOS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckIndeterminate"
                        v-on:click="SelectTodos(Todos_almacenes, nameAlmacen)"
                      />

                      {{ this.Todos_almacenes }}
                    </td>
                    <td>
                      {{ this.nameAlmacen }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table class="table-bordered table-responsive">
                <thead>
                  <tr>
                    <th scope="col">SELECCIONAR</th>

                    <th scope="col">ALMACEN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in almacenes" :key="item.idalmacen">
                    <th scope="row">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckIndeterminate"
                        v-on:click="
                          SelecAlmacen(item.idalmacen, item.nomalmacen)
                        "
                      />
                      {{ item.idalmacen }}
                    </th>
                    <td>
                      {{ item.nomalmacen }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                v-on:click="consultarAlmacenes"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <form v-on:submit.prevent="consultaVentasVendedor">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Fecha inicial </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="camposFormVentas.fechaIni"
          />
          <h2 class="display-5">
            <small class="text-muted"> Fecha final </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="camposFormVentas.fechaFin"
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
      <img
        alt="reiniciaVal"
        class="reiniciaVal"
        src="../assets/Boton_reiniciar_valores.png"
        v-on:click="reloadPage"
      />
      <br />

      <br />
      <tr class="display-5 ml-auto" v-if="nombreAlmacen">
        <small class="text-dark">ALMACEN: {{ this.nombreAlmacen }}</small>
        <br />
      </tr>
      <tr class="display-5 ml-auto" v-if="this.ventasTotales">
        <small class="text-dark"
          >TOTAL VENTAS: ${{
            new Intl.NumberFormat("de-DE").format(this.ventasTotales)
          }}</small
        >
        <br />
      </tr>
      <tr class="display-5 ml-auto" v-if="this.CantFacturas">
        <small class="text-dark"
          >CANTIDAD FACTURAS:{{ this.CantFacturas }}</small
        >
        <br />
      </tr>
      <br />
      <div
        class="alert alert-secondary"
        role="alert"
        v-for="item in VentasVendedor"
        :key="item.idvendedor"
      >
        VENDEDOR: {{ item.nomvendedor }} <br />

        CANTIDAD FACTURAS: {{ item.cantidad }} <br />
        TOTAL VENTAS:$ {{ new Intl.NumberFormat("de-DE").format(item.valor) }}
        <br />
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
      VentasVendedor: [],
      camposFormVentas: new Object(),
      errores: "",
      usuario: new Object(),
      almacenes: [],
      idalmacen: "",
      Todos_almacenes: 0,
      nameAlmacen: "TODOS LOS ALMACENES",
      nombreAlmacen: "",
      CantFacturas: null,
      ventasTotales: null,
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },
  methods: {
    async consultarAlmacenes() {
      await axios
        .get(
          this.$conexion + "/api/ventas-vendedor/almacenes/" + this.usuario._id
        )
        .then((alm) => {
          this.almacenes = alm.data.rows;
        });
    },
    SelecAlmacen(id, almacenNombre) {
      this.nombreAlmacen = almacenNombre;
      this.idalmacen = id;
    },
    SelectTodos(id, nombreAlmacen) {
      this.nombreAlmacen = nombreAlmacen;
      this.idalmacen = id;
    },
    reloadPage() {
      location.reload();
    },

    consultaVentasVendedor() {
      let fechaIni = this.camposFormVentas.fechaIni;
      let fechaFin = this.camposFormVentas.fechaFin;

      var data = {
        fechaIni: fechaIni.replace(/-/gi, ""),
        fechaFin: fechaFin.replace(/-/gi, ""),
      };
      if (fechaIni === null || fechaIni === " " || fechaIni === "") {
        this.Alertaerronea();
        return false;
      } else {
        this.AlertaSatisfactoria();
      }

      if (this.idalmacen === "" || this.idalmacen == null) {
        this.WarningAlert();
        return false;
      } else {
        axios
          .post(
            this.$conexion +
              "/consulta-ventas-vendedor/" +
              this.idalmacen +
              "/" +
              this.usuario._id,
            data
          )
          .then((response) => {
            this.VentasVendedor = response.data.rows;
            for (let i = 0; i <= this.VentasVendedor.length; i++) {
              this.ventasTotales += this.VentasVendedor[i].valor;
              this.CantFacturas += this.VentasVendedor[i].cantidad;
            }
          })
          .catch((error) => {
            console.log(console.log(error));
          });
      }
    },
    AlertaSatisfactoria() {
      this.$swal(
        "Confirmación!",
        "la información  se encontro satisfactoriamente!",
        "success"
      );
    },
    Alertaerronea() {
      this.$swal(
        "Verifique!",
        "No se encontro informacion o verifique el rango de fechas",
        "danger"
      );
    },
    WarningAlert() {
      this.$swal(
        "Alerta!",
        "Debe seleccionar Almacén ",

        "warning"
      );
    },
  },
};
</script>