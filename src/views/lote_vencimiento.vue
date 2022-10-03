<template>
  <div class="vencimientos-lotes">
    <navigation></navigation>
    <vencimientos_lotes></vencimientos_lotes>
  </div>
</template>

<script>
import vencimientos_lotes from "@/components/lote_fecha_ven.vue";
import navigation from "@/components/navigation";

export default {
  name: "lote_vencimientos",
  components: {
    vencimientos_lotes,
    navigation,
  },
};
</script>