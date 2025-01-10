<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="400">
    <v-card color="#f9f9f9" flat style="border-radius: 20px">
      <v-card-text class="py-5 px-10">
        <v-row no-gutters align="center">
          <v-col
            cols="12"
            class="text-center mb-5"
            style="
              font-size: 24px;
              font-weight: 700;
              letter-spacing: -0.24px;
              color: #000;
            "
          >
            {{ title ? title : "Alert" }}</v-col
          >
          <v-col
            cols="12"
            class="text-center mb-5"
            style="
              font-size: 18px;
              font-weight: 400;
              letter-spacing: -0.18px;
              color: #000;
            "
          >
            {{ context ? context : "-" }}</v-col
          >
        </v-row>
      </v-card-text>
      <v-card-actions class="pa-0" style="border-top: 1px solid #000">
        <v-btn
          text
          class="py-8"
          color="#6aa4f6"
          block
          @click="$emit('close')"
          style="font-size: 20px; font-weight: 400; letter-spacing: -0.24px"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "title", "context"],
  computed: {},
  watch: {
    dialog(val) {},
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
    return {};
  },
  methods: {
    delay(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
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
</style>
