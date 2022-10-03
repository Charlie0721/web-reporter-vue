<template>
  <div>
    <div class="container">
      <h2 class="display-5 text-dark" v-if="numeroPedido">
        DETALLE DE EL PEDIDO NUMERO {{ this.numeroPedido }}
      </h2>
      <br />

      <br />

      <br />
      <table class="table table-responsive">
        <thead>
          <tr>
            <th scope="col">FECHA</th>
            <th scope="col">VALOR PRODUCTO</th>
            <th scope="col">% DESCUENTO</th>
            <th scope="col">DESCRIPCION</th>
            <th scope="col">CANTIDAD</th>
            <th scope="col">VOLVER</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataDePedido" :key="item.idpedido">
            <th scope="row">{{ item.fecha }}</th>
            <td>
              $ {{ new Intl.NumberFormat("de-DE").format(item.valorprod) }}
            </td>
            <td>{{ item.porcdesc }}</td>
            <td>{{ item.descripcion }}</td>
            <td>{{ item.cantidad }}</td>
            <td>
              <button class="btn btn-dark" v-on:click="regresar()">
                Volver
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <tr class="display-6 ml-auto" v-if="cantProductos">
        <small class="text-dark"
          >Cantidad productos: {{ this.cantProductos }}</small
        >
        <br />
      </tr>
      <br />
      <div class="card" style="width: 25rem">
        <div class="card-body">
          <h5 class="card-title">DETALLE DE VALORES</h5>
          <h4 class="display-6" v-if="detalles">
            <small class="text-dark"
              >SUBTOTAL: $
              {{
                new Intl.NumberFormat("de-DE").format(detalles.subtotal)
              }}</small
            >
            <br />
            <small class="text-dark"
              >VALOR IMPUESTO: $
              {{
                new Intl.NumberFormat("de-DE").format(detalles.valimpuesto)
              }}</small
            >
            <br />
            <small class="text-dark"
              >TOTAL DESCUENTOS: $
              {{
                new Intl.NumberFormat("de-DE").format(detalles.valdescuentos)
              }}</small
            >
            <br />
            <small class="text-dark"></small>
            <small class="text-dark">
              TOTAL VENTA: $
              {{
                new Intl.NumberFormat("de-DE").format(detalles.valortotal)
              }}</small
            ><br />
            <small class="text-dark"></small>
            <small class="text-dark">
              CLIENTE: {{ detalles.nombres }} {{ detalles.apellidos }}</small
            ><br />
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      numeroPedido: "",
      dataDePedido: [],
      detalles: "",
      totalProductos: null,
      cantProductos: null,
      options: null,
      usuario: new Object(),
      val_utilidad: null,
    };
  },
  async mounted() {
    this.dataDePedido.idalmacen = this.$route.params.idalmacen;
    this.dataDePedido.numero = this.$route.params.numero;
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    await axios
      .get(
        this.$conexion +
          "/api/pedidos/" +
          this.dataDePedido.numero +
          "/" +
          this.dataDePedido.idalmacen +
          "/" +
          this.usuario._id
      )
      .then((datos) => {
        this.AlertaSatisfactoria();
        this.detalles = datos.data.datos1;
        this.dataDePedido = datos.data.rows;
        this.numeroPedido = datos.data.rows[0].numero;

        this.cantProductos = this.dataDePedido.reduce(
          (total, dataDePedidos) => total + dataDePedidos.cantidad,
          0
        );
      })
      .catch((e) => console.log(e));
  },
  methods: {
    AlertaSatisfactoria() {
      this.$swal(
        "Confirmación!",
        "la información de el pedido " +
          this.dataDePedido.numero +
          " se encontro satisfactoriamente!",
        "success"
      );
    },
    regresar() {
      this.$router.push("/pedidos-por-documento/");
    },
  },
};
</script>