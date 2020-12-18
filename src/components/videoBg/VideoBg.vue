<template>
  <div class="Videobg">
    <video autoplay loop muted :src="$getUrl(src)"></video>
  </div>
</template>

<script>
export default {
  name: "VideoBg",
  props: {
    src: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.Videobg {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;
  }
}
</style>
