
<template>
  <div class="est-domicilios">
    <navigation></navigation>
<estados_domicilios></estados_domicilios>
       
  </div>
</template>

<script>

import estados_domicilios from '@/components/estados_domicilios.vue'
import navigation from '@/components/navigation.vue'

export default {
  name: 'estados-domicilios',
  components: {
    estados_domicilios,
     navigation,
    
  }
}
</script>