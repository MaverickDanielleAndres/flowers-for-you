// Configuration for sunflowers - mobile focused
function getConfig() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  let scale = 1.3;
  if (w >= 500) scale = 1.1;
  if (w >= 768) scale = 1.0;
  if (h < 700) scale *= 0.9;
  if (w < 360) scale = 1.1;
  
  return {
    scale,
    flowers: [
      { x: 50, stemH: 280 * scale, headSize: 110 * scale, petalCount: 22, innerCount: 14, rotation: 0, z: 5 },
      { x: 22, stemH: 240 * scale, headSize: 95 * scale, petalCount: 20, innerCount: 12, rotation: -6, z: 4 },
      { x: 78, stemH: 240 * scale, headSize: 95 * scale, petalCount: 20, innerCount: 12, rotation: 6, z: 4 },
      { x: 5,  stemH: 180 * scale, headSize: 75 * scale, petalCount: 18, innerCount: 10, rotation: -10, z: 3 },
      { x: 95, stemH: 180 * scale, headSize: 75 * scale, petalCount: 18, innerCount: 10, rotation: 10, z: 3 }
    ]
  };
}

function createSunflower(config, index) {
  const { x, stemH, headSize, petalCount, innerCount, rotation, z } = config;
  
  const sunflower = document.createElement('div');
  sunflower.className = `sunflower sunflower-${index + 1}`;
  sunflower.style.cssText = `
    left: ${x}%;
    transform: translateX(-50%) rotate(${rotation}deg);
    z-index: ${z};
  `;
  
  // Stem
  const stem = document.createElement('div');
  stem.className = 'stem';
  stem.style.cssText = `
    width: ${Math.max(6, headSize * 0.08)}px;
    height: ${stemH}px;
  `;
  
  // Flower head
  const head = document.createElement('div');
  head.className = 'flower-head';
  head.style.cssText = `
    width: ${headSize}px;
    height: ${headSize}px;
    bottom: ${stemH - 5}px;
  `;
  
  // Create outer petals
  const petalLength = headSize * 0.42;
  const petalWidth = headSize * 0.14;
  
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal petal-outer';
    const angle = (360 / petalCount) * i;
    const randomOffset = (Math.random() - 0.5) * 4;
    petal.style.cssText = `
      width: ${petalWidth}px;
      height: ${petalLength}px;
      transform: translate(-50%, -100%) rotate(${angle + randomOffset}deg) translateY(${-headSize * 0.28}px);
    `;
    head.appendChild(petal);
  }
  
  // Create inner petals
  const innerPetalLength = headSize * 0.35;
  const innerPetalWidth = headSize * 0.12;
  
  for (let i = 0; i < innerCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal petal-inner';
    const angle = (360 / innerCount) * i + (180 / petalCount);
    petal.style.cssText = `
      width: ${innerPetalWidth}px;
      height: ${innerPetalLength}px;
      transform: translate(-50%, -100%) rotate(${angle}deg) translateY(${-headSize * 0.18}px);
    `;
    head.appendChild(petal);
  }
  
  // Center
  const center = document.createElement('div');
  center.className = 'center';
  center.style.cssText = `
    width: ${headSize * 0.38}px;
    height: ${headSize * 0.38}px;
  `;
  head.appendChild(center);
  
  // Leaves - paired, connecting to stem at their bottom
  const leafW = headSize * 0.32;
  const leafH = headSize * 0.48;
  const leafGap = stemH * 0.25;
  const numPairs = index === 0 ? 3 : 2;
  
  for (let p = 0; p < numPairs; p++) {
    const bottomPos = stemH * 0.12 + (p * leafGap);
    
    const leftLeaf = document.createElement('div');
    leftLeaf.className = 'leaf leaf-l';
    leftLeaf.style.cssText = `
      width: ${leafW}px;
      height: ${leafH}px;
      bottom: ${bottomPos}px;
    `;
    stem.appendChild(leftLeaf);
    
    const rightLeaf = document.createElement('div');
    rightLeaf.className = 'leaf leaf-r';
    rightLeaf.style.cssText = `
      width: ${leafW}px;
      height: ${leafH}px;
      bottom: ${bottomPos + leafGap * 0.45}px;
    `;
    stem.appendChild(rightLeaf);
  }
  
  sunflower.appendChild(stem);
  sunflower.appendChild(head);
  
  return sunflower;
}

// Create floating hearts background
function createFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  if (!container) return;
  container.innerHTML = '';
  
  const heartEmojis = ['💕', '💗', '💖', '💝', '❤️', '🌸'];
  const count = window.innerWidth < 400 ? 10 : 15;
  
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.cssText = `
      left: ${Math.random() * 100}%;
      font-size: ${12 + Math.random() * 18}px;
      animation-delay: ${Math.random() * 8}s;
      animation-duration: ${6 + Math.random() * 4}s;
    `;
    container.appendChild(heart);
  }
}

