<template>
  <div id="carga Compras">
   
    <div class="container">
      <center>
        <h1 class="display-4">
          <small class="text-muted"> CARGAR COMPRAS</small>
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
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Buscar Proveedor
              </h5>
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
                  v-model="BuscaProveedor"
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
                      <th scope="col">PROVEEDOR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in BuscarProveedores"
                      :key="item.idtercero"
                      v-on:click="
                        SelecProveedor(item.idtercero, item.nit, item.nombres)
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
        <small class="text-dark">PROVEEDOR: {{ this.nombreProveedor }}</small>
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
        v-on:submit.prevent="CargardatosBasicosCompras()"
        class="card card-body"
      >
        <button
          type="button"
          class="btn btn-dark ml-auto d-flex" style="background-color: #82230C;"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          v-on:click="getTercerosPorveedores"
        >
          Selecciona Proveedor
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
            v-model="comprasDatBas.idtercero"
          />
          <br/>
          <!--id del proveedor -->

          <h5 class="display-5 text-dark">Número documento:</h5>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="documento proveedor"
            v-model="comprasDatBas.docprovee"
          /><br />
          <h5 class="display-5 text-dark">Fecha Doc:</h5>
          <input
            type="date"
            class="form-control form-control-sm"
            placeholder="Fecha doc"
            v-model="comprasDatBas.fechadocprov"
          />
        </div>

        <div class="mb-3">
          <h5 class="display-5 text-dark">Fecha :</h5>
          <input
            type="date"
            class="form-control form-control-sm"
            placeholder="Fecha"
            v-model="comprasDatBas.fecha"
          /><br />
          <h5 class="display-5 text-dark">Detalle:</h5>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Detalle"
            value="Compras desde Web Reporter"
            v-model="comprasDatBas.detalle"
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="hidden"
            class="form-control form-control-sm"
            value="0"
            v-model="comprasDatBas.aprobada"
          />
          <!--aprobada -->
          <input
            type="hidden"
            class="form-control form-control-sm"
            v-model="comprasDatBas.idalmacen"
          /><!--id de almacen -->
          <input
            type="hidden"
            class="form-control"
            value="1"
            v-model="comprasDatBas.idpago"
          /><!--id de almacen -->
        </div>
        <button class="btn btn-dark " style="background-color: #82230C;">Generar Consecutivo de Compra</button>
      </form>
      <br />
      <!-- Button trigger modal  Productos-->
      <button
        type="button"
        class="btn btn-dark ml-auto d-flex" style="background-color: #82230C;"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
        v-on:click="getProductosActivos"
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
              <h5 class="modal-title" id="exampleModalLabel1">Seleccionar Productos</h5>
              <button
                type="button"
                class="btn-close"
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
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in BuscarProductosParaCompra"
                    :key="item.idproducto"
                    v-on:click="
                      SelectProductos(
                        item.idproducto,
                        item.descripcion,
                        item.costo,
                        item.precioventa
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
      <form
        v-on:submit.prevent="CargarDatosProductosForm"
        class="card card-body"
      >
        <h3 class="display-5">
          <small class="text-muted"> CARGAR PRODUCTOS</small>
          <small class="text-muted" v-if="this.ComprasDataProductos.idcompra">
            PARA LA COMPRA NUMERO:
            {{ this.ComprasDataProductos.idcompra }}</small
          >
        </h3>
        <div class="input-group mb-3">
          <input
            type="hidden"
            class="form-control form-control-sm"
            v-model="ComprasDataProductos.idcompra"
          />
        </div>

        <div class="input-group mb-3">
          <input
            type="hidden"
            class="form-control form-control-sm"
            v-model="ComprasDataProductos.idproducto"
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
          <h5 class="display-5 text-dark">Cantidad:</h5>
          <input
            type="number"
            class="form-control form-control-sm"
            v-model="ComprasDataProductos.cantidad"
            placeholder="Cantidad" step="any"
          />
        </div>
        <div class="mb-2">
          <h5 class="display-5 text-dark">Costo:</h5>
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="ComprasDataProductos.valor"
            placeholder="Costo"
          />
        </div>
        <div class="mb-2">
          <h5 class="display-5 text-dark">Precio Venta:</h5>
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="ComprasDataProductos.precioventa"
            placeholder="Costo"
          />
        </div>
        <button class="btn btn-dark" style="background-color: #82230C;">Agregar a Compra</button>
        <br />
      </form>
    </div>
  <center>  <button class="btn btn-dark" style="background-color: #82230C;" v-on:click="reloadPage">
      Finalizar Compra
    </button></center>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "cargarCompras",
  props: {
    msg: String,
  },

  data() {
    return {
      almacenes: [],
      terceros_proveedores: [],
      usuario: new Object(),
      todos_productos: [],
      nombreAlmacen: "",
      ProductosSeleccionados: [
        {
          idproducto: "",
          descripcion: "",
          costo: "",
        },
      ],

      BuscaProveedor: "",
      nombreProveedor: "",
      BuscaProducto: "",
      nitProveed: "",
      idcompra: null,
      comprasDatBas: {
        idtercero: "",
        docprovee: "",
        fechadocprov: "",
        fecha: "",
        detalle: "Compras desde Web Reporter",
        idalmacen: "",

        aprobada: 0,
        idpago: 1,
      },
      idmovorden: null,
      ComprasDataProductos: {
        idcompra: "",
        idproducto: "",
        valor: "",
        cantidad: "",
        precioventa: "",
      },
    };
  },
  mounted() {
    this.getTercerosPorveedores();
    this.getProductosActivos();
    this.getAlmacenes();
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  },
  methods: {
    async getTercerosPorveedores() {
      await axios
        .get(this.$conexion + "/api/terceros/compras/"+this.usuario._id)
        .then((response) => {
          this.terceros_proveedores = response.data.rows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getProductosActivos() {
      await axios
        .get(this.$conexion + "/api/productos/compras/"+this.usuario._id)
        .then((res) => {
          this.todos_productos = res.data.rows;
        })
        .catch((error) => console.log(error));
    },
    SelecProveedor(idtercero, nit, nombres) {
      this.idtercero = idtercero;
      this.nombreProveedor = nombres;
      this.nitProveed = nit;
      this.comprasDatBas.idtercero = this.idtercero;
    },
    CargardatosBasicosCompras() {
      let fechadocprov = this.comprasDatBas.fechadocprov;
      let fecha = this.comprasDatBas.fechadocprov;

      fechadocprov = fechadocprov.replace(/-/gi, "");
      fecha = fecha.replace(/-/gi, "");
      this.comprasDatBas.fechadocprov = fechadocprov;
      this.comprasDatBas.fecha = fecha;

      if (
        this.comprasDatBas.idtercero === " " ||
        this.comprasDatBas.idtercero === ""
      ) {
        this.AlertaProveedor();
        return false;
      }
      if (
        this.comprasDatBas.docprovee === " " ||
        this.comprasDatBas.docprovee === ""
      ) {
        this.AlertaProveedorDocumento();
        return false;
      }
      if (
        this.comprasDatBas.idalmacen === " " ||
        this.comprasDatBas.idalmacen === ""
      ) {
        this.AlertaProveedorAlmacen();

        return false;
      }
      if (
        this.comprasDatBas.fechadocprov === " " ||
        this.comprasDatBas.fechadocprov === ""
      ) {
        this.AlertaProveedorfecha1();
        return false;
      }
      if (this.comprasDatBas.fecha === " " || this.comprasDatBas.fecha === "") {
        this.AlertaProveedorfecha2();
        return false;
      } else {
        axios
          .post(this.$conexion + "/api/ingresa-compras/"+this.usuario._id, this.comprasDatBas)
          .then((data) => {
            console.log(data);
            var idcompra = data.data.rows.insertId;
            this.ComprasDataProductos.idcompra = idcompra;
            
            this.AlertaSatisfactoria();
          })
          .catch((err) => console.log(err));
      }
    },
    CargarDatosProductosForm() {

      if (
        this.ComprasDataProductos.idcompra === "" ||
        this.ComprasDataProductos.idcompra === " "
      ) {
        this.AlertaArronea();
        return false;
      }
      if (
        this.ComprasDataProductos.idproducto === "" ||
        this.ComprasDataProductos.idproducto === " "
      ) {
        this.AlertaArronea2();
        return false;
      }
      if (
        this.ComprasDataProductos.cantidad === "" ||
        this.ComprasDataProductos.cantidad === " "
      ) {
        this.AlertaArronea3();
        return false;
      } else {
        axios
          .post(
            this.$conexion + "/api/ingresa-compras/detalle/"+this.usuario._id,
            this.ComprasDataProductos
          )
          .then((data) => {
            console.log(data);
            this.ComprasDataProductos.cantidad = "";
          })
          .catch((err) => console.log(err));
      }
    },

    SelectProductos(id, descripcion, costo, precioventa) {
      this.ProductosSeleccionados.idproducto = id;
      this.ProductosSeleccionados.descripcion = descripcion;
      this.ProductosSeleccionados.costo = costo;
      this.ProductosSeleccionados.precioventa = precioventa;
      this.ComprasDataProductos.idproducto = this.ProductosSeleccionados.idproducto;
      this.ComprasDataProductos.valor = this.ProductosSeleccionados.costo;
      this.ComprasDataProductos.precioventa = this.ProductosSeleccionados.precioventa;
    },
    AlertaSatisfactoria() {
      this.$swal(
        "Confirmación!",
        "La compra se debe aprobar con el Consecutivo número: " +
          +this.ComprasDataProductos.idcompra +
          " en Conexion POS",

        "success"
      );
    },

    AlertaArronea() {
      this.$swal(
        "Atencion!",
        "Debe ingresar los datos de la compra primero ",

        "warning"
      );
    },
    AlertaArronea2() {
      this.$swal(
        "Atencion!",
        "Debe seleccionar minimo un producto ",

        "warning"
      );
    },
    AlertaArronea3() {
      this.$swal(
        "Atencion!",
        "Ingrese la cantidad del producto ",

        "warning"
      );
    },
    AlertaProveedor() {
      this.$swal(
        "Atencion!",
        "Debe seleccionar Proveedor ",

        "warning"
      );
    },
    AlertaProveedorDocumento() {
      this.$swal(
        "Atencion!",
        "Ingrese el número de factura del proveedor ",

        "warning"
      );
    },
    AlertaProveedorAlmacen() {
      this.$swal(
        "Atencion!",
        "Seleccione el almacén al cual le desea realizar la compra",

        "warning"
      );
    },
    AlertaProveedorfecha1() {
      this.$swal(
        "Atencion!",
        "Seleccione la fecha de factura proveedor",

        "warning"
      );
    },
    AlertaProveedorfecha2() {
      this.$swal(
        "Atencion!",
        "Seleccione la fecha de ingreso al sistema",

        "warning"
      );
    },
    reloadPage() {
      this.AlertaSatisfactoria();
      location.reload();
    },
    async getAlmacenes() {
      await axios
        .get(this.$conexion + "/api/almacenes/compras/"+this.usuario._id)
        .then((alm) => {
          this.almacenes = alm.data.rows;
        })
        .catch((err) => console.log(err));
    },
    SelecAlmacen(id, almacenNombre) {
      this.nombreAlmacen = almacenNombre;
      this.comprasDatBas.idalmacen = id;
    },
  },
  computed: {
    BuscarProveedores: function () {
      return this.terceros_proveedores.filter(
        (item) =>
          item.nit.includes(this.BuscaProveedor.toLowerCase()) ||
          item.nombres.includes(this.BuscaProveedor.toUpperCase())
      );
    },
    BuscarProductosParaCompra: function () {
      return this.todos_productos.filter(
        (item) =>
          item.descripcion.includes(this.BuscaProducto.toUpperCase()) ||
          item.barcode.includes(this.BuscaProducto.toUpperCase()) ||
          item.codigo.includes(this.BuscaProducto)
      );
    },
  },
};
</script>