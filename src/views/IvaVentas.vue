<template>
  <div id="ivaVentas">
    <navigation></navigation>
    <div class="container">
      <center>
        <h2 class="display-4">
          <small class="text-muted"> INFORME IVA EN VENTAS </small>
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
      <form v-on:submit.prevent="buscarInfor">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Fecha inicial </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="ivaVentas.fechaIni"
          />
          <h2 class="display-5">
            <small class="text-muted"> Fecha final </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="ivaVentas.fechaFin"
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
      <br />
      <table class="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">NOMBRE</th>
            <th scope="col">%</th>
            <th scope="col">BASE</th>
            <th scope="col">IVA</th>
            <th scope="col">DEVOLUCIONES</th>
            <th scope="col">BASE DEV</th>
            <th scope="col">IVA DEV</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in datosIva" :key="item.codiva">
            <td>{{ item.nombre }}</td>
            <td>{{ item.porcentaje }}</td>
            <td>$ {{ new Intl.NumberFormat("de-DE").format(item.baseiva) }}</td>
            <td>$ {{ new Intl.NumberFormat("de-DE").format(item.iva) }}</td>
            <td>
              $ {{ new Intl.NumberFormat("de-DE").format(item.totdevprod) }}
            </td>
            <td>$ {{ new Intl.NumberFormat("de-DE").format(item.basedev) }}</td>
            <td>$ {{ new Intl.NumberFormat("de-DE").format(item.ivadev) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="alert alert-secondary" role="alert" v-if="this.totalIva">
        TOTAL IVA FACTURAS:$
        {{ new Intl.NumberFormat("de-DE").format(this.totalIva) }}
      </div>

      <div class="alert alert-secondary" role="alert" v-if="this.ivaDev">
        - TOTAL IVA DEVOLUCIONES: ${{
          new Intl.NumberFormat("de-DE").format(this.ivaDev)
        }}
      </div>

      <div class="alert alert-secondary" role="alert" v-if="this.IvaTotal">
        TOTAL IVA: ${{ new Intl.NumberFormat("de-DE").format(this.IvaTotal) }}
      </div>

      <div class="alert alert-secondary" role="alert" v-if="this.base">
        TOTAL BASE: ${{ new Intl.NumberFormat("de-DE").format(this.base) }}
      </div>

      <div class="alert alert-secondary" role="alert" v-if="this.totalVentas">
        TOTAL VENTAS SIN DEVOLUCIONES: ${{
          new Intl.NumberFormat("de-DE").format(this.totalVentas)
        }}
      </div>
      <br />
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
      ivaVentas: new Object(),
      datosIva: new Object(),
      usuario: new Object(),
      totalIva: null,
      base: null,
      totalVentas: null,
      ivaDev: null,
      IvaTotal: null,
      almacenes: [],
      idalmacen: "",
      Todos_almacenes: 0,
      nameAlmacen: "TODOS LOS ALMACENES",
      nombreAlmacen: "",
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },
  methods: {
    async consultarAlmacenes() {
      await axios
        .get(this.$conexion + "/api/iva-ventas/almacenes/" + this.usuario._id)
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
    buscarInfor() {
      let fechaIni = this.ivaVentas.fechaIni;
      let fechaFin = this.ivaVentas.fechaFin;
      var data = {
        fechaIni: fechaIni.replace(/-/gi, ""),
        fechaFin: fechaFin.replace(/-/gi, ""),
      };

      if (this.idalmacen === "" || this.idalmacen == null) {
        this.WarningAlert();
        return false;
      } else {
        axios
          .post(
            this.$conexion +
              "/informe/iva-ventas/" +
              this.idalmacen +
              "/" +
              this.usuario._id,
            data
          )
          .then((res) => {
            var DatosDeIva = res.data.rows;
            for (let index = 0; index < DatosDeIva.length; index++) {
              if (DatosDeIva != null) {
                localStorage.setItem("DatosDeIva", JSON.stringify(DatosDeIva));

                this.totalIva += DatosDeIva[index].iva;
                this.base += DatosDeIva[index].baseiva;
                this.ivaDev += DatosDeIva[index].ivadev;

                this.datosIva = JSON.parse(localStorage.getItem("DatosDeIva"));

                this.totalVentas = this.totalIva + this.base;
              }
            }
            this.IvaTotal = this.totalIva - this.ivaDev;
          })
          .catch((e) => console.log(e));
      }
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