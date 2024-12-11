<template>
  <v-app dark v-resize="onResize">
    <v-app-bar
      app
      fixed
      height="52"
      flat
      class="px-0"
      :style="` ${
        scrollY > 1
          ? 'background-color:#none; transition: background-color 1s ease-in-out;'
          : 'background:#141414; transition: background-color 1s ease-in-out;'
      }`"
    >
      <span style="font-size: 20px; font-weight: 700">Kim_Portfolio</span>
    </v-app-bar>
    <!-- router -->
    <v-main v-if="onload" style="background-color: #141414">
      <nuxt />
    </v-main>
    <!-- router -->

    <!-- error -->
    <!-- <v-dialog v-model="snackbar_error" persistent scrollable max-width="300px">
      <v-card flat style="border-radius: 10px">
        <v-card-text class="pa-5">
          <v-row no-gutters>
            <v-col cols="12" class="text-center">
              <p
                class="nanum-Bold mt-5 mb-0"
                style="font-size: 16px; letter-spacing: -0.32px; color: #000000"
              >
                {{ error_msg }}
              </p>
            </v-col>

            <v-col cols="12" class="mt-10">
              <v-btn
                depressed
                block
                color="#3185FF"
                :ripple="false"
                class="no-background-hover nanum-Bold"
                rounded
                height="50"
                style="font-size: 14px; letter-spacing: -0.28px; color: #ffffff"
                @click="snackbar_error = false"
                >확인</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog> -->
    <!-- error -->
  </v-app>
</template>

<script>
export default {
  components: {},
  watch: {},
  computed: {
    processing() {
      return this.$store.state.processing;
    },
    windowSize() {
      return this.$store.state.windowSize;
    },
    scrollY() {
      return this.$store.state.scrollY;
    },

    processing_msg() {
      return this.$store.state.processing_msg;
    },
  },
  data() {
    return {
      drawer: true,
      onload: false,
      snackbar_error: false,
      snackbar_alert: false,
    };
  },
  async mounted() {
    this.onload = true;
    window.addEventListener("scroll", this.onScroll);
    document.body.style.backgroundColor = "#ffffff";
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll(e) {
      this.$store.commit("setScroll", window.scrollY);
    },
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
</style>
