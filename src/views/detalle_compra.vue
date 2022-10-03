<template>
  <div>
    <div class="container">
      <h2 class="display-5 text-dark">
        DETALLE DE LA COMPRA NUMERO {{ this.id }}
      </h2>
      <br />
      <button class="btn btn-dark" v-on:click="Regresar">Volver</button>
      <br />
      <br />
      <h2>Detalle Productos Comprados</h2>

      <br />
      <table class="table table-responsive table-bordered">
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
          <tr v-for="item in dataCompras" :key="item.idcompra">
            <th scope="row">{{ item.fecha }}</th>
            <td>$ {{ new Intl.NumberFormat("de-DE").format(item.valor) }}</td>
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
              >SUBTOTAL: $
              {{
                new Intl.NumberFormat("de-DE").format(detalles.valorneto)
              }}</small
            >
            <br />
            <small class="text-dark"
              >VALOR IMPUESTO: $
              {{
                new Intl.NumberFormat("de-DE").format(detalles.impuestos)
              }}</small
            >
            <br />
            <small class="text-dark"
              >TOTAL DESCUENTOS: $
              {{
                new Intl.NumberFormat("de-DE").format(detalles.descuento)
              }}</small
            >
            <br />
            <small class="text-dark"></small>
            <small class="text-dark">
              TOTAL COMPRA: $
              {{
                new Intl.NumberFormat("de-DE").format(detalles.valortotal)
              }}</small
            ><br />
            <small class="text-dark"></small>
            <small class="text-dark">
              PROVEEDOR: {{ detalles.nombres }} {{ detalles.apellidos }}</small
            >
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
      dataCompras: [],
      detalles: "",
      totalProductos: null,
      cantProductos: null,
      id: "",
      user: new Object(),
    };
  },

  async mounted() {
    this.dataCompras.docprovee = this.$route.params.docprovee;
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(this.usuario._id);
    await axios
      .get(
        this.$conexion +
          "/api/consultar-todas-las-compras/" +
          this.dataCompras.docprovee +
          "/" +
          this.usuario._id
      )
      .then((datos) => {
        this.detalles = datos.data.datosCompras;

        this.id = this.detalles.idcompra;
        this.dataCompras = datos.data.dataDeCompras;

        this.AlertaSatisfactoria();
        for (let i = 0; i <= this.dataCompras.length; i++) {
          if (this.dataCompras != null) {
            localStorage.setItem(
              "dataCompras",
              JSON.stringify(this.dataCompras)
            );

            this.cantProductos += this.dataCompras[i].cantidad;
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
        "la información de la compra " +
          this.id +
          " se encontro satisfactoriamente!",
        "success"
      );
    },
    Regresar() {
      this.$router.push("/compras");
    },
  },
};
</script>