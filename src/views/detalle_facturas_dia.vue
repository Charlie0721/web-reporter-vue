<template>
  <div>
    <div class="container">
      <h2 class="display-5 text-dark" v-if="numeroFactura">
        DETALLE DE LA FACTURA NUMERO {{ this.numeroFactura }}
      </h2>
      <br />
      <chart1></chart1>
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
            <th scope="col">LISTADO DE FACTURAS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataDeFacturaDia" :key="item.idfactura">
            <th scope="row">{{ item.fecha }}</th>
            <td>
              $ {{ new Intl.NumberFormat("de-DE").format(item.valorprod) }}
            </td>
            <td>{{ item.porcdesc }}</td>
            <td>{{ item.descripcion }}</td>
            <td>{{ item.cantidad }}</td>
            <td>
              <button
                class="btn btn-dark"
                v-on:click="regresar(item.fecha, item.idalmacen)"
              >
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

            <small class="text-dark"></small>
            <small class="text-dark">
              UTILIDAD: $
              {{
                new Intl.NumberFormat("de-DE").format(
                  (val_utilidad = detalles.subtotal - this.costo)
                )
              }}</small
            >
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { Pie } from "vue-chartjs";

Vue.component("chart1", {
  extends: Pie,

  data() {
    return {
   
      dataDeFacturaDia: [],
      productos: [],
      stock: [],
      usuario: new Object(),

      bgColors: [
        "rgba(163,221,203,0.2)",
        "rgba(232,233,161,0.2)",
        "rgba(230,181,102,0.2)",
        "rgba(229,112,126,0.2)",
      ],
      borderColor: [
        "rgba(163,221,203,1)",
        "rgba(232,233,161,1)",
        "rgba(230,181,102,1)",
        "rgba(229,112,126,1)",
      ],
      borderWidth: 2,
    };
  },
  mounted() {
    this.mostrarDatos();

    this.renderChart(
      {
        labels: [this.productos, this.stock],
        datasets: [
          {
            label: this.productos,
            backgroundColor: this.bgColors,
            borderColor: this.borderColor,
            borderWidth: this.borderWidth,
            data: this.stock,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },

  methods: {
    mostrarDatos() {
      this.dataDeFacturaDia.idalmacen = this.$route.params.idalmacen;
      console.log(this.dataDeFacturaDia.idalmacen)
      this.dataDeFacturaDia.numero = this.$route.params.numero;
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios
        .get(
          this.$conexion +
            "/ventas-instantaneas/detalle/" +
            this.dataDeFacturaDia.idalmacen +
            "/" +
            this.dataDeFacturaDia.numero +
            "/" +
            this.usuario._id
        )
        .then((response) => {
        
          response.data.rows.forEach((element) => {
            this.productos.push(element.descripcion);
            this.stock.push(element.cantidad);
          });
        });
    },
  },
});

export default {
  data() {
    return {
      numeroFactura: "",
      dataDeFacturaDia: [],
      detalles: "",
      totalProductos: null,
      cantProductos: null,
      options: null,
      usuario: new Object(),
      costo: null,
      val_utilidad: null,
     
    };
  },
  async mounted() {
    this.dataDeFacturaDia.idalmacen = this.$route.params.idalmacen;
    this.dataDeFacturaDia.numero = this.$route.params.numero;
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    await axios
      .get(
        this.$conexion +
          "/ventas-instantaneas/detalle/" +
          this.dataDeFacturaDia.idalmacen +
          "/" +
          this.dataDeFacturaDia.numero +
          "/" +
          this.usuario._id
      )
      .then((datos) => {
        this.detalles = datos.data.datosFactura;

        this.AlertaSatisfactoria();
        this.dataDeFacturaDia = datos.data.rows;
        this.numeroFactura = datos.data.rows[0].numero;

        for (let i = 0; i <= this.dataDeFacturaDia.length; i++) {
          this.cantProductos += this.dataDeFacturaDia[i].cantidad;
          this.costo += this.dataDeFacturaDia[i].total_costo;
        }
      })
      .catch((e) => console.log(e));
  },
  methods: {
    AlertaSatisfactoria() {
      this.$swal(
        "Confirmación!",
        "la información de la factura " +
          this.dataDeFacturaDia.numero +
          " se encontro satisfactoriamente!",
        "success"
      );
    },
    regresar(fecha, idalmacen) {
      this.$router.push("/ventas-instante/" + fecha + "/" + idalmacen);
    },
  },
};
</script>