<template>
  <div class="registra-usuario">
  <navigation></navigation>
    <registrar-usuarios></registrar-usuarios>
  </div>
      
</template>

<script>
// @ is an alias to /src
import RegistrarUsuarios from "@/components/RegistrarUsuarios.vue";
import  navigation from "@/components/navigation"
export default {
  name: "ComprasdesdePOS",
  components: {
    RegistrarUsuarios,
    navigation
  },
};
</script>