function animateGarden() {
  const tl = gsap.timeline();
  
  // Glow with dramatic pulse
  tl.to('.glow', { opacity: 1, scale: 1.2, duration: 1.5, stagger: 0.2 }, 0);
  tl.to('.glow', { scale: 1, duration: 0.5, ease: 'power2.out' }, 1.5);
  
  // ENTIRE SUNFLOWERS rise from bottom
  tl.fromTo('.sunflower',
    { y: 500, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out', stagger: 0.2 },
    0.2
  );
  
  // TULIPS rise
  tl.fromTo('.tulip',
    { y: 400, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.3, ease: 'power2.out', stagger: 0.15 },
    0.5
  );
  
  // ROSES rise
  tl.fromTo('.rose',
    { y: 350, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', stagger: 0.18 },
    0.6
  );
  
  // GLOW FLOWERS rise
  tl.fromTo('.glow-flower',
    { y: 300, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.4, ease: 'power2.out', stagger: 0.12 },
    0.4
  );
  
  // Front plants grow
  tl.fromTo('.curved-leaf',
    { scaleY: 0, transformOrigin: 'bottom center' },
    { scaleY: 1, duration: 1.2, ease: 'elastic.out(1, 0.6)', stagger: 0.05 },
    0.5
  );
  
  // Bounce effect
  tl.to('.sunflower', {
    y: -20,
    duration: 0.3,
    ease: 'power2.out',
    stagger: 0.1
  }, 1.7);
  tl.to('.sunflower', {
    y: 0,
    duration: 0.5,
    ease: 'elastic.out(1, 0.4)',
    stagger: 0.1
  }, 2);
  
  // Flower heads shake
  tl.to('.flower-head', {
    rotation: 8,
    duration: 0.2,
    ease: 'power2.out',
    stagger: 0.1
  }, 2.2);
  tl.to('.flower-head', {
    rotation: -5,
    duration: 0.15,
    stagger: 0.1
  }, 2.4);
  tl.to('.flower-head', {
    rotation: 0,
    duration: 0.3,
    ease: 'elastic.out(1, 0.5)',
    stagger: 0.1
  }, 2.55);
  
  // Tulip and rose bounce
  tl.to('.tulip, .rose', {
    y: -10,
    duration: 0.25,
    ease: 'power2.out',
    stagger: 0.08
  }, 1.8);
  tl.to('.tulip, .rose', {
    y: 0,
    duration: 0.4,
    ease: 'elastic.out(1, 0.5)',
    stagger: 0.08
  }, 2.05);
  
  // Glow flowers pulse
  tl.to('.glow-flower-head', {
    scale: 1.15,
    duration: 0.3,
    ease: 'power2.out',
    stagger: 0.1
  }, 1.8);
  tl.to('.glow-flower-head', {
    scale: 1,
    duration: 0.4,
    ease: 'elastic.out(1, 0.5)',
    stagger: 0.1
  }, 2.1);
  
  // Glow petals sparkle
  tl.fromTo('.glow-petal',
    { opacity: 0.3, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, stagger: 0.02 },
    2.2
  );
  
  // Petals sparkle
  tl.fromTo('.petal',
    { opacity: 0.7 },
    { opacity: 1, duration: 0.3, stagger: 0.01 },
    2.4
  );
  
  // Messages with dramatic entrance
  gsap.set('.message', { y: 30, scale: 0.8 });
  tl.to('.message-1', { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    duration: 1, 
    ease: 'elastic.out(1, 0.6)' 
  }, 2.8);
  tl.to('.message-2', { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    duration: 1, 
    ease: 'elastic.out(1, 0.6)' 
  }, 3.2);
  tl.to('.message-3', { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    duration: 0.8, 
    ease: 'back.out(1.7)' 
  }, 3.6);
  
  // Sparkle bursts
  tl.call(() => createSparkleBurst(), null, 1.8);
  tl.call(() => createSparkleBurst(), null, 2.2);
  tl.call(() => createSparkleBurst(), null, 2.6);
  
  // Heart particles
  tl.call(() => createHeartBurst(), null, 3.3);
  
  // Start continuous animations
  tl.call(() => {
    animateGlowFlowers();
    startIdleAnimations();
  }, null, 4.2);
}

// Sparkle burst effect
function createSparkleBurst() {
  const container = document.getElementById('main-container');
  if (!container) return;
  const sparkleCount = 12;
  
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    const x = 20 + Math.random() * 60;
    const y = 30 + Math.random() * 40;
    
    sparkle.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      opacity: 0;
    `;
    container.appendChild(sparkle);
    
    gsap.to(sparkle, {
      opacity: 1,
      scale: 1.5,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    gsap.to(sparkle, {
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      opacity: 0,
      scale: 0,
      rotation: Math.random() * 360,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out',
      onComplete: () => sparkle.remove()
    });
  }
}

// Heart burst effect
function createHeartBurst() {
  const container = document.getElementById('main-container');
  if (!container) return;
  const heartCount = 8;
  
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    
    const x = 35 + Math.random() * 30;
    const y = 15 + Math.random() * 10;
    const size = 6 + Math.random() * 8;
    
    heart.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
    `;
    container.appendChild(heart);
    
    gsap.to(heart, {
      opacity: 0.9,
      scale: 1.2,
      duration: 0.4,
      delay: i * 0.1,
      ease: 'back.out(2)'
    });
    
    gsap.to(heart, {
      y: -150 - Math.random() * 100,
      x: (Math.random() - 0.5) * 150,
      rotation: (Math.random() - 0.5) * 60,
      opacity: 0,
      duration: 2.5 + Math.random(),
      delay: 0.4 + i * 0.1,
      ease: 'power1.out',
      onComplete: () => heart.remove()
    });
  }
}

function startIdleAnimations() {
  // Sunflower gentle sway
  document.querySelectorAll('.sunflower').forEach((flower, i) => {
    gsap.to(flower, {
      rotation: '+=4',
      duration: 2.5 + i * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
  
  // Tulip sway
  document.querySelectorAll('.tulip').forEach((tulip, i) => {
    gsap.to(tulip, {
      rotation: '+=6',
      duration: 2 + i * 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.1
    });
  });
  
  // Rose sway
  document.querySelectorAll('#garden .rose').forEach((rose, i) => {
    gsap.to(rose, {
      rotation: '+=5',
      duration: 2.3 + i * 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.15
    });
  });
  
  // Head bob
  document.querySelectorAll('.flower-head').forEach((head, i) => {
    gsap.to(head, {
      rotation: 5,
      duration: 3 + i * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
  
  // Tulip head movement
  document.querySelectorAll('.tulip-head').forEach((head, i) => {
    gsap.to(head, {
      rotation: 8,
      scaleY: 1.02,
      duration: 2.5 + i * 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
  
  // Rose head breathing
  document.querySelectorAll('#garden .rose-head').forEach((head, i) => {
    gsap.to(head, {
      scale: 1.05,
      rotation: 3,
      duration: 3 + i * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
  
  // Leaf flutter
  document.querySelectorAll('.sunflower .leaf-l').forEach((leaf, i) => {
    gsap.to(leaf, {
      rotation: '-=8',
      duration: 1.8 + Math.random() * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.05
    });
  });
  document.querySelectorAll('.sunflower .leaf-r').forEach((leaf, i) => {
    gsap.to(leaf, {
      rotation: '+=8',
      duration: 1.8 + Math.random() * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.05
    });
  });
  
  // Tulip leaf flutter
  document.querySelectorAll('.tulip-leaf').forEach((leaf, i) => {
    gsap.to(leaf, {
      rotation: '-=10',
      duration: 2 + Math.random() * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
  
  // Rose leaf flutter
  document.querySelectorAll('#garden .rose-leaf').forEach((leaf, i) => {
    gsap.to(leaf, {
      rotation: '+=8',
      scale: 1.05,
      duration: 2.2 + Math.random() * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
  
  // Glow pulse
  gsap.to('#main-container .glow', {
    opacity: 0.6,
    scale: 1.15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.4
  });
  
  // Text glow
  gsap.to('#main-container .message', {
    textShadow: '0 0 40px rgba(247, 201, 72, 0.6)',
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  // Grass sway
  document.querySelectorAll('.grass-blade').forEach((blade, i) => {
    const baseRotation = parseFloat(blade.dataset.rotation) || 0;
    gsap.to(blade, {
      rotation: baseRotation + (Math.random() > 0.5 ? 8 : -8),
      duration: 1.5 + Math.random() * 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 0.5
    });
  });
  
  // Long grass sway
  document.querySelectorAll('.long-grass-leaf').forEach((grass, i) => {
    const baseRotation = parseFloat(grass.dataset.rotation) || 0;
    gsap.to(grass, {
      rotation: baseRotation + (Math.random() > 0.5 ? 12 : -12),
      duration: 2 + Math.random() * 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 0.5
    });
  });
  
  // Fireflies
  document.querySelectorAll('.firefly').forEach((ff, i) => {
    const delay = Math.random() * 3;
    gsap.to(ff, {
      opacity: 0.9,
      duration: 1 + Math.random(),
      delay,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    gsap.to(ff, {
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 80,
      duration: 4 + Math.random() * 4,
      delay,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
}

function createGrass() {
  document.querySelectorAll('.grass-container, .ground').forEach(el => el.remove());
  
  const container = document.getElementById('main-container');
  if (!container) return;
  
  const ground = document.createElement('div');
  ground.className = 'ground';
  container.appendChild(ground);
  
  const grassContainer = document.createElement('div');
  grassContainer.className = 'grass-container';
  
  const w = window.innerWidth;
  const bladeCount = w < 400 ? 25 : w < 768 ? 40 : 60;
  
  for (let i = 0; i < bladeCount; i++) {
    const blade = document.createElement('div');
    blade.className = 'grass-blade';
    
    const height = 30 + Math.random() * 80;
    const left = Math.random() * 100;
    const rotation = (Math.random() - 0.5) * 30;
    const hue = 80 + Math.random() * 40;
    const lightness = 25 + Math.random() * 20;
    
    blade.style.cssText = `
      left: ${left}%;
      height: ${height}px;
      transform: rotate(${rotation}deg);
      background: linear-gradient(to top,
        hsl(${hue}, 50%, ${lightness - 10}%) 0%,
        hsl(${hue}, 60%, ${lightness}%) 50%,
        hsl(${hue}, 70%, ${lightness + 10}%) 100%
      );
      opacity: ${0.5 + Math.random() * 0.5};
    `;
    blade.dataset.rotation = rotation;
    grassContainer.appendChild(blade);
  }
  
  // Long curved grass
  const longGrassCount = w < 400 ? 4 : 8;
  for (let i = 0; i < longGrassCount; i++) {
    const longGrass = document.createElement('div');
    longGrass.className = 'long-grass-leaf';
    
    const height = 50 + Math.random() * 60;
    const left = Math.random() * 100;
    const rotation = (Math.random() - 0.5) * 50;
    const flip = Math.random() > 0.5;
    
    longGrass.style.cssText = `
      left: ${left}%;
      height: ${height}px;
      width: ${height * 0.4}px;
      transform: rotate(${rotation}deg) ${flip ? 'scaleX(-1)' : ''};
      border-color: hsl(${100 + Math.random() * 20}, 50%, ${30 + Math.random() * 15}%);
    `;
    longGrass.dataset.rotation = rotation;
    grassContainer.appendChild(longGrass);
  }
  
  container.appendChild(grassContainer);
}

function createFireflies() {
  document.querySelectorAll('#main-container .firefly').forEach(el => el.remove());
  
  const container = document.getElementById('main-container');
  if (!container) return;
  const count = window.innerWidth < 400 ? 5 : 10;
  
  for (let i = 0; i < count; i++) {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.cssText = `
      left: ${10 + Math.random() * 80}%;
      top: ${30 + Math.random() * 50}%;
    `;
    container.appendChild(firefly);
  }
}

// Glowing Petal Flower creation
function createGlowFlower(config) {
  const { x, stemH, headSize, rotation, z, petalCount = 5 } = config;
  
  const flower = document.createElement('div');
  flower.className = 'glow-flower';
  flower.style.cssText = `
    left: ${x}%;
    transform: translateX(-50%) rotate(${rotation}deg);
    z-index: ${z};
  `;
  
  const stem = document.createElement('div');
  stem.className = 'glow-flower-stem';
  stem.style.cssText = `
    width: 5px;
    height: ${stemH}px;
  `;
  
  // Leaves
  const leafCount = Math.floor(stemH / 40);
  for (let i = 0; i < leafCount; i++) {
    const isLeft = i % 2 === 0;
    const leaf = document.createElement('div');
    leaf.className = `glow-stem-leaf ${isLeft ? 'glow-stem-leaf-l' : 'glow-stem-leaf-r'}`;
    const leafSize = headSize * 0.35;
    const bottomPos = stemH * 0.15 + (i * (stemH * 0.2));
    
    leaf.style.cssText = `
      width: ${leafSize}px;
      height: ${leafSize * 1.4}px;
      bottom: ${bottomPos}px;
    `;
    stem.appendChild(leaf);
  }
  
  const head = document.createElement('div');
  head.className = 'glow-flower-head';
  head.style.cssText = `
    width: ${headSize}px;
    height: ${headSize}px;
    bottom: ${stemH - 5}px;
  `;
  
  const petalLength = headSize * 0.5;
  const petalWidth = headSize * 0.35;
  
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'glow-petal';
    const angle = (360 / petalCount) * i;
    petal.style.cssText = `
      width: ${petalWidth}px;
      height: ${petalLength}px;
      transform: translate(-50%, -100%) rotate(${angle}deg) translateY(${-headSize * 0.15}px);
    `;
    head.appendChild(petal);
  }
  
  const center = document.createElement('div');
  center.className = 'glow-flower-center';
  center.style.cssText = `
    width: ${headSize * 0.3}px;
    height: ${headSize * 0.3}px;
  `;
  head.appendChild(center);
  
  flower.appendChild(stem);
  flower.appendChild(head);
  
  return flower;
}

// Front decorative plants
function createFrontPlants() {
  document.querySelectorAll('.front-plant').forEach(el => el.remove());
  
  const container = document.getElementById('main-container');
  if (!container) return;
  const scale = window.innerWidth < 400 ? 0.7 : 1;
  
  // Left side
  const leftPlant = document.createElement('div');
  leftPlant.className = 'front-plant';
  leftPlant.style.cssText = `left: 8%; z-index: 20;`;
  
  for (let i = 0; i < 5; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'curved-leaf';
    const height = (50 + i * 15) * scale;
    const rotation = -30 + i * 12;
    leaf.style.cssText = `
      height: ${height}px;
      width: ${height * 0.3}px;
      transform: rotate(${rotation}deg);
      opacity: ${0.7 + i * 0.06};
    `;
    leaf.dataset.rotation = rotation;
    leftPlant.appendChild(leaf);
  }
  container.appendChild(leftPlant);
  
  // Right side
  const rightPlant = document.createElement('div');
  rightPlant.className = 'front-plant';
  rightPlant.style.cssText = `right: 8%; left: auto; z-index: 20;`;
  
  for (let i = 0; i < 5; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'curved-leaf';
    const height = (50 + i * 15) * scale;
    const rotation = 30 - i * 12;
    leaf.style.cssText = `
      height: ${height}px;
      width: ${height * 0.3}px;
      transform: rotate(${rotation}deg);
      opacity: ${0.7 + i * 0.06};
    `;
    leaf.dataset.rotation = rotation;
    rightPlant.appendChild(leaf);
  }
  container.appendChild(rightPlant);
}

function createGlowFlowers() {
  document.querySelectorAll('#garden .glow-flower').forEach(el => el.remove());
  
  const garden = document.getElementById('garden');
  if (!garden) return;
  const scale = window.innerWidth < 400 ? 0.9 : 1.1;
  
  const configs = [
    { x: 50, stemH: 200 * scale, headSize: 70 * scale, rotation: 0, z: 15, petalCount: 5 },
    { x: 35, stemH: 160 * scale, headSize: 55 * scale, rotation: -15, z: 14, petalCount: 5 },
    { x: 65, stemH: 150 * scale, headSize: 50 * scale, rotation: 12, z: 14, petalCount: 5 }
  ];
  
  configs.forEach(config => {
    const flower = createGlowFlower(config);
    garden.appendChild(flower);
  });
}

function animateGlowFlowers() {
  document.querySelectorAll('.glow-flower').forEach((flower, i) => {
    gsap.to(flower, {
      rotation: '+=5',
      duration: 2.5 + i * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.2
    });
  });
  
  document.querySelectorAll('.glow-flower-head').forEach((head, i) => {
    gsap.to(head, {
      scale: 1.05,
      filter: 'drop-shadow(0 0 20px rgba(255, 241, 118, 0.8))',
      duration: 2 + i * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
  
  document.querySelectorAll('.glow-stem-leaf-l').forEach((leaf, i) => {
    gsap.to(leaf, {
      rotation: '-=10',
      duration: 1.5 + Math.random() * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.1
    });
  });
  
  document.querySelectorAll('.glow-stem-leaf-r').forEach((leaf, i) => {
    gsap.to(leaf, {
      rotation: '+=10',
      duration: 1.5 + Math.random() * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.1
    });
  });
  
  document.querySelectorAll('.curved-leaf').forEach((leaf, i) => {
    const baseRotation = parseFloat(leaf.dataset.rotation) || 0;
    gsap.to(leaf, {
      rotation: baseRotation + (Math.random() > 0.5 ? 8 : -8),
      duration: 2 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.05
    });
  });
}

// Tulip creation
function createTulip(config) {
  const { x, stemH, headSize, color, rotation, z } = config;
  
  const tulip = document.createElement('div');
  tulip.className = `tulip tulip-${color}`;
  tulip.style.cssText = `
    left: ${x}%;
    transform: translateX(-50%) rotate(${rotation}deg);
    z-index: ${z};
  `;
  
  const stem = document.createElement('div');
  stem.className = 'tulip-stem';
  stem.style.height = stemH + 'px';
  
  const head = document.createElement('div');
  head.className = 'tulip-head';
  head.style.cssText = `
    width: ${headSize}px;
    height: ${headSize * 1.3}px;
    bottom: ${stemH - 5}px;
  `;
  
  for (let i = 0; i < 5; i++) {
    const petal = document.createElement('div');
    petal.className = 'tulip-petal';
    const angle = (i - 2) * 15;
    const offset = Math.abs(i - 2) * 2;
    petal.style.cssText = `
      width: ${headSize * 0.5}px;
      height: ${headSize * 1.1}px;
      left: ${50 + (i - 2) * 12}%;
      bottom: ${offset}px;
      transform: translateX(-50%) rotate(${angle}deg);
      z-index: ${5 - Math.abs(i - 2)};
    `;
    head.appendChild(petal);
  }
  
  const leaf = document.createElement('div');
  leaf.className = 'tulip-leaf';
  leaf.style.cssText = `
    width: ${headSize * 0.3}px;
    height: ${stemH * 0.6}px;
    bottom: ${stemH * 0.1}px;
    left: 50%;
    transform: translateX(-100%) rotate(-20deg);
  `;
  stem.appendChild(leaf);
  
  tulip.appendChild(stem);
  tulip.appendChild(head);
  
  return tulip;
}

// Rose creation
function createRose(config) {
  const { x, stemH, headSize, color, rotation, z } = config;
  
  const rose = document.createElement('div');
  rose.className = `rose rose-${color}`;
  rose.style.cssText = `
    left: ${x}%;
    transform: translateX(-50%) rotate(${rotation}deg);
    z-index: ${z};
  `;
  
  const stem = document.createElement('div');
  stem.className = 'rose-stem';
  stem.style.height = stemH + 'px';
  
  // Add thorns
  const thornCount = Math.floor(stemH / 30);
  for (let i = 0; i < thornCount; i++) {
    const thorn = document.createElement('div');
    thorn.className = 'rose-thorn';
    const isLeft = i % 2 === 0;
    thorn.style.cssText = `
      bottom: ${stemH * 0.15 + i * 30}px;
      ${isLeft ? 'right: 100%;' : 'left: 100%;'}
      transform: ${isLeft ? 'rotate(-45deg)' : 'rotate(45deg) scaleX(-1)'};
    `;
    stem.appendChild(thorn);
  }
  
  const head = document.createElement('div');
  head.className = 'rose-head';
  head.style.cssText = `
    width: ${headSize}px;
    height: ${headSize}px;
    bottom: ${stemH - 5}px;
  `;
  
  // Spiral petals
  const petalLayers = 3;
  const petalsPerLayer = [5, 7, 9];
  
  for (let layer = 0; layer < petalLayers; layer++) {
    const count = petalsPerLayer[layer];
    const layerSize = 1 - layer * 0.2;
    
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'rose-petal';
      const angle = (360 / count) * i + layer * 20;
      const size = headSize * 0.3 * layerSize;
      petal.style.cssText = `
        width: ${size}px;
        height: ${size * 1.3}px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -100%) rotate(${angle}deg) translateY(${-headSize * 0.15 * layerSize}px);
        z-index: ${layer + 1};
      `;
      head.appendChild(petal);
    }
  }
  
  const center = document.createElement('div');
  center.className = 'rose-center';
  center.style.cssText = `
    width: ${headSize * 0.2}px;
    height: ${headSize * 0.2}px;
  `;
  head.appendChild(center);
  
  // Leaves
  const leaf1 = document.createElement('div');
  leaf1.className = 'rose-leaf';
  leaf1.style.cssText = `
    width: ${headSize * 0.25}px;
    height: ${headSize * 0.35}px;
    bottom: ${stemH * 0.3}px;
    left: 50%;
    transform: translateX(-120%) rotate(-30deg);
  `;
  stem.appendChild(leaf1);
  
  const leaf2 = document.createElement('div');
  leaf2.className = 'rose-leaf';
  leaf2.style.cssText = `
    width: ${headSize * 0.2}px;
    height: ${headSize * 0.3}px;
    bottom: ${stemH * 0.5}px;
    left: 50%;
    transform: rotate(25deg);
  `;
  stem.appendChild(leaf2);
  
  rose.appendChild(stem);
  rose.appendChild(head);
  
  return rose;
}

function buildGardenWithVariety() {
  const garden = document.getElementById('garden');
  if (!garden) return;
  garden.innerHTML = '';
  
  const config = getConfig();
  const scale = config.scale;
  
  // Main sunflowers
  const mainSunflowers = [config.flowers[0], config.flowers[1], config.flowers[2]];
  mainSunflowers.forEach((flowerConfig, i) => {
    const sunflower = createSunflower(flowerConfig, i);
    garden.appendChild(sunflower);
  });
  
  // Tulips
  const tulipConfigs = [
    { x: 8, stemH: 120 * scale, headSize: 35 * scale, color: 'red', rotation: -8, z: 2 },
    { x: 92, stemH: 130 * scale, headSize: 38 * scale, color: 'pink', rotation: 8, z: 2 },
    { x: 15, stemH: 100 * scale, headSize: 30 * scale, color: 'purple', rotation: -5, z: 1 },
    { x: 85, stemH: 95 * scale, headSize: 28 * scale, color: 'red', rotation: 6, z: 1 }
  ];
  
  tulipConfigs.forEach(tc => {
    const tulip = createTulip(tc);
    garden.appendChild(tulip);
  });
  
  // Roses
  const roseConfigs = [
    { x: 25, stemH: 90 * scale, headSize: 40 * scale, color: 'red', rotation: -3, z: 2 },
    { x: 75, stemH: 85 * scale, headSize: 38 * scale, color: 'white', rotation: 4, z: 2 }
  ];
  
  roseConfigs.forEach(rc => {
    const rose = createRose(rc);
    garden.appendChild(rose);
  });
}

// ============ ROSE SCENE ============

function createRoseGarden() {
  const garden = document.getElementById('rose-garden');
  if (!garden) return;
  garden.innerHTML = '';
  
  const scale = window.innerWidth < 400 ? 1.0 : 1.2;
  const colors = ['red', 'pink', 'white', 'red', 'pink'];
  
  // Helper function to add randomness
  const randomize = (value, variance) => value + (Math.random() - 0.5) * variance * 2;
  
  // Base positions - will be randomized
  const baseConfigs = [
    // Center tall roses - bigger, taller, closer to text
    { baseX: 50, baseH: 340, baseHead: 95, z: 10 },
    { baseX: 30, baseH: 310, baseHead: 85, z: 9 },
    { baseX: 70, baseH: 300, baseHead: 82, z: 9 },
    
    // Medium roses - bigger
    { baseX: 18, baseH: 260, baseHead: 72, z: 8 },
    { baseX: 82, baseH: 255, baseHead: 70, z: 8 },
    { baseX: 40, baseH: 280, baseHead: 75, z: 7 },
    { baseX: 60, baseH: 275, baseHead: 74, z: 7 },
    
    // Side roses - bigger
    { baseX: 8, baseH: 200, baseHead: 60, z: 6 },
    { baseX: 92, baseH: 195, baseHead: 58, z: 6 },
    { baseX: 25, baseH: 230, baseHead: 65, z: 5 },
    { baseX: 75, baseH: 225, baseHead: 64, z: 5 },
    
    // Fill gaps with more flowers
    { baseX: 45, baseH: 250, baseHead: 68, z: 6 },
    { baseX: 55, baseH: 245, baseHead: 66, z: 6 },
    { baseX: 12, baseH: 180, baseHead: 55, z: 4 },
    { baseX: 88, baseH: 175, baseHead: 54, z: 4 },
  ];
  
  // Create roses with randomized positions for natural look
  baseConfigs.forEach((config, i) => {
    const rc = {
      x: randomize(config.baseX, 4), // Random X position variance
      stemH: randomize(config.baseH * scale, 20), // Random height variance
      headSize: randomize(config.baseHead * scale, 8), // Random head size variance
      color: colors[i % colors.length],
      rotation: randomize(0, 8), // Random tilt -8 to 8 degrees
      z: config.z
    };
    
    const rose = createRose(rc);
    garden.appendChild(rose);
  });
}

function createRoseSceneElements() {
  const scene = document.getElementById('rose-scene');
  if (!scene) return;
  
  // Remove old elements
  scene.querySelectorAll('.grass-container, .ground, .firefly, .star-particle').forEach(el => el.remove());
  
  // Ground
  const ground = document.createElement('div');
  ground.className = 'ground';
  scene.appendChild(ground);
  
  // Grass
  const grassContainer = document.createElement('div');
  grassContainer.className = 'grass-container';
  
  const bladeCount = window.innerWidth < 400 ? 15 : 25;
  for (let i = 0; i < bladeCount; i++) {
    const blade = document.createElement('div');
    blade.className = 'grass-blade';
    const height = 25 + Math.random() * 60;
    const left = Math.random() * 100;
    const rotation = (Math.random() - 0.5) * 25;
    
    blade.style.cssText = `
      left: ${left}%;
      height: ${height}px;
      transform: rotate(${rotation}deg);
      background: linear-gradient(to top,
        hsl(120, 40%, 15%) 0%,
        hsl(120, 50%, 25%) 50%,
        hsl(120, 60%, 35%) 100%
      );
      opacity: ${0.4 + Math.random() * 0.4};
    `;
    blade.dataset.rotation = rotation;
    grassContainer.appendChild(blade);
  }
  scene.appendChild(grassContainer);
  
  // Fireflies with pink/red tint - reduced count
  const fireflyCount = window.innerWidth < 400 ? 5 : 8;
  for (let i = 0; i < fireflyCount; i++) {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb'];
    firefly.style.cssText = `
      left: ${10 + Math.random() * 80}%;
      top: ${20 + Math.random() * 60}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      box-shadow: 0 0 15px 5px ${colors[Math.floor(Math.random() * colors.length)]};
    `;
    scene.appendChild(firefly);
  }
  
  // Stars - reduced count
  const starCount = window.innerWidth < 400 ? 10 : 18;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 40}%;
      animation-delay: ${Math.random() * 2}s;
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
    `;
    scene.appendChild(star);
  }
}

function createButterflies(container) {
  const count = window.innerWidth < 400 ? 2 : 4;
  
  for (let i = 0; i < count; i++) {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    
    const colors = [
      { wing: '#FF69B4', spot: '#FF1493' },
      { wing: '#FFB6C1', spot: '#FF69B4' },
      { wing: '#FFC0CB', spot: '#FFB6C1' }
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 15 + Math.random() * 10;
    
    butterfly.innerHTML = `
      <div class="butterfly-body"></div>
      <div class="butterfly-wing left" style="
        width: ${size}px;
        height: ${size * 1.2}px;
        background: radial-gradient(circle at 30% 30%, ${color.spot} 20%, ${color.wing} 60%);
        top: 0;
      "></div>
      <div class="butterfly-wing right" style="
        width: ${size}px;
        height: ${size * 1.2}px;
        background: radial-gradient(circle at 70% 30%, ${color.spot} 20%, ${color.wing} 60%);
        top: 0;
      "></div>
    `;
    
    butterfly.style.cssText = `
      left: ${20 + Math.random() * 60}%;
      top: ${30 + Math.random() * 40}%;
    `;
    
    container.appendChild(butterfly);
  }
}

function animateRoseScene() {
  const tl = gsap.timeline();
  
  // Glows
  tl.to('#rose-scene .glow', { opacity: 1, scale: 1.2, duration: 1.5, stagger: 0.2 }, 0);
  
  // Roses rise from bottom - same style as sunflowers
  tl.fromTo('#rose-garden .rose',
    { y: 500, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out', stagger: 0.15 },
    0.2
  );
  
  // Simple bounce effect like sunflowers
  tl.to('#rose-garden .rose', {
    y: -20,
    duration: 0.3,
    ease: 'power2.out',
    stagger: 0.1
  }, 1.7);
  tl.to('#rose-garden .rose', {
    y: 0,
    duration: 0.5,
    ease: 'elastic.out(1, 0.4)',
    stagger: 0.1
  }, 2);
  
  // Rose heads shake like sunflower heads
  tl.to('#rose-garden .rose-head', {
    rotation: 8,
    duration: 0.2,
    ease: 'power2.out',
    stagger: 0.08
  }, 2.2);
  tl.to('#rose-garden .rose-head', {
    rotation: -5,
    duration: 0.15,
    stagger: 0.08
  }, 2.4);
  tl.to('#rose-garden .rose-head', {
    rotation: 0,
    duration: 0.3,
    ease: 'elastic.out(1, 0.5)',
    stagger: 0.08
  }, 2.55);
  
  // Messages with simple entrance
  gsap.set('#rose-scene .message', { y: 30, scale: 0.8 });
  tl.to('#rose-scene .message-1', { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    duration: 1, 
    ease: 'elastic.out(1, 0.6)' 
  }, 2.8);
  tl.to('#rose-scene .message-2', { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    duration: 1, 
    ease: 'elastic.out(1, 0.6)' 
  }, 3.2);
  tl.to('#rose-scene .message-4', { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    duration: 0.8, 
    ease: 'back.out(1.7)' 
  }, 3.6);
  
  // Start simple idle animations
  tl.call(() => startRoseIdleAnimations(), null, 4);
}

function startRoseIdleAnimations() {
  // Rose gentle sway - same as sunflowers
  document.querySelectorAll('#rose-garden .rose').forEach((rose, i) => {
    gsap.to(rose, {
      rotation: '+=4',
      duration: 2.5 + i * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
  
  // Rose head bob - like sunflower heads
  document.querySelectorAll('#rose-garden .rose-head').forEach((head, i) => {
    gsap.to(head, {
      rotation: 5,
      duration: 3 + i * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
  
  // Rose leaf flutter - like sunflower leaves
  document.querySelectorAll('#rose-garden .rose-leaf').forEach((leaf, i) => {
    gsap.to(leaf, {
      rotation: '+=8',
      duration: 1.8 + Math.random() * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.05
    });
  });
  
  // Glow pulse
  gsap.to('#rose-scene .glow', {
    opacity: 0.6,
    scale: 1.15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.4
  });
  
  // Message glow
  gsap.to('#rose-scene .message', {
    textShadow: '0 0 40px rgba(255, 105, 180, 0.6)',
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  // Fireflies - simple animation
  document.querySelectorAll('#rose-scene .firefly').forEach((ff, i) => {
    const delay = Math.random() * 3;
    gsap.to(ff, {
      opacity: 0.9,
      duration: 1 + Math.random(),
      delay,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    gsap.to(ff, {
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 80,
      duration: 4 + Math.random() * 4,
      delay,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
  
  // Grass sway
  document.querySelectorAll('#rose-scene .grass-blade').forEach((blade, i) => {
    const baseRotation = parseFloat(blade.dataset.rotation) || 0;
    gsap.to(blade, {
      rotation: baseRotation + (Math.random() > 0.5 ? 8 : -8),
      duration: 1.5 + Math.random() * 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 0.5
    });
  });
}

function createHeartsExplosion() {
  const container = document.getElementById('hearts-explosion');
  if (!container) return;
  container.innerHTML = '';
  
  const heartEmojis = ['❤️', '💕', '💗', '💖', '💝', '💘', '💓', '💞', '🌹', '✨'];
  const count = 50;
  
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'explosion-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    const startX = 50;
    const startY = 50;
    
    heart.style.cssText = `
      left: ${startX}%;
      top: ${startY}%;
      font-size: ${20 + Math.random() * 30}px;
    `;
    container.appendChild(heart);
    
    // Animate explosion outward
    const angle = (Math.PI * 2 / count) * i;
    const distance = 150 + Math.random() * 200;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;
    
    gsap.to(heart, {
      opacity: 1,
      scale: 1.5,
      duration: 0.3,
      delay: i * 0.02,
      ease: 'back.out(2)'
    });
    
    gsap.to(heart, {
      x: endX,
      y: endY,
      rotation: Math.random() * 360,
      opacity: 0,
      scale: 0.5,
      duration: 2 + Math.random(),
      delay: 0.3 + i * 0.02,
      ease: 'power2.out'
    });
  }
}

// Button click handler - transition to rose scene
function handleYesClick() {
  // Disable buttons
  document.querySelectorAll('.yes-btn').forEach(btn => {
    btn.disabled = true;
    btn.style.pointerEvents = 'none';
  });
  
  // Create beautiful transition
  const mainContainer = document.getElementById('main-container');
  const roseScene = document.getElementById('rose-scene');
  
  // Fade out main scene
  gsap.to('#main-container .message', {
    opacity: 0,
    y: -30,
    duration: 0.5,
    stagger: 0.1
  });
  
  gsap.to('#main-container .sunflower, #main-container .tulip, #main-container .rose, #main-container .glow-flower', {
    y: 80,
    opacity: 0,
    duration: 0.7,
    stagger: 0.05,
    ease: 'power2.in'
  });
  
  gsap.to(mainContainer, {
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    onComplete: () => {
      mainContainer.style.display = 'none';
      
      // Show rose scene
      roseScene.style.display = 'block';
      roseScene.style.opacity = 0;
      
      // Build rose scene
      createRoseGarden();
      createRoseSceneElements();
      
      // Fade in rose scene and animate
      gsap.to(roseScene, {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          animateRoseScene();
        }
      });
    }
  });
}

// Initialize
window.addEventListener('load', () => {
  buildGardenWithVariety();
  createGrass();
  createGlowFlowers();
  createFrontPlants();
  createFireflies();
  createFloatingHearts();
  animateGarden();
  
  // Add button click handlers
  document.getElementById('yes-btn-1').addEventListener('click', handleYesClick);
  document.getElementById('yes-btn-2').addEventListener('click', handleYesClick);
});

// Handle resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const mainVisible = document.getElementById('main-container').style.display !== 'none';
    
    if (mainVisible) {
      gsap.killTweensOf('*');
      buildGardenWithVariety();
      createGrass();
      createGlowFlowers();
      createFrontPlants();
      createFireflies();
      createFloatingHearts();
      animateGarden();
    } else {
      gsap.killTweensOf('*');
      createRoseGarden();
      createRoseSceneElements();
      animateRoseScene();
    }
  }, 300);
});
