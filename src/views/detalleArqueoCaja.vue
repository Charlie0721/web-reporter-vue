<template>
  <div id="detalle arqueo">
    <div class="container">
      <h2 class="display-5 text-dark">DETALLE DE ARQUEO</h2>

      <div class="card text-center">
        <div class="card-header">{{ this.dataArqueo.nomalmacen }}</div>
        <div class="card-body">
          <h6 class="card-title">
            Base: $
            {{
              new Intl.NumberFormat("de-DE").format(this.dataArqueo.basecaja)
            }}
          </h6>
          <p class="card-text">
            Efectivo entregado: $ {{
              new Intl.NumberFormat("de-DE").format(this.dataArqueo.efectivo)
            }}</p>
             <p class="card-text">
               Egresos: $ {{
              new Intl.NumberFormat("de-DE").format(this.dataArqueo.egresossist)
            }} </p>
             <p class="card-text">   Total Caja: $ {{
              new Intl.NumberFormat("de-DE").format(this.dataArqueo.totalcajasist)
            }} </p>
            <p class="card-text">    Efectivo Facturas: $ {{
              new Intl.NumberFormat("de-DE").format(this.dataArqueo.efectivofactsist)
            }} </p>
            
         
        </div>
        <a href="#" class="btn btn-warning" v-on:click="retornar">Volver</a>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      dataArqueo: [],
      usuario: new Object()
    };
  },
  mounted() {
    this.obtenerArqueoFecha();
  },
  methods: {
    async obtenerArqueoFecha() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.dataArqueo.idarqueo = this.$route.params.idarqueo;
      await axios
        .get(this.$conexion + "/api/arqueoscaja/" + this.dataArqueo.idarqueo+'/'+this.usuario._id)
        .then((arqueos) => {
          this.dataArqueo = arqueos.data.rows[0];
        })
        .catch((err) => console.log(err));
    },
    retornar(){
    
       this.$router.push("/informe/arqueos-caja");
    }
  },
};
</script>