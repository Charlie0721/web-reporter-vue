<template>
  <div class="login">
    <navegacion/>
  <login></login>
        
  </div>
</template>

<script>
// @ is an alias to /src
import login from '@/components/Login_user.vue'
import navegacion from '@/components/navigation.vue'



export default {
  name: 'ComprasdesdePOS',
  components: {
    
    login,
  navegacion

    
  }
}
</script>