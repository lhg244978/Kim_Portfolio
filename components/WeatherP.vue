<template>
  <v-dialog v-model="dialog" scrollable persistent fullscreen>
    <v-card v-if="start" color="#e4f6fe" flat style="border-radius: 0px">
      <v-card-title class="pa-10 pt-15">
        <v-btn class="mr-auto" icon @click="$emit('close')">
          <v-icon size="48" color="#000">mdi-chevron-left</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-10">
        <v-row
          class="fill-height"
          no-gutters
          align="center"
          style="width: 100%"
        >
          <v-col cols="12" class="text-center">
            <v-btn
              :ripple="false"
              class="no-background-hover"
              readonly
              color="#3570ab"
              width="90"
              height="90"
              style="border-radius: 20px"
            >
              <v-icon color="#ffe168" size="60">mdi-white-balance-sunny</v-icon>
            </v-btn>
            <p
              class="mb-0 mt-10"
              style="font-size: 30px; letter-spacing: -0.3px; color: #000"
            >
              네이버에서 제공하는 날씨 데이터를 크롤링하여<br />
              실시간으로 기상 정보를 제공합니다.
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-else color="#1e3250" flat style="border-radius: 0px">
      <v-card-title class="pa-10 pt-15">
        <v-btn class="mr-auto" icon @click="$emit('close')">
          <v-icon size="48" color="#fff">mdi-chevron-left</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pt-5 px-10 pb-10">
        <v-row no-gutters align="center">
          <v-col cols="12">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  class="no-background-hover px-0"
                  v-bind="attrs"
                  v-on="on"
                  style="
                    font-size: 24px;
                    letter-spacing: -0.24px;
                    color: #fff;
                    font-weight: 700;
                  "
                >
                  {{ region }}
                  <v-icon size="30">mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list light style="height: 400px; overflow: auto">
                <v-list-item
                  v-for="(item, index) in regions"
                  :key="index"
                  light
                  @click="region = item"
                >
                  <v-list-item-title
                    style="font-size: 20px; letter-spacing: -0.2px"
                    >{{ item }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="12" v-if="today_weather" class="mt-10">
            <v-row no-gutters align="center">
              <v-col cols="6">
                <p style="font-size: 100px; letter-spacing: -1px; color: #fff">
                  {{ today_weather.temperature }}°
                </p>
                <p
                  class="mb-7"
                  style="font-size: 30px; letter-spacing: -0.3px; color: #fff"
                >
                  {{ today_weather.status }}
                </p>
                <p
                  class="mb-2"
                  style="font-size: 24px; letter-spacing: -0.24px; color: #fff"
                >
                  {{ today_weather.wind_direction }} /
                  {{ today_weather.wind_speed }}
                </p>
                <p
                  class="mb-2"
                  style="font-size: 24px; letter-spacing: -0.24px; color: #fff"
                >
                  체감온도 {{ today_weather.feeling_temperature }}° / 습도
                  {{ today_weather.humidity }}%
                </p>
                <p
                  class="mb-0"
                  style="font-size: 24px; letter-spacing: -0.24px; color: #fff"
                >
                  어제보다 {{ today_weather.yesterdayDifference }}
                </p>
              </v-col>
              <v-col cols="6">
                <p
                  class="text-right"
                  style="font-size: 18px; letter-spacing: -0.18px; color: #fff"
                >
                  {{ today_weather.uptdate | formattedDate }} 기준
                </p>
                <v-img contain :src="`/img/weather/${today_weather.img}`">
                </v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row no-gutters align="center">
              <v-col cols="12" v-for="(item, idx) in week_weather" :key="idx">
                <v-card
                  class="pa-0 mt-5"
                  color="rgba(255,255,255,0.1)"
                  style="border-radius: 20px; box-shadow: none"
                >
                  <v-card-text class="py-5 px-8">
                    <v-row no-gutters align="center">
                      <v-col cols="3">
                        <p
                          class="mb-0"
                          style="
                            font-size: 24px;
                            letter-spacing: -0.24px;
                            color: #fff;
                          "
                        >
                          {{ item.date }}({{ item.day }})
                        </p>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="3">
                        <v-row no-gutters align="center">
                          <v-col cols="6" class="text-center">
                            <v-img
                              class="mx-auto"
                              contain
                              max-width="50"
                              :src="`/img/weather/${item.morning_img}`"
                            >
                            </v-img>
                            <p
                              class="mb-0"
                              style="
                                font-size: 14px;
                                letter-spacing: -0.14px;
                                color: #ededed;
                              "
                            >
                              {{ item.morning_rainfall }}
                            </p>
                          </v-col>
                          <v-col cols="6" class="text-center">
                            <v-img
                              class="mx-auto"
                              contain
                              max-width="50"
                              :src="`/img/weather/${item.afternoon_img}`"
                            >
                            </v-img>
                            <p
                              class="mb-0"
                              style="
                                font-size: 14px;
                                letter-spacing: -0.14px;
                                color: #eeeeee;
                              "
                            >
                              {{ item.afternoon_rainfall }}
                            </p>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="2">
                        <p
                          class="mb-0 text-right"
                          style="
                            font-size: 24px;
                            letter-spacing: -0.24px;
                            color: #fff;
                          "
                        >
                          {{ item.temperature_lowest }}°/{{
                            item.temperature_highest
                          }}°
                        </p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
const moment = require("moment");
moment.locale("ko");
export default {
  props: ["dialog"],
  computed: {},
  watch: {
    dialog(val) {
      if (!val) {
        this.start = true;
        this.region = "";
        this.today_weather = null;
        this.week_weather = [];
      } else {
        setTimeout(() => {
          this.start = false;
        }, 1000);
      }
    },
    start(val) {
      if (!val) {
        this.region = "서울";
      }
    },
    region(val) {
      if (val) {
        this.getWeather();
      }
    },
  },
  filters: {
    formattedDate(date) {
      if (date) {
        var daycode = moment(date).day();
        var dayname = "";
        switch (daycode) {
          case 0:
            dayname = "일";
            break;
          case 1:
            dayname = "월";
            break;
          case 2:
            dayname = "화";
            break;
          case 3:
            dayname = "수";
            break;
          case 4:
            dayname = "목";
            break;
          case 5:
            dayname = "금";
            break;
          case 6:
            dayname = "토";
            break;
        }

        return moment(date).format("YYYY.MM.DD HH:mm " + dayname);
      } else {
        return "-";
      }
    },
  },
  computed: {
    windowSize() {
      return this.$store.state.windowSize;
    },
    scrollY() {
      return this.$store.state.scrollY;
    },
    windowSizeWidth() {
      return this.$store.state.windowSize.width;
    },
  },
  data() {
    return {
      start: true,
      region: "",
      regions: [
        "인천",
        "서울",
        "춘천",
        "강릉",
        "수원",
        "청주",
        "울릉도",
        "독도",
        "안동",
        "포항",
        "전주",
        "대전",
        "대구",
        "목포",
        "광주",
        "여수",
        "부산",
        "울산",
        "제주",
      ],
      today_weather: null,
      week_weather: [],
    };
  },
  methods: {
    delay(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    },
    getWeather() {
      if (this.region) {
        this.today_weather = null;
        this.week_weather = [];
        this.$store
          .dispatch("api/axios", {
            method: "GET",
            uri: `/weather`,
            params: {
              region: this.region,
            },
          })
          .then((data) => {
            var retdata = data;
            if (retdata) {
              this.today_weather = retdata.today_weather;
              this.week_weather = retdata.week_weather;
            }
          })
          .catch((err) => {
            this.$store.commit("alertThrow", {
              title: "",
              context: err.msg,
            });
          });
      }
    },
  },
};
</script>

<style>
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

p {
  line-height: normal;
}
span {
  line-height: normal;
}
</style>
