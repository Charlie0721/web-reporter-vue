<template>
  <div class="Pedidos-Formas-Pago">
    <navigation/>
  <pedidos_formas_pago></pedidos_formas_pago>


  </div>
</template>

<script>
// @ is an alias to /src
import pedidos_formas_pago from '@/components/pedidosComerciales/pedidos_formas-pago.vue'

import navigation from '@/components/navigation.vue'
export default {
  name: 'ConsultarInventarios',
  components: {
    pedidos_formas_pago,
    navigation
 
  }
}
</script>