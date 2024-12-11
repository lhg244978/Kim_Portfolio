export const state = () => ({
  processing: false,
  processing_msg: "잠시만 기다려주세요...",
  windowSize: {
    width: 0,
    height: 0,
  },
  scrollY: 0,
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
  setScroll(state, payload) {
    state.scrollY = payload;
  },
  onResize(state, data) {
    state.windowSize.width = data.width;
    state.windowSize.height = data.height;
  },
};
