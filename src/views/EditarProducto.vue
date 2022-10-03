<template>
  <div>
    
    <div class="container">
      <form v-on:submit.prevent>
        <h5 class="display-5 text-dark">Descripción</h5>
        <div class="input-group mb-3">
          <input
            class="form-control text-uppercase"
            type="text"
            name="descripcion"
            id="descrip"
            aria-label="default input example"
            v-model="formulario.descripcion"
          />
        </div>
        <h5 class="display-5 text-dark">Costo</h5>
        <div class="input-group mb-3">
          <span class="input-group-text">$</span>
          <input
            type="number"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            name="costo"
            v-model="formulario.costo"
          />
          <span class="input-group-text">.00</span>
        </div>

        <h5 class="display-5 text-dark">Precio Venta</h5>
        <div class="input-group mb-3">
          <span class="input-group-text">$</span>
          <input
            type="number"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            name="precioventa"
            v-model="formulario.precioventa"
          />
          <span class="input-group-text">.00</span>
        </div>
        <h5 class="display-5 text-dark">Precio especial 1</h5>
        <div class="input-group mb-3">
          <span class="input-group-text">$</span>
          <input
            type="number"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            name="precioespecial1"
            v-model="formulario.precioespecial1"
          />
          <span class="input-group-text">.00</span>
        </div>
        <h5 class="display-5 text-dark">Precio especial 2</h5>
        <div class="input-group mb-3">
          <span class="input-group-text">$</span>
          <input
            type="number"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            name="precioespecial2"
            v-model="formulario.precioespecial2"
          />
          <span class="input-group-text">.00</span>
        </div>

        <button type="submit" class="btn btn-success" v-on:click="editarProd()">
          Editar
        </button>
        <button type="submit" class="btn btn-warning" v-on:click="salir()">
          Salir
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditarProducto",

  data() {
    return {
      idproducto: null,
      formulario: {
        descripcion: "",
        precioventa: "",
        precioespecial1: "",
        precioespecial2: "",
        costo: "",
       
      },
       usuario: new Object(),
    };
  },
  methods: {
    editarProd() {
      axios
        .post(
          this.$conexion+"/editar/productos/" +
            this.formulario.idproducto+'/'+this.usuario._id,
          this.formulario
        )
        .then((data) => {
          this.AlertaSatisfactoria();

          console.log(data);
          this.$router.push("/productos");
        });
    },
    salir() {
      this.$router.push("/productos");
    },
    AlertaSatisfactoria() {
      this.$swal(
        "Confirmación!",
        "Producto editado satisfactoriamente!",
        "success"
      );
    },
  },

  mounted() {
    this.formulario.idproducto = this.$route.params.idproducto;
     this.usuario = JSON.parse(localStorage.getItem("usuario"));
    axios
      .get(this.$conexion+"/productos/" + this.formulario.idproducto+'/'+this.usuario._id)
      .then((datos) => {
        this.formulario.descripcion = datos.data.rows[0].descripcion.toUpperCase();
        this.formulario.precioventa = datos.data.rows[0].precioventa;
        this.formulario.precioespecial1 = datos.data.rows[0].precioespecial1;
        this.formulario.precioespecial2 = datos.data.rows[0].precioespecial2;
        this.formulario.costo = datos.data.rows[0].costo;
      });
  },
};
</script>

<style  scoped>
</style>
