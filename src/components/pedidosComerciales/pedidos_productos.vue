<template>
  <div id="Pedidos-Productos">
    <div class="container">
      <center>
        <h2 class="display-4">
          <small class="text-muted"> PEDIDOS POR PRODUCTO</small>
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
      <form v-on:submit.prevent="buscaPedidosProducto">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Consultar Fecha </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="infoProducto.fechaIni"
          />
          <h2 class="display-5">
            <small class="text-muted"> Fecha final </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="infoProducto.fechaFin"
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

   
      <tr class="display-6 ml-auto" v-if="cantProductos">
        <small class="text-dark"
          >CANTIDAD PRODUCTOS VENDIDOS: {{ this.cantProductos }}</small
        >
        <br />
      </tr>

      <tr class="display-6 ml-auto" v-if="subtotales">
        <small class="text-dark"
          >SUBTOTAL: $
          {{ new Intl.NumberFormat("de-DE").format(this.subtotales) }}</small
        >
        <br />
      </tr>
      
      <tr class="display-6 ml-auto" v-if="total_descuentos">
        <small class="text-dark"
          >TOTAL DESCUENTOS: $
          {{
            new Intl.NumberFormat("de-DE").format(this.total_descuentos)
          }}</small
        >
        <br />
      </tr>

      <tr class="display-6 ml-auto" v-if="impuestosTot">
        <small class="text-dark"
          >TOTAL IMPUESTOS: $
          {{ new Intl.NumberFormat("de-DE").format(this.impuestosTot) }}</small
        >
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="total">
        <small class="text-dark"
          >TOTAL VENTAS: $
          {{ new Intl.NumberFormat("de-DE").format(this.total) }}</small
        >
        <br />
      </tr>
      <button
        class="btn btn-dark"
        style="background-color: #82230c"
        v-on:click="reloadPage"
      >
        Reiniciar Valores
      </button>
      <br />
      <br />
         <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Buscar Productos</span>
        </div>
        <input
          type="search"
          class="form-control text-uppercase b"
          name="buscar"
          style="width: 300px"
          v-model="buscaProd"
        />
      </div>

      <table class="table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">CODIGO</th>
            <th scope="col">BARRAS</th>
            <th scope="col">DESCRIPCION</th>
            <th scope="col">#PEDIDO</th>
            <th scope="col">CANTIDAD</th>
            <th scope="col">PRECIO</th>
            <th scope="col">DESCUENTOS</th>
            <th scope="col">SUBTOTAL</th>
            <th scope="col">IMPUESTO</th>
            <th scope="col">TOTAL VENTAS</th>
            <th scope="col">ALMACEN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in BuscaProductos" :key="item.item">
            <th scope="row"><small class="text-dark">{{ item.codigo }}</small></th>
            <th scope="row"><small class="text-dark">{{ item.barcode }}</small></th>
            <th scope="row"><small class="text-dark">{{ item.descrip }}</small></th>
            <th scope="row"><small class="text-dark">{{ item.numero }}</small></th>
            <th scope="row"><small class="text-dark">{{ item.cantidad }}</small></th>
            <th scope="row"><small class="text-dark">
              $ {{ new Intl.NumberFormat("de-DE").format(item.valorprod) }}</small>
            </th>
            <th scope="row"><small class="text-dark">
              $ {{ new Intl.NumberFormat("de-DE").format(item.descuento) }}</small>
            </th>
            <th scope="row"><small class="text-dark">
              $ {{ new Intl.NumberFormat("de-DE").format(item.Base) }}</small>
            </th>
            <th scope="row"><small class="text-dark">
              $ {{ new Intl.NumberFormat("de-DE").format(item.ivaprod) }}</small>
            </th>
            <th scope="row"><small class="text-dark">
              $ {{ new Intl.NumberFormat("de-DE").format(item.total_venta) }}</small>
            </th>
            <th scope="row"><small class="text-dark">{{ item.nomalmacen }}</small></th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ped_comerciales_productos",
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
      infoProducto: new Object(),
      productosPedidos: [],
      total: null,
      cantProductos: null,
      subtotales: null,
      total_descuentos: null,
      impuestosTot: null,
      idalmacen: "",
      buscaProd: ""
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
            "/api/productos/pedidos-comerciales/almacenes/" +
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
    buscaPedidosProducto() {
      let fechaIni = this.infoProducto.fechaIni;
      let fechaFin = this.infoProducto.fechaFin;
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
              "/api/productos/pedidos-comerciales/" +
              this.idalmacen +
              "/" +
              this.usuario._id,
            data
          )
          .then((res) => {
            this.productosPedidos = res.data.rows;

            for (let i = 0; i <= this.productosPedidos.length; i++) {
              if (this.productosPedidos != null) {
                this.total += this.productosPedidos[i].total_venta;
                this.cantProductos += this.productosPedidos[i].cantidad;
                this.subtotales += this.productosPedidos[i].Base;
                this.total_descuentos += this.productosPedidos[i].descuento;
                this.impuestosTot += this.productosPedidos[i].ivaprod;
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
          this.infoProducto.fechaIni +
          " y " +
          this.infoProducto.fechaFin +
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
  computed: {
    BuscaProductos: function () {
      return this.productosPedidos.filter(
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
