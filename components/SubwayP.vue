<template>
  <v-dialog v-model="dialog" scrollable persistent fullscreen>
    <v-card v-if="start" color="#3ca4ff" flat style="border-radius: 0px">
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
              color="#171f31"
              width="90"
              height="90"
              style="border-radius: 20px"
            >
              <v-icon color="#3ca4ff" size="60">mdi-subway-variant</v-icon>
            </v-btn>
            <p class="mb-0 mt-10" style="font-size: 30px; color: #fff">
              서울시 공공데이터를 이용한 <br />
              <br />
              실시간 지하철노선로 입니다.
              <br />
              <br />
              <span style="font-size: 20px; letter-spacing: -0.24px"
                >(1일 1000건의 횟수 제한으로 interval은 제외되어있습니다.)</span
              >
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-else color="#fff" flat style="border-radius: 0px">
      <v-card-title class="pa-10 pt-15">
        <v-btn class="mr-auto" icon @click="$emit('close')">
          <v-icon size="48" color="#000">mdi-chevron-left</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-10">
        <v-row no-gutters style="color: #000">
          <v-col cols="12" class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  class="no-background-hover"
                  v-bind="attrs"
                  v-on="on"
                  style="font-size: 30px; color: #000; font-weight: 700"
                >
                  {{ line ? line.line : "호선을 선택해주세요" }}
                  <v-icon size="30">mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list light>
                <v-list-item
                  v-for="(item, index) in lines"
                  :key="index"
                  light
                  @click="line = item"
                >
                  <v-list-item-title
                    style="font-size: 22px; letter-spacing: -0.22px"
                    >{{ item.line }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="12" class="py-10">
            <v-chip-group
              v-model="chip"
              active-class="primary--text"
              height="200"
            >
              <v-chip
                v-for="items in groups"
                :key="items.g_code"
                @click="group = items"
                style="
                  height: 50px;
                  font-size: 24px;
                  border-radius: 25px;
                  letter-spacing: -0.24px;
                "
              >
                {{ items.name ? items.name : "-" }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col
            cols="12"
            v-if="line && detailStation"
            class="py-5 mb-10"
            style="border: 1px solid #bfbfbf; border-radius: 8px"
          >
            <v-row
              no-gutters
              align="center"
              style="position: relative; width: 100%; height: 250px"
            >
              <v-col
                cols="10"
                class="mx-auto"
                style="position: absolute; left: 0; right: 0"
              >
                <v-row no-gutters align="center">
                  <v-col
                    cols="12"
                    :style="`height: 50px; background-color:${
                      station_color[line.line]
                    }; border-radius:50px;color:#fff`"
                  >
                    <v-row
                      class="fill-height px-2"
                      no-gutters
                      align="center"
                      style="
                        font-size: 18px;
                        letter-spacing: -0.18px;
                        font-weight: 500;
                      "
                    >
                      <v-icon size="24" color="#fff">mdi-menu-left</v-icon>
                      <span>
                        {{
                          stations[detailStation.idx - 1]
                            ? stations[detailStation.idx - 1].name
                            : "-"
                        }}
                      </span>
                      <v-spacer></v-spacer>
                      <span>{{
                        stations[detailStation.idx + 1]
                          ? stations[detailStation.idx + 1].name
                          : "-"
                      }}</span>
                      <v-icon size="24" color="#fff"
                        >mdi-menu-right</v-icon
                      ></v-row
                    >
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                v-if="detailStation.stationInfo"
                cols="4"
                class="mx-auto"
                style="position: absolute; left: 0; right: 0"
              >
                <v-row no-gutters align="center">
                  <v-col
                    cols="12"
                    :style="`height: 226px; background-color: #fff; border:${
                      station_color[line.line]
                    } 20px solid; border-radius:50%; `"
                  >
                    <v-row
                      class="fill-height"
                      no-gutters
                      align="center"
                      style="
                        width: 100%;
                        font-size: 24px;
                        letter-spacing: -0.24px;
                        font-weight: 700;
                        color: #000;
                      "
                    >
                      <v-spacer></v-spacer>
                      <span>{{ detailStation.stationInfo.name }}</span>
                      <v-spacer></v-spacer>
                    </v-row>
                  </v-col> </v-row
              ></v-col>
            </v-row>
            <v-row no-gutters align="start" class="pa-5">
              <v-col cols="6" class="pr-1">
                <v-card
                  color="#fff"
                  light
                  outlined
                  style="border-color: #bfbfbf"
                >
                  <v-card-title
                    class="text-center"
                    style="
                      font-size: 18px;
                      letter-spacing: -0.56px;
                      font-weight: 700;
                      border-bottom: 1px #bfbfbf solid;
                    "
                  >
                    상행 (내선)
                  </v-card-title>
                  <v-card-text class="pa-0">
                    <v-row no-gutters align="center">
                      <v-col
                        cols="12"
                        v-for="(upitem, idx_up) in detailStation.up"
                        :key="idx_up"
                        class="d-flex px-4 py-4"
                        :style="`font-size: 16px; letter-spacing: -0.56px;${
                          idx_up + 1 == detailStation.up.length
                            ? ''
                            : 'border-bottom: 1px #bfbfbf solid;'
                        }`"
                      >
                        <span style="font-weight: 600">
                          {{ upitem.bstatnNm }}행 {{ upitem.btrainNo }} 열차:
                        </span>
                        <v-spacer></v-spacer> {{ upitem.arvlMsg2 }}
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6" class="pr-1">
                <v-card
                  color="#fff"
                  light
                  outlined
                  style="border-color: #bfbfbf"
                >
                  <v-card-title
                    class="text-center"
                    style="
                      font-size: 18px;
                      letter-spacing: -0.56px;
                      font-weight: 700;
                      border-bottom: 1px #bfbfbf solid;
                    "
                  >
                    하행 (외선)
                  </v-card-title>

                  <v-card-text class="pa-0"
                    ><v-row no-gutters align="center">
                      <v-col
                        cols="12"
                        v-for="(downitem, idx_down) in detailStation.down"
                        :key="idx_down"
                        class="d-flex pa-4"
                        :style="`font-size: 16px; letter-spacing: -0.56px;${
                          idx_down + 1 == detailStation.down.length
                            ? ''
                            : 'border-bottom: 1px #bfbfbf solid;'
                        }`"
                      >
                        <span style="font-weight: 600">
                          {{ downitem.bstatnNm }}행
                          {{ downitem.btrainNo }} 열차:
                        </span>
                        <v-spacer></v-spacer> {{ downitem.arvlMsg2 }}
                      </v-col>
                    </v-row></v-card-text
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" v-if="group">
            <v-row no-gutters align="center">
              <v-col cols="6">
                <v-btn
                  block
                  height="50"
                  :color="updnLine == 0 ? station_color[line.line] : '#fff'"
                  @click="updnLine = 0"
                  :style="`
                    font-size: 24px;
                    letter-spacing: -0.24px;
                    font-weight: 700;
                    border-radius: 0px;
                    border: 1px solid #bfbfbf;
                    box-shadow: none !important;
              color:  ${updnLine == 0 ? '#fff' : '#000'} ;`"
                >
                  상행 (내선)
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  height="50"
                  :color="updnLine == 1 ? station_color[line.line] : '#fff'"
                  @click="updnLine = 1"
                  :style="`
                    font-size: 24px;
                    letter-spacing: -0.24px;
                    font-weight: 700;
                    border-radius: 0px;
                    border: 1px solid #bfbfbf;
                    box-shadow: none !important;
              color: ${updnLine == 1 ? '#fff' : '#000'};`"
                >
                  하행 (외선)
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            v-if="updnLine == 0 || updnLine == 1"
            style="border: 2px #bfbfbf solid"
          >
            <v-row
              no-gutters
              align="center"
              class="pa-5"
              :style="`${
                this.station_height > windowSize.height - 500
                  ? 'overflow: auto; height:' +
                    (windowSize.height - 500) +
                    'px;'
                  : ''
              }`"
            >
              <v-col
                cols="12"
                v-for="(station, idx) in stations"
                :key="idx"
                style="position: relative"
              >
                <div class="d-flex" style="position: relative">
                  <div
                    :style="`background-color:${
                      station_color[line.line]
                    };position: relative; width:25px; height:25px; margin-left:200px;${
                      idx == 0
                        ? 'border-top-left-radius:20px;border-top-right-radius:20px'
                        : idx + 1 == stations.length
                        ? 'border-bottom-left-radius:20px;border-bottom-right-radius:20px'
                        : ''
                    }`"
                  >
                    <div class="station-circle"></div>
                  </div>
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
                      size="25"
                      color="#fff"
                      :style="`background-color:${
                        station_color[line.line]
                      };border-radius:50%; width:35px; height:35px;`"
                      >mdi-subway-variant</v-icon
                    >
                  </v-btn>

                  <div
                    v-if="station.downdata"
                    class="tooltip-down"
                    :style="`opacity :${
                      station.downdata.tooltipValue == true ? 1 : 1
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
                      size="25"
                      color="#fff"
                      :style="`background-color:${
                        station_color[line.line]
                      };border-radius:50%; width:35px; height:35px;`"
                      >mdi-subway-variant</v-icon
                    >
                  </v-btn>

                  <div
                    v-if="station.updata"
                    class="tooltip-up"
                    :style="`opacity :${
                      station.updata.tooltipValue == true ? 1 : 1
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
                    <span @click="getDetailStation(station, idx)">
                      {{ station.name }}</span
                    >
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
                      size="25"
                      color="#fff"
                      :style="`background-color:${
                        station_color[line.line]
                      };border-radius:50%; width:35px; height:35px;`"
                      >mdi-subway-variant
                    </v-icon>
                  </v-btn>
                  <div
                    v-if="station.donwlinedata"
                    class="tooltip-downline"
                    :style="`opacity :${
                      station.donwlinedata.tooltipValue == true ? 1 : 1
                    } ;`"
                  >
                    <span>
                      {{ station.donwlinedata.trainNo }}열차
                      {{
                        station.donwlinedata.trainSttus == 0
                          ? downName(idx)
                          : station.donwlinedata.statnNm
                      }}
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
                      size="25"
                      color="#fff"
                      :style="`background-color:${
                        station_color[line.line]
                      };border-radius:50%; width:35px; height:35px;`"
                      >mdi-subway-variant</v-icon
                    >
                  </v-btn>

                  <div
                    v-if="station.uplinedata"
                    class="tooltip-upline"
                    :style="`opacity :${
                      station.uplinedata.tooltipValue == true ? 1 : 1
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
                    :style="`background-color:${station_color[line.line]}`"
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
        this.start = true;
        this.line = null;
        this.lines = [];
        this.group = null;
        this.updnLine = null;
        this.groups = [];
        this.stations = [];
        this.detailStation = null;
      } else {
        setTimeout(() => {
          this.start = false;
        }, 1000);
      }
    },
    start(val) {
      if (!val) {
        this.getLine();
      }
    },
    line(val) {
      if (!val) {
      } else {
        this.group = null;
        this.groups = [];
        this.stations = [];
        this.updnLine = null;
        this.chip = null;
        this.detailStation = null;
        this.getGroup();
      }
    },
    group(val) {
      if (!val) {
      } else {
        this.stations = [];
        this.updnLine = 0;
        this.detailStation = null;
        this.getStation();
      }
    },
    updnLine(val) {
      if (val == 0 || val == 1) {
        this.stations = [];
        this.detailStation = null;
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
      start: true,
      line: null,
      lines: [],
      chip: null,
      group: null,
      groups: [],
      stations: [],
      updnLine: null,
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
      detailStation: false,
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
          this.$store.commit("alertThrow", {
            title: "",
            context: err.msg,
          });
        });
    },
    getGroup() {
      var line = this.line ? this.line.line : "";
      this.$store
        .dispatch("api/axios", {
          method: "GET",
          uri: `/subway/group`,
          params: {
            line,
          },
        })
        .then((data) => {
          var retdata = data;

          if (retdata.length) {
            this.groups = retdata;
          }
        })
        .catch((err) => {
          this.$store.commit("alertThrow", {
            title: "",
            context: err.msg,
          });
        });
    },
    getStation() {
      if (this.line && this.group) {
        var line = this.line ? this.line.line : "";
        var group = this.group ? this.group.g_code : "";

        this.$store
          .dispatch("api/axios", {
            method: "GET",
            uri: `/subway/station`,
            params: {
              line,
              group,
            },
          })
          .then((data) => {
            var retdata = data;
            if (retdata.length) {
              this.stations = retdata;
              this.station_height = this.stations.length * 115;
              this.getTrainInfo();
              // 실시간 interval
              // setInterval(() => {
              //   this.getTrainInfo();
              // }, 11500);
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
    getTrainInfo() {
      if (this.line && this.stations) {
        this.$store
          .dispatch("api/axios", {
            method: "POST",
            uri: `/subway/info`,
            params: {
              line: this.line,
              detailData: this.stations,
              updnLine: this.updnLine,
            },
          })
          .then((data) => {
            var retdata = data;
            if (retdata) {
              this.stations = retdata;
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
    getDetailStation(station, idx) {
      if (this.line && station) {
        this.$store
          .dispatch("api/axios", {
            method: "POST",
            uri: `/subway/detailStation`,
            params: {
              line: this.line,
              station: station.name,
            },
          })
          .then((data) => {
            var retdata = data;
            if (retdata) {
              this.detailStation = retdata;
              this.detailStation.stationInfo = station;
              this.detailStation.idx = idx;
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
    downName(idx) {
      if (this.stations[idx + 1]) {
        return this.stations[idx + 1].name;
      } else {
        return "-";
      }
    },
  },
};
</script>

<style lang="css" scoped>
.station-connection {
  height: 100px;
  width: 25px;
  border-left-width: 0px;
  margin-top: 0px;
  margin-left: 200px;
  margin-right: auto;
  border-radius: 0px;
  z-index: 10;
}
.station-circle {
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  margin-left: 5px;
  margin-top: auto;
  margin-bottom: auto;
  top: 0;
  bottom: 0;
  z-index: 11;
}
.station-name {
  background: none;
  color: #000;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.24px;
  border-radius: 50%;
  top: 0px;
  left: 250px;
  right: 0;
  margin-left: 0px;
  margin-right: auto;
  margin-top: -27px;
  text-align: left;
  z-index: 5;
}
.line_down_train {
  border-radius: 50%;
  border: 1px solid #000;
  width: 35px;
  height: 35px;
  position: absolute;
  top: 30px;
  left: -5px;
  right: 0;
  margin-top: 0px;
  margin-left: 200px;
  margin-right: auto;
  z-index: 15;
}

.line_up_train {
  border-radius: 50%;
  border: 1px solid #000;
  width: 35px;
  height: 35px;
  position: absolute;
  top: 30px;
  left: -5px;
  right: 0;
  margin-top: 0px;
  margin-left: 200px;
  margin-right: auto;
  z-index: 15;
}
.down_train {
  border-radius: 50%;
  border: 1px solid #000;
  width: 35px;
  height: 35px;
  position: absolute;
  top: -5px;
  left: -5px;
  right: 0;
  margin-top: 0px;
  margin-left: 200px;
  margin-right: auto;

  z-index: 15;
}
.up_train {
  border-radius: 50%;
  border: 1px solid #000;
  width: 35px;
  height: 35px;
  position: absolute;
  top: -5px;
  left: -5px;
  right: 0;
  margin-top: 0px;
  margin-left: 200px;
  margin-right: auto;
  z-index: 15;
}

.tooltip-down {
  position: absolute;
  top: -9px; /* 버튼 위에 위치 */
  margin-left: 0px;
  margin-right: auto;
  left: 30px;
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
  top: -9px; /* 버튼 위에 위치 */
  margin-left: 0px;
  margin-right: auto;
  left: 30px;
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

.tooltip-downline {
  position: absolute;

  top: 30px; /* 버튼 위에 위치 */
  margin-left: 0px;
  margin-right: auto;
  left: 30px;
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
  top: 30px; /* 버튼 위에 위치 */
  margin-left: 0px;
  margin-right: auto;
  left: 30px;
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
</style>
