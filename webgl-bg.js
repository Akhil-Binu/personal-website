/**
 * ==========================================================================
 * Akhil Binu - Personal Cybersecurity Portfolio WebGL Background (Three.js)
 * 3D Cyber Threat Map Globe (Kaspersky Cyberthreat Map Style)
 * Multi-colored Laser Comets, Dynamic Port-mapped Trails & Impact Ripples
 * ==========================================================================
 */

(function () {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    // Performance parameters based on device
    const isMobile = window.innerWidth < 768;
    const globeRadius = 37;
    const particleCount = isMobile ? 150 : 500;
    const maxActiveAttacks = isMobile ? 10 : 35;

    // Kaspersky Threat Registry: Colors, Titles, and Severities
    const kasperskyThreats = {
        OAS: { name: "OAS (On-Access Scan)", color: 0xff3b30, severity: "ALERT", hex: "#ff3b30" }, // Red
        ODS: { name: "ODS (On-Demand Scan)", color: 0x00f2fe, severity: "INFO", hex: "#00f2fe" },  // Cyan
        WAV: { name: "WAV (Web Anti-Virus)", color: 0x39ff14, severity: "BLOCKED", hex: "#39ff14" },// Green
        MAV: { name: "MAV (Mail Anti-Virus)", color: 0xff00ff, severity: "WARN", hex: "#ff00ff" }, // Magenta
        IDS: { name: "IDS (Intrusion Detection)", color: 0xffb000, severity: "ALERT", hex: "#ffb000" }, // Amber
        VUL: { name: "VUL (Vulnerability Scan)", color: 0xffff00, severity: "WARN", hex: "#ffff00" }   // Yellow
    };
    const threatKeys = ["OAS", "ODS", "WAV", "MAV", "IDS", "VUL"];

    // Setup Three.js scene components
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040814, 0.008);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 82;
    camera.position.y = 8;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ----------------------------------------------------------------------
    // 1. Generate Glowing Round Particle Texture
    // ----------------------------------------------------------------------
    function createCircleTexture(colorStr) {
        const matCanvas = document.createElement('canvas');
        matCanvas.width = 16;
        matCanvas.height = 16;
        const matCtx = matCanvas.getContext('2d');
        
        const gradient = matCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, colorStr);
        gradient.addColorStop(0.3, colorStr);
        gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.15)');
        gradient.addColorStop(1, 'transparent');
        
        matCtx.fillStyle = gradient;
        matCtx.fillRect(0, 0, 16, 16);
        
        return new THREE.CanvasTexture(matCanvas);
    }

    // Shared white glow texture (colored dynamically in materials)
    const glowTexture = createCircleTexture('#ffffff');

    // ----------------------------------------------------------------------
    // 2. Continents Math Mask (Self-contained vector world map)
    // ----------------------------------------------------------------------
    function isLand(lat, lon) {
        if (lat > 15 && lat < 72 && lon > -168 && lon < -52) return true; // North America
        if (lat > -55 && lat < 12 && lon > -82 && lon < -34) return true;  // South America
        if (lat > 20 && lat < 78 && lon > -10 && lon < 170) return true;   // Eurasia
        if (lat > 5 && lat < 20 && lon > 60 && lon < 130) return true;     // Southern Asia
        if (lat > -35 && lat < 37 && lon > -18 && lon < 51) return true;   // Africa
        if (lat > -44 && lat < -10 && lon > 112 && lon < 154) return true; // Australia
        if (lat > 60 && lat < 84 && lon > -73 && lon < -12) return true;   // Greenland
        return false;
    }

    function getCountryName(lon) {
        if (lon >= -168 && lon < -52) return Math.random() > 0.3 ? "United States" : "Canada";
        if (lon >= -82 && lon < -34) return Math.random() > 0.4 ? "Brazil" : "Argentina";
        if (lon >= -20 && lon < 45) {
            const r = Math.random();
            if (r < 0.35) return "United Kingdom";
            if (r < 0.65) return "Germany";
            if (r < 0.85) return "France";
            return "South Africa";
        }
        if (lon >= 45 && lon < 145) {
            const r = Math.random();
            if (r < 0.35) return "China";
            if (r < 0.65) return "India";
            if (r < 0.85) return "Russia";
            return "Japan";
        }
        if (lon >= 112 && lon < 154) return "Australia";
        return "Unknown Node";
    }

    // ----------------------------------------------------------------------
    // 3. Generate Dot-Matrix Globe Mesh
    // ----------------------------------------------------------------------
    const landPoints = [];
    const pointsData = [];
    const numGlobePoints = isMobile ? 3000 : 7500;

    for (let i = 0; i < numGlobePoints; i++) {
        const theta = (Math.random() * 2 - 1) * Math.PI;
        const phi = Math.asin(Math.random() * 2 - 1);
        const lat = phi * (180 / Math.PI);
        const lon = theta * (180 / Math.PI);

        if (isLand(lat, lon)) {
            const x = globeRadius * Math.cos(phi) * Math.sin(theta);
            const y = globeRadius * Math.sin(phi);
            const z = globeRadius * Math.cos(phi) * Math.cos(theta);

            const pos = new THREE.Vector3(x, y, z);
            landPoints.push(pos);
            pointsData.push({ pos, lat, lon });
        }
    }

    const globeGeometry = new THREE.BufferGeometry();
    const globePositions = new Float32Array(landPoints.length * 3);

    for (let i = 0; i < landPoints.length; i++) {
        const i3 = i * 3;
        globePositions[i3] = landPoints[i].x;
        globePositions[i3 + 1] = landPoints[i].y;
        globePositions[i3 + 2] = landPoints[i].z;
    }

    globeGeometry.setAttribute('position', new THREE.BufferAttribute(globePositions, 3));

    const globeMaterial = new THREE.PointsMaterial({
        size: isMobile ? 1.0 : 1.35,
        map: glowTexture,
        color: 0x00f2fe, // Cyan globe dots
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const globe = new THREE.Points(globeGeometry, globeMaterial);
    scene.add(globe);

    // Structural wireframe helper
    const sphereWire = new THREE.Mesh(
        new THREE.SphereGeometry(globeRadius - 0.2, 20, 20),
        new THREE.MeshBasicMaterial({
            color: 0x00f2fe,
            wireframe: true,
            transparent: true,
            opacity: 0.04
        })
    );
    globe.add(sphereWire);

    // ----------------------------------------------------------------------
    // 4. Live Attack Simulation System (Kaspersky Colored Comet Trails)
    // ----------------------------------------------------------------------
    const activeAttacks = [];
    const activeRipples = [];
    const ports = [22, 80, 443, 445, 3306, 8080, 25, 110, 993, 21];

    function createAttackObject(srcPoint, tgtPoint, threatInfo, port, ipStr, isLive) {
        const P1 = srcPoint.pos.clone();
        const P2 = tgtPoint.pos.clone();

        // Calculate bezier height control
        const M = P1.clone().add(P2).multiplyScalar(0.5);
        const heightMultiplier = 1.15 + (Math.random() * 0.35);
        const C = M.clone().normalize().multiplyScalar(globeRadius * heightMultiplier);
        const curve = new THREE.QuadraticBezierCurve3(P1, C, P2);

        // Path Line Geometry (Dynamic laser trail coordinates)
        const segmentCount = 15;
        const pathGeom = new THREE.BufferGeometry();
        const positions = new Float32Array(segmentCount * 3);
        
        // Start all line vertices at P1
        for (let j = 0; j < segmentCount; j++) {
            positions[j * 3] = P1.x;
            positions[j * 3 + 1] = P1.y;
            positions[j * 3 + 2] = P1.z;
        }
        pathGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const pathMat = new THREE.LineBasicMaterial({
            color: threatInfo.color,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            linewidth: 1.5,
            depthWrite: false
        });
        const pathLine = new THREE.Line(pathGeom, pathMat);
        globe.add(pathLine);

        // Tracer Point (Comet Head)
        const tracerGeom = new THREE.BufferGeometry();
        const tracerPos = new Float32Array(3);
        tracerPos[0] = P1.x;
        tracerPos[1] = P1.y;
        tracerPos[2] = P1.z;
        tracerGeom.setAttribute('position', new THREE.BufferAttribute(tracerPos, 3));

        const tracerMat = new THREE.PointsMaterial({
            size: isMobile ? 2.0 : 3.5,
            map: glowTexture,
            color: threatInfo.color,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const tracer = new THREE.Points(tracerGeom, tracerMat);
        globe.add(tracer);

        const attackObj = {
            line: pathLine,
            tracer: tracer,
            curve: curve,
            progress: 0,
            speed: 0.009 + Math.random() * 0.015,
            targetPos: P2,
            threatColor: threatInfo.color,
            segmentCount: segmentCount
        };

        activeAttacks.push(attackObj);

        // If simulated, dispatch log updates
        if (!isLive) {
            const payload = {
                source: getCountryName(srcPoint.lon),
                target: getCountryName(tgtPoint.lon),
                type: threatInfo.name,
                port: port,
                severity: threatInfo.severity,
                threatClass: threatInfo.name.split(' ')[0], // OAS, ODS, etc.
                colorHex: threatInfo.hex
            };

            const event = new CustomEvent('cyber-attack-log', { detail: payload });
            window.dispatchEvent(event);
        }
    }

    function spawnAttack() {
        if (pointsData.length < 2) return;

        // Select coordinates
        const srcIdx = Math.floor(Math.random() * pointsData.length);
        let tgtIdx = Math.floor(Math.random() * pointsData.length);
        while (srcIdx === tgtIdx) {
            tgtIdx = Math.floor(Math.random() * pointsData.length);
        }

        const src = pointsData[srcIdx];
        const tgt = pointsData[tgtIdx];
        const dist = src.pos.distanceTo(tgt.pos);

        if (dist < 15) return;

        // Select random threat type
        const randKey = threatKeys[Math.floor(Math.random() * threatKeys.length)];
        const threat = kasperskyThreats[randKey];
        const port = ports[Math.floor(Math.random() * ports.length)];

        createAttackObject(src, tgt, threat, port, null, false);
    }

    // Expose global method to trigger real-world SANS attacks
    window.triggerThreatMapAttack = function (ip, port, threatClass) {
        if (pointsData.length < 2) return;

        // Map threat class key
        const threat = kasperskyThreats[threatClass] || kasperskyThreats.ODS;

        // Project source location using IP first octet
        const firstOctet = parseInt(ip.split('.')[0]) || 0;
        const srcIdx = Math.floor((firstOctet / 256) * pointsData.length) % pointsData.length;
        const src = pointsData[srcIdx];

        // Target: Focus on Akhil's India base coordinate
        let tgt = null;
        const indiaPoints = pointsData.filter(pt => pt.lat > 8 && pt.lat < 35 && pt.lon > 68 && pt.lon < 97);
        if (indiaPoints.length > 0) {
            tgt = indiaPoints[Math.floor(Math.random() * indiaPoints.length)];
        } else {
            let tgtIdx = Math.floor(Math.random() * pointsData.length);
            while (srcIdx === tgtIdx) {
                tgtIdx = Math.floor(Math.random() * pointsData.length);
            }
            tgt = pointsData[tgtIdx];
        }

        if (src.pos.distanceTo(tgt.pos) < 10) return;

        createAttackObject(src, tgt, threat, port, ip, true);

        // Dispatch SANS feed updates
        const payload = {
            source: ip,
            target: "Akhil's Firewall (IN)",
            type: threat.name,
            port: port,
            severity: threat.severity,
            threatClass: threatClass,
            colorHex: threat.hex
        };

        const event = new CustomEvent('cyber-attack-log', { detail: payload });
        window.dispatchEvent(event);
    };

    function createRipple(position, colorVal) {
        const ringGeom = new THREE.RingGeometry(0.1, 1.8, 16);
        const ringMat = new THREE.MeshBasicMaterial({
            color: colorVal,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const rippleMesh = new THREE.Mesh(ringGeom, ringMat);
        
        rippleMesh.position.copy(position);
        
        // Orient ring mesh tangent to globe sphere
        const lookTarget = position.clone().multiplyScalar(1.2);
        rippleMesh.lookAt(lookTarget);

        globe.add(rippleMesh);

        activeRipples.push({
            mesh: rippleMesh,
            scale: 0.2,
            opacity: 0.85
        });
    }

    // ----------------------------------------------------------------------
    // 5. Ambient Cyber Grid & Binary Stream
    // ----------------------------------------------------------------------
    const gridHelper = new THREE.GridHelper(350, 40, 0x00f2fe, 0x070c1d);
    gridHelper.position.y = -35;
    gridHelper.material.opacity = 0.22;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    const binaryParticlesGeometry = new THREE.BufferGeometry();
    const binaryPositions = [];
    const binarySpeeds = [];

    for (let i = 0; i < particleCount; i++) {
        binaryPositions.push(
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 120 + 20,
            (Math.random() - 0.5) * 100
        );
        binarySpeeds.push(Math.random() * 0.08 + 0.04);
    }

    binaryParticlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(binaryPositions, 3));
    
    const binaryMaterial = new THREE.PointsMaterial({
        size: isMobile ? 1.0 : 1.4,
        map: glowTexture,
        color: 0x39ff14, // Green falling bits
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const binaryPoints = new THREE.Points(binaryParticlesGeometry, binaryMaterial);
    scene.add(binaryPoints);

    // ----------------------------------------------------------------------
    // 6. Camera Scroll-Driven Positions
    // ----------------------------------------------------------------------
    let scrollY = window.scrollY;
    let targetCameraZ = 82;
    let targetCameraY = 8;
    let targetCameraRotY = 0;
    let targetCameraRotX = 0;

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = maxScroll > 0 ? scrollY / maxScroll : 0;

        targetCameraZ = 82 - scrollFraction * 40; 
        targetCameraY = 8 - scrollFraction * 36;
        targetCameraRotY = -scrollFraction * 0.55;
        targetCameraRotX = -scrollFraction * 0.20;
    });

    // ----------------------------------------------------------------------
    // 7. Animation Loop (Comet Line Updates)
    // ----------------------------------------------------------------------
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Smooth camera dampening
        camera.position.z += (targetCameraZ - camera.position.z) * 0.045;
        camera.position.y += (targetCameraY - camera.position.y) * 0.045;
        camera.rotation.y += (targetCameraRotY - camera.rotation.y) * 0.045;
        camera.rotation.x += (targetCameraRotX - camera.rotation.x) * 0.045;

        // Rotate globe
        globe.rotation.y = time * 0.04;
        globe.rotation.x = Math.sin(time * 0.02) * 0.12;

        // Attack spawn checks
        if (!window.isLiveThreatFeedActive) {
            if (activeAttacks.length < maxActiveAttacks && Math.random() < 0.15) {
                spawnAttack();
            }
        }

        // Update comet geometries and tracer endpoints
        for (let i = activeAttacks.length - 1; i >= 0; i--) {
            const attack = activeAttacks[i];
            attack.progress += attack.speed;

            if (attack.progress >= 1.0) {
                createRipple(attack.targetPos, attack.threatColor);

                globe.remove(attack.line);
                globe.remove(attack.tracer);
                attack.line.geometry.dispose();
                attack.line.material.dispose();
                attack.tracer.geometry.dispose();
                attack.tracer.material.dispose();

                activeAttacks.splice(i, 1);
            } else {
                // Update Comet Trail (Laser Streak Segment)
                const startProg = Math.max(0, attack.progress - 0.2); // Trail length of 0.2
                const endProg = attack.progress;
                const linePositions = attack.line.geometry.attributes.position.array;
                
                for (let j = 0; j < attack.segmentCount; j++) {
                    const ratio = j / (attack.segmentCount - 1);
                    const t = startProg + ratio * (endProg - startProg);
                    const pt = attack.curve.getPointAt(t);

                    const j3 = j * 3;
                    linePositions[j3] = pt.x;
                    linePositions[j3 + 1] = pt.y;
                    linePositions[j3 + 2] = pt.z;
                }
                attack.line.geometry.attributes.position.needsUpdate = true;

                // Update Tracer Head coordinate
                const currentHead = attack.curve.getPointAt(attack.progress);
                const tracerPositions = attack.tracer.geometry.attributes.position.array;
                tracerPositions[0] = currentHead.x;
                tracerPositions[1] = currentHead.y;
                tracerPositions[2] = currentHead.z;
                attack.tracer.geometry.attributes.position.needsUpdate = true;
            }
        }

        // Expand & Fade Ripples
        for (let i = activeRipples.length - 1; i >= 0; i--) {
            const rip = activeRipples[i];
            rip.scale += 0.08;
            rip.opacity -= 0.035;

            rip.mesh.scale.set(rip.scale, rip.scale, rip.scale);
            rip.mesh.material.opacity = rip.opacity;

            if (rip.opacity <= 0) {
                globe.remove(rip.mesh);
                rip.mesh.geometry.dispose();
                rip.mesh.material.dispose();
                activeRipples.splice(i, 1);
            }
        }

        // Move falling matrix bits
        const binaryPosAttr = binaryParticlesGeometry.attributes.position;
        const binaryCoords = binaryPosAttr.array;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            binaryCoords[i3 + 1] -= binarySpeeds[i];

            if (binaryCoords[i3 + 1] < -55) {
                binaryCoords[i3] = (Math.random() - 0.5) * 200;
                binaryCoords[i3 + 1] = 65;
                binaryCoords[i3 + 2] = (Math.random() - 0.5) * 100;
            }
        }
        binaryPosAttr.needsUpdate = true;
        binaryPoints.rotation.y = -time * 0.008;

        renderer.render(scene, camera);
    }

    // Resize handler
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    animate();
})();
