<template>
  <div id="carga-entrada-Productos">

    <div class="container">
      <br />
      <center>
        <h1 class="display-4">
          <small class="text-muted"> CARGA DE INVENTARIOS</small>
        </h1>
      </center>
      

      <!-- Modal  Terceros-->
      <div
        class="modal fade" 
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" >
          <div class="modal-content" >
            <div class="modal-header">
              <h5 class="modal-title"  id="exampleModalLabel">Buscar Tercero</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <input
                  type="search"
                  class="form-control text-uppercase"
                  placeholder="Buscar Proveedor"
                  name="buscar"
                  style="width: 100px"
                  v-model="BuscaTerceros"
                />
                <br />
                <br />
                <table
                  class="table table-hover table-bordered table-responsive"
                >
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">NIT</th>
                      <th scope="col">NOMBRES</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in BuscarTerceros"
                      :key="item.idtercero"
                      v-on:click="
                        SelecTercero(item.idtercero, item.nit, item.nombres)
                      "
                    >
                      <th scope="row">
                        {{ item.idtercero }}
                      </th>
                      <td>
                        {{ item.nit }}
                      </td>
                      <td>
                        {{ item.nombres }}
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
            </div>
          </div>
        </div>
        <br />
      </div>
      <br />

      <!-- Modal Almacen-->
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
              <table class="table table-hover table-bordered table-responsive">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">ALMACEN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in almacenes"
                    :key="item.idalmacen"
                    v-on:click="SelecAlmacen(item.idalmacen, item.nomalmacen)"
                  >
                    <th scope="row">
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
      <tr class="display-5 ml-auto" v-if="nombreProveedor">
        <small class="text-dark">TERCERO: {{ this.nombreProveedor }}</small>
        <br />
      </tr>
      <tr class="display-5 ml-auto" v-if="nitProveed">
        <small class="text-dark">NIT: {{ this.nitProveed }}</small>
        <br />
      </tr>
      <tr class="display-5 ml-auto" v-if="nombreAlmacen">
        <small class="text-dark">ALMACEN: {{ this.nombreAlmacen }}</small>
        <br />
      </tr>
      <form
        v-on:submit.prevent="DatosBasicosEntradaProd"
        class="card card-body"
      >
        <button
          type="button"
          class="btn btn-dark ml-auto d-flex" style="background-color: #82230C;"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          v-on:click="getTerceros"
        >
          Selecciona Tercero
        </button>
        <br />
        <button
          type="button"
          class="btn btn-dark ml-auto d-flex" style="background-color: #82230C;"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          v-on:click="getAlmacenes"
        >
          Selecciona Almacen
        </button>
        <div class="mb-3">
          <input
            type="hidden"
            class="form-control"
            v-model="EntradaProdDataBasic.idtercero"
          />
          <!--id del proveedor -->

          <!--Numero de documento -->
        </div>
        <br />
        <button
          type="button"
          class="btn btn-dark ml-auto d-flex" style="background-color: #82230C;"
          v-on:click="getNumber"
        >
          Numero Ajuste
        </button>

        <input
          type="hidden"
          class="form-control form-control-sm"
          v-model="EntradaProdDataBasic.numero"
        /><br />
        <input
          type="hidden"
          class="form-control form-control-sm"
          value="1"
          v-model="EntradaProdDataBasic.idusuario"
        /><br />

        <div class="mb-3">
          <h5 class="display-5 text-dark">Fecha</h5>
          <input
            type="date"
            class="form-control form-control-sm"
            placeholder="Fecha"
            v-model="EntradaProdDataBasic.fecha"
          /><br />
          <h5 class="display-5 text-dark">Detalle</h5>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Detalle"
            value="Entrada de productos desde web Reporter"
            v-model="EntradaProdDataBasic.detalle"
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="hidden"
            class="form-control form-control-sm"
            value="0"
            v-model="EntradaProdDataBasic.estado"
          />
          <!--aprobada -->
          <input
            type="hidden"
            class="form-control"
            v-model="EntradaProdDataBasic.idalmacen"
          /><!--id de almacen -->
          <input
            type="hidden"
            class="form-control form-control-sm"
            value="1"
            v-model="EntradaProdDataBasic.idconceptajuste"
          /><!--id de almacen -->
        </div>
        <button class="btn btn-dark" style="background-color: #82230C;">Aprobar datos</button>
      </form>
      <br />
      <!-- Button trigger modal  Productos-->
      <button
        type="button"
        class="btn btn-dark ml-auto d-flex" style="background-color: #82230C;"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
        v-on:click="getProductosCantidades"
      >
        Buscar productos
      </button>

      <!-- Modal Productos -->
      <div
        class="modal fade modal-xl"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel1">
                Seleccionar Productos
              </h5>
              <button
                type="button"
                class="btn-close" style="background-color: #82230C;"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <input
                  type="search"
                  class="form-control text-uppercase"
                  placeholder="Buscar Productos"
                  name="buscar"
                  style="width: 100px"
                  v-model="BuscaProducto"
                />
              </div>
              <table class="table table-hover table-bordered table-responsive">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">DESCRIPCION</th>
                    <th scope="col">BARRAS</th>
                    <th scope="col">CODIGO</th>
                    <th scope="col">COSTO</th>
                    <th scope="col">PRECIO</th>
                    <th scope="col">CANTIDAD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in BuscarProductosParaEntradas"
                    :key="item.idproducto"
                    v-on:click="
                      SelectProductos(
                        item.idproducto,
                        item.descripcion,
                        item.costo,
                        item.precioventa,
                        item.cantidad
                      )
                    "
                  >
                    <th scope="row">
                      {{ item.idproducto }}
                    </th>
                    <td>
                      {{ item.descripcion }}
                    </td>
                    <td>
                      {{ item.barcode }}
                    </td>
                    <td>
                      {{ item.codigo }}
                    </td>
                    <td>
                      {{ item.costo }}
                    </td>
                    <td>
                      {{ item.precioventa }}
                    </td>
                    <td>
                      {{ item.cantidad }}
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
          </div>
        </div>
      </div>

      <br />
      <form v-on:submit.prevent="CargarEntradaProductos" class="card card-body">
        <h3 class="display-5">
          <small class="text-muted"> CARGAR PRODUCTOS</small>
          <small class="text-muted" v-if="getNumber">
            PARA LA ENTRADA NUMERO:
            {{ this.finalNumber + 1 }}</small
          >
        </h3>
        <div class="input-group mb-3">
          <input
            type="hidden"
            class="form-control form-control-sm"
            v-model="EntradasDataProductos.idproducto"
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="hidden"
            class="form-control form-control-sm"
            v-model="EntradasDataProductos.idajuste"
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="hidden"
            class="form-control form-control-sm"
            v-model="EntradasDataProductos.idalmacen"
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="hidden"
            class="form-control form-control-sm"
            v-model="EntradasDataProductos.idproducto"
          />
        </div>
        <h5 class="display-5 text-dark">Producto:</h5>
        <li
          class="list-group-item display-5"
          v-if="this.ProductosSeleccionados"
        >
          {{ this.ProductosSeleccionados.descripcion }}
        </li>
        <br />

        <div class="mb-2">
          <h5 class="display-5 text-dark">Existencias:</h5>
          <input
            type="number"
            class="form-control form-control-sm"
            v-model="EntradasDataProductos.cantidad"
            disabled
          />
          
        </div>
        <div class="mb-2">
          <h5 class="display-5 text-dark">Cantidad a Ingresar:</h5>
          <input
            type="number"
            class="form-control form-control-sm"
            v-model="EntradasDataProductos.entrada"
            placeholder="Ingrese la cantidad" step="any"
          />
        </div>
        <div class="mb-2">
          <h5 class="display-5 text-dark">Costo:</h5>
          <input
            type="number"
            class="form-control form-control-sm"
            v-model="EntradasDataProductos.costo"
            disabled
          />
        </div>
        <div class="mb-2">
          <h5 class="display-5 text-dark">Precio Venta:</h5>
          <input
            type="number"
            class="form-control form-control-sm"
            v-model="EntradasDataProductos.precioventa"
            disabled
          />
        </div>
        <button class="btn btn-dark" style="background-color: #82230C;">Agregar a Inventario</button>
        <br />
      </form>
    </div>
