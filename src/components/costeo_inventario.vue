<template>
  <div id="costeos">
    <br />
    <div class="container">
      <center><h2 class="display-5 text-blue">INFORME INVENTARIO</h2></center>

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
              <button
                type="button"
                class="btn btn-secondary"
                v-on:click="getInventariosCosteados()"
              >
                Consultar
              </button>
            </div>
          </div>
        </div>
      </div>
      <tr class="display-5 ml-auto" v-if="nombreAlmacen">
        <small class="text-dark">ALMACEN: {{ this.nombreAlmacen }}</small>
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="this.totalProductos">
        <small class="text-dark"
          >Existencias de Inventario:
          {{ new Intl.NumberFormat("de-DE").format(this.totalProductos) }}
        </small>
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="this.costoInventarioPonderado">
        <small class="text-dark"
          >Costo Inventario (Pond): ${{
            new Intl.NumberFormat("de-DE").format(this.costoInventarioPonderado)
          }}
        </small>
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="this.CostoInventarioUC">
        <small class="text-dark"
          >Costo Inventario (UC): ${{
            new Intl.NumberFormat("de-DE").format(this.CostoInventarioUC)
          }}
        </small>
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="this.inveValorizado">
        <small class="text-dark"
          >Precio Inventario: ${{
            new Intl.NumberFormat("de-DE").format(this.inveValorizado)
          }}
        </small>
        <br />
      </tr>
      <br />

      <img
        alt="reiniciaVal"
        class="reiniciaVal"
        src="../assets/Boton_reiniciar_valores.png"
        v-on:click="reloadPage"
      />

      <br /><br />
      <div class="input-group ">
        <div class="input-group-prepend">
          <img
            alt="Logo CXPOS"
            class="btn-buscarP"
            src="../assets/Buscar_producto.png"
          />
        </div>
        
      </div><br /><input
          type="search"
          class="form-control text-uppercase b"
          name="buscar"
          placeholder="Busca Producto"
         style="width: 100%"
          v-model="buscaProd"
        /><br />
      <table class="table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">DESCRIPCION</th>
            <th scope="col">CANTIDAD</th>
            <th scope="col">CODIGO</th>
            <th scope="col">BARRAS</th>
            <th scope="col">COSTO P</th>
            <th scope="col">COSTO INV (POND)</th>
            <th scope="col">COSTO UC</th>
            <th scope="col">COSTO INV(UC)</th>
            <th scope="col">PRECIO</th>
            <th scope="col">VALORIZADO</th>
            <th scope="col">ALMACEN</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in searchInvent" :key="item.item">
            <td>
              <small class="text-dark">{{ item.descrip }}</small>
            </td>
            <td>
              <small class="text-dark">{{ item.cantidad }}</small>
            </td>
            <td>
              <small class="text-dark">{{ item.codigo }}</small>
            </td>
            <td>
              <small class="text-dark">{{ item.barcode }}</small>
            </td>
            <td>
              <small class="text-dark"
                >${{
                  new Intl.NumberFormat("de-DE").format(item.ultcosto)
                }}</small
              >
            </td>
            <td>
              <small class="text-dark">
                ${{
                  new Intl.NumberFormat("de-DE").format(item.costoPond)
                }}</small
              >
            </td>
            <td>
              <small class="text-dark"
                >${{ new Intl.NumberFormat("de-DE").format(item.costo) }}</small
              >
            </td>
            <td>
              <small class="text-dark">
                ${{
                  new Intl.NumberFormat("de-DE").format(item.costoivuc)
                }}</small
              >
            </td>
            <td>
              <small class="text-dark"
                >${{
                  new Intl.NumberFormat("de-DE").format(item.precioventa)
                }}</small
              >
            </td>
            <td>
              <small class="text-dark">
                ${{
                  new Intl.NumberFormat("de-DE").format(item.valorizado)
                }}</small
              >
            </td>

            <td>
              <small class="text-dark">{{ item.nomalmacen }}</small>
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
  name: "Costeo_inv",
  props: {
    msg: String,
  },
  data() {
    return {
      Productos_inv: [],
      datosValores: [],
      almacenes: [],
      buscaProd: "",
      usuario: new Object(),
      totalProductos: null,
      costoInventarioPonderado: null,
      CostoInventarioUC: null,
      inveValorizado: null,
      nombreAlmacen: "",
      Todos_almacenes: 0,
      nameAlmacen: "TODOS LOS ALMACENES",
    };
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },
  methods: {
    reloadPage() {
      location.reload();
    },
    getInventariosCosteados() {
      if (
        this.idalmacen === "" ||
        this.idalmacen == null ||
        this.idalmacen < 0
      ) {
        this.WarningAlert();
      } else {
        axios
          .get(
            this.$conexion +
              "/consultar-cantidades-inventario/costeo-inventario/" +
              this.idalmacen +
              "/" +
              this.usuario._id
          )
          .then((res) => {
            this.Productos_inv = res.data.rows;

            for (let i = 0; i < this.Productos_inv.length; i++) {
              this.totalProductos += this.Productos_inv[i].cantidad;
              this.costoInventarioPonderado += this.Productos_inv[i].costoPond;
              this.CostoInventarioUC += this.Productos_inv[i].costoivuc;
              this.inveValorizado += this.Productos_inv[i].valorizado;
            }
          })
          .catch((err) => console.log(err));
      }
    },
    async consultarAlmacenes() {
      await axios
        .get(
          this.$conexion +
            "/api/consulta-costeo-inventarios/almacenes/" +
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
    WarningAlert() {
      this.$swal(
        "Alerta!",
        "Debe seleccionar Almacén ",

        "warning"
      );
    },
  },
  computed: {
    searchInvent: function () {
      return this.Productos_inv.filter(
        (item) =>
          item.descrip.includes(this.buscaProd.toUpperCase()) ||
          item.barcode.includes(this.buscaProd.toUpperCase()) ||
          item.codigo.includes(this.buscaProd.toUpperCase()) ||
          item.nomalmacen.includes(this.buscaProd.toUpperCase())
      );
    },
  },
};
</script>

<style>
img[class="reiniciaVal"] {
  width: 20%;
}
 img[class="btn-buscarP"] {
  width: 40%;
}
</style>



