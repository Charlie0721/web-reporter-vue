<template>
  
  <div id="fechaVencimiento">
    <br>
    <div class="container">
    
      <center>
        <h2 class="display-5">
          <small class="text-muted">
            INFORME DE VENCIMIENTOS DE LOTES EN COMPRAS
          </small>
        </h2>
      </center>
      <br />
      <br />
      <form v-on:submit.prevent="ConsultaLotes">
        <h2 class="display-5">
     <center >     <small class="text-muted"> Consulta lotes por vencer </small></center>
        </h2>
        <center>
          <div class="form-group col-md-3">
            <h2 class="display-5">
              <small class="text-muted">Fecha inicial </small>
            </h2>
            <input
              type="date"
              placeholder="AAAAMMDD"
              class="form-control text-uppercase input-header"
              v-model="ProductLotesPorVencer.fechaIni"
            />
  <br>
            <button
              type="submit"
              class="btn btn-dark btn-block"
              style="background-color: #82230c"
            >
              Buscar
            </button>
          </div>
        </center>
      </form>
      <form v-on:submit.prevent="ConsultaLotesVencidos">
     <center>   <h2 class="display-5">
          <small class="text-muted"> Consulta lotes vencidos </small>
        </h2></center>
        <center>
          <div class="form-group col-md-3">
            <h2 class="display-5">
              <small class="text-muted">Fecha inicial </small>
            </h2>
            <input
              type="date"
              placeholder="AAAAMMDD"
              class="form-control text-uppercase input-header"
              v-model="ProductLotesVencidos.fechaIni"
            />
<br>
            <button
              type="submit"
              class="btn btn-dark btn-block"
              style="background-color: #82230c"
            >
              Buscar
            </button>
          </div>
        </center>
      </form>
      <br />

      <div class="row">
        <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Buscar Productos Por Vencer</span>
        </div>
        <input
          type="search"
          class="form-control text-uppercase b"
          name="buscar"
          style="width: 300px"
          v-model="bucarPorVencer"
        />
      </div>

        <div
          class="col-sm-6 card border-warning mb-3"
          v-for="item in searchProductosPorVencer"
          :key="item.item"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ item.descripcion }}</h5>
              <p class="card-text">Barras: {{ item.barcode }}</p>
              <li class="list-group-item border-warning mb-3">
                Lote: {{ item.lote }}
              </li>
              <li class="list-group-item border-warning mb-3">
                Codigo: {{ item.codigo }}
              </li>
              <li class="list-group-item border-warning mb-3">
                Fecha Vencimiento:
                {{
                  new Date(item.fechavenc).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}
              </li>
            </div>
          </div>
        </div>
      </div>

      
      <div class="row">
          <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Buscar Productos Vencidos</span>
        </div>
        <input
          type="search"
          class="form-control text-uppercase b"
          name="buscar"
          style="width: 300px"
          v-model="bucarPVencidos"
        />
      </div>
        <div
          class="col-sm-6 card border-danger mb-3"
          v-for="item in searchProductosVencidos"
          :key="item.item" 
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ item.descripcion }}</h5>
              <p class="card-text">Barras: {{ item.barcode }}</p>
              <li class="list-group-item border-danger mb-3">
                Lote: {{ item.lote }}
              </li>
              <li class="list-group-item border-danger mb-3">
                Codigo: {{ item.codigo }}
              </li>
              <li class="list-group-item border-danger mb-3">
                Fecha Vencimiento:
                {{
                  new Date(item.fechavenc).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}
              </li>
              <li class="list-group-item border-danger mb-3 text-red">
                Vencido !!!
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "lote_vencimientos",
  props: {
    msg: String,
  },

  data() {
    return {
      lotesProductosVencidos: [],
      usuario: new Object(),
      ProductLotesVencidos: new Object(),
      ProductLotesPorVencer: new Object(),
      lotesProductosPorVencer: [],
      bucarPorVencer:'',
      bucarPVencidos:''
    };
  },

  methods: {
    ConsultaLotes() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      let fechaIni = this.ProductLotesPorVencer.fechaIni;
      var data = {
        fechaIni: fechaIni.replace(/-/gi, ""),
      };

      axios
        .post(
          this.$conexion +
            "/lotes-fechas-vencimiento-por-vencer/" +
            this.usuario._id,
          data
        )
        .then((res) => {
          this.lotesProductosPorVencer = res.data.rows;
        })
        .catch((err) => console.log(err));
    },
    ConsultaLotesVencidos() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      let fechaIni = this.ProductLotesVencidos.fechaIni;
      var data = {
        fechaIni: fechaIni.replace(/-/gi, ""),
      };
      axios
        .post(
          this.$conexion +
            "/lotes-fechas-vencimiento-vencidos/" +
            this.usuario._id,
          data
        )
        .then((response) => {
          this.lotesProductosVencidos = response.data.rows;
        })
        .catch((err) => console.log(err));
    },
  },
   computed: {
    searchProductosPorVencer: function () {
      return this.lotesProductosPorVencer.filter(
        (item) =>
          item.descripcion.includes(this.bucarPorVencer.toUpperCase()) ||
          item.barcode.includes(this.bucarPorVencer)||
          item.codigo.includes(this.bucarPorVencer)||
          item.lote.includes(this.bucarPorVencer)
      );
    },
      searchProductosVencidos: function () {
      return this.lotesProductosVencidos.filter(
        (item) =>
          item.descripcion.includes(this.bucarPVencidos.toUpperCase()) ||
          item.barcode.includes(this.bucarPVencidos)||
          item.codigo.includes(this.bucarPVencidos)||
          item.lote.includes(this.bucarPVencidos)
      );
    },
  },
};
</script>



