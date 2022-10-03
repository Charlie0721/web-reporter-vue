<template>
  <div id="Pedidos-Documentos">
    <div class="container">
      <center>
        <h2 class="display-4">
          <small class="text-muted"> PEDIDOS POR DOCUMENTO</small>
        </h2>
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
      <form v-on:submit.prevent="buscaPedidosDocumento">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Consultar Fecha </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="infoDocumento.fechaIni"
          />
          <h2 class="display-5">
            <small class="text-muted"> Fecha final </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="infoDocumento.fechaFin"
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
      <tr class="display-6 ml-auto" v-if="total">
        <small class="text-dark"
          >TOTAL VENTAS: $
          {{ new Intl.NumberFormat("de-DE").format(this.total) }}</small
        >
        <br />
      </tr>
      <br />
      <button
        class="btn btn-dark"
        style="background-color: #82230c"
        v-on:click="reloadPage"
      >
        Reiniciar Valores
      </button>
      <br />
      <br />
      <table class="table table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NUMERO</th>
            <th scope="col">FECHA</th>
            <th scope="col">HORA</th>
            <th scope="col">VALOR IMPUESTO</th>
            <th scope="col">SUBTOTAL</th>
            <th scope="col">DESCUENTOS</th>
            <th scope="col">TOTAL PEDIDO</th>
            <th scope="col">ALMACEN</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in documentosPedidos"
            :key="item.idpedido"
            v-on:click="verDetalle(item.numero, item.idalmacen)"
          >
            <th scope="row">{{ item.idpedido }}</th>
            <th scope="row">{{ item.numero }}</th>
            <th scope="row">{{ item.fecha }}</th>
            <th scope="row">{{ item.hora }}</th>
            <th scope="row">
              $ {{ new Intl.NumberFormat("de-DE").format(item.valimpuesto) }}
            </th>
            <th scope="row">
              $ {{ new Intl.NumberFormat("de-DE").format(item.valdescuentos) }}
            </th>
            <th scope="row">
              $ {{ new Intl.NumberFormat("de-DE").format(item.subtotal) }}
            </th>
            <th scope="row">
              $ {{ new Intl.NumberFormat("de-DE").format(item.valortotal) }}
            </th>
            <th scope="row">{{ item.nomalmacen }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "ped_comerciales_documento",
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
      infoDocumento: new Object(),
      documentosPedidos: [],
      total: null,
      idalmacen: "",
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
            "/api/documentos/pedidos-comerciales/almacenes/" +
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
    buscaPedidosDocumento() {
      let fechaIni = this.infoDocumento.fechaIni;
      let fechaFin = this.infoDocumento.fechaFin;
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
              "/api/documentos/pedidos-comerciales/" +
              this.idalmacen +
              "/" +
              this.usuario._id,
            data
          )
          .then((res) => {
            this.documentosPedidos = res.data.rows;

            for (let i = 0; i <= this.documentosPedidos.length; i++) {
              if (this.documentosPedidos != null) {
                this.total += this.documentosPedidos[i].valortotal;
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
        "Total de ventas en pedidos comerciales: " +
          this.nombreAlmacen +
          " entre " +
          this.infoDocumento.fechaIni +
          " y " +
          this.infoDocumento.fechaFin +
          " es: $" +
          new Intl.NumberFormat("de-DE").format(this.total),
        "success"
      );
    },
    verDetalle(numero, idalmacen) {
      this.$router.push("/todas-los-pedidos/" + numero + "/" + idalmacen);
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
