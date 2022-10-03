<template>
  <div class="entradaProductos">
  
<navigation></navigation>
<entrada-productos></entrada-productos>

  </div>
</template>

<script>
// @ is an alias to /src
import entradaProductos from '@/components/cargarMovInv.vue'
import  navigation from "@/components/navigation"
export default {
  name: 'ConsultarInventarios',
  components: {
    entradaProductos,
       navigation
    
  }
}
</script>