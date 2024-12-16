export const actions = {
  // https://velog.io/@artlogy/Axios-Front%EC%9A%A9-%ED%95%9C%EB%B0%A9-%EC%A0%95%EB%A6%AC
  //@nuxtjs/axios 사용
  axios({}, payload) {
    return new Promise((resolve, reject) => {
      if (payload.method) {
        var headers = payload.headers ? payload.headers : {};
        if (payload.method.toUpperCase() == "GET") {
          this.$axios
            .get(payload.uri, { params: payload.params, headers })
            .then((res) => {
              //성공 핸들링
              resolve(res.data);
            })
            .catch((err) => {
              //에러 핸들링
              var errObj = {};
              if (err.response) {
                console.log(err);
                errObj.msg = err.response.data.msg;
                errObj.code = err.response.status;
              } else {
                errObj.msg = "ERROR.";
                errObj.code = 0;
                console.log(err);
              }
              reject(errObj);
            })
            .then(() => {
              //항상 실행되는 영역 (final)
            });
        }
        if (payload.method.toUpperCase() == "POST") {
          this.$axios
            .post(payload.uri, payload.params, { headers })
            .then((res) => {
              //성공 핸들링
              resolve(res.data);
            })
            .catch((err) => {
              //에러 핸들링
              var errObj = {};
              if (err.response) {
                errObj.msg = err.response.data.msg;
                errObj.code = err.response.status;
              } else {
                console.log(err);
                errObj.msg = "ERROR.";
                errObj.code = 0;
              }
              reject(errObj);
            })
            .then(() => {
              //항상 실행되는 영역 (final)
            });
        }
        if (payload.method.toUpperCase() == "PUT") {
          this.$axios
            .put(payload.uri, payload.params, { headers })
            .then((res) => {
              //성공 핸들링
              resolve(res.data);
            })
            .catch((err) => {
              //에러 핸들링
              var errObj = {};
              if (err.response) {
                errObj.msg = err.response.data.msg;
                errObj.code = err.response.status;
              } else {
                console.log(err);
                errObj.msg = "ERROR";
                errObj.code = 0;
              }
              reject(errObj);
            })
            .then(() => {
              //항상 실행되는 영역 (final)
            });
        }
        if (payload.method.toUpperCase() == "DELETE") {
          this.$axios
            .delete(payload.uri, { params: payload.params, headers })
            .then((res) => {
              //성공 핸들링
              resolve(res.data);
            })
            .catch((err) => {
              //에러 핸들링
              var errObj = {};
              if (err.response) {
                errObj.msg = err.response.data.msg;
                errObj.code = err.response.status;
              } else {
                console.log(err);
                errObj.msg = "ERROR.";
                errObj.code = 0;
              }
              reject(errObj);
            })
            .then(() => {
              //항상 실행되는 영역 (final)
            });
        }
      }
    });
  },
};
