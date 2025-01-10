<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="400">
    <v-card color="#d4d3d9" flat style="border-radius: 20px">
      <v-card-text class="pa-0">
        <v-row no-gutters align="center">
          <v-col
            cols="12"
            v-if="type == 'applibrary'"
            style="border-top: 1px solid #c2c2c6"
          >
            <v-btn
              text
              class="py-8"
              color="#6aa4f6"
              block
              @click="$emit('moveToHome')"
              style="font-size: 20px; font-weight: 400; letter-spacing: -0.24px"
            >
              Move to Home
            </v-btn></v-col
          >
          <v-col cols="12" v-else style="border-top: 1px solid #c2c2c6">
            <v-btn
              text
              class="py-8"
              color="#6aa4f6"
              block
              @click="$emit('deleteFromHome')"
              style="font-size: 20px; font-weight: 400; letter-spacing: -0.24px"
            >
              Delete from Home
            </v-btn></v-col
          >
          <v-col cols="12" style="border-top: 1px solid #c2c2c6">
            <v-btn
              text
              class="py-8"
              color="red"
              block
              @click="$emit('removeApp')"
              style="font-size: 20px; font-weight: 400; letter-spacing: -0.24px"
            >
              Remove App
            </v-btn>
          </v-col>
          <v-col cols="12" style="border-top: 1px solid #c2c2c6">
            <v-btn
              text
              class="py-8"
              color="#6aa4f6"
              block
              @click="$emit('close')"
              style="font-size: 20px; font-weight: 400; letter-spacing: -0.24px"
            >
              Cancel
            </v-btn></v-col
          >
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "app", "type"],
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
