<template>
  <div class="Detalles-del-pedido">
    <navigation />
    <detalle_del_pedido />
  </div>
</template>

<script>
import detalle_del_pedido from "@/components/pedidosComerciales/detalle_del_pedido.vue";

import navigation from "@/components/navigation.vue";
export default {
  name: "ConsultarInventarios",
  components: {
    navigation,
    detalle_del_pedido,
  },
};
</script>