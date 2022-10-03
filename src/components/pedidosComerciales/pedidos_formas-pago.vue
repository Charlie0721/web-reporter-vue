<template>
  <div id="Pedidos-formas-pago">
    <div class="container">
      <center>
        <h4 class="display-4">
          <small class="text-muted"> PEDIDOS POR FORMAS DE PAGO</small>
        </h4>
      </center>
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
                Cerrar
              </button>
            </div>
            <br />
          </div>
        </div>
      </div>
      <br />
      <br /><br />
      <form v-on:submit.prevent="buscarPedidosFormasPago">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Consultar Fecha </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="infoFpago.fechaIni"
          />
          <h2 class="display-5">
            <small class="text-muted"> Fecha final </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="infoFpago.fechaFin"
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
        <button
        class="btn btn-dark"
        style="background-color: #82230c"
        v-on:click="reloadPage"
      >
        Reiniciar Valores
      </button>
      <br />
      <tr class="display-5 ml-auto" v-if="nombreAlmacen">
        <small class="text-dark">ALMACEN: {{ this.nombreAlmacen }}</small>
        <br />
      </tr>
      
      <tr class="display-6 ml-auto" v-if="total">
        <small class="text-dark"
          >TOTAL FORMAS PAGO: $
          {{ new Intl.NumberFormat("de-DE").format(this.total) }}</small
        >
        <br />
      </tr>
      <br />
      <br />
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">FORMA PAGO</th>
            <th scope="col">TOTAL</th>
            <th scope="col">ALMACEN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in Formas_Pago_Pedidos" :key="item.idalamacen">
            <th scope="row">{{ item.nompago }}</th>

            <td>$ {{ new Intl.NumberFormat("de-DE").format(item.valor) }}</td>
            <td>
              {{ item.nomalmacen }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "ped_comerciales_formas_pago",
  props: {
    msg: String,
  },

  data() {
    return {
      almacenes: [],
      usuario: new Object(),
      nombreAlmacen: "",
      Todos_almacenes: 0,
      nameAlmacen: "TODOS LOS ALMACENES",
      idalmacen: "",
      infoFpago: new Object(),
      Formas_Pago_Pedidos: [],
      total: null,
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },

  methods: {
    async consultarAlmacenes() {
      await axios
        .get(
          this.$conexion +
            "/api/formas-pago/pedidos-comerciales/almacenes/" +
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
    buscarPedidosFormasPago() {
      let fechaIni = this.infoFpago.fechaIni;
      let fechaFin = this.infoFpago.fechaFin;
      let data = {
        fechaIni: fechaIni.replace(/-/gi, ""),
        fechaFin: fechaFin.replace(/-/gi, ""),
      };

      if (
        this.idalmacen === "" ||
        this.idalmacen === null ||
        this.idalmacen === " "
      ) {
        this.WarningAlert();
        return false;
      } else {
        axios
          .post(
            this.$conexion +
              "/api/formas-pago/pedidos-comerciales/" +
              this.idalmacen +
              "/" +
              this.usuario._id,
            data
          )
          .then((res) => {
            this.Formas_Pago_Pedidos = res.data.rows;
          

            for (let i = 0; i <= this.Formas_Pago_Pedidos.length; i++) {
              if (this.Formas_Pago_Pedidos != null) {
                this.total += this.Formas_Pago_Pedidos[i].valor;
               
                this.AlertaSatisfactoria();
              }
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    AlertaSatisfactoria() {
      this.$swal(
        "Confirmación!",
        "Total Formas de Pago en pedidos comerciales en: " +
          this.nombreAlmacen +
          " entre " +
          this.infoFpago.fechaIni +
          " y " +
          this.infoFpago.fechaFin +
          " es: $" +
          new Intl.NumberFormat("de-DE").format(this.total),
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
     reloadPage() {
      location.reload();
    },
  },
};
</script>
