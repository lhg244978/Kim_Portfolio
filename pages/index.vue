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
          v-if="scrollInterval"
          class="fixed-scroll-text fadeinEffect"
          :style="`width: 100%;${
            scrollY > windowSize.height * 1.3
              ? 'position: absolute;  top:' + windowSize.height * 1.1 + 'px;'
              : ''
          }`"
        >
          <v-icon color="#fff">mdi-mouse-scroll-wheel</v-icon> 스크롤을
          내려주세요.
        </div>
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
            계속해서 버전업 중인 개발자를
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
            소개합니다.
          </span>
        </div>
      </v-col>
      <v-col cols="12">
        <v-img
          class="mb-5 mx-auto"
          max-width="50"
          src="/img/down_arrow.svg"
        ></v-img>
      </v-col>
    </v-row>
    <!-- HERO -->
    <!-- ABOUT ME -->
    <v-row
      id="about_me"
      no-gutters
      aling="center"
      justify="center"
      style="background-color: #e1e6e8"
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
              <v-col class="d-flex mb-5" cols="12" sm="6" md="4">
                <v-icon
                  :class="windowSize.width > 600 ? 'ml-5' : 'ml-auto'"
                  color="#000"
                  :size="windowSize.width > 1200 ? 54 : 44"
                  >mdi-account</v-icon
                >
                <p class="mr-auto ml-5 text-center about-p">
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
              <v-col class="d-flex mb-5" cols="12" sm="6" md="4">
                <v-icon
                  :class="windowSize.width > 600 ? 'ml-5' : 'ml-auto'"
                  color="#000"
                  :size="windowSize.width > 1200 ? 54 : 44"
                  >mdi-calendar-blank</v-icon
                >
                <p class="mr-auto ml-5 text-center about-p">
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
              <v-col class="d-flex mb-5" cols="12" sm="6" md="4">
                <v-icon
                  :class="windowSize.width > 600 ? 'ml-5' : 'ml-auto'"
                  color="#000"
                  :size="windowSize.width > 1200 ? 54 : 44"
                  >mdi-map-marker</v-icon
                >
                <p class="mr-auto ml-5 text-center about-p">
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
              <v-col class="d-flex mb-5" cols="12" sm="6" md="4">
                <v-icon
                  :class="windowSize.width > 600 ? 'ml-5' : 'ml-auto'"
                  color="#000"
                  :size="windowSize.width > 1200 ? 54 : 44"
                  >mdi-phone</v-icon
                >
                <p class="mr-auto ml-5 text-center about-p">
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
              <v-col class="d-flex mb-5" cols="12" sm="6" md="4">
                <v-icon
                  :class="windowSize.width > 600 ? 'ml-5' : 'ml-auto'"
                  color="#000"
                  :size="windowSize.width > 1200 ? 54 : 44"
                  >mdi-email-outline</v-icon
                >
                <p class="mr-auto ml-5 text-center about-p">
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
              <v-col class="d-flex mb-5" cols="12" sm="6" md="4">
                <v-icon
                  :class="windowSize.width > 600 ? 'ml-5' : 'ml-auto'"
                  color="#000"
                  :size="windowSize.width > 1200 ? 54 : 44"
                  >mdi-pencil-outline</v-icon
                >
                <p class="mr-auto ml-5 text-center about-p">
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
    <!-- SKILLS  -->
    <v-row
      id="skills"
      no-gutters
      aling="center"
      justify="center"
      style="background-color: #2a52be"
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
            :style="`color:#fff;font-size:${
              windowSize.width > 1200 ? 34 : 24
            }px; font-weight:900;`"
          >
            <v-row no-gutters align="center" justify="center">
              <v-icon
                class="mr-2 ml-auto"
                color="#fff"
                :size="windowSize.width > 1200 ? 54 : 44"
                >mdi-link-variant</v-icon
              ><span
                :style="`font-size: ${windowSize.width > 1200 ? 44 : 34}px`"
                >SKILLS</span
              >

              <v-btn
                class="ml-auto ml-5"
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
                windowSize.width > 1200 ? 34 : 28
              }px; font-weight:700; position: relative; height: 400px`"
            >
              <v-col class="d-flex" cols="12">
                <v-row no-gutters align="center">
                  Language
                  <v-img
                    contain
                    class="develope-icon"
                    :width="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
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
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    src="/Develope_Skill_Icon/sql.png"
                    ref="sql"
                  ></v-img
                ></v-row>
              </v-col>
              <v-col class="d-flex" cols="12">
                <v-row no-gutters align="center"
                  >Frontend
                  <v-img
                    contain
                    class="develope-icon"
                    :width="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
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
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
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
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
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
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
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
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    src="/Develope_Skill_Icon/NuxtJS-Dark.svg"
                    ref="nuxt"
                  ></v-img
                ></v-row>
              </v-col>
              <v-col class="d-flex" cols="12">
                <v-row no-gutters align="center">
                  Backend
                  <v-img
                    contain
                    class="develope-icon"
                    :width="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
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
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
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
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
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
              <v-col class="d-flex" cols="12">
                <v-row no-gutters align="center">
                  DevOps
                  <v-img
                    contain
                    class="develope-icon"
                    :width="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
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
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
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
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :height="
                      windowSize.width > 1000
                        ? 80
                        : windowSize.width > 500
                        ? 50
                        : 30
                    "
                    :max-width="
                      windowSize.width > 1000
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
            <v-col
              cols="12"
              v-if="develope_shake"
              class="text-center mt-5"
              style="color: #fff; font-size: 14px; font-weight: 600"
            >
              클릭하면 아이콘이 도망가요~
            </v-col>
          </v-col>
        </v-row></v-col
      ></v-row
    >
    <!-- SKILLS  -->
    <!-- CAREER  -->
    <v-row
      id="career"
      ref="career_here"
      no-gutters
      aling="center"
      justify="center"
      style="background-color: #e1e6e8"
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
            class="mb-10"
            :style="` color:#000;font-size:${
              windowSize.width > 1200 ? 34 : 24
            }px; font-weight:900; `"
          >
            <v-icon
              class="mr-2"
              color="#000"
              :size="windowSize.width > 1200 ? 54 : 44"
              >mdi-link-variant</v-icon
            ><span :style="`font-size: ${windowSize.width > 1200 ? 44 : 34}px`">
              CAREER</span
            ></v-col
          >
          <v-col cols="12">
            <v-row no-gutters align="center">
              <v-col
                cols="12"
                md="3"
                :style="` color:#2a52be; font-size:${
                  windowSize.width > 1200 ? 34 : 24
                }px; font-weight:900; `"
              >
                <span>(주) 위드라이브</span>
                <v-card
                  class="mx-auto mt-5 mb-10"
                  max-width="100"
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
              <v-col cols="12" md="9" class="d-flex">
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
                    style="color: #2a52be"
                    ><p
                      ref="carrer_project_start"
                      style="font-size: 16px; font-weight: 500"
                    >
                      <span style="font-size: 16px; font-weight: 900"
                        >주식회사 위드라이브</span
                      >
                      <br />
                      2021.09 ~ 2024.07 대중교통, 자차 등의 모든 이동이 포인트로
                      쌓이는 앱테크서비스
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
                    style="color: #2a52be"
                    ><span style="font-size: 16px; font-weight: 900">
                      주요업무
                    </span>
                    <br />
                    <v-chip
                      :class="`mr-2 mt-2 ${
                        windowSize.width > 500 ? '' : 'px-1'
                      }`"
                      color="#2a52be"
                      :style="`${
                        windowSize.width > 500
                          ? ''
                          : 'height:20px !important; font-size:12px'
                      }`"
                      >Front-End</v-chip
                    >
                    <v-chip
                      :class="`mr-2 mt-2 ${
                        windowSize.width > 500 ? '' : 'px-1'
                      }`"
                      color="#2a52be"
                      :style="`${
                        windowSize.width > 500
                          ? ''
                          : 'height:20px !important; font-size:12px'
                      }`"
                      >Back-End</v-chip
                    >
                    <v-chip
                      :class="`mr-2 mt-2 ${
                        windowSize.width > 500 ? '' : 'px-1'
                      }`"
                      color="#2a52be"
                      :style="`${
                        windowSize.width > 500
                          ? ''
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
                    style="color: #2a52be"
                    ><span style="font-size: 16px; font-weight: 900">
                      업무 내 사용기술
                    </span>
                    <br />
                    <v-chip
                      :class="`mr-2 mt-2 ${
                        windowSize.width > 500 ? '' : 'px-1'
                      }`"
                      color="#2a52be"
                      :style="`${
                        windowSize.width > 500
                          ? ''
                          : 'height:20px !important; font-size:12px'
                      }`"
                    >
                      JavaScript</v-chip
                    >
                    <v-chip
                      :class="`mr-2 mt-2 ${
                        windowSize.width > 500 ? '' : 'px-1'
                      }`"
                      color="#2a52be"
                      :style="`${
                        windowSize.width > 500
                          ? ''
                          : 'height:20px !important; font-size:12px'
                      }`"
                    >
                      Vus.js
                    </v-chip>
                    <v-chip
                      :class="`mr-2 mt-2 ${
                        windowSize.width > 500 ? '' : 'px-1'
                      }`"
                      color="#2a52be"
                      :style="`${
                        windowSize.width > 500
                          ? ''
                          : 'height:20px !important; font-size:12px'
                      }`"
                    >
                      Nuxt.js
                    </v-chip>
                    <v-chip
                      :class="`mr-2 mt-2 ${
                        windowSize.width > 500 ? '' : 'px-1'
                      }`"
                      color="#2a52be"
                      :style="`${
                        windowSize.width > 500
                          ? ''
                          : 'height:20px !important; font-size:12px'
                      }`"
                    >
                      Node.js
                    </v-chip>
                    <v-chip
                      :class="`mr-2 mt-2 ${
                        windowSize.width > 500 ? '' : 'px-1'
                      }`"
                      color="#2a52be"
                      :style="`${
                        windowSize.width > 500
                          ? ''
                          : 'height:20px !important; font-size:12px'
                      }`"
                    >
                      Mysql
                    </v-chip>
                    <v-chip
                      :class="`mr-2 mt-2 ${
                        windowSize.width > 500 ? '' : 'px-1'
                      }`"
                      color="#2a52be"
                      :style="`${
                        windowSize.width > 500
                          ? ''
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
                    style="color: #2a52be"
                    ><span
                      style="
                        font-size: 16px;
                        font-weight: 900;
                        margin-bottom: 10px;
                      "
                    >
                    </span>
                    <br />
                    <span style="font-size: 16px; font-weight: 900">
                      주요 프로젝트 및 성과
                    </span>
                    <ol class="mt-3" ref="carrer_project">
                      <li style="font-size: 14px; font-weight: 400">
                        <span style="font-size: 14px; font-weight: 700"
                          >쇼핑몰 개발 및 운영</span
                        >
                        <br />
                        Vue.js와 Node.js를 사용, 이니시스 REST API를 이용한 실제
                        결제서비스 구축 사용자 경험(UI)를 반응형 웹으로 구현하여
                        위드라이브 앱 내에서 사용자에게 노출하도록 개발 Mysql을
                        사용하여 데이터베이스 관리 및 설계하고, 효율적인 쿼리
                        작성으로 데이터 검색 속도 개선 협력사에서 배송및 cs관리
                        할 수 있는 관리 시스템 개발 새로운 서비스 출시를 통해
                        추가 매출 창출
                      </li>

                      <li style="font-size: 14px; font-weight: 400">
                        <span style="font-size: 14px; font-weight: 700"
                          >사내 관리 시스템 신규개발</span
                        >
                        <br />
                        JWT를 사용한 인증 시스템 구축으로 보안 강화와 기존
                        수작업 프로세스를 자동화작업 및 vuetify1으로 개발되었던
                        시스템을 vuetify2를 이용하여 한 눈에 찾을 수 있고 개발을
                        모르는 직원에게도 어색하지않도록 개발하여 관리시스템
                        효율 향상을 가져옴
                      </li>
                      <li style="font-size: 14px; font-weight: 400">
                        <span style="font-size: 14px; font-weight: 700"
                          >땡큐캠페인 개발
                        </span>
                        <br />
                        Node.js를 사용, 사용자 위치 데이터를 기반으로 휴게소 및
                        쉼터 연동 API 개발, 반응형 웹으로 구현하여 위드라이브
                        앱에서 캠페인 종료 후, 사용자 데이터 및 교통사고 감소
                        효과를 분석하여 성과 보고서 작성.
                        <br />캠페인 참가자 수: 약 20만 명 달성. 교통사고 감소
                        효과: 졸음운전 사고 건수 15% 감소 (한국도로공사 통계
                        기반) 위드라이브 앱 다운로드 수 30% 증가.
                      </li>
                      <li style="font-size: 14px; font-weight: 400">
                        <span style="font-size: 14px; font-weight: 700"
                          >사용자 이벤트 개발
                        </span>
                        <br />
                        - 친구 맺기 기능 개발 친구 맺기 및 교환 시스템 설계를
                        위한 데이터베이스 스키마 설계.<br />
                        친구 목록, 포인트 교환 내역을 효율적으로 저장 및 관리.
                        대규모 트래픽 처리와 확장성을 고려한 API 설계 및 구현:
                        친구 요청, 수락, 삭제 API. 하트 보내기 및 사용 내역 기록
                        API. 친구 추가 및 교환 활동에 따라 보상을 제공하여
                        사용자 리텐션 향상.
                        <br />- 출석체크 기능 개발 웹뷰 기반 사용자가 출석
                        기록을 직관적으로 확인할 수 있도록 월간 달력 기반의 UI
                        개발 사용자의 출석 기록을 효율적으로 관리하기 위해 MySQL
                        활용한 데이터베이스 설계 및 최적화. 매일 출석 활동에
                        따른 앱 리텐션 상승 <br />- 운전습관 분석 및 연간 리포트
                        개발 운전 중 급가속, 급정거, 제한속도 준수 수집된
                        데이터를 기반 사용자별 점수 산정. 연비, 탄소 배출량
                        분석을 통해 친환경 운전 습관 개선 방안 제안. KAKAO API,
                        Apexcharts.js API 등을 이용하여 맵과 그래프로 데이터
                        시각화 된 UI 개발
                      </li>
                    </ol>
                  </v-col>
                  <v-col cols="1" class="fadeinEffect" v-if="runCareer_step4">
                    <div class="career-circle"></div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col></v-col>
    </v-row>
    <!-- CAREER  -->
    <!-- PROJECT  -->
    <v-row
      id="project"
      no-gutters
      aling="center"
      justify="center"
      style="background-color: #2a52be"
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
            :style="` color:#fff;font-size:${
              windowSize.width > 1200 ? 34 : 24
            }px; font-weight:900; `"
          >
            <v-icon
              class="mr-2"
              color="#fff"
              :size="windowSize.width > 1200 ? 54 : 44"
              >mdi-link-variant</v-icon
            ><span :style="`font-size: ${windowSize.width > 1200 ? 44 : 34}px`"
              >PROJECT</span
            ></v-col
          >
          <v-col cols="12" class="mt-10">
            <p style="font-size: 18px">TOY PROJECT</p>
          </v-col>
          <v-col cols="12" class="mt-5">
            <v-row no-gutters>
              <v-slide-group
                :style="`width: ${
                  windowSize.width > 216 * toyProject.length + 100
                    ? 216 * toyProject.length + 100
                    : windowSize.width - 50
                }px;`"
                :show-arrows="
                  isMobile ? (windowSize.width > 500 ? true : false) : true
                "
              >
                <v-slide-item v-for="(project_t, idx) in toyProject" :key="idx">
                  <v-row no-gutters align="start">
                    <v-card
                      flat
                      color="#2a52be"
                      class="ma-2 no-background-hover"
                      :ripple="false"
                      width="200"
                      height="200"
                      @mouseenter="onHoverProject(project_t.cover_id)"
                      @mouseleave="onLeaveProject(project_t.cover_id)"
                      @click="openDialog(project_t.dialog)"
                    >
                      <v-card-text class="pa-0">
                        <v-row no-gutters style="cursor: pointer">
                          <v-col
                            cols="12"
                            style="height: 170px; position: relative"
                          >
                            <v-img
                              src="/img/folder.png"
                              width="150"
                              height="160"
                              style="
                                position: absolute;
                                top: 20px;
                                left: 0;
                                z-index: 5;
                              "
                            ></v-img>
                            <v-img
                              class="folder_file"
                              :ref="`${project_t.cover_id}`"
                              :src="`/img/${project_t.cover}.png`"
                              width="130"
                              style="
                                position: absolute;
                                top: 10;
                                left: 50px;
                                transform: rotate(30deg);
                                transform-origin: center;
                                z-index: 4;
                              "
                            ></v-img>
                          </v-col>
                          <v-col
                            cols="12"
                            style="color: yellow; font-weight: 700"
                          >
                            {{ project_t.name }}</v-col
                          >
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-row>
                </v-slide-item>
              </v-slide-group>
            </v-row>
          </v-col>
        </v-row>
      </v-col></v-row
    >
    <!-- PROJECT  -->
    <CoupangReview :dialog="cr" @close="cr = false"></CoupangReview>
  </v-container>
</template>

<script>
import CoupangReview from "@/components/CoupangReview";

export default {
  comments: {
    CoupangReview: CoupangReview,
  },
  components: {},
  watch: {
    windowSizeWidth(val) {
      //
      this.develope_shake = true;
      this.develope_shake = false;
      if (this.runCareer_step1) {
        if (this.carrer_project_height_start) {
          if (this.$refs.carrer_project_start) {
            this.carrer_project_height_start =
              this.$refs.carrer_project_start.offsetHeight + 30;
          }
        }
      }

      if (this.runCareer_step4) {
        if (this.carrer_project_height) {
          if (this.$refs.carrer_project) {
            this.carrer_project_height =
              this.$refs.carrer_project.offsetHeight + 60;
          }
        }
      }
    },
    develope_shake(val) {
      if (val) {
        for (var idx in this.develope_icon_id) {
          const img_ref = this.$refs[this.develope_icon_id[idx]].$el;

          img_ref.style.left = "50%";
          img_ref.style.top = "50%";
          img_ref.style.transform = "translate(-50%, -50%)";
          img_ref.style.position = "absolute";
        }
        this.randomIcon();
        document.addEventListener("click", this.shakeIcon);
      } else {
        // 랜덤 아이콘 인터벌 초기화
        this.randomIcon();
        // 마우스 근처로 진입시 멀어지는 이벤트 초기화
        document.removeEventListener("click", this.shakeIcon);
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
    },
    scrollY(val) {
      if (
        this.$refs.career_here.getBoundingClientRect().top -
          this.windowSize.height <
        -100
      ) {
        this.runCareer();
      }
    },
    cr(val) {
      if (val) {
      } else {
      }
    },
    none_dialog(val) {
      if (val) {
      } else {
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
      interval: null,
      randomIcon_interval: [],
      scrollInterval: false,
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
      stepnum: 1,
      carrer_project_height_start: 0,

      carrer_project_height: 0,

      runCareer_step1: false,
      runCareer_step2: false,
      runCareer_step3: false,
      runCareer_step4: false,
      slide: "",
      cr: false,
      isMobile: false,
      toyProject: [
        {
          name: "쿠팡 리뷰 가져오기",
          cover: "cd_2",
          cover_id: "toyproject_1",
          dialog: "cr",
        },
        {
          name: "개발 중",
          cover: "cd_1",
          cover_id: "toyproject_2",
          dialog: "none_dialog",
        },
        {
          name: "개발 중",
          cover: "cd_1",
          cover_id: "toyproject_3",
          dialog: "none_dialog",
        },
      ],
      none_dialog: false,
    };
  },
  mounted() {
    // 모바일 확인
    var ua = navigator.userAgent.toLowerCase();

    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      this.isMobile = true;
    } else if (navigator.userAgent.toLowerCase().indexOf("mac os") > -1) {
      if (ua.includes("macintosh")) {
        this.isMobile = false;
        this.userAgent = "MacBook";
      } else if (ua.includes("iphone")) {
        this.isMobile = true;
      } else if (ua.includes("ipad")) {
        this.isMobile = true;
      }
    } else {
      this.isMobile = false;
    }

    // 초기 위치 설정
    for (var idx in this.develope_icon_id) {
      const img_ref = this.$refs[this.develope_icon_id[idx]].$el;
      img_ref.style.left = "50%";
      img_ref.style.top = "50%";
      img_ref.style.transform = "translate(-50%, -50%)";
    }

    setTimeout(() => {
      this.develope_shake = true;
    }, 1000);

    this.interval = setInterval(() => {
      this.scrollInterval = !this.scrollInterval;
    }, 800);
  },
  methods: {
    randomIcon() {
      if (this.develope_shake) {
        for (var idx in this.develope_icon_id) {
          const img_ref = this.$refs[this.develope_icon_id[idx]].$el;
          const max_div_width =
            window.innerWidth > 1500
              ? window.innerWidth - 1500 / 2 - 100
              : window.innerWidth;

          const maxX = max_div_width - img_ref.offsetWidth * 2;
          const maxY = 350;

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
      if (this.develope_shake) {
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
              window.innerWidth > 1500
                ? window.innerWidth - 1500 / 2 - 100
                : window.innerWidth;

            const maxX = (max_div_width - moveimgRect.width) * 0.9;
            const maxY = 350;
            img_ref.style.left = `${Math.min(Math.max(newLeft, 0), maxX)}px`;
            img_ref.style.top = `${Math.min(Math.max(newTop, 0), maxY)}px`;
          }
        }
      }
    },
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
          this.$refs.carrer_project.offsetHeight + 50;
      }
    },
    delay(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    },
    onHoverProject(cover_id) {
      var cover_el =
        this.$refs[cover_id].length == 1 ? this.$refs[cover_id][0].$el : null;
      if (cover_el) {
        cover_el.style.top = "-10px";
        cover_el.style.marginLeft = "30px";
      }
    },
    onLeaveProject(cover_id) {
      var cover_el =
        this.$refs[cover_id].length == 1 ? this.$refs[cover_id][0].$el : null;
      if (cover_el) {
        cover_el.style.top = "10px";
        cover_el.style.marginLeft = "0px";
      }
    },
    openDialog(dialog_name) {
      this[dialog_name] = true;
    },
  },
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
.fixed-scroll-text {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  text-align: center;
  color: #fff;
}
.about-p {
  line-height: 0.8;
  min-width: 200px;
}

.develope-icon {
  position: absolute;
  transition: transform 0.5s, left 0.5s, top 0.5s;
}
.dotted-divider {
  border: dotted #2a52be;
  height: 85px;
  width: 1px;
  border-left-width: 0px;
  margin-top: 3px;
  margin-right: 3.5px;
  margin-left: auto;
}
.career-circle {
  width: 10px;
  height: 10px;
  background-color: #2a52be;
  color: #fff;
  border-radius: 50%;
  margin-left: auto;
  margin-top: -1px;
}
.folder_file {
  transition: top 0.3s ease-in-out, margin-left 0.3s ease-in-out !important;
}
</style>
