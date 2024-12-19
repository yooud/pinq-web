<template>
  <div>
    <h1 :class="{'pinq-planet':true,'light':this.$store.getters.getTheme}">Pinq</h1>
    <div ref="planetContainer" :class="{'planet-container':true,'light':this.$store.getters.getTheme}"></div>
  </div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "ThreeDPlanet",
  mounted() {
    this.initScene();
    this.addLighting();
    this.createPlanet();
    this.animate();
    window.addEventListener("resize", this.onWindowResize);
    this.$watch(
      () => this.$store.getters.getTheme,
      this.updateBackgroundColor
    );
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
    this.dispose();
  },
  methods: {
    initScene() {
      // Создаем сцену
      this.scene = new THREE.Scene();

      // Получаем размеры контейнера
      const container = this.$refs.planetContainer;
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Создаем камеру
      this.camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        750
      );
      this.camera.position.z = 2; // Отодвигаем камеру назад

      // Создаем рендерер
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0xeeeded);
      container.appendChild(this.renderer.domElement);

      // Set the initial background color based on the theme
      this.updateBackgroundColor(this.$store.getters.getTheme);
    },
    addLighting() {
      // Добавляем источник света
      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(5, 5, 5);
      this.scene.add(light);


      const ambientLight = new THREE.AmbientLight(0x404040, 1); // мягкий свет
      this.scene.add(ambientLight);

      // Направленный свет (для усиления эффекта освещенности)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // яркий белый свет
      directionalLight.position.set(5, 5, 5).normalize(); // позиция источника света
      this.scene.add(directionalLight);
    },
    createPlanet() {
      // Создаем геометрию сферы
      const geometry = new THREE.SphereGeometry(1, 64, 64);

      // Загружаем текстуру поверхности
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load("../assets/planet2.jpg");

      // Создаем материал
      const material = new THREE.MeshStandardMaterial({
        map: texture,
      });

      // Создаем объект Mesh (сфера + материал)
      this.planet = new THREE.Mesh(geometry, material);
      
      // Уменьшаем размер планеты в зависимости от ширины экрана
      if (window.innerWidth < 500) {
        this.planet.scale.set(0.8, 0.8, 0.8); // уменьшение размера для маленьких экранов
      } else {
        this.planet.scale.set(1, 1, 1); // стандартный размер
      }

      this.scene.add(this.planet);
    },
    animate() {
      // Анимация
      this.animationId = requestAnimationFrame(this.animate);
      if (this.planet) {
        this.planet.rotation.y += 0.01; // Вращение по оси Y
      }
      this.renderer.render(this.scene, this.camera); // Рендер сцены
    },
    onWindowResize() {
      const container = this.$refs.planetContainer;
      const width = container.clientWidth;
      const height = container.clientHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    },
    dispose() {
      // Очищаем ресурсы Three.js
      cancelAnimationFrame(this.animationId);
      this.renderer.dispose();
      this.scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
      });
    },
    updateBackgroundColor(theme) {
      const color = theme ? 0xeeeded : 0x000000; // white for light theme, black for dark theme
      this.renderer.setClearColor(color);
    },
  },
};
</script>

<style>
.planet-container {
  width: 100%;
  height: 500px; /* Set the desired height */
  overflow: hidden;
  position: relative;
}
.pinq-planet{
  background-color: black;
  text-align: center;
  color: #fff;
  padding-top: 25px;
  font-size: 45px;
}
@media (max-width: 480px) {
    .planet-container {
      width: 100%;
      height: 350px; /* Set the desired height */
      overflow: hidden;
      position: relative;
    }
  }
</style>
