<template>
  <div id="cuentas por cobrar">
    <navigation></navigation>
    <div class="container">
      <br />
      <center>
        <h2 class="display-5">
          <small class="text-muted"> CUENTAS X COBRAR </small>
        </h2>
      </center>

      <br /><br />
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
      <br /><br />
      <form v-on:submit.prevent="buscaCxC">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Consultar Fecha </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="CxC.fechaIni"
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
      <tr class="display-5 ml-auto" v-if="nombreAlmacen">
        <small class="text-dark">ALMACEN: {{ this.nombreAlmacen }}</small>
        <br />
      </tr>
      <tr class="display-5 ml-auto" v-if="this.totalCuentasXcobrar">
        <small class="text-dark"
          >TOTAL CUENTAS POR COBRAR: ${{
            new Intl.NumberFormat("de-DE").format(this.totalCuentasXcobrar)
          }}</small
        >
        <br />
      </tr>
      <br />
      <img
        alt="reiniciaVal"
        class="reiniciaVal"
        src="../assets/Boton_reiniciar_valores.png"
        v-on:click="reloadPage"
      />
      <br />
      <br />
      <table class="table table-bordered table-responsive table-sm table-ligth">
        <thead>
          <tr>
            <th scope="col">NIT</th>
            <th scope="col">CLIENTE</th>
            <th scope="col">DETALLE</th>
            <th scope="col">FECHA FACTURA</th>
            <th scope="col">FECHA ACORDADA</th>
            <th scope="col">TOTAL FACTURA</th>

            <th scope="col">ALMACEN</th>
          </tr>
        </thead>
        <tbody id="Datos2">
          <tr v-for="item in cuentasXcobrar" :key="item.idcartera">
            <th scope="row">
              <small class="text-dark">{{ item.nit }}</small>
            </th>
            <th scope="row">
              <small class="text-dark">{{ item.nomtercero }}</small>
            </th>
            <th scope="row">
              <small class="text-dark">{{ item.detalle }}</small>
            </th>
            <th scope="row">
              <small class="text-dark">{{ item.fechadoc }}</small>
            </th>
            <th scope="row">
              <small class="text-dark">{{ item.fechacuota }}</small>
            </th>
            <th scope="row">
              <small class="text-dark">
                ${{
                  new Intl.NumberFormat("de-DE").format(item.valcuota)
                }}</small
              >
            </th>

            <th scope="row">
              <small class="text-dark">{{ item.nomalmacen }}</small>
            </th>
            <td></td>
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
      CxC: new Object(),
      cuentasXcobrar: [],
      usuario: new Object(),
      totalFac: null,
      abonosF: null,
      saldosF: null,
      saldosFacturas: null,
      abonosTotal: null,
      almacenes: [],
      Todos_almacenes: 0,
      nameAlmacen: "TODOS LOS ALMACENES",
      nombreAlmacen: "",
      totalCuentasXcobrar: null,
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },
  methods: {
    buscaCxC() {
      let fechaIni = this.CxC.fechaIni;
      var data = {
        fechaIni: fechaIni.replace(/-/gi, ""),
      };

      if (
        this.idalmacen === "" ||
        this.idalmacen == null ||
        this.idalmacen < 0
      ) {
        this.WarningAlert();
        return false;
      } else {
        axios
          .post(
            this.$conexion +
              "/api/informe-cuentas-por-cobrar/" +
              this.idalmacen +
              "/" +
              this.usuario._id,
            data
          )
          .then((response) => {
            this.cuentasXcobrar = response.data.rows;
            for (let index = 0; index <= this.cuentasXcobrar.length; index++) {
              this.totalCuentasXcobrar += this.cuentasXcobrar[index].valcuota;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async consultarAlmacenes() {
      await axios
        .get(
          this.$conexion +
            "/api/consulta-cuentas-por-cobrar-info/almacenes/" +
            this.usuario._id
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