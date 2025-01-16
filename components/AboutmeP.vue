<template>
  <v-dialog v-model="dialog" scrollable persistent fullscreen>
    <v-card v-if="start" color="#f3f2f8" flat style="border-radius: 0px">
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
              color="#33fe33"
              width="90"
              height="90"
              style="border-radius: 20px"
            >
              <v-icon size="60">mdi-information</v-icon>
            </v-btn>
            <p
              class="mb-0 mt-10"
              style="font-size: 30px; letter-spacing: -0.3px; color: #000"
            >
              저를 소개합니다.
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-else color="#f3f2f8" flat style="border-radius: 0px">
      <v-card-title class="pa-10 pt-15">
        <v-btn class="mr-auto" icon @click="$emit('close')">
          <v-icon size="48" color="#000">mdi-chevron-left</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="py-5 px-10">
        <v-row no-gutters align="center">
          <v-col cols="12">
            <v-img
              class="mx-auto"
              width="200"
              height="200"
              cover
              src="/img/profile.png"
              style="border-radius: 50%; border: 1px solid #ededed"
            ></v-img>
          </v-col>
          <v-col
            cols="12"
            class="mt-10 text-center"
            style="color: #000; font-size: 50px; font-weight: 600"
          >
            김 현 근
          </v-col>
          <v-col
            cols="12"
            class="mt-10 text-center"
            style="color: #828282; font-size: 30px"
          >
            #주니어 웹개발자
          </v-col>
          <v-col cols="12" class="mt-10">
            <v-row no-gutters align="center">
              <v-col cols="4" class="pr-4">
                <v-btn
                  color="#fff"
                  style="width: 100%; height: 100px; border-radius: 20px"
                  @click="sendMessage"
                >
                  <p class="mb-0" style="font-size: 25px; color: #007aff">
                    <v-icon color="#007aff" size="50">mdi-chat</v-icon
                    ><br />메세지
                  </p>
                </v-btn>
              </v-col>
              <v-col cols="4" class="px-2">
                <v-btn
                  color="#fff"
                  style="width: 100%; height: 100px; border-radius: 20px"
                  @click="callPhone"
                >
                  <p class="mb-0" style="font-size: 25px; color: #007aff">
                    <v-icon color="#007aff" size="50">mdi-phone</v-icon
                    ><br />전화
                  </p>
                </v-btn></v-col
              >
              <v-col cols="4" class="pl-4">
                <v-btn
                  color="#fff"
                  style="width: 100%; height: 100px; border-radius: 20px"
                  @click="sendEmail"
                >
                  <p class="mb-0" style="font-size: 25px; color: #007aff">
                    <v-icon color="#007aff" size="50">mdi-email</v-icon
                    ><br />이메일
                  </p>
                </v-btn></v-col
              >
            </v-row>
          </v-col>
          <v-col cols="12" class="mt-10">
            <v-card color="#fff" style="border-radius: 20px">
              <v-card-text class="pa-8">
                <v-row no-gutters align="center">
                  <v-col cols="12">
                    <p class="mb-0" style="font-size: 25px; color: #007aff">
                      <span style="color: #000">휴대전화</span
                      ><br /><br />010-2231-0237
                    </p>
                  </v-col>
                  <v-col cols="12" class="py-10">
                    <v-divider color="#ededed"></v-divider>
                  </v-col>
                  <v-col cols="12">
                    <p class="mb-0" style="font-size: 25px; color: #007aff">
                      <span style="color: #000">생년월일</span
                      ><br /><br />98.05.23
                    </p>
                  </v-col>
                  <v-col cols="12" class="py-10">
                    <v-divider color="#ededed"></v-divider>
                  </v-col>
                  <v-col cols="12">
                    <p class="mb-0" style="font-size: 25px; color: #007aff">
                      <span style="color: #000">주소</span
                      ><br /><br />인천광역시 중구 율목동
                    </p>
                  </v-col>
                  <v-col cols="12" class="py-10">
                    <v-divider color="#ededed"></v-divider>
                  </v-col>
                  <v-col cols="12">
                    <p class="mb-0" style="font-size: 25px; color: #007aff">
                      <span style="color: #000">이메일</span
                      ><br /><br />khg1405@gmail.com
                    </p>
                  </v-col>
                  <v-col cols="12" class="py-10">
                    <v-divider color="#ededed"></v-divider>
                  </v-col>
                  <v-col cols="12">
                    <p class="mb-0" style="font-size: 25px; color: #007aff">
                      <span style="color: #000">학력</span
                      ><br /><br />인하공업전문대(정보통신과)
                    </p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
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
      } else {
        setTimeout(() => {
          this.start = false;
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
    };
  },
  methods: {
    sendMessage() {
      window.location.href = "sms:+01022310237?body=안녕하세요!";
    },
    callPhone() {
      window.location.href = "tel:+01022310237";
    },
    sendEmail() {
      window.location.href =
        "mailto:khg1405@gmail.com?subject=문의&body=안녕하세요, 문의드립니다.";
    },
  },
};
</script>

<style lang="css" scoped></style>
