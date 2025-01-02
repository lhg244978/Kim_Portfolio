<template>
  <v-container
    class="pa-0 mx-0 fill-height d-block"
    style="
      background-image: url('../img/iphone_home.png');
      background-color: transparent;
      background-size: cover;
    "
  >
    <v-row
      style="
        max-width: 780px;
        color: #000;
        background-image: url('../img/iphone_home.png');
        background-color: transparent;
        background-size: cover;
        position: relative;
      "
      class="fill-height mx-auto pa-5"
      no-gutters
      align="center"
      justify="center"
    >
      <v-col cols="12" style="height: 50px; position: absolute; top: 0">
        <v-row class="fill-height pt-5 px-4" no-gutters align="center">
          <v-col
            cols="3"
            class="text-center"
            style="color: #fff; font-weight: 800; font-size: 30px"
            >{{ formattedTime }}</v-col
          >
          <v-col
            class="fill-height"
            cols="6"
            style="background-color: #000; border-radius: 40px"
          ></v-col>
          <v-col cols="3" class="d-flex px-4">
            <v-icon class="mx-auto" size="36">mdi-wifi</v-icon>
            <v-icon class="mx-auto" size="36">mdi-network-strength-3</v-icon>
            <div
              style="
                width: 56px;
                height: 36px;
                border: 6px solid #fff;
                border-radius: 10px;
              "
            >
              <v-row
                no-gutters
                align="center"
                justify="center"
                style="color: #fff; font-weight: 800"
              >
                72
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        :style="`height:${windowSize.height - 190}px; padding-top:60px`"
      ></v-col>
      <v-col cols="12" style="height: 150px"></v-col
    ></v-row>
  </v-container>
</template>

<script>
export default {
  layout: "phone",
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
    formattedTime() {
      const hours = this.currentTime.getHours();
      const minutes = this.currentTime.getMinutes();
      return `${hours} : ${minutes < 10 ? "0" : ""}${minutes}`;
    },
  },
  data() {
    return {
      currentTime: new Date(),
    };
  },
  mounted() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000); // 1초마다 시간 업데이트
  },
  methods: {
    updateTime() {
      this.currentTime = new Date();
    },
  },
};
</script>
