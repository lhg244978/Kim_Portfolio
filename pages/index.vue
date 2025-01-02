<template>
  <div ref="threeContainer" :style="`width:100%; height:100%;`"></div>
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
  mounted() {
    this.initScene();
  },
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
      model: null,
      zoomedIn: false,
      url,
    };
  },
  methods: {
    initScene() {
      const container = this.$refs.threeContainer;

      // Three.js 기본 설정
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      scene.background = new THREE.Color(0x87ceeb); // 하늘색 배경
      camera.position.set(0, 0.1, 3);

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
      const controls = new OrbitControls(camera, renderer.domElement);
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
          iframeElement.src = this.url + "/simple"; // 원하는 URL을 넣습니다.
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

          const raycaster = new THREE.Raycaster();
          const mouse = new THREE.Vector2();

          container.addEventListener("click", (event) => {
            // 마우스 좌표를 NDC로 변환
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Raycaster로부터 카메라를 기준으로 Ray 생성
            raycaster.setFromCamera(mouse, camera);

            // 클릭한 모델이 있는지 체크
            const intersects = raycaster.intersectObject(this.model);

            if (intersects.length > 0 && !this.zoomedIn) {
              // 모델을 클릭하면 카메라가 가까워지도록 설정
              camera.position.z = Math.max(camera.position.z - 1, -0.5); // 최소 z 값 제한
              this.zoomedIn = true;
              css3DObject.element.style.pointerEvents = "auto";

              this.model.rotation.set(0, 0, 0); // 모델 회전 리셋하여 정면으로
              // `mousemove` 이벤트 리스너를 제거하여 모델 회전을 비활성화
              container.removeEventListener("mousemove", this.mousemoveE);
            } else if (intersects.length === 0 && this.zoomedIn) {
              // 모델 밖을 클릭하면 원래 줌 상태로 돌아가고 `mousemove` 이벤트를 다시 추가
              camera.position.z = 3; // 원래 상태로 돌아가기
              this.zoomedIn = false;
              css3DObject.element.style.pointerEvents = "none";

              // `mousemove` 이벤트 리스너를 다시 활성화
              container.addEventListener("mousemove", this.mousemoveE);
            }
          });
          // 애니메이션 루프에서 OrbitControls 업데이트
          const animate = () => {
            controls.update(); // OrbitControls 업데이트
            renderer.render(scene, camera); // WebGL 렌더링
            cssRenderer.render(scene, camera); // CSS3D 렌더링
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
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // 회전 범위를 줄이기 위해 비율을 설정
      const rotationFactor = 0.2; // 회전 정도를 줄이기 위한 비율 (0.0~1.0 사이 값)
      this.model.rotation.y = mouseX * Math.PI * rotationFactor;
      this.model.rotation.x = mouseY * Math.PI * rotationFactor;
    },
  },
};
</script>

<style></style>
