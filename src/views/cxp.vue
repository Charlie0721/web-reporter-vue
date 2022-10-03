<template>
  <div class="cuentas_Por_pagar">
    <navigation></navigation>
    <cuentasPorpagar></cuentasPorpagar>
  </div>
</template>

<script>
import cuentasPorpagar from "@/components/cuentasPorpagar.vue";
import navigation from "@/components/navigation";
export default {
  name: "cuentas_por_pagar",
  components: {
    cuentasPorpagar,
    navigation
  },
};
</script>
  