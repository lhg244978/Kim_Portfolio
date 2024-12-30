<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="600">
    <v-card color="#fff" flat style="border-radius: 10px">
      <v-card-title>
        <v-btn class="ml-auto" icon @click="$emit('close')">
          <v-icon color="#000">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-5">
        <v-row no-gutters style="color: #000">
          <v-col
            cols="12"
            sm="6"
            :class="windowSize.width > 600 ? 'pr-3' : 'pb-5'"
          >
            <v-select
              label="호선을 선택해주세요."
              v-model="line"
              :items="lines"
              light
              hide-details
              outlined
              item-value="line"
              item-text="line"
              height="46"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            :class="windowSize.width > 600 ? 'pl-3 pb-5' : 'pb-5'"
          >
            <v-select
              label="그룹을 선택해주세요."
              v-model="group"
              :items="groups"
              light
              hide-details
              outlined
              item-value="g_code"
              item-text="name"
              height="46"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-row
              no-gutters
              align="center"
              class="pa-5"
              :style="`overflow: auto; height: ${
                this.station_height > windowSize.height - 400
                  ? windowSize.height - 400
                  : this.station_height
              }px`"
            >
              <v-col
                cols="12"
                v-for="(station, idx) in stations"
                :key="idx"
                style="position: relative"
              >
                <div class="d-flex" style="position: relative">
                  <div
                    class="station-circle"
                    :style="`background-color:${station_color[line]}`"
                  ></div>

                  <v-btn
                    icon
                    v-if="station.downdata"
                    @click="
                      station.downdata.tooltipValue =
                        !station.downdata.tooltipValue
                    "
                    class="down_train"
                  >
                    <v-icon
                      size="16"
                      color="#fff"
                      :style="`background-color:${station_color[line]};border-radius:50%; width:16px; height:16px;`"
                      >mdi-chevron-down</v-icon
                    >
                  </v-btn>

                  <div
                    v-if="station.downdata"
                    class="tooltip-down"
                    :style="`opacity :${
                      station.downdata.tooltipValue == true ? 1 : 0
                    } ;`"
                  >
                    <span>
                      {{ station.downdata.trainNo }}열차
                      {{ station.downdata.statnNm }}
                      {{
                        station.downdata.trainSttus == 0
                          ? "진입"
                          : station.downdata.trainSttus == 1
                          ? "도착"
                          : "출발"
                      }}
                      <br />

                      ({{ station.downdata.statnTnm }}행)
                    </span>
                  </div>

                  <v-btn
                    v-if="station.updata"
                    icon
                    class="up_train"
                    @click="
                      station.updata.tooltipValue = !station.updata.tooltipValue
                    "
                  >
                    <v-icon
                      size="16"
                      color="#fff"
                      :style="`background-color:${station_color[line]};border-radius:50%; width:16px; height:16px;`"
                      >mdi-chevron-up</v-icon
                    >
                  </v-btn>

                  <div
                    v-if="station.updata"
                    class="tooltip-up"
                    :style="`opacity :${
                      station.updata.tooltipValue == true ? 1 : 0
                    } ;`"
                  >
                    <span>
                      {{ station.updata.trainNo }}열차
                      {{ station.updata.statnNm }}
                      {{
                        station.updata.trainSttus == 0
                          ? "진입"
                          : station.updata.trainSttus == 1
                          ? "도착"
                          : "출발"
                      }}
                      <br />

                      ({{ station.updata.statnTnm }}행)</span
                    >
                  </div>
                </div>

                <div class="d-flex" style="position: relative">
                  <div
                    class="station-name"
                    style="position: absolute; top: 0px; color: #000"
                  >
                    {{ station.name }}
                  </div>

                  <v-btn
                    v-if="station.donwlinedata"
                    icon
                    class="line_down_train"
                    @click="
                      station.donwlinedata.tooltipValue =
                        !station.donwlinedata.tooltipValue
                    "
                    style="opacity: "
                  >
                    <v-icon
                      size="16"
                      color="#fff"
                      :style="`background-color:${station_color[line]};border-radius:50%; width:16px; height:16px;`"
                      >mdi-chevron-down</v-icon
                    >
                  </v-btn>
                  <div
                    v-if="station.donwlinedata"
                    class="tooltip-downline"
                    :style="`opacity :${
                      station.donwlinedata.tooltipValue == true ? 1 : 0
                    } ;`"
                  >
                    <span>
                      {{ station.donwlinedata.trainNo }}열차
                      {{ station.donwlinedata.statnNm }}
                      {{
                        station.donwlinedata.trainSttus == 0
                          ? "진입"
                          : station.donwlinedata.trainSttus == 1
                          ? "도착"
                          : "출발"
                      }}
                      <br />

                      ({{ station.donwlinedata.statnTnm }}행)</span
                    >
                  </div>

                  <v-btn
                    v-if="station.uplinedata"
                    icon
                    class="line_up_train"
                    @click="
                      station.uplinedata.tooltipValue =
                        !station.uplinedata.tooltipValue
                    "
                  >
                    <v-icon
                      size="16"
                      color="#fff"
                      :style="`background-color:${station_color[line]};border-radius:50%; width:16px; height:16px;`"
                      >mdi-chevron-up</v-icon
                    ></v-btn
                  >
                  <div
                    v-if="station.uplinedata"
                    class="tooltip-upline"
                    :style="`opacity :${
                      station.uplinedata.tooltipValue == true ? 1 : 0
                    } ;`"
                  >
                    <span>
                      {{ station.uplinedata.trainNo }}열차
                      {{
                        station.uplinedata.trainSttus == 0
                          ? station.name
                          : station.uplinedata.statnNm
                      }}
                      {{
                        station.uplinedata.trainSttus == 0
                          ? "진입"
                          : station.uplinedata.trainSttus == 1
                          ? "도착"
                          : "출발"
                      }}
                      <br />

                      ({{ station.uplinedata.statnTnm }}행)
                    </span>
                  </div>

                  <div
                    v-if="idx != stations.length - 1"
                    class="station-connection"
                    :style="`border-color:${station_color[line]}`"
                  ></div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  comments: {},
  props: ["dialog"],
  computed: {},
  watch: {
    dialog(val) {
      if (!val) {
        this.line = "";
        this.lines = [];
        this.group = "";
        this.groups = [];
        this.stations = [];
      } else {
        this.getLine();
      }
    },
    line(val) {
      if (!val) {
      } else {
        this.group = "";
        this.groups = [];
        this.getGroup();
      }
    },
    group(val) {
      if (!val) {
      } else {
        this.stations = [];
        this.getStation();
      }
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
    windowSizeWidth() {
      return this.$store.state.windowSize.width;
    },
  },
  data() {
    return {
      line: "",
      lines: [],
      group: "",
      groups: [],
      stations: [],
      station_height: 0,
      station_color: {
        "1호선": "#051d86",
        "2호선": "#2fae35",
        "3호선": "#ff6000",
        "4호선": "#1a97dd",
        "5호선": "#822fe1",
        "6호선": "#ae4908",
        "7호선": "#636b10",
        "8호선": "#e6265b",
      },
    };
  },
  methods: {
    getLine() {
      this.$store
        .dispatch("api/axios", {
          method: "GET",
          uri: `/subway/line`,
          params: {},
        })
        .then((data) => {
          var retdata = data;
          if (retdata.length) {
            this.lines = retdata;
          }
        })
        .catch((err) => {
          alert(err.msg);
        });
    },
    getGroup() {
      this.$store
        .dispatch("api/axios", {
          method: "GET",
          uri: `/subway/group`,
          params: {
            line: this.line,
          },
        })
        .then((data) => {
          var retdata = data;
          if (retdata.length) {
            this.groups = retdata;
          }
        })
        .catch((err) => {
          alert(err.msg);
        });
    },
    getStation() {
      if (this.line && this.group) {
        this.station_height = 0;
        this.$store
          .dispatch("api/axios", {
            method: "GET",
            uri: `/subway/station`,
            params: {
              line: this.line,
              group: this.group,
            },
          })
          .then((data) => {
            var retdata = data;
            if (retdata.length) {
              this.stations = retdata;
              this.station_height = this.stations.length * 54;
              this.getTrainInfo();
              setInterval(() => {
                this.getTrainInfo();
              }, 11500);
            }
          })
          .catch((err) => {
            alert(err.msg);
          });
      }
    },
    getTrainInfo() {
      if (this.line && this.stations) {
        this.$store
          .dispatch("api/axios", {
            method: "POST",
            uri: `/subway/info`,
            params: {
              line: this.line,
              detailData: this.stations,
            },
          })
          .then((data) => {
            var retdata = data;
            if (retdata) {
              this.stations = retdata;
            }
          })
          .catch((err) => {
            alert(err.msg);
          });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.station-connection {
  border: solid #2a52be;
  height: 44px;
  width: 1px;
  border-left-width: 0px;
  margin-top: 0px;
  margin-left: auto;
  margin-right: auto;
}
.station-circle {
  width: 10px;
  height: 10px;
  background-color: #2a52be;
  color: #fff;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: -1px;
}
.station-name {
  width: 120px;
  height: 30px;
  background: none;
  color: #000;
  font-weight: 800;
  border-radius: 50%;
  top: 0px;
  left: 125px;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: -5px;
  text-align: left;
  z-index: 5;
}
.line_down_train {
  border-radius: 50%;
  border: 1px solid #000;
  width: 14px;
  height: 14px;
  position: absolute;
  top: 15px;
  margin-left: auto;
  margin-right: auto;
  left: 83px;
  right: 0;

  z-index: 15;
}

.line_up_train {
  border-radius: 50%;
  border: 1px solid #000;
  width: 14px;
  height: 14px;
  position: absolute;
  top: 10px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 83px;

  z-index: 15;
}
.down_train {
  border-radius: 50%;
  border: 1px solid #000;
  width: 14px;
  height: 14px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 83px;
  right: 0;

  z-index: 15;
}
.up_train {
  border-radius: 50%;
  border: 1px solid #000;
  width: 14px;
  height: 14px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 83px;

  z-index: 15;
}

.tooltip-down {
  position: absolute;
  top: -40px; /* 버튼 위에 위치 */
  margin-left: auto;
  margin-right: auto;
  left: 83px;
  right: 0;
  background-color: #2c3e50;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  width: 150px;
  font-size: 13px; /* 기본 글자 크기 */
  line-height: 1; /* 줄 간격 */
  word-wrap: break-word; /* 단어 줄바꿈 */
  white-space: normal; /* 텍스트가 자동으로 줄바꿈되도록 설정 */
  /* 기본적으로 숨김 */
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.tooltip-up {
  position: absolute;
  top: -40px; /* 버튼 위에 위치 */
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 83px;
  background-color: #2c3e50;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  width: 150px;
  font-size: 13px; /* 기본 글자 크기 */
  line-height: 1; /* 줄 간격 */
  word-wrap: break-word; /* 단어 줄바꿈 */
  white-space: normal; /* 텍스트가 자동으로 줄바꿈되도록 설정 */
  /* 기본적으로 숨김 */
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.tooltip-downline {
  position: absolute;
  position: absolute;
  top: -40px; /* 버튼 위에 위치 */
  margin-left: auto;
  margin-right: auto;
  left: 83px;
  right: 0;
  background-color: #2c3e50;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  width: 150px;
  font-size: 13px; /* 기본 글자 크기 */
  line-height: 1; /* 줄 간격 */
  word-wrap: break-word; /* 단어 줄바꿈 */
  white-space: normal; /* 텍스트가 자동으로 줄바꿈되도록 설정 */
  /* 기본적으로 숨김 */
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.tooltip-upline {
  position: absolute;
  top: -40px; /* 버튼 위에 위치 */
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 83px;
  background-color: #2c3e50;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
  width: 150px;
  font-size: 13px; /* 기본 글자 크기 */
  line-height: 1; /* 줄 간격 */
  word-wrap: break-word; /* 단어 줄바꿈 */
  white-space: normal; /* 텍스트가 자동으로 줄바꿈되도록 설정 */
  /* 기본적으로 숨김 */
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}
</style>
