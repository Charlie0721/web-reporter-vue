<template>
  <div><navigation></navigation>
    <div class="container">
      <br>
      <h2 class="display-5 text-dark" v-if="numero">
        DETALLE DE LA FACTURA NUMERO {{ this.numero }}
      </h2>
      <br />
      <h2>Productos Vendidos</h2>
      <br />

      <chart></chart>
      <br />
      <table class="table table-responsive">
        <thead>
          <tr>
            <th scope="col">FECHA</th>
            <th scope="col">VALOR PRODUCTO</th>
            <th scope="col">% DESCUENTO</th>
            <th scope="col">DESCRIPCION</th>
            <th scope="col">CANTIDAD</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataFactura" :key="item.idfactura">
            <th scope="row">{{ item.fecha }}</th>
            <td>
              $ {{ new Intl.NumberFormat("de-DE").format(item.valorprod) }}
            </td>
            <td>{{ item.porcdesc }}</td>
            <td>{{ item.descripcion }}</td>
            <td>{{ item.cantidad }}</td>
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
              >SUBTOTAL: ${{
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
import  navigation from "@/components/navigation"
Vue.component("chart", {
  extends: Pie,

  data() {
    return {
      dataFactura: [],

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
    this.mostrar();

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
    mostrar() {
      this.dataFactura.numero = this.$route.params.numero;
      this.dataFactura.idalmacen = this.$route.params.idalmacen;
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      axios
        .get(
          this.$conexion +
            "/facturas/" +
            this.dataFactura.numero +
            "/" +
            this.dataFactura.idalmacen +
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
   components: {
    navigation,
  },

  data() {
    return {
      numero: "",
      dataFactura: [],
      detalles: "",
      totalProductos: null,
      cantProductos: null,
      options: null,
      usuario: new Object(),
    };
  },

  async mounted() {
    this.dataFactura.numero = this.$route.params.numero;
    this.dataFactura.idalmacen = this.$route.params.idalmacen;
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    await axios
      .get(
        this.$conexion +
          "/facturas/" +
          this.dataFactura.numero +
          "/" +
          this.dataFactura.idalmacen +
          "/" +
          this.usuario._id
      )
      .then((datos) => {
        this.detalles = datos.data.datos1;

        this.AlertaSatisfactoria();
        this.dataFactura = datos.data.rows;
        this.numero = datos.data.rows[0].numero;

        for (let i = 0; i <= this.dataFactura.length; i++) {
          if (this.dataFactura != null) {
            localStorage.setItem(
              "dataFactura",
              JSON.stringify(this.dataFactura)
            );

            this.cantProductos += this.dataFactura[i].cantidad;

            this.datosEncontrados = JSON.parse(
              localStorage.getItem("dataFactura")
            );
          }
        }
      })
      .catch((e) => console.log(e));
  },
  methods: {
    AlertaSatisfactoria() {
      this.$swal(
        "Confirmación!",
        "la información de la factura " +
          this.dataFactura.numero +
          " se encontro satisfactoriamente!",
        "success"
      );
    },
  },
};
</script>