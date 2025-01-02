<template>
  <v-app dark v-resize="onResize">
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
  },
  data() {
    return {
      drawer: false,
      onload: false,
      snackbar_error: false,
      snackbar_alert: false,
      menus: [
        {
          id: "about_me",
          title: "ABOUT ME",
          icon: "mdi-run",
        },
        {
          id: "skills",
          title: "SKILLS",
          icon: "mdi-laptop",
        },
        {
          id: "career",
          title: "CAREER",
          icon: "mdi-hub",
        },
        {
          id: "project",
          title: "PROJECT",
          icon: "mdi-file-code",
        },
      ],
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
    scrollToSection(id) {
      this.drawer = false;
      const section = document.getElementById(id);
      if (section) {
        var offset = 0;
        var topPosition = section.offsetTop;

        gsap.to(window, {
          duration: 0.5,
          scrollTo: { y: topPosition, offsetY: offset },
        });
      }
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
