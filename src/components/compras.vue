<template>
  <div id="compras">
 
    
    <div class="container">
     <br/>
      <center><h2 class="display-5 text-blue">COMPRAS</h2></center>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Buscar Compras</span>
        </div>
        <input
          type="search"
          class="form-control text-uppercase b"
          name="buscar"
          style="width: 100px" placeholder="Buscar "
          v-model="buscaCompra"
        />
      </div>

      <table class="table table-hover table-responsive ">
        <thead>
          <tr>
            <th scope="col"># COMPRA</th>
            <th scope="col">FECHA</th>
            <th scope="col">FACTURA PROVEEDOR</th>
            <th scope="col">VALOR TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in searchCompras"
            :key="item.idcompra"
            v-on:click="getDetalleCompra(item.docprovee)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Ver detalle de la compra"
          >
            <th scope="row">{{ item.idcompra }}</th>
            <th scope="row">{{ item.fecha }}</th>
            <td>{{ item.docprovee }}</td>
            <td>$ {{new Intl.NumberFormat("de-DE").format(item.valortotal)  }}</td>
          </tr>
        </tbody>
      </table>


    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ComprasdesdePOS",
  props: {
    msg: String,
  },
  data() {
    return {
      buscaCompra: "",
      TodasLasCompras: [],
      compras: [],
      compraString: "",
       usuario: new Object()
    };
  },
  mounted() {
    this.getCompras();
  },
  methods: {
    async getCompras() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      await axios
        .get(this.$conexion + "/api/consultar-todas-las-compras/"+this.usuario._id)
        .then((response) => {
          this.TodasLasCompras = response.data.rows;
        
        })
      


        .catch((error) => console.log(error));
    },
    getDetalleCompra(docprovee) {
      this.$router.push("/compras/" + docprovee);
    },
  },
  computed: {

   
    searchCompras: function () {


      return this.TodasLasCompras.filter(
        (item) => item.fecha.includes(this.buscaCompra)  ||
          item.idcompra.toString().includes(this.buscaCompra.toUpperCase()) ||
          item.docprovee.toString().includes(this.buscaCompra.toUpperCase()) ||
          item.valortotal.toString().includes(this.buscaCompra.toUpperCase()) 
      );
    },

  },
};
</script>



