<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="1000">
    <v-card color="#fff" flat style="border-radius: 10px">
      <v-card-title>
        <v-btn class="ml-auto" icon @click="$emit('close')">
          <v-icon color="#000">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-5">
        <v-row no-gutters style="color: #000">
          <v-col cols="12" style="border: 1px red solid; border-radius: 8px">
            <v-img
              src="/img/ex_coupang.png"
              :max-width="windowSize.width - 90"
              contain
              style="border-radius: 8px"
            >
            </v-img>
          </v-col>
          <v-col cols="12" class="text-center" style="margin-top: 15px">
            <span style="font-size: 16px; color: #000; font-weight: 700">
              리뷰를 불러올 쿠팡 URL을 입력해주세요.
            </span>
          </v-col>

          <v-col cols="12" class="text-center" style="margin-top: 15px">
            <v-form @submit.prevent.stop="getReview">
              <v-text-field
                class="url-text-field"
                style="border: 1px #e0e0e0 solid; color: #000"
                v-model="url"
                outlined
                append-icon="mdi-subdirectory-arrow-left"
                @click:append="getReview"
                hide-details
              ></v-text-field>
            </v-form>
          </v-col>

          <v-col
            cols="12"
            v-if="detailData.length"
            class="d-flex"
            style="margin-top: 30px"
          >
            <v-row no-gutters align="center">
              <v-btn
                @click="updatePage(-1)"
                :disabled="page <= 1 ? true : false"
                class="ml-auto"
                icon
              >
                <v-icon color="#000">mdi-menu-left</v-icon></v-btn
              >
              {{ page }}
              <v-btn @click="updatePage(1)" icon :disabled="!next">
                <v-icon color="#000">mdi-menu-right</v-icon>
              </v-btn></v-row
            >
          </v-col>
          <v-col
            v-for="(data, idx) in detailData"
            :key="idx"
            cols="12"
            style="margin-top: 20px"
          >
            <v-row
              no-gutters
              align="center"
              class="pb-3"
              :style="`color: #000; ${
                detailData.length == idx + 1
                  ? ''
                  : 'border-bottom: 1px #e0e0e0 solid;'
              } `"
            >
              <v-col cols="12">
                <span style="font-size: 14px; font-weight: 500">{{
                  data.nickname
                }}</span>
              </v-col>
              <v-col cols="12" class="d-flex" style="align-content: center">
                <v-rating
                  v-model="data.ratingAverage"
                  background-color="black lighten-3"
                  color="yellow"
                  readonly
                  size="16"
                ></v-rating>
                <span
                  class="ml-2"
                  style="font-size: 12px; font-weight: 400l; margin-top: 2px"
                  >{{ data.reviewAt }}</span
                >
              </v-col>
              <v-col cols="12">
                <span style="color: gray; font-size: 12px; font-weight: 400">{{
                  data.itemName
                }}</span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <span style="font-size: 14px; font-weight: 400">{{
                  data.title || "제목없음"
                }}</span>
              </v-col>
              <v-col cols="12" class="mt-2">
                <v-slide-group light :show-arrows="true">
                  <v-slide-item v-for="(img, idx2) in data.imgs" :key="idx2">
                    <v-img
                      :src="img"
                      contain
                      class="px-2"
                      width="100"
                    ></v-img> </v-slide-item
                ></v-slide-group>
              </v-col>
              <v-col cols="12" class="mt-3">
                <span style="font-size: 12px; font-weight: 400">{{
                  data.content || "-"
                }}</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            v-if="detailData.length == 0"
            class="text-center"
            cols="12"
            style="margin-top: 20px"
          >
            <span style="font-size: 16px; color: #000">
              데이터가 존재하지않습니다.
            </span>
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
        this.url = "";
        this.detailData = [];
        this.next = false;
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
      url: "",
      page: 1,
      next: false,
      detailData: [],
      headers: [
        {
          text: "닉네임",
          align: "center",
          sortable: false,
          value: "nickname",
        },
        {
          text: "제목",
          align: "center",
          sortable: false,
          value: "title",
        },
        {
          text: "내용",
          align: "center",
          sortable: false,
          value: "content",
        },
        {
          text: "이미지",
          align: "center",
          sortable: false,
          value: "imgs",
        },
        {
          text: "작성일",
          align: "center",
          sortable: false,
          value: "reviewAt",
        },
      ],
    };
  },
  methods: {
    getReview() {
      this.$store
        .dispatch("api/axios", {
          method: "GET",
          uri: `/review`,
          params: {
            page: this.page,
            url: this.url,
          },
        })
        .then((data) => {
          var retdata = data;
          if (retdata.data) {
            this.detailData = retdata.data;
          } else {
            this.detailData = [];
          }
          this.next = retdata.next;
        })
        .catch((err) => {
          alert(err.msg);
        });
    },
    updatePage(num) {
      this.page = this.page + parseInt(num);
      this.getReview();
    },
  },
};
</script>

<style lang="css" scoped></style>
