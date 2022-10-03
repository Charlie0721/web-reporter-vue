<template>
  <div class="egresos">
    <navigation></navigation>
    <saleCaja></saleCaja>
  </div>
</template>

<script>
// @ is an alias to /src
import saleCaja from "@/components/egresos_caja.vue";
import navigation from "@/components/navigation";
export default {
  name: "egresos_caja",
  components: {
    saleCaja,
    navigation,
  },
};
</script>