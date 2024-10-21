
<template>

  <router-view></router-view>
  <FooterNav> </FooterNav>


</template>


<script>

import FooterNav from '@/components/FooterNav.vue';

export default {

  components: {
    FooterNav,
  },

  name: 'App',
}

</script>

