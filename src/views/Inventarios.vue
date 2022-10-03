<template>
  <div class="home">
    <navigation></navigation>
    <ConsultaInventarios msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ConsultaInventarios from '@/components/ConsultaInventarios.vue'
import  navigation from "@/components/navigation"
export default {
  name: 'ConsultarInventarios',
  components: {
    ConsultaInventarios,
       navigation
  }
}
</script>
