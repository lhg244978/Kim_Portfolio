<template>
  <v-dialog v-model="dialog" scrollable persistent fullscreen>
    <v-card v-if="start" color="#526273" flat style="border-radius: 10px">
      <v-card-title class="pa-10 pt-15">
        <v-btn class="mr-auto" icon @click="$emit('close')">
          <v-icon size="48" color="#fff">mdi-chevron-left</v-icon>
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
              color="#d7d9da"
              width="90"
              height="90"
              style="border-radius: 20px"
            >
              <v-icon size="60">mdi-head-cog</v-icon>
            </v-btn>
            <p class="mb-0 mt-10" style="font-size: 30px; color: #fff">
              제가 사용가능한 기술입니다.
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-else color="#526273" flat style="border-radius: 10px">
      <v-card-title class="pa-10 pt-15">
        <v-btn class="mr-auto" icon @click="$emit('close')">
          <v-icon size="48" color="#fff">mdi-chevron-left</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="py-5 px-10">
        <v-row id="skills" no-gutters aling="center" justify="center">
          <v-col
            :class="`text-center d-flex ${
              windowSize.width > 760 ? 'pa-15' : 'pa-5'
            }`"
            :style="`max-width:100%; min-width:100%;
       `"
          >
            <v-row no-gutters align="center">
              <v-col
                cols="12"
                :style="`color:#fff;font-size:${
                  windowSize.width > 760 ? 34 : 24
                }px; font-weight:900;`"
              >
                <v-row no-gutters align="center" justify="center">
                  <v-col
                    cols="12"
                    v-if="develope_shake"
                    class="text-center"
                    style="color: #fff; font-size: 14px; font-weight: 600"
                  >
                    클릭하면 아이콘이 도망가요~
                  </v-col>
                  <v-btn
                    class="ml-auto"
                    @click="develope_shake = !develope_shake"
                    >{{ develope_shake ? "STOP" : "SHAKE" }}</v-btn
                  >
                </v-row>
                <v-row
                  :class="windowSize.width > 600 ? 'mt-15' : 'mt-5'"
                  no-gutters
                  align="center"
                  justify="center"
                  :style="`color:#fff;font-size:${
                    windowSize.width > 760 ? 34 : 28
                  }px; font-weight:700; position: relative; height: 400px`"
                >
                  <v-col class="d-flex" cols="12">
                    <v-row no-gutters align="center">
                      <v-col cols="12" class="py-8"> Language</v-col>
                      <v-col cols="12">
                        <v-row no-gutters align="center" justify="center">
                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/JavaScript.svg"
                            ref="js"
                          ></v-img>

                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/sql.png"
                            ref="sql"
                          ></v-img
                        ></v-row> </v-col
                    ></v-row>
                  </v-col>
                  <v-col class="d-flex" cols="12">
                    <v-row no-gutters align="center">
                      <v-col cols="12" class="py-8"> Frontend</v-col>
                      <v-col cols="12">
                        <v-row no-gutters align="center" justify="center">
                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/HTML.svg"
                            ref="html"
                          ></v-img>
                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/CSS.svg"
                            ref="css"
                          ></v-img>
                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/JQuery.svg"
                            ref="jq"
                          ></v-img>
                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/Vue.svg"
                            ref="vue"
                          ></v-img>
                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/NuxtJS-Dark.svg"
                            ref="nuxt"
                          ></v-img> </v-row
                      ></v-col>
                    </v-row>
                  </v-col>
                  <v-col class="d-flex" cols="12">
                    <v-row no-gutters align="center">
                      <v-col cols="12" class="py-8"> Backend </v-col>
                      <v-col cols="12">
                        <v-row no-gutters align="center" justify="center">
                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/NodeJS-Dark.svg"
                            ref="node"
                          ></v-img>
                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/MySQL-Dark.svg"
                            ref="mysql"
                          ></v-img>
                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/Firebase-Dark.svg"
                            ref="firebase"
                          ></v-img>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col class="d-flex" cols="12">
                    <v-row no-gutters align="center">
                      <v-col cols="12" class="py-8"> DevOps </v-col>
                      <v-col cols="12">
                        <v-row no-gutters align="center" justify="center">
                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/AWS-Dark.svg"
                            ref="aws"
                          ></v-img>
                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/Github-Dark.svg"
                            ref="git"
                          ></v-img>
                          <v-img
                            contain
                            class="develope-icon"
                            :width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :height="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            :max-width="
                              windowSize.width >= 760
                                ? 80
                                : windowSize.width > 500
                                ? 50
                                : 30
                            "
                            src="/Develope_Skill_Icon/Linux-Dark.svg"
                            ref="linux"
                          ></v-img>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col> </v-row></v-col
        ></v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog"],
  computed: {},
  watch: {
    dialog(val) {
      if (!val) {
        this.start = true;
        this.develope_shake = false;
      } else {
        setTimeout(() => {
          this.start = false;
        }, 760);
      }
    },
    start(val) {
      if (!val) {
        // 초기 위치 설정
        setTimeout(() => {
          if (this.dialog) {
            for (var idx in this.develope_icon_id) {
              const img_ref = this.$refs[this.develope_icon_id[idx]].$el;
              img_ref.style.left = "50%";
              img_ref.style.top = "50%";
              img_ref.style.transform = "translate(-50%, -50%)";
            }
            setTimeout(() => {
              this.develope_shake = true;
            }, 800);
          }
        }, 1000);
      }
    },
    develope_shake(val) {
      if (val) {
        if (this.dialog) {
          for (var idx in this.develope_icon_id) {
            const img_ref = this.$refs[this.develope_icon_id[idx]].$el;

            img_ref.style.left = "50%";
            img_ref.style.top = "50%";
            img_ref.style.transform = "translate(-50%, -50%)";
            img_ref.style.position = "absolute";
          }
          this.randomIcon();
          document.addEventListener("click", this.shakeIcon);
        }
      } else {
        // 랜덤 아이콘 인터벌 초기화
        this.randomIcon();
        // 마우스 근처로 진입시 멀어지는 이벤트 초기화
        document.removeEventListener("click", this.shakeIcon);
        if (this.dialog) {
          for (var idx in this.develope_icon_id) {
            const img_ref = this.$refs[this.develope_icon_id[idx]].$el;

            img_ref.style.position = "relative";
            img_ref.style.transform = "translate(-0%, -0%)";
            img_ref.style.left = ``;
            img_ref.style.top = ``;
            img_ref.style.marginLeft = `10px`;
            img_ref.style.marginTop = `10px`;
          }
        }
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
      develope_shake: false,
      develope_icon_id: [
        "js",
        "sql",
        "html",
        "css",
        "jq",
        "vue",
        "nuxt",
        "node",
        "mysql",
        "firebase",
        "aws",
        "git",
        "linux",
      ],
      randomIcon_interval: [],
    };
  },
  methods: {
    randomIcon() {
      if (this.develope_shake && this.dialog) {
        for (var idx in this.develope_icon_id) {
          const img_ref = this.$refs[this.develope_icon_id[idx]].$el;
          const max_div_width =
            this.windowSizeWidth > 760
              ? this.windowSizeWidth - (this.windowSizeWidth - 760) / 2
              : this.windowSizeWidth;

          const maxX = max_div_width - img_ref.offsetWidth * 2;
          const maxY = 600;

          // 배열로 저장 후 clearinterval시 사용
          this.randomIcon_interval.push(
            setInterval(() => {
              const randomX = Math.random() * maxX;
              const randomY = Math.random() * maxY;
              const randomRotation = Math.random() * 360;
              // 수시로 랜덤하게 위치 변경
              img_ref.style.left = `${randomX}px`;
              img_ref.style.top = `${randomY}px`;
              img_ref.style.transform = `translate(-50%, -50%) rotate(${randomRotation}deg)`;
            }, 3000)
          );
        }
      } else {
        if (this.randomIcon_interval.length) {
          //배열에 저장되어 있는 각각 이미지의 인터벌 제거
          for (var idx in this.randomIcon_interval) {
            clearInterval(this.randomIcon_interval[idx]);
          }
          this.randomIcon_interval = [];
        }
      }
    },
    shakeIcon(e) {
      if (this.develope_shake && this.dialog) {
        for (var idx in this.develope_icon_id) {
          const img_ref = this.$refs[this.develope_icon_id[idx]].$el;

          const moveimgRect = img_ref.getBoundingClientRect();
          let threshold = 150;

          const imgX = moveimgRect.left + moveimgRect.width / 2;
          const imgY = moveimgRect.top + moveimgRect.height / 2;

          const distanceX = e.clientX - imgX;
          const distanceY = e.clientY - imgY;
          const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
          if (distance < threshold) {
            const angle = Math.atan2(distanceY, distanceX);
            const moveX = -Math.cos(angle) * (threshold - distance);
            const moveY = -Math.sin(angle) * (threshold - distance);

            const newLeft = img_ref.offsetLeft + moveX;
            const newTop = img_ref.offsetTop + moveY;

            // 화면 경계를 벗어나지 않도록 제한
            const max_div_width =
              this.windowSizeWidth > 760
                ? this.windowSizeWidth - (this.windowSizeWidth - 760) / 2
                : this.windowSizeWidth;

            const maxX = (max_div_width - moveimgRect.width) * 0.9;
            const maxY = 600;
            img_ref.style.left = `${Math.min(Math.max(newLeft, 0), maxX)}px`;
            img_ref.style.top = `${Math.min(Math.max(newTop, 0), maxY)}px`;
          }
        }
      }
    },
  },
};
</script>

<style>
.develope-icon {
  position: absolute;
  transition: transform 0.5s, left 0.5s, top 0.5s;
}
</style>
