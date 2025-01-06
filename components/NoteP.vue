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
            <p class="mb-0 mt-10" style="font-size: 30px; color: #000">
              개발중입니다.
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
        <v-btn class="ml-auto" icon @click="search = !search">
          <v-icon size="48" color="#000">mdi-magnify</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="py-5 px-10">
        <v-row no-gutters align="center"> </v-row>
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
          this.start = true;
        }, 1000);
      }
    },
    start(val) {},
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
      search: false,
    };
  },
  methods: {},
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
</style>
