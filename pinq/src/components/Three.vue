<template>
  <div ref="planetContainer" class="planet-container"></div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "RotatingPlanet",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      sphere: null,
      animationId: null,
    };
  },
  methods: {
    initScene() {
      // Сцена
      this.scene = new THREE.Scene();

      // Камера
      this.camera = new THREE.PerspectiveCamera(
        75,
        this.$refs.planetContainer.clientWidth / this.$refs.planetContainer.clientHeight,
        0.1,
        1000
      );
      this.camera.position.z = 3;

      // Рендерер
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(
        this.$refs.planetContainer.clientWidth,
        this.$refs.planetContainer.clientHeight
      );
      this.$refs.planetContainer.appendChild(this.renderer.domElement);

      // Геометрия и текстура планеты
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(
        "https://threejsfundamentals.org/threejs/resources/images/earth-day.jpg"
      );
      const material = new THREE.MeshBasicMaterial({ map: texture });

      // Сфера (планета)
      this.sphere = new THREE.Mesh(geometry, material);
      this.scene.add(this.sphere);

      // Анимация
      this.animate();
    },
    animate() {
      this.animationId = requestAnimationFrame(this.animate);
      this.sphere.rotation.y += 0.01; // Вращение по оси Y
      this.renderer.render(this.scene, this.camera);
    },
    resizeRenderer() {
      if (this.renderer) {
        const container = this.$refs.planetContainer;
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
      }
    },
    cleanup() {
      cancelAnimationFrame(this.animationId);
      this.renderer.dispose();
      this.sphere.geometry.dispose();
      this.sphere.material.dispose();
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.sphere = null;
    },
  },
  mounted() {
    this.initScene();
    window.addEventListener("resize", this.resizeRenderer);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeRenderer);
    this.cleanup();
  },
};
</script>

<style scoped>
.planet-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
