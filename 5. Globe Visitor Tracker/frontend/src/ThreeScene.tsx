import * as THREE from "three";

export function initScene() {
    // Create a container and append to document.
    const container = document.createElement("div");
    document.body.appendChild(container);

    // Create scene, camera, and renderer.
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x888888);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Create Earth sphere
    const radius = 2;
    const widthSegments = 32;
    const heightSegments = 32;
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    // Load an Earth texture (you can use your own hosted texture if needed)
    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load("https://www.solarsystemscope.com/textures/download/8k_earth_daymap.jpg");

    const sphereMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
    const earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(earthMesh);

    // Helper: Convert latitude and longitude (in degrees) to 3D coordinates on the sphere.
    function latLongToVector3(lat: number, lon: number, radius: number) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);
        return new THREE.Vector3(x, y, z);
    }

    // Example: Place a red marker for New York (lat: 40.7128° N, lon: -74.0060° W)
    const markerGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
    const markerPosition = latLongToVector3(40.7128, -74.0060, radius + 0.05);
    markerMesh.position.copy(markerPosition);
    scene.add(markerMesh);

    // Animation loop.
    function animate() {
        requestAnimationFrame(animate);
        // Slowly rotate the Earth.
        earthMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    // Adjust on window resize.
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}