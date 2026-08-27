/**
 * ==========================================================================
 * Akhil Binu - Hero Section 3D Centerpiece (Three.js)
 * Rotating wireframe data-crystal with orbiting particle ring
 * ==========================================================================
 */

(function () {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;
    if (window.innerWidth < 768) return; // Skip on mobile for performance
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // Purely decorative, skip entirely

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    // Outer wireframe icosahedron shell (neon green)
    const shellGeo = new THREE.IcosahedronGeometry(2.6, 1);
    const shellEdges = new THREE.EdgesGeometry(shellGeo);
    const shellMat = new THREE.LineBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.55 });
    const shell = new THREE.LineSegments(shellEdges, shellMat);
    group.add(shell);

    // Inner core wireframe (deep green)
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const coreMat = new THREE.LineBasicMaterial({ color: 0x00b34d, transparent: true, opacity: 0.45 });
    const core = new THREE.LineSegments(coreEdges, coreMat);
    group.add(core);

    // Orbiting particle ring
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const r = 3.15 + Math.random() * 0.35;
        positions[i * 3] = Math.cos(angle) * r;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
        positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x39ff14, size: 0.07, transparent: true, opacity: 0.85 });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Slight ambient point highlight (using vertex colors is overkill; rely on additive lines)
    group.rotation.x = 0.35;

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    function resize() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }

    const clock = new THREE.Clock();
    let rotY = 0, rotX = 0.35;

    function animate() {
        requestAnimationFrame(animate);
        if (document.hidden) return; // Skip work while the tab is backgrounded
        const t = clock.getElapsedTime();

        shell.rotation.y = t * 0.22;
        shell.rotation.x = 0.35 + Math.sin(t * 0.15) * 0.08;
        core.rotation.y = -t * 0.32;
        core.rotation.x = t * 0.18;
        particles.rotation.y = t * 0.14;

        rotY += (mouseX * 0.35 - rotY) * 0.04;
        rotX += (0.35 - mouseY * 0.25 - rotX) * 0.04;
        group.rotation.y = rotY;
        group.rotation.x = rotX;

        renderer.render(scene, camera);
    }

    resize();
    window.addEventListener('resize', resize);
    animate();
})();
