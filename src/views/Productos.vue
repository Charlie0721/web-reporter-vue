<template>
  <div class="home">
    <navigation></navigation>
    <listado-productos msg="Productos Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import ListadoProductos from "@/components/ListadoProductos.vue";
import navigation from "@/components/navigation";
export default {
  name: "ConsultarInventarios",
  components: {
    ListadoProductos,
    navigation,
  },
};
</script>