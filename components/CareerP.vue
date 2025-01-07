<template>
  <v-dialog v-model="dialog" scrollable persistent fullscreen>
    <v-card v-if="start" color="#ffffff" flat style="border-radius: 0px">
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
              color="#1ba8f8"
              width="90"
              height="90"
              style="border-radius: 20px"
            >
              <v-icon size="60">mdi-stairs-up</v-icon>
            </v-btn>
            <p class="mb-0 mt-10" style="font-size: 30px; color: #000">
              저의 커리어를 소개합니다.
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-else color="#ffffff" flat style="border-radius: 0px">
      <v-card-title class="pa-10 pt-15">
        <v-btn class="mr-auto" icon @click="$emit('close')">
          <v-icon size="48" color="#000">mdi-chevron-left</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="py-5 px-10"
        ><v-row no-gutters align="center">
          <v-col cols="12" md="3">
            <p
              class="text-center mb-0"
              :style="` color:#000; font-size:${
                windowSize.width > 1200 ? 44 : 34
              }px; font-weight:900; `"
            >
              (주) 위드라이브
            </p>
            <v-card
              class="mx-auto mt-10 mb-10"
              max-width="200"
              flat
              style="border-radius: 50%"
            >
              <v-card-text class="pa-0">
                <v-img
                  src="/img/wedrive.png"
                  style="border-radius: 50%"
                ></v-img>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="9" class="d-flex" style="line-height: 1.5">
            <v-row no-gutters>
              <v-col cols="1" class="fadeinEffect" v-if="runCareer_step1">
                <div class="career-circle"></div>
                <div
                  :style="`height:${carrer_project_height_start}px`"
                  class="dotted-divider"
                ></div>
              </v-col>
              <v-col
                v-if="runCareer_step1"
                cols="11"
                class="text-left pl-5 fadeinEffect"
                style="color: #1ba8f8"
                ><p
                  ref="carrer_project_start"
                  style="font-size: 26px; font-weight: 500"
                >
                  <span style="font-weight: 900">주식회사 위드라이브</span>
                  <br />
                  <span style="font-size: 20px">
                    2021.09 ~ 2024.07 대중교통, 자차 등의 모든 이동이 포인트로
                    쌓이는 앱테크서비스</span
                  >
                </p>
              </v-col>
              <v-col cols="1" class="fadeinEffect" v-if="runCareer_step2">
                <div class="career-circle"></div>
                <div class="dotted-divider"></div>
              </v-col>
              <v-col
                cols="11"
                v-if="runCareer_step2"
                class="fadeinEffect text-left pl-5"
                style="color: #1ba8f8"
                ><span style="font-size: 26px; font-weight: 900">
                  주요업무
                </span>
                <br />
                <v-chip
                  :class="`mr-2 mt-2 ${windowSize.width > 500 ? '' : 'px-1'}`"
                  color="#1ba8f8"
                  :style="`${
                    windowSize.width > 500
                      ? 'font-size:20px;'
                      : 'height:20px !important; font-size:12px'
                  }`"
                  >Front-End</v-chip
                >
                <v-chip
                  :class="`mr-2 mt-2 ${windowSize.width > 500 ? '' : 'px-1'}`"
                  color="#1ba8f8"
                  :style="`${
                    windowSize.width > 500
                      ? 'font-size:20px;'
                      : 'height:20px !important; font-size:12px'
                  }`"
                  >Back-End</v-chip
                >
                <v-chip
                  :class="`mr-2 mt-2 ${windowSize.width > 500 ? '' : 'px-1'}`"
                  color="#1ba8f8"
                  :style="`${
                    windowSize.width > 500
                      ? 'font-size:20px;'
                      : 'height:20px !important; font-size:12px'
                  }`"
                  >DBA</v-chip
                >
              </v-col>
              <v-col cols="1" class="fadeinEffect" v-if="runCareer_step3">
                <div class="career-circle"></div>
                <div class="dotted-divider"></div>
              </v-col>
              <v-col
                cols="11"
                v-if="runCareer_step3"
                class="fadeinEffect text-left pl-5"
                style="color: #1ba8f8"
                ><span style="font-size: 22px; font-weight: 900">
                  업무 내 사용기술
                </span>
                <br />
                <v-chip
                  :class="`mr-2 mt-2 ${windowSize.width > 500 ? '' : 'px-1'}`"
                  color="#1ba8f8"
                  :style="`${
                    windowSize.width > 500
                      ? 'font-size:20px;'
                      : 'height:20px !important; font-size:12px'
                  }`"
                >
                  JavaScript</v-chip
                >
                <v-chip
                  :class="`mr-2 mt-2 ${windowSize.width > 500 ? '' : 'px-1'}`"
                  color="#1ba8f8"
                  :style="`${
                    windowSize.width > 500
                      ? 'font-size:20px;'
                      : 'height:20px !important; font-size:12px'
                  }`"
                >
                  Vus.js
                </v-chip>
                <v-chip
                  :class="`mr-2 mt-2 ${windowSize.width > 500 ? '' : 'px-1'}`"
                  color="#1ba8f8"
                  :style="`${
                    windowSize.width > 500
                      ? 'font-size:20px;'
                      : 'height:20px !important; font-size:12px'
                  }`"
                >
                  Nuxt.js
                </v-chip>
                <v-chip
                  :class="`mr-2 mt-2 ${windowSize.width > 500 ? '' : 'px-1'}`"
                  color="#1ba8f8"
                  :style="`${
                    windowSize.width > 500
                      ? 'font-size:20px;'
                      : 'height:20px !important; font-size:12px'
                  }`"
                >
                  Node.js
                </v-chip>
                <v-chip
                  :class="`mr-2 mt-2 ${windowSize.width > 500 ? '' : 'px-1'}`"
                  color="#1ba8f8"
                  :style="`${
                    windowSize.width > 500
                      ? 'font-size:20px;'
                      : 'height:20px !important; font-size:12px'
                  }`"
                >
                  Mysql
                </v-chip>
                <v-chip
                  :class="`mr-2 mt-2 ${windowSize.width > 500 ? '' : 'px-1'}`"
                  color="#1ba8f8"
                  :style="`${
                    windowSize.width > 500
                      ? 'font-size:20px;'
                      : 'height:20px !important; font-size:12px'
                  }`"
                >
                  AWS
                </v-chip>
              </v-col>
              <v-col cols="1" class="fadeinEffect" v-if="runCareer_step4">
                <div class="career-circle"></div>
                <div
                  class="dotted-divider"
                  :style="`height:${carrer_project_height}px`"
                ></div>
              </v-col>
              <v-col
                cols="11"
                v-if="runCareer_step4"
                class="fadeinEffect text-left pl-5"
                style="color: #1ba8f8"
                ><span
                  style="font-size: 26px; font-weight: 900; margin-bottom: 10px"
                >
                </span>
                <br />
                <span style="font-size: 26px; font-weight: 900">
                  주요 프로젝트 및 성과
                </span>
                <ol class="mt-3" ref="carrer_project">
                  <li style="font-size: 20px; font-weight: 400">
                    <span style="font-size: 22px; font-weight: 700"
                      >쇼핑몰 개발 및 운영</span
                    >
                    <br />
                    Vue.js와 Node.js를 사용, 이니시스 REST API를 이용한 실제
                    결제서비스 구축 사용자 경험(UI)를 반응형 웹으로 구현하여
                    위드라이브 앱 내에서 사용자에게 노출하도록 개발 Mysql을
                    사용하여 데이터베이스 관리 및 설계하고, 효율적인 쿼리
                    작성으로 데이터 검색 속도 개선 협력사에서 배송및 cs관리 할
                    수 있는 관리 시스템 개발 새로운 서비스 출시를 통해 추가 매출
                    창출
                  </li>

                  <li style="font-size: 20px; font-weight: 400">
                    <span style="font-size: 22px; font-weight: 700"
                      >사내 관리 시스템 신규개발</span
                    >
                    <br />
                    JWT를 사용한 인증 시스템 구축으로 보안 강화와 기존 수작업
                    프로세스를 자동화작업 및 vuetify1으로 개발되었던 시스템을
                    vuetify2를 이용하여 한 눈에 찾을 수 있고 개발을 모르는
                    직원에게도 어색하지않도록 개발하여 관리시스템 효율 향상을
                    가져옴
                  </li>
                  <li style="font-size: 20px; font-weight: 400">
                    <span style="font-size: 22px; font-weight: 700"
                      >땡큐캠페인 개발
                    </span>
                    <br />
                    Node.js를 사용, 사용자 위치 데이터를 기반으로 휴게소 및 쉼터
                    연동 API 개발, 반응형 웹으로 구현하여 위드라이브 앱에서
                    캠페인 종료 후, 사용자 데이터 및 교통사고 감소 효과를
                    분석하여 성과 보고서 작성.
                    <br />캠페인 참가자 수: 약 20만 명 달성. 교통사고 감소 효과:
                    졸음운전 사고 건수 15% 감소 (한국도로공사 통계 기반)
                    위드라이브 앱 다운로드 수 30% 증가.
                  </li>
                  <li style="font-size: 20px; font-weight: 400">
                    <span style="font-size: 22px; font-weight: 700"
                      >사용자 이벤트 개발
                    </span>
                    <br />
                    - 친구 맺기 기능 개발 친구 맺기 및 교환 시스템 설계를 위한
                    데이터베이스 스키마 설계.<br />
                    친구 목록, 포인트 교환 내역을 효율적으로 저장 및 관리.
                    대규모 트래픽 처리와 확장성을 고려한 API 설계 및 구현: 친구
                    요청, 수락, 삭제 API. 하트 보내기 및 사용 내역 기록 API.
                    친구 추가 및 교환 활동에 따라 보상을 제공하여 사용자 리텐션
                    향상.
                    <br />- 출석체크 기능 개발 웹뷰 기반 사용자가 출석 기록을
                    직관적으로 확인할 수 있도록 월간 달력 기반의 UI 개발
                    사용자의 출석 기록을 효율적으로 관리하기 위해 MySQL 활용한
                    데이터베이스 설계 및 최적화. 매일 출석 활동에 따른 앱 리텐션
                    상승 <br />- 운전습관 분석 및 연간 리포트 개발 운전 중
                    급가속, 급정거, 제한속도 준수 수집된 데이터를 기반 사용자별
                    점수 산정. 연비, 탄소 배출량 분석을 통해 친환경 운전 습관
                    개선 방안 제안. KAKAO API, Apexcharts.js API 등을 이용하여
                    맵과 그래프로 데이터 시각화 된 UI 개발
                  </li>
                </ol>
              </v-col>
              <v-col cols="1" class="fadeinEffect" v-if="runCareer_step4">
                <div class="career-circle"></div>
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
  props: ["dialog"],
  computed: {},
  watch: {
    dialog(val) {
      if (!val) {
        this.start = true;
        this.carrer_project_height_start = 0;
        this.carrer_project_height = 0;
        this.runCareer_step1 = false;
        this.runCareer_step2 = false;
        this.runCareer_step3 = false;
        this.runCareer_step4 = false;
      } else {
        setTimeout(() => {
          this.start = false;
          setTimeout(() => {
            this.runCareer();
          }, 500);
        }, 1000);
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
      carrer_project_height_start: 0,

      carrer_project_height: 0,

      runCareer_step1: false,
      runCareer_step2: false,
      runCareer_step3: false,
      runCareer_step4: false,
    };
  },
  methods: {
    async runCareer() {
      await this.delay(1000);
      this.runCareer_step1 = true;
      await this.delay(100);
      if (this.$refs.carrer_project_start) {
        this.carrer_project_height_start =
          this.$refs.carrer_project_start.offsetHeight + 30;
      }

      await this.delay(400);
      this.runCareer_step2 = true;
      await this.delay(400);
      this.runCareer_step3 = true;
      await this.delay(400);
      this.runCareer_step4 = true;
      await this.delay(100);
      if (this.$refs.carrer_project) {
        this.carrer_project_height =
          this.$refs.carrer_project.offsetHeight + 100;
      }
    },
    delay(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    },
  },
};
</script>

<style>
.dotted-divider {
  border: dotted #1ba8f8;
  height: 105px;
  width: 1px;
  border-left-width: 0px;
  margin-top: 3px;
  margin-right: 3.5px;
  margin-left: auto;
}
.career-circle {
  width: 10px;
  height: 10px;
  background-color: #1ba8f8;
  color: #fff;
  border-radius: 50%;
  margin-left: auto;
  margin-top: -1px;
}
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
li {
  margin-bottom: 15px;
}
</style>
