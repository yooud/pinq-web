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
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
    this.dispose();
  },
  methods: {
    initScene() {
      // Создаем сцену
      this.scene = new THREE.Scene();

      // Создаем камеру
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.z = 2; // Отодвигаем камеру назад

      // Создаем рендерер
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.planetContainer.appendChild(this.renderer.domElement);
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
        this.planet.scale.set(0.5, 0.7, 0.7); // уменьшение размера для маленьких экранов
      } else {
        this.planet.scale.set(0.9, 0.9, 0.9); // стандартный размер
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
      // Адаптируем камеру и рендерер под размер окна
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
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
  },
};
</script>

<style>
.planet-container {
  width: 100%;
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

</style>
