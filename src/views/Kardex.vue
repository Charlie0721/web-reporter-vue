<template>
  <div id="kardex">
    <navigation></navigation>
    <div class="container">
      <center>
        <h2 class="display-4">
          <small class="text-muted"> INFORME KARDEX </small>
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
      <form v-on:submit.prevent="buscarKardex">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Fecha inicial </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="kardexResumido.fechaIni"
          />
          <h2 class="display-5">
            <small class="text-muted"> Fecha final </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="kardexResumido.fechaFin"
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
      <br />
     <div class="input-group">
        <div class="input-group-prepend">
          <img
            alt="Logo CXPOS"
            class="btn-buscar"
            src="../assets/Buscar_producto.png"
          />
          <input
            type="search"
            class="form-control text-uppercase b"
            name="buscar"
            style="width: 580px"
            v-model="busqueda_producto"
          />
        </div>
      </div>
      <br/>
      <table class="table table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">BARRAS</th>
            <th scope="col">CODIGO</th>
            <th scope="col">DESCRIPCION</th>
            <th scope="col">SALDO ANTERIOR</th>
            <th scope="col">ENTRADAS</th>
            <th scope="col">SALIDAS</th>
            <th scope="col">NUEVO SALDO</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in searchProducto"
            :key="item.idproducto"
            v-on:click="verKardex(item.idproducto)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Ver kardex productos"
          >
            <th scope="row">{{ item.barcode }}</th>
            <td>{{ item.codigo }}</td>
            <td>{{ item.descripcion }}</td>
            <td>{{ item.saldoant }}</td>
            <td>{{ item.cantent }}</td>
            <td>{{ item.cantsal }}</td>
            <td>{{ item.saldocant }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import  navigation from "@/components/navigation"
export default {
  components: {
    navigation,
  },

  data() {
    return {
      busqueda_producto: "",
      kardexResumido: new Object(),
      datosKardex: new Object(),
      DatosKardex: [],
      usuario: new Object(),
      almacenes: [],
      idalmacen: "",
      nombreAlmacen: "",
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },
  methods: {
    async consultarAlmacenes() {
      await axios
        .get(this.$conexion + "/api/kardex/almacenes/" + this.usuario._id)
        .then((alm) => {
          this.almacenes = alm.data.rows;
        });
    },
    SelecAlmacen(id, almacenNombre) {
      this.nombreAlmacen = almacenNombre;
      this.idalmacen = id;
      console.log(this.idalmacen);
    },
    WarningAlert() {
      this.$swal(
        "Alerta!",
        "Debe seleccionar Almacén ",

        "warning"
      );
    },

    buscarKardex() {
      let fechaIni = this.kardexResumido.fechaIni;
      let fechaFin = this.kardexResumido.fechaFin;
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
              "/kardex/saldos/" +
              this.idalmacen +
              "/" +
              this.usuario._id,
            data
          )
          .then((response) => {
            this.DatosKardex = response.data.rows;

            if (this.DatosKardex != null) {
              localStorage.setItem(
                "DatosKardex",
                JSON.stringify(this.DatosKardex)
              );
            }
          })
          .catch((e) => console.log(e));
      }
    },
    verKardex(id) {
      this.idalmacen;

      this.$router.push("/informe/kardex/" + this.idalmacen + "/" + id);
    },
  },
  computed: {
    searchProducto: function () {
      return this.DatosKardex.filter(
        (item) =>
          item.descripcion.includes(this.busqueda_producto.toUpperCase()) ||
          item.barcode.includes(this.busqueda_producto) ||
          item.codigo.includes(this.busqueda_producto)
      );
    },
  },
};
</script>
<style>

h2 {
  text-decoration: underline rgb(12, 12, 12);
}
img[class="btn-buscarP"] {
  width: 50%;
}

button[class="btn btn-dark btn-block"] {
  width: 100%;
  padding: 8px 30px;
  border-radius: 20px;
  font-size: 18px;
  background-color: #82230c;
  color: #f0ebea;
}

</style>