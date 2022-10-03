<template>
  <div class="compras">
    <navigation></navigation>
    <compras></compras>
  </div>
</template>

<script>
// @ is an alias to /src
import compras from "@/components/compras.vue";
import navigation from "@/components/navigation";

export default {
  name: "ComprasdesdePOS",
  components: {
    navigation,
    compras,
  },
};
</script>