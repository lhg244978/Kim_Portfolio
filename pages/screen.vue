<template>
  <v-container
    class="pa-0 mx-0 fill-height d-block"
    style="
      background-image: url('../img/iphone_home.png');
      background-color: transparent;
      background-size: cover;
    "
  >
    <div id="cursor" style="z-index: 203"></div>
    <v-row
      :style="`
        max-width: 760px;
        width: 760px;
        min-width: 760px;
 
        color: #000;
        background-image: url('../img/iphone_home.png');
        background-color: #000;
        background-color: transparent;
        background-size: cover;
        position: relative;
      `"
      :class="`fill-height mx-auto ${!lock || !start ? 'pa-0' : 'pa-5'} `"
      no-gutters
      align="center"
      justify="center"
    >
      <v-col
        v-if="black_home"
        cols="12"
        class="fill-height"
        style="background-color: #000"
      >
        <v-row class="fill-height" no-gutters align="center">
          <transition name="fade">
            <v-col class="d-flex" v-if="on" cols="12">
              <v-btn
                class="mx-auto"
                color="#fff"
                width="100"
                height="100"
                style="border-radius: 50%"
                @click="onIphone"
              >
                <v-icon size="48" style="color: red">mdi-power</v-icon>
              </v-btn></v-col
            >
          </transition>
          <transition name="fade">
            <v-col v-if="start" cols="12" class="px-15">
              <v-img
                class="mx-auto mb-10"
                width="300"
                height="300"
                src="/img/kp_icon.png"
                contain
              >
              </v-img>

              <v-progress-linear
                v-if="start"
                color="#fff"
                class="mx-auto"
                style="max-width: 400px; border-radius: 20px"
                :value="start_value"
              ></v-progress-linear>
            </v-col>
          </transition>
        </v-row>
      </v-col>
      <transition name="fade">
        <v-col
          v-if="lock"
          cols="12"
          class="fill-height mx-auto pa-5"
          style="background-color: rgba(255, 255, 255, 0.3)"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseUp"
        >
          <v-row class="fill-height" no-gutters justify="space-between">
            <v-col cols="12" class="pt-10 text-center">
              <p class="aggro mb-0" style="font-size: 26px; font-weight: 400">
                {{ formatDate }}
              </p>
              <p class="aggro mb-0" style="font-size: 120px; font-weight: 700">
                {{ formattedTime }}
              </p>
            </v-col>

            <v-col cols="12" class="mt-auto" style="height: 95px">
              <v-row no-gutters align="center">
                <v-col
                  cols="12"
                  class="text-center mb-10 aggro"
                  style="font-size: 20px"
                >
                  위로 올려주세요.</v-col
                >
                <v-col
                  cols="6"
                  class="text-center mx-auto"
                  style="
                    background-color: #fff;
                    height: 20px;
                    border-radius: 30px;
                  "
                ></v-col> </v-row
            ></v-col>
          </v-row>
        </v-col>
      </transition>
      <v-col
        v-if="home"
        cols="12"
        style="height: 100px; position: absolute; top: 0"
      >
        <v-row class="fill-height pt-15 px-10 aggro" no-gutters align="center">
          <v-col cols="3" class="text-center">
            <span style="color: #fff; font-weight: 700; font-size: 30px">{{
              formattedTime
            }}</span>
          </v-col>
          <v-col
            class="fill-height"
            cols="6"
            style="background-color: #000; border-radius: 40px"
          ></v-col>
          <v-col cols="3" class="d-flex px-0">
            <v-icon class="mx-auto" size="36">mdi-wifi</v-icon>
            <v-icon class="mx-auto" size="36">mdi-network-strength-3</v-icon>

            <v-row
              no-gutters
              align="center"
              justify="center"
              class="fill-height"
              style="
                color: #fff;
                font-weight: 800;
                background-color: #33fe33;
                max-width: 56px;
                height: 36px;
                border: 6px solid #fff;
                border-radius: 10px;
              "
            >
              100
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        v-if="home"
        cols="12"
        :style="`height:${windowSize.height - 260}px; padding-top:100px`"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @mouseleave="onMouseUp"
      >
        <v-row no-gutters class="pa-6">
          <v-col
            cols="3"
            class="text-center mb-4 pa-1"
            v-for="(item, idx) in homeApp"
            v-if="searchMenu(item)"
            :key="idx"
          >
            <v-btn
              class="mb-2"
              width="110"
              height="110"
              :color="item.btn_color"
              style="border-radius: 20px"
              :id="item.name"
              @click="dialogIn(item.dialog)"
              @contextmenu.prevent.stop="homeRightClick"
            >
              <v-icon :color="item.icon_color" :id="item.name" size="90"
                >mdi-{{ item.icon }}</v-icon
              >
            </v-btn>

            <p
              class="ma-0"
              style="font-size: 18px; color: #fff; font-weight: 500"
            >
              {{ item.name }}
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        v-if="home"
        class="pb-5"
        cols="12"
        style="height: 170px"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @mouseleave="onMouseUp"
      >
        <v-row no-gutters class="fill-height" style="" align="center">
          <v-col
            cols="10"
            class="fill-height mx-auto"
            style="
              background-color: rgba(255, 255, 255, 0.3);

              border-radius: 70px;
            "
          >
            <v-row no-gutters align="center" class="fill-height">
              <v-col
                cols="3"
                v-for="(item, idx2) in homeBottomApp"
                :key="idx2"
                class="pa-4 text-center"
              >
                <v-btn
                  width="100"
                  height="100"
                  :color="item.btn_color"
                  style="border-radius: 20px"
                  :id="item.name"
                  @click="dialogIn(item.dialog)"
                  @contextmenu.prevent.stop="detailRightClick"
                >
                  <v-icon :color="item.icon_color" size="90"
                    >mdi-{{ item.icon }}</v-icon
                  >
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" v-if="home">
        <v-bottom-sheet fullscreen v-model="detail" persistent>
          <v-sheet
            class="d-flex flex-column justify-center align-center"
            :style="`max-width: 760px; height: ${windowSize.height}px; margin: 0 auto;  background-color: rgba(255, 255, 255, 0.5);  backdrop-filter: blur(10px);-webkit-backdrop-filter: blur(10px);`"
          >
            <v-row
              no-gutters
              class="fill-height pa-10"
              style="width: 100%"
              @touchstart="onTouchStart"
              @touchmove="onTouchMove"
              @mousedown="onMouseDown"
              @mousemove="onMouseMove"
              @mouseup="onMouseUp"
              @mouseleave="onMouseUp"
            >
              <v-col cols="12" :style="`height: ${100}px;`">
                <v-text-field
                  outlined
                  hide-details
                  class="centered-input"
                  style="
                    border-radius: 20px;
                    background-color: rgba(0, 0, 0, 0.5);
                    font-size: 26px;
                  "
                  label="111"
                  height="74"
                  color="#fff"
                  single-line
                  v-model="search"
                  ><template v-slot:label>
                    <v-row
                      no-gutters
                      class="mt-2"
                      align="center"
                      style="font-size: 26px"
                    >
                      <span>
                        <v-icon
                          style="color: rgba(255, 255, 255, 0.7)"
                          size="34"
                        >
                          mdi-magnify
                        </v-icon>
                        앱 라이브러리
                      </span>
                    </v-row>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" :style="`height: ${windowSize.height - 100}px;`">
                <v-row no-gutters align="center">
                  <v-col
                    cols="3"
                    class="text-center pa-1 mb-2"
                    v-for="(item, idx) in detailApp"
                    v-if="searchMenu(item)"
                    :key="idx"
                  >
                    <v-btn
                      class="mb-2"
                      width="110"
                      height="110"
                      :color="item.btn_color"
                      style="border-radius: 20px"
                      :id="item.name"
                      @click="dialogIn(item.dialog)"
                      @contextmenu.prevent="detailRightClick"
                    >
                      <v-icon :color="item.icon_color" size="90"
                        >mdi-{{ item.icon }}</v-icon
                      >
                    </v-btn>

                    <p
                      class="ma-0"
                      style="font-size: 18px; color: #000; font-weight: 500"
                    >
                      {{ item.name }}
                    </p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet></v-bottom-sheet
        >
      </v-col>
    </v-row>
    <AboutmeP :dialog="ap" @close="ap = false"></AboutmeP>
    <SkillsP :dialog="sk" @close="sk = false"></SkillsP>
    <CareerP :dialog="ca" @close="ca = false"></CareerP>
    <NoteP :dialog="nop" @close="nop = false"></NoteP>
    <CoupangReviewP :dialog="cr" @close="cr = false"></CoupangReviewP>
    <SubwayP :dialog="sb" @close="sb = false"></SubwayP>
    <WeatherP :dialog="wt" @close="wt = false"></WeatherP>
    <ButtonAlert
      :dialog="buttonAlert"
      :app="buttonApp"
      :type="buttonAlertType"
      @removeApp="removeApp"
      @deleteFromHome="deleteFromHome"
      @moveToHome="moveToHome"
      @close="buttonAlert = false"
    ></ButtonAlert>
  </v-container>
</template>

<script>
import CoupangReviewP from "@/components/CoupangReviewP";
import AboutmeP from "@/components/AboutmeP";
import CareerP from "@/components/CareerP";
import SkillsP from "@/components/SkillsP";
import NoteP from "@/components/NoteP";
import SubwayP from "@/components/SubwayP";
import WeatherP from "@/components/WeatherP";

import ButtonAlert from "@/components/ButtonAlert";
export default {
  layout: "phone",
  comments: {
    CoupangReviewP: CoupangReviewP,
    SubwayP: SubwayP,
    AboutmeP: AboutmeP,
    CareerP: CareerP,
    SkillsP: SkillsP,
    WeatherP: WeatherP,
    NoteP: NoteP,

    ButtonAlert: ButtonAlert,
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
    formatDate() {
      const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", options).format(this.currentTime);
    },
    formattedTime() {
      const hours = this.currentTime.getHours();
      const minutes = this.currentTime.getMinutes();
      return `${hours} : ${minutes < 10 ? "0" : ""}${minutes}`;
    },
  },
  watch: {
    async start_value(val) {
      if (val >= 100) {
        await this.delay(500);
        clearInterval(this.onInterval);
        this.onInterval = null;
        this.start = false;
        this.black_home = false;
        this.lock = true;
        await this.delay(1000);

        this.start_value = 0;
      }
    },
    async lock(val) {
      if (!val) {
        await this.delay(500);
        this.home = true;
      }
    },
    buttonAlert(val) {
      if (!val) {
        this.buttonApp = null;
        this.buttonAlertType = "";
      }
    },
  },
  data() {
    return {
      black_home: true,
      on: true,
      start: false,
      lock: false,
      home: false,
      detail: false,

      // Tester
      // black_home: false,
      // on: false,
      // start: false,
      // lock: false,
      // home: true,
      // detail: false,

      buttonAlert: false,
      buttonApp: null,
      buttonAlertType: "",

      start_value: 0,
      currentTime: new Date(),
      onInterval: null,
      search: "",
      cr: false,
      sk: false,
      ca: false,
      nop: false,
      sb: false,
      ap: false,
      wt: false,

      homeApp: [
        {
          name: "쿠팡리뷰",
          icon: "language-c",
          icon_color: "#fff",
          btn_color: "#db3123",
          img: "",
          dialog: "cr",
        },
        {
          name: "실시간 지하철",
          icon: "subway-variant",
          icon_color: "#3ca4ff",
          btn_color: "#171f31",
          img: "",
          dialog: "sb",
        },
        {
          name: "날씨",
          icon: "white-balance-sunny",
          icon_color: "#ffe168",
          btn_color: "#3570ab",
          img: "",
          dialog: "wt",
        },
      ],
      homeBottomApp: [
        {
          name: "소개",
          icon: "information",
          icon_color: "#fff",
          btn_color: "#33fe33",
          img: "",
          dialog: "ap",
        },
        {
          name: "스킬",
          icon: "head-cog",
          icon_color: "#000",
          btn_color: "#d7d9da",
          img: "",
          dialog: "sk",
        },
        {
          name: "커리어",
          icon: "stairs-up",
          icon_color: "#fff",
          btn_color: "#1ba8f8",
          img: "",
          dialog: "ca",
        },
        {
          name: "메모",
          icon: "note-edit-outline",
          icon_color: "#000",
          btn_color: "#ffe536",
          img: "",
          dialog: "nop",
        },
      ],
      detailApp: [
        {
          name: "소개",
          icon: "information",
          icon_color: "#fff",
          btn_color: "#33fe33",
          img: "",
          dialog: "ap",
        },
        {
          name: "스킬",
          icon: "head-cog",
          icon_color: "#000",
          btn_color: "#d7d9da",
          img: "",
          dialog: "sk",
        },
        {
          name: "커리어",
          icon: "stairs-up",
          icon_color: "#fff",
          btn_color: "#1ba8f8",
          img: "",
          dialog: "ca",
        },
        {
          name: "메모",
          icon: "note-edit-outline",
          icon_color: "#000",
          btn_color: "#ffe536",
          img: "",
          dialog: "nop",
        },
        {
          name: "쿠팡리뷰",
          icon: "language-c",
          icon_color: "#fff",
          btn_color: "#db3123",
          img: "",
          dialog: "cr",
        },
        {
          name: "실시간 지하철",
          icon: "subway-variant",
          icon_color: "#3ca4ff",
          btn_color: "#171f31",
          img: "",
          dialog: "sb",
        },
        {
          name: "날씨",
          icon: "white-balance-sunny",
          icon_color: "#ffe168",
          btn_color: "#3570ab",
          img: "",
          dialog: "wt",
        },
      ],

      selectIcon: null,

      isTouch: false, // 터치 여부
      isDragging: false, // 드래그 상태
      isClicking: false, // 클릭 상태 여부
      startX: 0, // 시작 X 좌표
      startY: 0, // 시작 Y 좌표
      deltaThreshold: 10, // 드래그로 인식할 최소 이동량 (픽셀)
    };
  },
  mounted() {
    this.updateTime();
    const cursor = document.getElementById("cursor");

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.pageX}px`;
      cursor.style.top = `${e.pageY}px`;
    });

    document.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    });

    document.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });

    setInterval(() => {
      this.updateTime();
    }, 1000); // 1초마다 시간 업데이트
  },
  methods: {
    updateTime() {
      this.currentTime = new Date();
    },
    async onIphone() {
      this.on = false;
      await this.delay(1000);
      this.start = true;
      this.onInterval = setInterval(() => {
        this.start_value = this.start_value + 2;
      }, 100);
    },

    delay(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    },

    onTouchStart(event) {
      this.startInteraction(event);
    },

    // 마우스 시작 (mousedown)
    onMouseDown(event) {
      this.startInteraction(event);
    },

    // 공통으로 터치나 마우스의 시작 처리
    startInteraction(event) {
      this.isClicking = true; // 클릭 상태로 설정
      this.isDragging = false; // 드래그 상태 초기화

      const touch = event.touches ? event.touches[0] : event;
      this.startX = touch.pageX;
      this.startY = touch.pageY;
    },

    // 터치 이동 (touchmove)
    onTouchMove(event) {
      if (this.isDragging) {
        this.move(event); // 드래그 상태일 때만 이동
      } else {
        this.detectDrag(event); // 드래그 시작 판단
      }
    },

    // 마우스 이동 (mousemove)
    onMouseMove(event) {
      if (this.isDragging && this.isClicking) {
        this.move(event); // 드래그 상태일 때만 이동
      } else {
        this.detectDrag(event); // 드래그 시작 판단
      }
    },

    // 드래그 시작 판단
    detectDrag(event) {
      const touch = event.touches ? event.touches[0] : event;
      const deltaX = touch.pageX - this.startX;
      const deltaY = touch.pageY - this.startY;

      // 일정 이동량 이상이면 드래그로 인식
      if (
        Math.abs(deltaX) > this.deltaThreshold ||
        Math.abs(deltaY) > this.deltaThreshold
      ) {
        this.isDragging = true; // 드래그 상태로 변경
      }
    },

    // 드래그 종료
    onMouseUp() {
      this.endDrag();
    },

    onTouchEnd() {
      this.endDrag();
    },

    // 마우스 나감 (mouseleave)
    onMouseLeave() {
      this.endDrag();
    },

    // 드래그 종료 처리
    endDrag() {
      this.isDragging = false; // 드래그 상태 종료
      this.isClicking = false; // 클릭 상태 해제
    },

    // 공통으로 터치나 마우스의 이동 처리
    move(event) {
      const touch = !this.isTouch
        ? event
        : event.touches
        ? event.touches[0]
        : null;

      if (touch) {
        const deltaX =
          (touch.pageX ? touch.pageX : touch.targetTouches[0].pageX) -
          this.startX;
        const deltaY =
          (touch.pageY ? touch.pageY : touch.targetTouches[0].pageY) -
          this.startY;

        // 수직 이동 감지 (위로 올리기 또는 아래로 내리기)
        if (Math.abs(deltaY) > 50) {
          if (deltaY < 0) {
            // 위로 올리기
            if (this.lock) {
              this.lock = false; // 잠금 해제
            } else if (this.home && !this.detail) {
              this.detail = true; // 디테일 열기
            }
          } else if (deltaY > 0) {
            // 아래로 내리기

            this.detail = false; // 디테일 닫기
          }
        }
      }
    },
    dialogIn(dialog) {
      this[dialog] = true;
    },
    searchMenu(menu) {
      if (this.search != "") {
        if (menu.name.indexOf(this.search) == -1) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    homeRightClick(event) {
      var appId = event.target.id;
      if (appId != "") {
        var app = null;
        for (var idx in this.detailApp) {
          if (this.detailApp[idx].name == appId) {
            app = this.detailApp[idx];
          }
        }
        if (app) {
          this.buttonApp = app;
          this.buttonAlertType = "home";
          this.buttonAlert = true;
        } else {
          this.$store.commit("alertThrow", {
            title: "",
            context: "앱을 찾을 수 없습니다.",
          });
        }
      } else {
        this.$store.commit("alertThrow", {
          title: "",
          context: "앱을 찾을 수 없습니다.",
        });
      }
    },
    detailRightClick(event) {
      var appId = event.target.id;
      if (appId != "") {
        var app = null;
        for (var idx in this.detailApp) {
          if (this.detailApp[idx].name == appId) {
            app = this.detailApp[idx];
          }
        }
        if (app) {
          this.buttonApp = app;
          this.buttonAlertType = "applibrary";
          this.buttonAlert = true;
        } else {
          this.$store.commit("alertThrow", {
            title: "",
            context: "앱을 찾을 수 없습니다.",
          });
        }
      } else {
        this.$store.commit("alertThrow", {
          title: "",
          context: "앱을 찾을 수 없습니다.",
        });
      }
    },
    moveToHome() {
      var name = this.buttonApp.name;
      var copy = true;
      if (this.homeApp.length) {
        for (var idx in this.homeApp) {
          if (this.homeApp[idx].name == name) {
            copy = false;
            break;
          }
        }
        if (copy) {
          this.homeApp.push(this.buttonApp);
          this.buttonAlert = false;
          this.detail = false;
        } else {
          this.buttonAlert = false;
          this.$store.commit("alertThrow", {
            title: "",
            context: "홈에 같은 앱이 존재합니다.",
          });
        }
      } else {
        this.homeApp.push(this.buttonApp);
        this.buttonAlert = false;
        this.detail = false;
      }
    },
    deleteFromHome() {
      var name = this.buttonApp.name;
      var home_idx = -1;
      for (var idx in this.homeApp) {
        if (this.homeApp[idx].name == name) {
          home_idx = idx;
          break;
        }
      }
      if (home_idx >= 0) {
        this.homeApp.splice(home_idx, 1);
      }
      this.buttonAlert = false;
    },
    removeApp() {
      var name = this.buttonApp.name;
      var home_idx = -1;
      var home_b_idx = -1;
      var detail_idx = -1;
      for (var idx in this.homeApp) {
        if (this.homeApp[idx].name == name) {
          home_idx = idx;
          break;
        }
      }
      for (var idx in this.detailApp) {
        if (this.detailApp[idx].name == name) {
          detail_idx = idx;
          break;
        }
      }
      for (var idx in this.homeBottomApp) {
        if (this.homeBottomApp[idx].name == name) {
          home_b_idx = idx;
          break;
        }
      }
      if (home_idx >= 0) {
        this.homeApp.splice(home_idx, 1);
      }
      if (detail_idx >= 0) {
        this.detailApp.splice(detail_idx, 1);
      }
      if (home_b_idx >= 0) {
        this.homeBottomApp.splice(home_b_idx, 1);
      }
      this.buttonAlert = false;
    },
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 의 대체 */ {
  opacity: 0;
}

#cursor {
  width: 40px; /* 원의 크기 */
  height: 40px;
  border: 2px solid gray; /* 원의 색상 */
  border-radius: 50%; /* 원 형태 */
  position: absolute;
  pointer-events: none; /* 클릭 방지 */
  transform: translate(-50%, -50%); /* 마우스 중심 맞추기 */
  transition: transform 0.1s ease-out; /* 부드러운 움직임 */
}
.v-text-field.centered-input .v-label {
  left: 50% !important;
  height: 100%;
  transform: translateX(-50%);
  & .v-label--active {
    transform: translateY(-18px) scale(0.75) translateX(-50%);
  }
}

html,
body {
  overflow: hidden; /* 스크롤 비활성화 및 스크롤 바 제거 */
}
.v-dialog {
  box-shadow: none !important;
}
i {
  pointer-events: none;
}
.v-btn__content {
  pointer-events: none;
}
</style>
