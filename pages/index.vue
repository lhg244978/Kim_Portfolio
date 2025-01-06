<template>
  <v-container class="pa-0 mx-0 fill-height d-block">
    <v-row
      v-if="start"
      class="fill-height fadeinEffect blink-effect"
      no-gutters
      align="center"
    >
      <v-col cols="12" class="text-center">
        <transition name="fade">
          <v-progress-circular
            v-if="!fade_circular"
            size="360"
            :value="progress_circular"
            color="white"
            width="9"
          >
            <span id="fake-text"></span>
            <span v-if="cursor" class="cursor">|</span></v-progress-circular
          >
        </transition>
      </v-col>
      <v-col cols="12" class="text-center">
        <transition name="fade">
          <v-btn
            v-if="onButton"
            class="mr-1"
            color="#fff"
            style="color: #000; font-size: 24px"
            @click="start = false"
            >3D version</v-btn
          >
        </transition>
        <transition name="fade">
          <v-btn
            v-if="onButton"
            class="ml-1"
            color="yellow"
            style="color: #000; font-size: 24px"
            @click="$router.push('simple')"
            >Simple version</v-btn
          >
        </transition>
      </v-col>
    </v-row>
    <div
      v-else
      ref="threeContainer"
      class="fadeinEffect blink-effect"
      :style="`width:100%; height:100%;`"
    ></div>
    <div v-if="tooltipVisible" :style="tooltipStyle" class="tooltip">
      click to use iphone
    </div>
  </v-container>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // OrbitControls 추가
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer";
const url = require("../config/server.json").url;
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
  },
  watch: {
    async start(val) {
      if (!val) {
        await this.delay(1000);
        await this.init3DModel();
      }
    },
  },
  data() {
    return {
      model: null,
      camera: null,
      zoomedIn: false,
      url,

      start: true,
      onButton: false,
      progress_circular: 0,

      fade_circular: false,
      cursor: false,
      tooltipVisible: false,
      tooltipStyle: {
        position: "absolute",
        top: "0px",
        left: "0px",
        background: "#333",
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "5px",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        zIndex: 10,
      },

      raycaster: new THREE.Raycaster(),
      mouse: new THREE.Vector2(),
      tooltipTimeout: null,
    };
  },
  mounted() {
    this.typeEffect();
  },
  methods: {
    init3DModel() {
      const container = this.$refs.threeContainer;

      // Three.js 기본 설정
      const scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      scene.background = new THREE.Color(0xd3d3d3); // 하늘색 배경
      this.camera.position.set(0, 0.1, 3);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // CSS3DRenderer 추가
      const cssRenderer = new CSS3DRenderer();
      cssRenderer.setSize(container.clientWidth, container.clientHeight);
      cssRenderer.domElement.style.position = "absolute";
      cssRenderer.domElement.style.top = "0px";
      cssRenderer.domElement.style.pointerEvents = "none";
      container.appendChild(cssRenderer.domElement);

      // OrbitControls 추가
      const controls = new OrbitControls(this.camera, renderer.domElement);
      controls.enableDamping = true; // 부드러운 이동을 비활성화
      controls.enableRotate = false; // 카메라 회전 비활성화
      controls.enableZoom = false; // 줌 비활성화
      controls.enablePan = false; // 팬 비활성화

      // 조명 추가
      const light = new THREE.AmbientLight(0xffffff, 1);
      scene.add(light);

      // GLTFLoader를 사용해 iPhone 모델 로드
      const loader = new GLTFLoader();
      loader.load(
        "/iphone_16_pro_max.glb", // iPhone 모델 파일 경로
        (gltf) => {
          this.model = gltf.scene;
          this.model.scale.set(15, 15, 15); // 모델 크기 조정
          scene.add(this.model);

          // 모델의 Bounding Box 계산
          const box = new THREE.Box3().setFromObject(this.model);
          const modelCenter = box.getCenter(new THREE.Vector3()); // 모델의 중심

          // 모델 크기에 맞춘 화면 크기 설정
          const modelHeight = box.max.y - box.min.y; // 모델의 높이
          const screenWidth = modelHeight * 0.03; // 모델 높이의 40%를 화면의 가로 크기
          const screenHeight = screenWidth * 2.0; // 아이폰 화면 비율에 맞춰 세로 크기 설정

          const screenGeometry = new THREE.PlaneGeometry(
            screenWidth,
            screenHeight
          ); // 화면 크기
          const screenMaterial = new THREE.MeshBasicMaterial({
            color: 0x87ceeb,
            side: THREE.FrontSide,
          });

          // 화면 위치 설정 (모델의 화면 앞에 정확히 배치)
          const screen = new THREE.Mesh(screenGeometry, screenMaterial);

          screen.position.set(
            modelCenter.x, // 모델의 중심에 맞추기
            modelCenter.y, // 모델 중심과 맞추기
            modelCenter.z + 0.0365 // 모델의 화면 앞에 조금 더 가까운 위치로 설정
          );

          // 화면 회전 설정 (화면이 모델의 화면을 정면으로 향하도록)
          screen.rotation.set(0, 0, 0); // 화면을 정면으로 위치시키기 위해 회전 없음

          // 화면에 iframe을 추가
          const iframeElement = document.createElement("iframe");
          iframeElement.src = this.url + "/screen"; // 원하는 URL을 넣습니다.
          iframeElement.style.width = "760px"; // iframe 크기
          iframeElement.style.height = "1600px";
          iframeElement.style.border = "none";
          iframeElement.style.borderRadius = "100px";
          iframeElement.style.pointerEvents = "none";

          // CSS3DObject 생성 (이것을 3D 화면에 추가)
          const css3DObject = new CSS3DObject(iframeElement);
          css3DObject.position.set(0, 0, 0); // iframe의 위치 조정
          css3DObject.scale.set(0.0001, 0.0001, 0.0001); // 3D 공간에서 iframe 크기 줄이기
          css3DObject.element.style.pointerEvents = "none";

          // screen에 iframe 추가
          screen.add(css3DObject);

          // 모델에 스크린 추가
          this.model.add(screen);
          scene.add(this.model);

          // 마우스 이벤트 리스너 추가
          container.addEventListener("mousemove", this.mousemoveE);

          const raycaster = this.raycaster;
          const mouse = this.mouse;

          container.addEventListener("click", (event) => {
            // 마우스 좌표를 NDC로 변환
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Raycaster로부터 카메라를 기준으로 Ray 생성
            raycaster.setFromCamera(mouse, this.camera);

            // 클릭한 모델이 있는지 체크
            const intersects = raycaster.intersectObject(this.model);

            if (intersects.length > 0 && !this.zoomedIn) {
              // 모델을 클릭하면 카메라가 가까워지도록 설정

              this.camera.position.z = Math.max(
                this.camera.position.z - 1,
                -0.5
              ); // 최소 z 값 제한
              this.zoomedIn = true;
              css3DObject.element.style.pointerEvents = "auto";

              this.model.rotation.set(0, 0, 0); // 모델 회전 리셋하여 정면으로
              // `mousemove` 이벤트 리스너를 제거하여 모델 회전을 비활성화
              this.tooltipVisible = false;

              container.removeEventListener("mousemove", this.mousemoveE);
            } else if (intersects.length === 0 && this.zoomedIn) {
              // 모델 밖을 클릭하면 원래 줌 상태로 돌아가고 `mousemove` 이벤트를 다시 추가
              this.camera.position.z = 3; // 원래 상태로 돌아가기
              this.zoomedIn = false;
              css3DObject.element.style.pointerEvents = "none";

              // `mousemove` 이벤트 리스너를 다시 활성화
              container.addEventListener("mousemove", this.mousemoveE);
            }
          });
          // 애니메이션 루프에서 OrbitControls 업데이트
          const animate = () => {
            controls.update(); // OrbitControls 업데이트
            renderer.render(scene, this.camera); // WebGL 렌더링
            cssRenderer.render(scene, this.camera); // CSS3D 렌더링
            requestAnimationFrame(animate); // 계속해서 애니메이션 루프
          };

          animate(); // 애니메이션 시작
        },
        undefined,
        (error) => {
          console.error("모델 로드 실패:", error);
        }
      );
    },
    mousemoveE(event) {
      const container = this.$refs.threeContainer;
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // 회전 범위를 줄이기 위해 비율을 설정
      const rotationFactor = 0.2; // 회전 정도를 줄이기 위한 비율 (0.0~1.0 사이 값)
      this.model.rotation.y = mouseX * Math.PI * rotationFactor;
      this.model.rotation.x = mouseY * Math.PI * rotationFactor;

      this.mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);

      this.tooltipTimeout = setTimeout(() => {
        // 마우스 위치를 NDC (Normalized Device Coordinates)로 변환
        this.mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;

        // Raycaster로 모델 위에 마우스가 있는지 확인
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // 모델과 충돌 체크
        const intersects = this.raycaster.intersectObject(this.model);

        if (intersects.length > 0) {
          this.tooltipVisible = true;
          this.tooltipStyle.left = `${event.clientX + 15}px`;
          this.tooltipStyle.top = `${event.clientY + 15}px`;
        } else {
          this.tooltipVisible = false;
        }
      }, 100); // 100ms 간격으로 처리
    },
    async typeEffect() {
      const fakeText = document.getElementById("fake-text");
      var content = "주니어 웹개발자 김현근의 포트폴리오입니다.";
      for (var idx in content) {
        fakeText.textContent += content[idx];
        this.cursor = !this.cursor;
        await this.delay(100);
        this.progress_circular = this.progress_circular + 1 * 3;
      }
      var content2 = "방문해주셔서 감사합니다.";
      for (var idx in content) {
        fakeText.textContent = fakeText.textContent.slice(0, -1);
        this.cursor = !this.cursor;
        await this.delay(80);
        this.progress_circular = this.progress_circular + 1 * 0.7;
        if (idx == content.length - 1) {
          await this.delay(100);
        }
      }
      for (var idx in content2) {
        fakeText.textContent += content2[idx];
        this.cursor = !this.cursor;
        await this.delay(100);
        this.progress_circular = this.progress_circular + 1 * 7;
        if (idx == content2.length - 1) {
          await this.delay(1000);
          this.fade_circular = true;
          await this.delay(1000);
          this.onButton = true;

          await this.delay(1000);
        }
      }
    },
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 의 대체 */ {
  opacity: 0;
}
.tooltip {
  font-size: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
