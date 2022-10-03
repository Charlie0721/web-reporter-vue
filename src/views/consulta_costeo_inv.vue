<template>
  <div class="consulta_costeos">
    <navigation></navigation>
    <Costeo_inv></Costeo_inv>
  </div>
</template>

<script>
import Costeo_inv from "@/components/costeo_inventario.vue";

import navigation from "@/components/navigation";
export default {
  name: "Costeos",
  components: {
    Costeo_inv,
    navigation,
  },
};
</script>