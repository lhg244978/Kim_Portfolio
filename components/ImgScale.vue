<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="500">
    <v-card color="#fff" flat tile>
      <v-card-title>
        <v-btn class="ml-auto" icon @click="$emit('close')">
          <v-icon color="#000">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-5">
        <v-img :src="url" contain width="100%"></v-img>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "url"],
  watch: {
    dialog(val) {},
  },
  computed: {
    windowSize() {
      return this.$store.state.windowSize;
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
