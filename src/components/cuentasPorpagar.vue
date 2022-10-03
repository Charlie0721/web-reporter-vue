<template>
  <div id="fechaVencimiento">
    <div class="container">
   
      <center>
        <h2 class="display-5">
          <small class="text-muted"> INFORME DE CUENTAS POR PAGAR </small>
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
      <form v-on:submit.prevent="buscaCxP">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Consultar Fecha </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="CxP.fechaIni"
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
      <tr class="display-5 ml-auto" v-if="nombreAlmacen">
        <small class="text-dark">ALMACEN: {{ this.nombreAlmacen }}</small>
        <br />
      </tr>
      <tr class="display-5 ml-auto" v-if="this.totalCredito">
        <small class="text-dark"
          >TOTAL CREDITO: ${{
            new Intl.NumberFormat("de-DE").format(this.totalCredito)
          }}</small
        >
        <br />
      </tr>
        <tr class="display-5 ml-auto" v-if="this.Abonos">
        <small class="text-dark"
          >TOTAL ABONOS: ${{
            new Intl.NumberFormat("de-DE").format(this.Abonos)
          }}</small
        >
        <br />
      </tr>
      <tr class="display-5 ml-auto" v-if="this.Abonos">
        <small class="text-dark"
          >SALDO POR CANCELAR:: ${{
            new Intl.NumberFormat("de-DE").format(this.SaldoCancelar=(this.totalCredito-this.Abonos))
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
      <br />  <br />  
      <table
        class="table table-bordered table-sm table-ligth display nowrap"
        cellspacing="0"
      >
        <thead>
          <tr>
            <th scope="col">NIT</th>
            <th scope="col">CLIENTE</th>
            <th scope="col">DETALLE</th>
            <th scope="col">FECHA FACTURA</th>
            <th scope="col">FECHA ACORDADA</th>
            <th scope="col">TOTAL FACTURA</th>
            <th scope="col">ABONO</th>

            <th scope="col">ALMACEN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cuentasXpagar" :key="item.item">
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
              <small class="text-dark">
                ${{
                  new Intl.NumberFormat("de-DE").format(item.credito)
                }}</small
              >
            </th>

            <th scope="row">
              <small class="text-dark">{{ item.nomalmacen }}</small>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "cxp",
  props: {
    msg: String,
  },
  data() {
    return {
      cuentasXpagar: [],
      CxP: new Object(),
      usuario: new Object(),
      almacenes: [],
      Todos_almacenes: 0,
      nameAlmacen: "TODOS LOS ALMACENES",
      totalCredito: null,
      Abonos: null,
      SaldoCancelar: null,
      credito: null,
      nombreAlmacen: "",
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },
  methods: {
    async buscaCxP() {
      let fechaIni = this.CxP.fechaIni;
      var data = {
        fechaIni: fechaIni.replace(/-/gi, ""),
      };
      await axios
        .post(
          this.$conexion +
            "/api/informe/cuentas-por-pagar/" +
            this.idalmacen +
            "/" +
            this.usuario._id,
          data
        )
        .then((response) => {
          this.cuentasXpagar = response.data.rows;
          for (let index = 0; index < this.cuentasXpagar.length; index++) {
            this.totalCredito += this.cuentasXpagar[index].valcuota;
            this.Abonos+=this.cuentasXpagar[index].credito;
          }
        })
        .catch((err) => console.error(err));
    },
    async consultarAlmacenes() {
      await axios
        .get(
          this.$conexion +
            "/api/cuentas-por-pagar/almacenes/" +
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
  },
};
</script>



