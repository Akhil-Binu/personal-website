/**
 * ==========================================================================
 * Akhil Binu - Personal Cybersecurity Portfolio JavaScript (Vanilla JS)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Mobile Menu Toggle
    // ----------------------------------------------------------------------
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('open');
            // Toggle hamburger icon between menu and close
            const isOpen = navLinks.classList.contains('open');
            mobileToggle.innerHTML = isOpen 
                ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
                : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileToggle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                navLinks.classList.remove('open');
                mobileToggle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
            }
        });
    }

    // ----------------------------------------------------------------------
    // 2. Navigation Scroll Effect & Active Section Tracker
    // ----------------------------------------------------------------------
    const header = document.querySelector('header.hud-nav');
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header Class
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Section Tracking
        let currentSec = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSec = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSec}`) {
                item.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------------------------
    // 3. Scroll Reveal Observer
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ----------------------------------------------------------------------
    // 4. Skills Section Progress Animate
    // ----------------------------------------------------------------------
    const skillsSection = document.querySelector('.skills-sec');
    const fills = document.querySelectorAll('.skill-fill');
    
    if (skillsSection && fills.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fills.forEach(fill => {
                        const targetWidth = fill.getAttribute('data-level');
                        fill.style.width = `${targetWidth}%`;
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillsObserver.observe(skillsSection);
    }

    // ----------------------------------------------------------------------
    // 5. 3D Holographic Card Tilt Effect & Mouse Glow Coordinate
    // ----------------------------------------------------------------------
    const tiltCards = document.querySelectorAll('.cyber-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Get mouse position relative to card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set custom properties for hover radial gradient glow coordinates
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Skip tilt calculations on small touch screens for performance and layout stability
            if (window.innerWidth < 768) return;

            // Calculate tilt angles based on center coordinates
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (y - centerY) / centerY * 8; // Max tilt angle X axis (degrees)
            const tiltY = -(x - centerX) / centerX * 8; // Max tilt angle Y axis (degrees)

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.015, 1.015, 1.015)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ----------------------------------------------------------------------
    // 5.5 Certification Category Filter
    // ----------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            certCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else if (card.classList.contains(`${filterValue}-cert`)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 6. Interactive Hacker Terminal Simulator
    // ----------------------------------------------------------------------
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const shortcutButtons = document.querySelectorAll('.term-shortcut-btn');

    const terminalCommands = {
        help: [
            'Available system commands:',
            '  about          - Overview profile of Akhil Binu',
            '  skills         - List specialized technical skills & tools',
            '  certs          - Fetch current cybersecurity certifications',
            '  projects       - Details of featured security projects',
            '  contact        - Display secure communications channels',
            '  clear          - Clear terminal logs from viewport',
            '  banner         - Transmit logo banner payload'
        ],
        about: [
            '// PROFILE SUMMARY',
            'Name:        Akhil Binu',
            'Role:        Security Researcher & Full-Stack Cybersecurity Specialist',
            'Exp:         2+ Years in Vulnerability Research & Monitoring',
            'Bio:         Specialized in safeguarding web assets and networks. Passionate',
            '             about tutoring and teaching cyber concepts to global learners.',
            'Education:   B.Tech in Computer Science (2019 - 2023)'
        ],
        skills: [
            '// SPECIALIZED ARSENAL',
            'Core Areas:  Penetration Testing, VAPT, Network Security, Forensics',
            'Tools:       Nmap, Burp Suite, Metasploit, Wireshark, ELK Stack',
            'Languages:   Python, Bash Scripting, HTML/CSS/JavaScript'
        ],
        certs: [
            '// DEPLOYED CERTIFICATIONS',
            'TryHackMe:   Security Engineer, SOC Level 1, Pre Security, Advent of Cyber',
            'OPSWAT:      Email Security, File Security, Legacy Security, Network Security,',
            '             Secure Storage, Web Traffic Protection'
        ],
        projects: [
            '// FEATURED REPOSITORIES',
            '1. Automated Vulnerability Scanner (Python)',
            '   Features:    Dynamic security scanning (SQLi, XSS, Cmd Injection)',
            '                Generates severity analysis reports',
            '   Source:      https://github.com/Akhil-Binu/Akhil-Website-Scanner',
            '   Link:        https://akhil-website-scanner.vercel.app/',
            '',
            '2. Akhil Orbit Player (TypeScript)',
            '   Features:    Offline-first client-side course folder viewer/player',
            '                Drag-and-drop local folder parsing (Videos, PDFs, Markdown)',
            '   Source:      https://github.com/Akhil-Binu/Akhil-Orbit-Player',
            '   Link:        https://akhil-orbit-player.vercel.app/'
        ],
        contact: [
            '// COMMUNICATION LINK LOADED',
            'Email:       akhilbinuwakeup@gmail.com',
            'LinkedIn:    linkedin.com/in/akhilbinu',
            'WhatsApp:    +91 8330875109 (Consultation Available)'
        ],
        banner: [
            ' █████  ██   ██ ██   ██ ██ ██      ██████  ██ ███    ██ ██    ██ ',
            '██   ██ ██  ██  ██   ██ ██ ██      ██   ██ ██ ████   ██ ██    ██ ',
            '███████ █████   ███████ ██ ██      ██████  ██ ██ ██  ██ ██    ██ ',
            '██   ██ ██  ██  ██   ██ ██ ██      ██   ██ ██ ██  ██ ██ ██    ██ ',
            '██   ██ ██   ██ ██   ██ ██ ███████ ██████  ██ ██   ████  ██████  ',
            '====================== CYBER PORTFOLIO v2 ======================'
        ]
    };

    function bootTerminal() {
        if (!terminalBody) return;
        writeOutput([
            'AKHIL BINU [Version 2.0.0]',
            'System Link established. Encryption: AES-256.',
            'Type "help" to display operational commands.',
            ''
        ], 'term-success');
    }

    function writeOutput(lines, typeClass = '') {
        lines.forEach(line => {
            const div = document.createElement('div');
            div.className = `term-line ${typeClass}`;
            div.textContent = line;
            terminalBody.insertBefore(div, terminalBody.lastElementChild);
        });
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function handleCommand(cmdRaw) {
        const cmd = cmdRaw.trim().toLowerCase();
        
        // Output the prompt log of command typed
        const promptDiv = document.createElement('div');
        promptDiv.className = 'term-line';
        promptDiv.innerHTML = `<span class="term-prompt">guest@akhilbinu:~$</span> <span class="term-cmd">${cmdRaw}</span>`;
        terminalBody.insertBefore(promptDiv, terminalBody.lastElementChild);

        if (cmd === '') {
            // Do nothing
        } else if (cmd === 'clear') {
            const lines = terminalBody.querySelectorAll('.term-line');
            lines.forEach(line => line.remove());
        } else if (terminalCommands[cmd]) {
            let style = '';
            if (cmd === 'help') style = 'term-info';
            if (cmd === 'about' || cmd === 'skills') style = 'term-success';
            if (cmd === 'certs' || cmd === 'projects') style = 'term-warning';
            writeOutput(terminalCommands[cmd], style);
        } else {
            writeOutput([
                `Command not found: "${cmdRaw}".`,
                'Type "help" for a list of available routines.'
            ], 'term-error');
        }
        
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const commandText = terminalInput.value;
                handleCommand(commandText);
                terminalInput.value = '';
            }
        });

        // Click shortcut buttons to type and execute commands
        shortcutButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetCmd = btn.getAttribute('data-cmd');
                if (targetCmd) {
                    terminalInput.value = '';
                    
                    // Simulate typing effect
                    let i = 0;
                    const typingInterval = setInterval(() => {
                        if (i < targetCmd.length) {
                            terminalInput.value += targetCmd.charAt(i);
                            i++;
                        } else {
                            clearInterval(typingInterval);
                            setTimeout(() => {
                                handleCommand(targetCmd);
                                terminalInput.value = '';
                            }, 150);
                        }
                    }, 50);
                }
            });
        });
    }

    // Initialize Terminal on load
    bootTerminal();

    // ----------------------------------------------------------------------
    // 7. Dynamic Form Console Logger & EmailJS Interface
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formConsole = document.getElementById('form-status-console');

    function logFormConsole(msg, status = '') {
        if (!formConsole) return;
        
        let colorClass = 'term-info';
        if (status === 'success') colorClass = 'term-success';
        if (status === 'error') colorClass = 'term-error';
        if (status === 'working') colorClass = 'term-warning';

        formConsole.innerHTML = `<span class="${colorClass}">guest@sys_conn:~$ ${msg}</span>`;
    }

    if (contactForm) {
        logFormConsole('Secure Form terminal online. Ready for payload transmission.');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Transmitting...';
            
            logFormConsole('Initializing contact packet...', 'working');

            setTimeout(() => {
                logFormConsole('Resolving mail gateway [service_hil8nfb]...', 'working');
                
                setTimeout(() => {
                    logFormConsole('Transmitting encrypted payload key [yvpBBeVv...]...', 'working');

                    // EmailJS call
                    emailjs.sendForm('service_hil8nfb', 'template_u3ht3v2', contactForm)
                        .then(() => {
                            logFormConsole('Packet acknowledged. Message successfully delivered. 200 OK', 'success');
                            submitBtn.innerHTML = 'Sent Successfully';
                            contactForm.reset();
                            
                            setTimeout(() => {
                                submitBtn.disabled = false;
                                submitBtn.innerHTML = originalBtnHtml;
                            }, 3000);
                        })
                        .catch((error) => {
                            console.error('EmailJS Error:', error);
                            logFormConsole('Error: SMTP handshake failed. Check console or try WhatsApp.', 'error');
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = 'Retry Transmission';
                        });

                }, 800);
            }, 600);
        });
    }

    // ----------------------------------------------------------------------
    // 8. Matrix Rain Background Canvas (Highly Optimized & Mouse Interactive)
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/*[]{}@#$%&*+-';
        const fontSize = 14;
        let columns = Math.floor(width / fontSize);

        let drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // staggered offset start
        }

        // Track mouse position globally for background hover effect
        let mouseX = -1000;
        let mouseY = -1000;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        function drawMatrix() {
            // Fade effect to create rain trail
            ctx.fillStyle = 'rgba(4, 8, 20, 0.08)'; // matches body background
            ctx.fillRect(0, 0, width, height);

            ctx.font = `500 ${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = letters.charAt(Math.floor(Math.random() * letters.length));
                
                // Calculate position on canvas
                const charX = i * fontSize;
                const charY = drops[i] * fontSize;

                // Mouse interaction check: distance from character
                const dx = charX - mouseX;
                const dy = charY - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // If close to mouse, change styling and color
                if (distance < 120) {
                    ctx.fillStyle = '#00f2fe'; // Cyan color
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#00f2fe';
                } else {
                    ctx.fillStyle = '#0f6'; // Green color
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(char, charX, charY);

                // Reset drops when they reach screen bottom
                if (charY > height && Math.random() > 0.98) {
                    drops[i] = 0;
                }

                // Incremental drop speed (make drops near cursor fall faster)
                const speedMult = (distance < 120) ? 1.5 : 0.85;
                drops[i] += speedMult;
            }
        }

        let matrixInterval = setInterval(drawMatrix, 33);

        // Handle Resize
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / fontSize);
            
            drops = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = Math.random() * -100;
            }
        });
    }
});
