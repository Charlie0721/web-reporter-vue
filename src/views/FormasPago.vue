
<template>
  <div class="formaspago">
    <navigation></navigation>

    <div class="container">
      <br />
      <center>
        <h1 class="display-5">
          <small class="text-muted"> INFORME FORMAS DE PAGO </small>
        </h1>
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
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <form v-on:submit.prevent="buscarFP">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Fecha inicial </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="formasPago.fechaIni"
          />
          <h2 class="display-5">
            <small class="text-muted"> Fecha final </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="formasPago.fechaFin"
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
      <tr class="display-6 ml-auto" v-if="total">
        <small class="text-dark"
          >TOTAL FORMAS PAGO: $
          {{ new Intl.NumberFormat("de-DE").format(this.total) }}</small
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
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">FORMA PAGO</th>
            <th scope="col">TOTAL</th>
            <th scope="col">ALMACEN</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in datosEncontrados"
            :key="item.idalamacen"
            class="tr-formas-pag"
          >
            <td class="tr-formas-pag" scope="row">{{ item.nompago }}</td>

            <td class="tr-formas-pag">$ {{ new Intl.NumberFormat("de-DE").format(item.valor) }}</td>
            <td class="tr-formas-pag">
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
import navigation from "@/components/navigation";
export default {
  components: {
    navigation,
  },

  data() {
    return {
      formasPago: new Object(),
      datosEncontrados: new Object(),
      usuario: new Object(),
      total: 0,
      almacenes: [],
      idalmacen: "",
      nombreAlmacen: "",
      Todos_almacenes: 0,
      nameAlmacen: "TODOS LOS ALMACENES",
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },
  methods: {
    async consultarAlmacenes() {
      await axios
        .get(
          this.$conexion + "/api/info-formas-pago/almacenes/" + this.usuario._id
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
    buscarFP() {
      let fechaIni = this.formasPago.fechaIni;
      let fechaFin = this.formasPago.fechaFin;
      var data = {
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
              "/informe-formas-de-pago/" +
              this.idalmacen +
              "/" +
              this.usuario._id,
            data
          )
          .then((res) => {
            var formasDePago = res.data.rows;

            for (let i = 0; i <= formasDePago.length; i++) {
              if (formasDePago != null) {
                localStorage.setItem(
                  "formasDePago",
                  JSON.stringify(formasDePago)
                );

                this.total += formasDePago[i].valor;
                this.AlertaSatisfactoria();
                this.datosEncontrados = JSON.parse(
                  localStorage.getItem("formasDePago")
                );
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
        "Total de ventas de: " +
          this.nombreAlmacen +
          " entre " +
          this.formasPago.fechaIni +
          " y " +
          this.formasPago.fechaFin +
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

<style>
td[class="tr-formas-pag"] {
background: #ADA996;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
img[class="reiniciaVal"] {
  width: 40%;
}
</style>