<template>
  <div id="facturas dia">
    <navigation/>
   
    <div class="container">
   <br>   <center>
        <h2 class="display-4">
          <small class="text-muted"> FACTURAS DEL DIA</small>
        </h2>
      </center>
      <tr class="display-6 ml-auto" v-if="this.sub_total">
        <small class="text-dark"
          >Subtotal: ${{
            new Intl.NumberFormat("de-DE").format(this.sub_total)
          }}
        </small>
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="this.val_impuesto">
        <small class="text-dark"
          >Total impuestos: ${{
            new Intl.NumberFormat("de-DE").format(this.val_impuesto)
          }}
        </small>
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="this.total_vemta">
        <small class="text-dark"
          >Total de ventas: ${{
            new Intl.NumberFormat("de-DE").format(this.total_vemta)
          }}
        </small>
        <br />
      </tr>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Buscar Factura </span>
        </div>
        <input
          type="search"
          class="form-control text-uppercase"
          placeholder="Buscar"
          name="buscar"
          style="width: 100px"
          v-model="buscarFacturas"
        />
      </div>

      <table class="table table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">N° FACTURA</th>
            <th scope="col">FECHA</th>
            <th scope="col">SUBTOTAL</th>
            <th scope="col">IMPUESTO</th>
            <th scope="col">VALOR TOTAL</th>
            <th scope="col">HORA</th>
            <th scope="col">ALMACEN</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in BuscarFacturas"
            :key="item.idfactura"
            v-on:click="verDetalles(item.idalmacen, item.numero)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Ver detalle factura"
          >
            <th scope="row">{{ item.numero }}</th>
            <td>{{ item.fecha }}</td>
            <td>
              $ {{ new Intl.NumberFormat("de-DE").format(item.subtotal) }}
            </td>
            <td>
              $ {{ new Intl.NumberFormat("de-DE").format(item.valimpuesto) }}
            </td>
            <td>
              $ {{ new Intl.NumberFormat("de-DE").format(item.valortotal) }}
            </td>
            <td>{{ item.hora }}</td>
            <td>{{ item.nomalmacen }}</td>
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
      datosFactura: [],
      buscarFacturas: "",
      usuario: new Object(),
      total_vemta: null,
      val_impuesto: null,
      sub_total: null,
    };
  },
  mounted() {
    this.viewFactsDay();
  },
  methods: {
    async viewFactsDay() {
      this.datosFactura.fecha = this.$route.params.fecha;
      this.datosFactura.idalmacen = this.$route.params.idalmacen;
      this.usuario = JSON.parse(localStorage.getItem("usuario"));

      await axios
        .get(
          this.$conexion +
            "/ventas-instantaneas/" +
            this.datosFactura.fecha +
            "/" +
            this.datosFactura.idalmacen +
            "/" +
            this.usuario._id
        )
        .then((res) => {
          this.datosFactura = res.data.rows;
          for (let index = 0; index < this.datosFactura.length; index++) {
            this.total_vemta += this.datosFactura[index].valortotal;
            this.val_impuesto += this.datosFactura[index].valimpuesto;
            this.sub_total += this.datosFactura[index].subtotal;
          }
        })
        .catch();
    },
    verDetalles(idalmacen, numero) {
      this.$router.push("/ventas-instante/detalle/" + idalmacen + "/" + numero);
    },
  },
  computed: {
    BuscarFacturas: function () {
      return this.datosFactura.filter(
        (item) =>
          item.numero.toString().includes(this.buscarFacturas) ||
          item.valortotal.toString().includes(this.buscarFacturas)
      );
    },
  },
};
</script>