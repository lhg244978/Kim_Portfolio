<template>
  <v-app dark v-resize="onResize">
    <!-- router -->
    <v-main v-if="onload" style="background-color: #141414">
      <nuxt />
    </v-main>
    <!-- router -->

    <!-- error -->
    <v-dialog v-model="messageAlert" scrollable persistent max-width="400">
      <v-card color="#d4d3d9" flat style="border-radius: 20px">
        <v-card-text class="py-5 px-10">
          <v-row no-gutters align="center">
            <v-col
              cols="12"
              class="text-center mb-5"
              style="
                font-size: 24px;
                font-weight: 700;
                letter-spacing: -0.24px;
                color: #000;
              "
            >
              {{ alert_title ? alert_title : "Alert" }}</v-col
            >
            <v-col
              cols="12"
              class="text-center mb-5"
              style="
                font-size: 18px;
                font-weight: 400;
                letter-spacing: -0.18px;
                color: #000;
              "
            >
              {{ alert_msg ? alert_msg : "-" }}</v-col
            >
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-0" style="border-top: 1px solid #c2c2c6">
          <v-btn
            text
            class="py-8"
            color="#6aa4f6"
            block
            @click="messageAlert = false"
            style="font-size: 20px; font-weight: 400; letter-spacing: -0.24px"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