<center>    <button class="btn btn-dark" style="background-color: #82230C;" v-on:click="reloadPage">
      Finalizar Movimiento de Inventario
    </button></center>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "entradasProductos",
  props: {
    msg: String,
  },

  data() {
    return {
      almacenes: [],
      terceros: [],
      error: null,
      productosXAlmacen: [],
      nombreAlmacen: "",
      numeroEntrada: [],
      usuario: new Object(),
      finalNumber: null,
      BuscaTerceros: "",
      nombreProveedor: "",
      BuscaProducto: "",
      nitProveed: "",
      idajuste: null,
      ProductosSeleccionados: [
        {
          idproducto: "",
          descripcion: "",
          costo: "",
          cantidad: "",
          precioventa: "",
        },
      ],
      EntradaProdDataBasic: {
        fecha: "",
        numero: "",
        idtercero: "",
        estado: 0,
        idconceptajuste: 1,
        idusuario: 1,
        detalle: "Entrada de productos desde web Reporter",
        idalmacen: "",
      },
      idmovajuste: null,
      EntradasDataProductos: {
        idajuste: "",
        idalmacen: "",
        idproducto: "",
        salida: 0,
        entrada: "",
        costo: "",
        cantidad: "",
        precioventa: "",
      },
    };
  },
  mounted() {
    this.getTerceros();
    this.getProductosCantidades();
    this.getAlmacenes();
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },
  methods: {
    async getTerceros() {
      await axios
        .get(this.$conexion + "/api/mov-inventarios/terceros/"+this.usuario._id)
        .then((response) => {
          this.terceros = response.data.rows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getNumber() {
      await axios
        .get(this.$conexion + "/api/mov-inventarios/numero-entradas/"+this.usuario._id)
        .then((res) => {
          this.numeroEntrada = res.data.rows;

          for (let i = 0; i <= this.numeroEntrada.length; i++) {
            this.finalNumber = this.numeroEntrada[i].numero;

            this.EntradaProdDataBasic.numero = this.finalNumber + 1;
            this.AlertaNumero();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getProductosCantidades() {
      this.EntradasDataProductos.idalmacen = this.EntradaProdDataBasic.idalmacen;

      let almacenId = this.EntradasDataProductos.idalmacen;

      await axios
        .get(
          this.$conexion +
            "/api/mov-inventarios/ingresa-entrada/detalle/" +
            almacenId+'/'+this.usuario._id
        )
        .then((res) => {
          this.productosXAlmacen = res.data.rows;
        })
        .catch((err) => console.log(err));
    },
    SelecTercero(idtercero, nit, nombres) {
      this.idtercero = idtercero;
      this.nombreProveedor = nombres;
      this.nitProveed = nit;
      this.EntradaProdDataBasic.idtercero = this.idtercero;
    },
    DatosBasicosEntradaProd() {
      let fecha = this.EntradaProdDataBasic.fecha;

      fecha = fecha.replace(/-/gi, "");
      this.EntradaProdDataBasic.fecha = fecha;

      if (
        this.EntradaProdDataBasic.idtercero === "" ||
        this.EntradaProdDataBasic.idtercero === " "
      ) {
        this.AlertaArronea();
        return false;
      }
      if (
        this.EntradaProdDataBasic.idalmacen === "" ||
        this.EntradaProdDataBasic.idalmacen === " "
      ) {
        this.AlertaArronea1();
        return false;
      }

      if (
        this.EntradaProdDataBasic.numero === "" ||
        this.EntradaProdDataBasic.numero === " "
      ) {
        this.AlertaArronea2();
        return false;
      }
      if (
        this.EntradaProdDataBasic.fecha === "" ||
        this.EntradaProdDataBasic.fecha === " "
      ) {
        this.AlertaArronea3();
        return false;
      } else {
        axios
          .post(
            this.$conexion + "/api/mov-inventarios/ingresa-entrada/"+this.usuario._id,
            this.EntradaProdDataBasic
          )
          .then((data) => {
            console.log(data);
            var idajuste = data.data.rows.insertId;
            this.EntradasDataProductos.idajuste = idajuste;
            this.AlertaNumero();
          })

          .catch((error) => console.log(error));
      }
    },
    async CargarEntradaProductos() {
      if (
        this.EntradasDataProductos.idproducto === "" ||
        this.EntradasDataProductos.idproducto === " "
      ) {
        this.AlertaArronea4();
        return false;
      }
      if (
        this.EntradasDataProductos.entrada === "" ||
        this.EntradasDataProductos.entrada === " "
      ) {
        this.AlertaArronea5();
        return false;
      }
      if (
        this.EntradasDataProductos.idajuste === "" ||
        this.EntradasDataProductos.idajuste === " "
      ) {
        this.AlertaArronea6();
        return false;
      } else {
        await axios
          .post(
            this.$conexion + "/api/mov-inventarios/ingresa-entrada/detalle/"+this.usuario._id,
            this.EntradasDataProductos
          )
          .then((data) => {
            console.log(data);
            this.EntradasDataProductos.entrada = " ";
          })
          .catch((err) => console.log(err));
      }
    },

    SelectProductos(id, descripcion, costo, precioventa, cantidad) {
      this.EntradasDataProductos.idproducto = id;

      this.ProductosSeleccionados.descripcion = descripcion;

      this.EntradasDataProductos.costo = costo;
      this.EntradasDataProductos.precioventa = precioventa;
      this.EntradasDataProductos.cantidad = cantidad;
    },

    AlertaNumero() {
      this.$swal(
        "Confirmación!",
        "El movimineto de inventario se debe aprobar con el Consecutivo número: " +
          +(this.finalNumber + 1) +
          " en Conexion POS",

        "success"
      );
    },

    AlertaArronea() {
      this.$swal(
        "Atencion!",
        "Debe ingresar un tercero",

        "warning"
      );
    },
    AlertaArronea1() {
      this.$swal(
        "Atencion!",
        "Debe seleccionar un almacen ",

        "warning"
      );
    },
    AlertaArronea2() {
      this.$swal(
        "Atencion!",
        "Debe generar el número de Ajuste ",

        "warning"
      );
    },
    AlertaArronea3() {
      this.$swal(
        "Atencion!",
        "Seleccione fecha ",

        "warning"
      );
    },

    AlertaArronea4() {
      this.$swal(
        "Atencion!",
        "Seleccione Producto ",

        "warning"
      );
    },
    AlertaArronea5() {
      this.$swal(
        "Atencion!",
        "Ingrese cantidad",

        "warning"
      );
    },
    AlertaArronea6() {
      this.$swal(
        "Atencion!",
        "Ingrese los datos para entrada de productos primero ",

        "warning"
      );
    },

    reloadPage() {
      this.AlertaNumero();
      location.reload();
    },
    async getAlmacenes() {
      await axios
        .get(this.$conexion + "/api/mov-inventarios/almacenes/"+this.usuario._id)
        .then((alm) => {
          this.almacenes = alm.data.rows;
        })
        .catch((err) => console.log(err));
    },
    SelecAlmacen(id, almacenNombre) {
      this.nombreAlmacen = almacenNombre;
      this.EntradaProdDataBasic.idalmacen = id;
    },
  },
  computed: {
    BuscarTerceros: function () {
      return this.terceros.filter(
        (item) =>
          item.nit.includes(this.BuscaTerceros.toLowerCase()) ||
          item.nombres.includes(this.BuscaTerceros.toUpperCase())
      );
    },
    BuscarProductosParaEntradas: function () {
      return this.productosXAlmacen.filter(
        (item) =>
          item.descripcion.includes(this.BuscaProducto.toUpperCase()) ||
          item.barcode.includes(this.BuscaProducto.toUpperCase()) ||
          item.codigo.includes(this.BuscaProducto)
      );
    },
  },
};
</script>

<style>
h1 {
  text-decoration: underline rgb(12, 12, 12);
}
</style>