// Three.js 3D Background Animation
// Creates an animated particle system with geometric shapes

let scene, camera, renderer, particles, particleSystem;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.0008);

    // Create camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
    );
    camera.position.z = 1000;

    // Create renderer
    const canvas = document.getElementById('bg-canvas');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    createParticles();

    // Create geometric shapes
    createGeometricShapes();

    // Event listeners
    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    // Start animation
    animate();
}

function createParticles() {
    const particleCount = 3000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Define color palette
    const color1 = new THREE.Color(0x00f0ff); // Cyan
    const color2 = new THREE.Color(0x7b2cbf); // Purple
    const color3 = new THREE.Color(0xff006e); // Pink

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Random positions
        positions[i3] = (Math.random() - 0.5) * 3000;
        positions[i3 + 1] = (Math.random() - 0.5) * 3000;
        positions[i3 + 2] = (Math.random() - 0.5) * 2000;

        // Random colors from palette
        const colorChoice = Math.random();
        let color;
        if (colorChoice < 0.33) {
            color = color1;
        } else if (colorChoice < 0.66) {
            color = color2;
        } else {
            color = color3;
        }

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        // Random sizes
        sizes[i] = Math.random() * 3 + 1;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Particle material
    const particleMaterial = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
}

function createGeometricShapes() {
    // Create glowing wireframe shapes
    const shapes = [];
    
    // Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(100, 0);
    const icoMaterial = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(-400, 200, -500);
    scene.add(icosahedron);
    shapes.push(icosahedron);

    // Octahedron
    const octGeometry = new THREE.OctahedronGeometry(80, 0);
    const octMaterial = new THREE.MeshBasicMaterial({
        color: 0xff006e,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const octahedron = new THREE.Mesh(octGeometry, octMaterial);
    octahedron.position.set(400, -200, -600);
    scene.add(octahedron);
    shapes.push(octahedron);

    // Torus
    const torusGeometry = new THREE.TorusGeometry(60, 20, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0x7b2cbf,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(0, -300, -700);
    scene.add(torus);
    shapes.push(torus);

    // Store shapes for animation
    scene.userData.shapes = shapes;
}

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.5;
    mouseY = (event.clientY - windowHalfY) * 0.5;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    // Smooth camera movement based on mouse
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Rotate particle system
    if (particleSystem) {
        particleSystem.rotation.y += 0.0003;
        particleSystem.rotation.x += 0.0001;
    }

    // Animate geometric shapes
    if (scene.userData.shapes) {
        const time = Date.now() * 0.001;
        scene.userData.shapes.forEach((shape, index) => {
            shape.rotation.x = time * (0.3 + index * 0.1);
            shape.rotation.y = time * (0.2 + index * 0.1);
            
            // Floating effect
            shape.position.y += Math.sin(time + index) * 0.5;
        });
    }

    // Pulse effect for particles
    const time = Date.now() * 0.001;
    const positions = particleSystem.geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
        const index = i / 3;
        positions[i + 1] += Math.sin(time + index * 0.1) * 0.2;
    }
    
    particleSystem.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Performance optimization: reduce particles on mobile
if (window.innerWidth < 768) {
    // This will be handled in the init function
    window.addEventListener('load', () => {
        if (particleSystem) {
            particleSystem.geometry.setDrawRange(0, 1000); // Reduce visible particles
        }
    });
}
