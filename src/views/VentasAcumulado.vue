<template>
  <div id="ventasAcumulado">
  <navigation></navigation>
    <div class="container">
      <center>
        <h2 class="display-4">
          <small class="text-muted"> INFORME VENTAS ACUMULADO </small>
        </h2>
      </center>
      <br />
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
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <form v-on:submit.prevent="consultarVentasAcunuladas">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Fecha inicial </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="ventasAcumul.fechaIni"
          />
          <h2 class="display-5">
            <small class="text-muted"> Fecha final </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="ventasAcumul.fechaFin"
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
      <br /><br>
      <tr class="display-5 ml-auto" v-if="nombreAlmacen">
        <small class="text-dark">ALMACEN: {{ this.nombreAlmacen }}</small>
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="totalVenNeta">
        <small class="text-dark"
          >Subtotal: $
          {{ new Intl.NumberFormat("de-DE").format(this.totalVenNeta) }}</small
        >
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="totalIva">
        <small class="text-dark"
          >IVA: $
          {{ new Intl.NumberFormat("de-DE").format(this.totalIva) }}</small
        >
        <br />
      </tr>
      <tr class="display-5 ml-auto" v-if="TotalVentasAcumuladas">
        <small class="text-dark"
          >Total Ventas: $
          {{
            new Intl.NumberFormat("de-DE").format(this.TotalVentasAcumuladas)
          }}</small
        >
        <br />
      </tr>
      <tr class="display-5 ml-auto" v-if="total_devoluciones">
        <small class="text-dark"
          >Total Devoluciones: $
          {{
            new Intl.NumberFormat("de-DE").format(this.total_devoluciones)
          }}</small
        >
        <br />
      </tr>
      <tr class="display-5 ml-auto">
        <small class="text-dark"
          >Total Ventas - Devoluciones: $
          {{
            new Intl.NumberFormat("de-DE").format(
              (this.total_menos_devoluciones =
                this.TotalVentasAcumuladas + this.total_devoluciones)
            )
          }}</small
        >
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="costoAcum">
        <small class="text-dark"
          >Total Costos: $
          {{ new Intl.NumberFormat("de-DE").format(this.costoAcum) }}</small
        >
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="utilidad">
        <small class="text-dark"
          >Utilidad: $
          {{ new Intl.NumberFormat("de-DE").format(this.utilidad) }}</small
        >
        <br />
      </tr>

      <tr class="display-6 ml-auto" v-if="totalProd">
        <small class="text-dark"
          >Productos Vendidos: {{ this.totalProd }}</small
        >
        <br />
      </tr>

      <tr class="display-6 ml-auto" v-if="totalFacts">
        <small class="text-dark">Total Facturas: {{ this.totalFacts }}</small>
        <br />
      </tr>
      <br />
      <div class="table-responsive-sm table-bordered">
        <table
          class="table table-bordered table-sm table-ligth display nowrap"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Productos Vendidos</th>
              <th scope="col">Costo</th>
              <th scope="col">Subtotal</th>
              <th scope="col">IVA</th>
              <th scope="col">Total</th>
              <th scope="col">Facturas</th>
              <th scope="col">Almacén</th>
              <th scope="col">Otros Impu</th>
              <th scope="col">Imp INC</th>
              <th scope="col">Devoluciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in VentasAcumulado" :key="item.idalamacen">
              <td scope="row">{{ item.fecha }}</td>
              <td scope="row">{{ item.prodvendid }}</td>
              <td>
                $ {{ new Intl.NumberFormat("de-DE").format(item.costoacum) }}
              </td>
              <td scope="row">
                $ {{ new Intl.NumberFormat("de-DE").format(item.subtot) }}
              </td>
              <td scope="row">
                $ {{ new Intl.NumberFormat("de-DE").format(item.ivaimp) }}
              </td>
              <td scope="row" class="price">
                ${{ new Intl.NumberFormat("de-DE").format(item.total) }}
              </td>
              <td scope="row">{{ item.cantfact }}</td>
              <td scope="row">{{ item.nomalmacen }}</td>
              <td scope="row">
                $
                {{ new Intl.NumberFormat("de-DE").format(item.otrosimpuestos) }}
              </td>
              <td scope="row">
                $ {{ new Intl.NumberFormat("de-DE").format(item.impuestoinc) }}
              </td>

              <td scope="row">
                $ {{ new Intl.NumberFormat("de-DE").format(item.valordev) }}
              </td>
            </tr>
          </tbody>
        </table>
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
      VentasAcumulado: [],
      almacenes: [],
      TotalVentasAcumuladas: null,
      ventasAcumul: new Object(),
      totalIva: null,
      totalProd: null,
      totalFacts: null,
      usuario: new Object(),
      totalVenNeta: null,
      costoAcum: null,
      utilidad: null,
      idalmacen: "",
      nombreAlmacen: "",
      Todos_almacenes: 0,
      nameAlmacen: "TODOS LOS ALMACENES",
      total_devoluciones: null,
      total_menos_devoluciones: null,
      elegirAlmacenes: [],
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },
  methods: {
    reloadPage() {
      location.reload();
    },
    async consultarAlmacenes() {
      await axios
        .get(
          this.$conexion +
            "/api/consulta-ventas-acumuladas/almacenes/" +
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

    consultarVentasAcunuladas() {
      let fechaIni = this.ventasAcumul.fechaIni;
      let fechaFin = this.ventasAcumul.fechaFin;
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
              "/consulta-ventas-acumuladas/" +
              this.idalmacen +
              "/" +
              this.usuario._id,
            data
          )
          .then((response) => {
            this.VentasAcumulado = response.data.rows;

            for (let index = 0; index < this.VentasAcumulado.length; index++) {
              if (this.VentasAcumulado != null) {
                localStorage.setItem(
                  "VentasAcumulado",
                  JSON.stringify(this.VentasAcumulado)
                );

                this.TotalVentasAcumuladas += this.VentasAcumulado[index].total;
                this.totalIva += this.VentasAcumulado[index].ivaimp;
                this.totalProd += this.VentasAcumulado[index].prodvendid;
                this.totalFacts += this.VentasAcumulado[index].cantfact;
                this.totalVenNeta += this.VentasAcumulado[index].subtot;
                this.costoAcum += this.VentasAcumulado[index].costoacum;
                this.total_devoluciones += this.VentasAcumulado[index].valordev;
                this.utilidad = this.totalVenNeta - this.costoAcum; 
              }
            }

            this.AlertaDatos();
          })
          .catch((e) => console.log(e));
      }
    },

    AlertaDatos() {
      this.$swal(
        "Confirmación!",
        "Total de ventas de: " +
          this.nombreAlmacen +
          " entre " +
          this.ventasAcumul.fechaIni +
          " y " +
          this.ventasAcumul.fechaFin +
          " es: $" +
          new Intl.NumberFormat("de-DE").format(this.TotalVentasAcumuladas),
        "success"
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