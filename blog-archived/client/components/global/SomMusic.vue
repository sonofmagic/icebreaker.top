<script>
import { mapActions } from 'vuex'
import { isCloudbaseUrl } from '@/utils/validate'

let aplayer
if (process.client) {
  aplayer = require('vue-aplayer')
  aplayer.disableVersionBadge = true
}
const watch = {}

if (process.client) {
  watch.music = {
    async handler(nv) {
      const p = { ...nv }
      const { src } = p
      if (isCloudbaseUrl(src)) {
        p.src = await this.getSingleUrl(src)
      }
      this.musicProxy = p
    },
    immediate: true,
  }
}
export default {
  name: 'SomMusic',
  components: {
    Aplayer: aplayer,
  },
  props: {
    music: {
      type: [Object],
      default: () => {
        return {
          title: '',
          artist: '',
          src: '', // required
          pic: '',
          // lrc:'',
          // theme:''
        }
      },
    },
    list: {
      type: [Array],
      default: () => [],
    },
    mini: {
      type: [Boolean],
      default: false,
    },
    float: {
      type: [Boolean],
      default: false,
    },
    showLrc: {
      type: [Boolean],
      default: false,
    },
    mutex: {
      type: [Boolean],
      default: true,
    },
    shuffle: {
      type: [Boolean],
      default: false,
    },
    listFolded: {
      type: [Boolean],
      default: false,
    },
    theme: {
      type: [String],
      default: '#41b883',
    },
    repeat: {
      type: [String],
      default: 'none', // 'music' 'list' 'none'
    },
    listMaxHeight: {
      type: [String],
      default: '',
    },
    // #region audio native start
    autoplay: {
      type: [Boolean],
      default: false,
    },
    controls: {
      type: [Boolean],
      default: false,
    },
    muted: {
      type: [Boolean],
      default: false,
    },
    preload: {
      type: [String],
      default: 'none', // 1. none 2. metadata 3.auto
    },
    volume: {
      type: [Number],
      default: 0.8, //
    },
    // #endregion audio native end
  },
  data() {
    return {
      musicProxy: {
        title: '',
        artist: '',
        src: '', // required
        pic: '',
      },
    }
  },
  computed: {
    mutedProxy: {
      get() {
        return this.muted
      },
      set(nv) {
        this.$emit('update:muted', nv)
      },
    },
    volumeProxy: {
      get() {
        return this.volume
      },
      set(nv) {
        this.$emit('update:volume', nv)
      },
    },
  },
  watch,
  async mounted() {},
  methods: {
    ...mapActions('user', ['getSingleUrl']),
  },
}
</script>

<template>
  <ClientOnly v-if="musicProxy.src">
    <Aplayer
      :music="musicProxy"
      :list="list"
      :mini="mini"
      :float="float"
      :show-lrc="showLrc"
      :mutex="mutex"
      v-model:muted="mutedProxy"
      :theme="theme"
      v-model:volume="volumeProxy"
      :shuffle="shuffle"
      :repeat="repeat"
      :list-max-height="listMaxHeight"
      :list-folded="listFolded"
      :autoplay="autoplay"
      :controls="controls"
      :preload="preload"
    >
      <template #display>
        <slot name="display" />
      </template>
    </Aplayer>
  </ClientOnly>
</template>

<style></style>
