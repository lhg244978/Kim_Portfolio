<template>
  <v-dialog v-model="dialog" scrollable persistent fullscreen>
    <v-card v-if="start" color="#ffbb00" flat style="border-radius: 0px">
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
              color="#ffe536"
              width="90"
              height="90"
              style="border-radius: 20px"
            >
              <v-icon color="#000" size="60">mdi-note-edit-outline</v-icon>
            </v-btn>
            <p
              class="mb-0 mt-10"
              style="font-size: 30px; letter-spacing: -0.3px; color: #000"
            >
              메모입니다.
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-else color="#ffbb00" flat style="border-radius: 0px">
      <v-card-title class="pa-10 pt-15">
        <v-btn class="mr-auto" icon @click="$emit('close')">
          <v-icon size="48" color="#000">mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn class="ml-auto" icon @click="edit = true">
          <v-icon size="48" color="#000">mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="ml-5" icon @click="search = !search">
          <v-icon size="48" color="#000">mdi-magnify</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="py-5 px-10">
        <v-row no-gutters align="start">
          <v-col cols="12" class="px-5 pb-10 fadeinEffect" v-if="search">
            <v-text-field
              outlined
              hide-details
              class="centered-input"
              style="
                border-radius: 20px;
                background-color: rgba(0, 0, 0, 0.5);
                font-size: 26px;
              "
              label=""
              height="74"
              color="#fff"
              single-line
              v-model="searchText"
              @input="loadList"
              ><template v-slot:label>
                <v-row
                  no-gutters
                  class="mt-2"
                  align="center"
                  style="font-size: 26px"
                >
                  <span>
                    <v-icon style="color: rgba(255, 255, 255, 0.7)" size="34">
                      mdi-magnify
                    </v-icon>
                    찾으실 메모를 입력해주세요.
                  </span>
                </v-row>
              </template>
            </v-text-field></v-col
          >
          <v-col cols="6" class="pa-0" v-for="(memo, idx) in memos" :key="idx">
            <v-img
              @click="
                detailMemo = memo;
                edit = true;
              "
              src="/img/postit.png"
              width="100%"
              cover
            >
              <v-row no-gutters align="center">
                <v-col class="py-15 pl-15 pr-12" cols="12">
                  <h2
                    class="pt-2 pb-5"
                    style="
                      color: #000;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ memo.title }}
                  </h2>
                  <p
                    v-html="memo.context"
                    class="px-5 mb-2"
                    style="
                      color: #000;
                      font-size: 18px;
                      line-height: 1.4;
                      display: -webkit-box;
                      -webkit-line-clamp: 5;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      min-height: 125px;
                      max-height: 125px;
                    "
                  ></p>
                  <p class="text-right" style="color: #000">
                    {{ memo.regdate | formattedDate }}
                  </p>
                </v-col>
              </v-row>
            </v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <NoteEdit
      :dialog="edit"
      :detail="detailMemo"
      @close="edit = false"
    ></NoteEdit>
  </v-dialog>
</template>

<script>
import NoteEdit from "@/components/NoteEdit";
const moment = require("moment");
moment.locale("ko");
export default {
  components: {
    NoteEdit: NoteEdit,
  },
  props: ["dialog"],
  computed: {},
  watch: {
    dialog(val) {
      if (!val) {
        this.start = true;
        this.search = false;
        this.searchText = "";
        this.edit = false;
        this.memos = [];
      } else {
        setTimeout(() => {
          this.start = false;
        }, 1000);
      }
    },
    edit(val) {
      if (!val) {
        this.detailMemo = null;
        this.loadList();
      }
    },
    search(val) {
      if (!val) {
        this.searchText = "";
        this.loadList();
      }
    },
    start(val) {
      if (!val) {
        this.loadList();
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

        return moment(date).format("YYYY.MM.DD. " + dayname);
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
      search: false,
      searchText: "",
      edit: false,

      memos: [],
      detailMemo: null,
    };
  },

  methods: {
    loadList() {
      this.$store
        .dispatch("api/axios", {
          method: "GET",
          uri: `/memo/list`,
          params: {
            searchText: this.searchText,
          },
        })
        .then((data) => {
          var retdata = data;
          this.memos = retdata;
        })
        .catch((err) => {
          alert(err.msg);
        });
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
.centered-input .v-input__slot {
  padding: 0 20px 0 20px !important;
}
</style>
