<template>
  <v-dialog v-model="dialog" scrollable persistent fullscreen>
    <v-card color="#ffbb00" flat style="border-radius: 0px">
      <v-card-title class="pa-10 pt-15">
        <v-row no-gutters align="center">
          <v-col cols="10">
            <v-text-field
              v-if="onContext"
              light
              color="#000"
              v-model="title"
              :label="'제목 작성'"
              placeholder="제목을 입력하세요(최대 50글자)"
              solo
              flat
              maxlength="50"
              counter
              :readonly="detail ? true : false"
              hide-details
              style="
                font-size: 24px;
                font-weight: 700;
                border-bottom: 3px solid #000;
                border-radius: 0px;
              "
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="d-flex">
            <v-btn class="ml-auto" icon @click="$emit('close')">
              <v-icon size="48" color="#000">mdi-close</v-icon>
            </v-btn></v-col
          >
        </v-row>
      </v-card-title>
      <v-card-text class="py-5 px-10">
        <v-row no-gutters align="start" class="fill-height">
          <v-col ref="textarea_col" cols="12" class="fill-height">
            <v-textarea
              v-if="onContext"
              class="custom-textarea px-0"
              v-model="context"
              :label="'메모 작성'"
              dense
              flat
              solo
              light
              placeholder="내용을 입력하세요..."
              :readonly="detail ? true : false"
              hide-details
              full-width
              :height="contextHeight"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="!detail" class="px-10 pb-10 pt-2">
        <v-btn
          block
          height="100"
          style="font-size: 30px; letter-spacing: 0.3px; color: #fff"
          @click="submit"
        >
          SAVE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "detail"],

  computed: {},
  watch: {
    dialog(val) {
      if (val) {
        setTimeout(() => {
          if (this.$refs.textarea_col) {
            this.contextHeight = this.$refs.textarea_col.clientHeight - 200;
            this.onContext = true;
          } else {
            this.onContext = true;
          }
        }, 200);

        if (this.detail) {
          this.title = this.detail.title;
          const context = this.detail.context;
          this.context = context.replace(/<br\s*\/?>/gi, "\n");
        }
      } else {
        this.title = "";
        this.context = "";
        this.contextHeight = 800;
        this.onContext = false;
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
      title: "",
      context: "",
      onContext: false,
      contextHeight: 800,
    };
  },

  methods: {
    submit() {
      if (!this.detail) {
        this.$store
          .dispatch("api/axios", {
            method: "POST",
            uri: `/memo/insert`,
            params: {
              title: this.title,
              context: this.context,
            },
          })
          .then(() => {
            this.$store.commit("alertThrow", {
              title: "",
              context: "성공적으로 업로드되었습니다.",
            });
            setTimeout(() => {
              this.$emit("close");
            }, 100);
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

.custom-textarea textarea {
  line-height: 3rem; /* 줄 간격 조정 */
  background: linear-gradient(to bottom, transparent 95%, #000 95%, #000 100%);
  background-size: 100% 3rem; /* 줄 간격에 따라 밑줄 간격 설정 */
  background-repeat: repeat-y; /* 세로 방향으로 밑줄 반복 */
  border: none; /* 기본 테두리 제거 */
  outline: none; /* 포커스 시 기본 테두리 제거 */
  resize: none; /* 사용자가 크기를 조정하지 못하도록 설정 */
  font-size: 20px; /* 글꼴 크기 */
}

.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: none;
}

.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot {
  padding: 0 20px 0 0;
}
</style>
