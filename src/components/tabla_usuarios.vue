<template>
  <div id="todas las facturas">
  
  
    <div class="container">
      <center>
        <h2 class="display-4">
          <small class="text-muted"> USUARIOS </small>
        </h2>
      </center>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Buscar Usuario </span>
        </div>
        <input
          type="search"
          class="form-control text-uppercase"
          placeholder="Buscar"
          name="buscar"
          style="width: 100px"
          v-model="buscarFactura"
        />
      </div>

      <table class="table table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">RAZON SOCIAL</th>
            <th scope="col">ID USUARIO</th>
         
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in BuscarFacturas"
            :key="item.idalamacen"
            v-on:click="verDetalle(item.numero, item.idalmacen)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Ver detalle factura"
          >
            <th scope="row">{{ item.numero }}</th>
            <td> {{ item.fecha }}</td>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
//import axios from "axios";
export default {
  name: "TablaUsuarios",
  props: {
    msg: String,
  },

  
};
</script>
