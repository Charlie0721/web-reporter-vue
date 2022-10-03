<template>
  <div class="Compras">
  <navigation></navigation>
<cargarCompras></cargarCompras>

  </div>
</template>

<script>
// @ is an alias to /src
import cargarCompras from '@/components/cargarCompras.vue'
import  navigation from "@/components/navigation"
export default {
  name: 'ConsultarInventarios',
  components: {
    cargarCompras,
    navigation
    
  }
}
</script>