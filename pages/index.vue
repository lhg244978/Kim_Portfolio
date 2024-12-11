<template>
  <v-container
    class="pa-0 mx-0 fill-height d-block"
    style="background-color: #141414; color: #fff"
  >
    <!-- HERO -->
    <v-row no-gutters aling="center" justify="center">
      <v-col
        class="d-flex"
        :style="`${
          windowSize.width > 1500
            ? 'max-width:1500px; min-width:1500px'
            : 'max-width:100%; min-width:100%'
        }; height:${windowSize.height * 2}px; position:relative;
       `"
      >
        <div
          v-if="5 < scrollY"
          class="fixed-text fadeinEffect"
          :style="`width: 100%;${
            scrollY > windowSize.height * 1.3
              ? 'position: absolute;  top:' + windowSize.height * 1.7 + 'px;'
              : ''
          }`"
        >
          <span
            v-if="windowSize.height / 2 > scrollY"
            class="text-center fadeinEffect"
            :style="`font-size:${
              (windowSize.width > 1200 ? 25 : 18) +
              (100 -
                ((windowSize.height - scrollY) / windowSize.height) * 100) /
                2
            }px`"
          >
            안녕하세요
          </span>
          <br />
          <span
            v-if="windowSize.height / 2 > scrollY"
            class="text-center fadeinEffect"
            :style="`font-size:${
              (windowSize.width > 1200 ? 20 : 14) +
              (100 -
                ((windowSize.height - scrollY) / windowSize.height) * 100) /
                7
            }px`"
          >
            안녕하세요 주니어 웹개발자 김현근입니다.
          </span>

          <span
            v-if="windowSize.height / 2 < scrollY"
            class="text-center fadeinEffect"
            :style="`font-size:${
              (windowSize.width > 1200 ? 20 : 14) +
              (50 - ((windowSize.height - scrollY) / windowSize.height) * 100) /
                7
            }px`"
          >
            계속해서 버전업 중인 개발자의 기록
          </span>
          <br />
          <span
            v-if="windowSize.height / 2 < scrollY"
            class="text-center fadeinEffect"
            :style="`font-size:${
              (windowSize.width > 1200 ? 20 : 14) +
              (50 - ((windowSize.height - scrollY) / windowSize.height) * 100) /
                7
            }px`"
          >
            함께 봐주실래요?
          </span>
        </div>
      </v-col>
    </v-row>
    <!-- HERO -->
    <!-- ABOUT ME -->
    <v-row
      no-gutters
      aling="center"
      justify="center"
      style="background-color: #fff"
    >
      <v-col
        :class="`text-center d-flex ${
          windowSize.width > 1200 ? 'pa-15' : 'pa-5'
        }`"
        :style="`${
          windowSize.width > 1500
            ? 'max-width:1500px; min-width:1500px'
            : 'max-width:100%; min-width:100%'
        };
       `"
      >
        <v-row no-gutters align="center">
          <v-col
            cols="12"
            :style="` color:#000;font-size:${
              windowSize.width > 1200 ? 34 : 24
            }px; font-weight:900; `"
          >
            <v-icon
              class="mr-2"
              color="#000"
              :size="windowSize.width > 1200 ? 54 : 44"
              >mdi-link-variant</v-icon
            ><span :style="`font-size: ${windowSize.width > 1200 ? 44 : 34}px`"
              >ABOUT ME</span
            >
            <v-row
              :class="windowSize.width > 600 ? 'mt-15' : 'mt-5'"
              no-gutters
              align="center"
              justify="center"
            >
              <v-col class="d-flex" cols="12" sm="6" md="4">
                <v-icon
                  :class="windowSize.width > 600 ? 'ml-5' : 'ml-auto'"
                  color="#000"
                  :size="windowSize.width > 1200 ? 54 : 44"
                  >mdi-account</v-icon
                >
                <p class="mr-auto ml-5 text-center about_p">
                  <span
                    :style="`font-weight:700;font-size: ${
                      windowSize.width > 1200 ? 20 : 18
                    }px`"
                    >Name
                    <span
                      :style="`font-weight:400;font-size: ${
                        windowSize.width > 1200 ? 16 : 14
                      }px`"
                    >
                      <br />
                      김현근</span
                    ></span
                  >
                </p></v-col
              >
              <v-col class="d-flex" cols="12" sm="6" md="4">
                <v-icon
                  :class="windowSize.width > 600 ? 'ml-5' : 'ml-auto'"
                  color="#000"
                  :size="windowSize.width > 1200 ? 54 : 44"
                  >mdi-calendar-blank</v-icon
                >
                <p class="mr-auto ml-5 text-center about_p">
                  <span
                    :style="`font-weight:700;font-size: ${
                      windowSize.width > 1200 ? 20 : 18
                    }px`"
                    >Birth date
                    <span
                      :style="`font-weight:400;font-size: ${
                        windowSize.width > 1200 ? 16 : 14
                      }px`"
                    >
                      <br />
                      98.05.23</span
                    ></span
                  >
                </p></v-col
              >
              <v-col class="d-flex" cols="12" sm="6" md="4">
                <v-icon
                  :class="windowSize.width > 600 ? 'ml-5' : 'ml-auto'"
                  color="#000"
                  :size="windowSize.width > 1200 ? 54 : 44"
                  >mdi-map-marker</v-icon
                >
                <p class="mr-auto ml-5 text-center about_p">
                  <span
                    :style="`font-weight:700;font-size: ${
                      windowSize.width > 1200 ? 20 : 18
                    }px`"
                    >Address
                    <span
                      :style="`font-weight:400;font-size: ${
                        windowSize.width > 1200 ? 16 : 14
                      }px`"
                    >
                      <br />
                      인천 중구 율목동</span
                    ></span
                  >
                </p></v-col
              >
              <v-col class="d-flex" cols="12" sm="6" md="4">
                <v-icon
                  :class="windowSize.width > 600 ? 'ml-5' : 'ml-auto'"
                  color="#000"
                  :size="windowSize.width > 1200 ? 54 : 44"
                  >mdi-phone</v-icon
                >
                <p class="mr-auto ml-5 text-center about_p">
                  <span
                    :style="`font-weight:700;font-size: ${
                      windowSize.width > 1200 ? 20 : 18
                    }px`"
                    >Contact Number
                    <span
                      :style="`font-weight:400;font-size: ${
                        windowSize.width > 1200 ? 16 : 14
                      }px`"
                    >
                      <br />
                      010-2231-0237</span
                    ></span
                  >
                </p></v-col
              >
              <v-col class="d-flex" cols="12" sm="6" md="4">
                <v-icon
                  :class="windowSize.width > 600 ? 'ml-5' : 'ml-auto'"
                  color="#000"
                  :size="windowSize.width > 1200 ? 54 : 44"
                  >mdi-email-outline</v-icon
                >
                <p class="mr-auto ml-5 text-center about_p">
                  <span
                    :style="`font-weight:700;font-size: ${
                      windowSize.width > 1200 ? 20 : 18
                    }px`"
                    >Email
                    <span
                      :style="`font-weight:400;font-size: ${
                        windowSize.width > 1200 ? 16 : 14
                      }px`"
                    >
                      <br />
                      khg1405@gmail.com</span
                    ></span
                  >
                </p></v-col
              >
              <v-col class="d-flex" cols="12" sm="6" md="4">
                <v-icon
                  :class="windowSize.width > 600 ? 'ml-5' : 'ml-auto'"
                  color="#000"
                  :size="windowSize.width > 1200 ? 54 : 44"
                  >mdi-pencil-outline</v-icon
                >
                <p class="mr-auto ml-5 text-center about_p">
                  <span
                    :style="`font-weight:700;font-size: ${
                      windowSize.width > 1200 ? 20 : 18
                    }px`"
                    >Education
                    <span
                      :style="`font-weight:400;font-size: ${
                        windowSize.width > 1200 ? 16 : 14
                      }px`"
                    >
                      <br />
                      인하공업전문대
                      <br />(정보통신과)</span
                    ></span
                  >
                </p></v-col
              >
            </v-row>
          </v-col>
        </v-row></v-col
      ></v-row
    >
    <!-- ABOUT ME -->
  </v-container>
</template>

<script>
export default {
  components: {},
  watch: {
    scrollY() {
      console.log(this.scrollY);
    },
  },
  filters: {},
  computed: {
    windowSize() {
      return this.$store.state.windowSize;
    },
    scrollY() {
      return this.$store.state.scrollY;
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
@keyframes blink-effect {
  50% {
    opacity: 0;
  }
}
.blinkEffect {
  animation: blink-effect 1s step-end infinite;
}

@keyframes fadein {
  /* Safari and Chrome */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeinEffect {
  animation: fadein 1s;
  -moz-animation: fadein 1s; /* Firefox */
  -webkit-animation: fadein 1s; /* Safari and Chrome */
  -o-animation: fadein 1s; /* Opera */
}

.fixed-text {
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  text-align: center;
  color: #fff;
}
.about_p {
  line-height: 0.8;
  min-width: 200px;
}
</style>
