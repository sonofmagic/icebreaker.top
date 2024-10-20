<script>
export default {
  name: 'ErrorPage',
  layout: 'noFooter',
  props: {
    error: {
      type: Object,
      default: () => ({
        statusCode: 404,
      }),
    },
  },
}
</script>

<template>
  <div>
    <div class="land" />
    <div class="sea">
      <div class="container mx-auto flex flex-col items-center">
        <div class="island">
          404
        </div>
        <div class="end">
          Nothing ahead
        </div>
        <nuxt-link class="back-btn" tag="div" to="/">
          GO BACK
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.land {
  height: 35vh;
}

.sea {
  background-color: #719dce;
  height: calc(65vh - 54px);

  // width: 100vw;
  .island {
    color: #5a4156;
    font-size: 25vw;
    line-height: 0;
    font-weight: 500;
    margin-bottom: 13vw;
  }

  .end {
    font-size: 50px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 5vh;
  }

  .back-btn {
    padding: 10px 16px;
    cursor: pointer;
    background-color: #fca53c;
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    border-radius: 50px;
  }
}
</style>
