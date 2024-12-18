<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="800px">
    <v-card flat style="border-radius: 10px">
      <v-card-text class="pa-5">
        <v-row no-gutters>
          <v-col cols="12" class="text-center" style="margin-bottom: 15px">
          </v-col>

          <v-col cols="6" class="pr-1">
            <v-btn
              color="#D9EAF8"
              depressed
              block
              :ripple="false"
              class="no-background-hover pretendard-Bold"
              height="54"
              style="
                font-size: 14px;
                letter-spacing: -0.14px;
                line-height: 19px;
                color: #3185ff;
                border-radius: 10px;
              "
              @click="$emit('con', false)"
            >
              cancel</v-btn
            >
          </v-col>
          <v-col cols="6" class="pl-1">
            <v-btn
              color="#3185FF"
              depressed
              block
              :ripple="false"
              class="no-background-hover pretendard-Bold"
              height="54"
              style="
                font-size: 14px;
                letter-spacing: -0.14px;
                line-height: 19px;
                color: #ffffff;
                border-radius: 10px;
              "
              @click="$emit('con', true)"
              >OK</v-btn
            >
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
  watch: {},
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
  methods: {},
};
</script>

<style lang="css" scoped></style>
