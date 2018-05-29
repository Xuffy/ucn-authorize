<template>
  <div id="app" :class="{noAuth: !show}">
    <!--<div class="shade"></div>-->
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components: {},
    data() {
      return {
        show: false
      }
    },
    created() {
      let query = this.$route.query;
      if (!query.type || !query.redirect) {
        return false;
      } else {
        this.$sessionStore.set('query', query);
      }
      this.show = true;
    }
  }
</script>


<style lang="less" scoped>
  .shade {
    position: fixed;
    z-index: 999999;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: none;
  }

  .noAuth .shade {
    display: block;
  }

  .noAuth {
    /*-webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;*/
  }
</style>
