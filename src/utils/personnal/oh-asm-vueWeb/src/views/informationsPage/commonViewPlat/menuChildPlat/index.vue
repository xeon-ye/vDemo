<template>
  <div class="home">
    <router-view :key="pathKey" />
  </div>
</template>

<script>
export default {
  name: "menuChildPlat",
  computed: {
    pathKey() {
      return this.$route.fullPath;
    }
  }
};
</script>
