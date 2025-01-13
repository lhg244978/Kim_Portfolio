export const state = () => ({
  processing: false,
  processing_msg: "잠시만 기다려주세요...",
  windowSize: {
    width: 0,
    height: 0,
  },
  scrollY: 0,
  alert: false,
  alert_title: "",
  alert_msg: "",
});

export const getters = {
  processing: (state) => state.processing,
};

export const mutations = {
  toggle_processing(state, payload) {
    state.processing = payload;
  },

  processingMsg(state, msg) {
    if (msg == "default") {
      state.processing_msg = "잠시만 기다려주세요...";
    } else {
      state.processing_msg = msg;
    }
  },
  alertThrow(state, data) {
    state.alert_title = data.title;
    state.alert_msg = data.context;
    state.alert = true;
  },
  alertClear(state) {
    state.alert_title = "";
    state.alert_msg = "";
    state.alert = false;
  },
  setScroll(state, payload) {
    state.scrollY = payload;
  },
  onResize(state, data) {
    state.windowSize.width = data.width;
    state.windowSize.height = data.height;
  },
};
