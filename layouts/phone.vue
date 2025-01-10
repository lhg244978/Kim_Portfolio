<template>
  <v-app dark v-resize="onResize">
    <!-- router -->
    <v-main v-if="onload" style="background-color: #141414">
      <nuxt />
    </v-main>
    <!-- router -->

    <!-- error -->
    <MessageAlert
      :dialog="messageAlert"
      :title="alert_title"
      :context="alert_msg"
      @close="messageAlert = false"
    ></MessageAlert>
    <!-- error -->
  </v-app>
</template>

<script>
import { gsap } from "@/node_modules/gsap";
import { ScrollToPlugin } from "@/node_modules/gsap/ScrollToPlugin";

export default {
  components: {},
  watch: {
    windowSizeWidth(val) {
      if (val > 700) {
        this.drawer = false;
      }
    },
    alert(val) {
      if (val) {
        this.messageAlert = true;
      }
    },
    messageAlert(val) {
      if (!val) {
        this.$store.commit("alertClear");
      }
    },
  },
  computed: {
    windowSize() {
      return this.$store.state.windowSize;
    },
    windowSizeWidth() {
      return this.$store.state.windowSize.width;
    },
    scrollY() {
      return this.$store.state.scrollY;
    },
    alert() {
      return this.$store.state.alert;
    },
    alert_msg() {
      return this.$store.state.alert_msg;
    },
    alert_title() {
      return this.$store.state.alert_title;
    },
  },
  data() {
    return {
      onload: false,
      messageAlert: false,
    };
  },
  async mounted() {
    // 스크롤 애니메이션
    gsap.registerPlugin(ScrollToPlugin);
    this.onload = true;
    window.addEventListener("scroll", this.onScroll);
    document.body.style.backgroundColor = "#ffffff";
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    //vuex scorll시 scroll 값을 저장
    onScroll(e) {
      this.$store.commit("setScroll", window.scrollY);
    },
    //vuex resize시 window 값을 저장
    onResize() {
      this.$store.commit("onResize", {
        width: window.innerWidth,
        height: window.innerHeight,
      });
    },
  },
};
</script>
<style scoped>
.background_none {
  background: none !important;
}
.v-dialog {
  box-shadow: none;
}
.v-application {
  background-color: #ffffff !important;
}
.fadeinEffect {
  animation: fadein 1s;
  -moz-animation: fadein 1s; /* Firefox */
  -webkit-animation: fadein 1s; /* Safari and Chrome */
  -o-animation: fadein 1s; /* Opera */
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.custom-btn {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}
.custom-btn:hover {
  color: yellow;
  transform: scale(1.05);
}
</style>
