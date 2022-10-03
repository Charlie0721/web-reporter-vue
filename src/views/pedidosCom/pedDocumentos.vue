<template>
  <div class="Pedidos-Documento">
        <navigation></navigation>
  <pedidos_documentos></pedidos_documentos>


  </div>
</template>

<script>
// @ is an alias to /src
import pedidos_documentos from '@/components/pedidosComerciales/pedidos_documentos.vue'
import navigation from '@/components/navigation.vue'

export default {
  name: 'ConsultarInventarios',
  components: {
    pedidos_documentos,
    navigation
 
  }
}
</script>