<template>
  <div class="Pedidos-Producto">
    <navigation/>
  <pedidos_productos></pedidos_productos>


  </div>
</template>

<script>
// @ is an alias to /src
import pedidos_productos from '@/components/pedidosComerciales/pedidos_productos.vue'
import navigation from '@/components/navigation.vue'

export default {
  name: 'ConsultarInventarios',
  components: {
    pedidos_productos,
    navigation
 
  }
}
</script>