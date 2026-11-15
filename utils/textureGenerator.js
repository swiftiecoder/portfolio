// A basic SVG containing text-like placeholder lines.
const svgString = `
<svg width="400" height="520" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#FDFBF7"/>
  <!-- Header / Name -->
  <rect x="40" y="40" width="200" height="24" fill="#333" rx="2"/>
  <rect x="40" y="70" width="120" height="10" fill="#666" rx="2"/>
  
  <!-- Content Blocks -->
  <!-- Block 1 -->
  <rect x="40" y="110" width="100" height="12" fill="#555" rx="2"/>
  <rect x="40" y="130" width="320" height="6" fill="#888" rx="2"/>
  <rect x="40" y="142" width="300" height="6" fill="#888" rx="2"/>
  <rect x="40" y="154" width="280" height="6" fill="#888" rx="2"/>
  
  <!-- Block 2 -->
  <rect x="40" y="190" width="140" height="12" fill="#555" rx="2"/>
  <rect x="40" y="210" width="320" height="6" fill="#888" rx="2"/>
  <rect x="40" y="222" width="310" height="6" fill="#888" rx="2"/>
  <rect x="40" y="234" width="290" height="6" fill="#888" rx="2"/>
  <rect x="40" y="246" width="150" height="6" fill="#888" rx="2"/>
  
  <!-- Block 3 -->
  <rect x="40" y="282" width="110" height="12" fill="#555" rx="2"/>
  <rect x="40" y="302" width="320" height="6" fill="#888" rx="2"/>
  <rect x="40" y="314" width="300" height="6" fill="#888" rx="2"/>
  <rect x="40" y="326" width="315" height="6" fill="#888" rx="2"/>
  <rect x="40" y="338" width="220" height="6" fill="#888" rx="2"/>
  
  <!-- Section Divider -->
  <rect x="40" y="380" width="320" height="2" fill="#DDD" />
  
  <!-- Additional Footer/Skills Block -->
  <rect x="40" y="410" width="90" height="12" fill="#555" rx="2"/>
  <rect x="40" y="430" width="60" height="6" fill="#888" rx="2"/>
  <rect x="110" y="430" width="50" height="6" fill="#888" rx="2"/>
  <rect x="170" y="430" width="70" height="6" fill="#888" rx="2"/>
  <rect x="250" y="430" width="40" height="6" fill="#888" rx="2"/>
  
  <rect x="40" y="442" width="55" height="6" fill="#888" rx="2"/>
  <rect x="105" y="442" width="65" height="6" fill="#888" rx="2"/>
  <rect x="180" y="442" width="45" height="6" fill="#888" rx="2"/>
</svg>
`

export const generateDocumentTexture = (THREE) => {
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  
  const loader = new THREE.TextureLoader()
  const tex = loader.load(url, () => {
    URL.revokeObjectURL(url) // Clean up
  })
  
  tex.colorSpace = THREE.SRGBColorSpace
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  
  return tex
}

/**
 * Generates a procedural walnut wood grain texture for the desk surface.
 */
export const createWalnutWoodTexture = (THREE) => {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Warm walnut base
  ctx.fillStyle = '#5C3A21'
  ctx.fillRect(0, 0, 512, 512)

  // Horizontal wood-grain bands
  const bandColors = ['#4A2E19', '#6E472B', '#3D2514', '#55341D']
  for (let i = 0; i < 42; i++) {
    ctx.fillStyle = bandColors[i % bandColors.length]
    ctx.globalAlpha = 0.14 + (i % 4) * 0.04
    const y = (i * 12.2) % 512
    const h = 4 + (i % 5) * 3
    ctx.fillRect(0, y, 512, h)
  }

  // Fine wavy organic grain fibers (deterministic pseudo-random using sin)
  ctx.globalAlpha = 0.24
  ctx.lineWidth = 1.2
  for (let i = 0; i < 160; i++) {
    ctx.strokeStyle = i % 3 === 0 ? '#3D2514' : '#6E472B'
    const baseY = (i / 160) * 512
    const phase = i * 0.73
    const amp = 2 + (i % 4) * 1.4
    ctx.beginPath()
    ctx.moveTo(0, baseY)
    for (let x = 32; x <= 512; x += 32) {
      const wave = Math.sin((x / 512) * Math.PI * 2 + phase) * amp
      ctx.lineTo(x, baseY + wave)
    }
    ctx.stroke()
  }

  ctx.globalAlpha = 1.0
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(2, 2)
  tex.needsUpdate = true
  return tex
}

/**
 * Generates an archival parchment certificate texture with double gold rules,
 * centered serif typography, and a crimson/gold wax seal emblem.
 */
export const createCertificateTexture = (THREE, { title, issuer, date, id } = {}) => {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 384
  const ctx = canvas.getContext('2d')

  // Archival parchment background
  ctx.fillStyle = '#FAF6EE'
  ctx.fillRect(0, 0, 512, 384)

  // Subtle corner vignette tint
  const grad = ctx.createRadialGradient(256, 192, 60, 256, 192, 320)
  grad.addColorStop(0, 'rgba(255, 253, 248, 0.2)')
  grad.addColorStop(1, 'rgba(218, 204, 180, 0.35)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 384)

  // Outer dark-gold frame border & inner hairline border
  ctx.strokeStyle = '#8A6D3B'
  ctx.lineWidth = 5
  ctx.strokeRect(18, 18, 476, 348)

  ctx.strokeStyle = '#C5A059'
  ctx.lineWidth = 1.5
  ctx.strokeRect(28, 28, 456, 328)

  // Header
  ctx.fillStyle = '#8A6D3B'
  ctx.font = '600 16px "Cormorant Garamond", Georgia, serif'
  ctx.textAlign = 'center'
  ctx.fillText('CERTIFICATE OF COMPLETION', 256, 74)

  // Decorative divider rule
  ctx.strokeStyle = '#C5A059'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(156, 90)
  ctx.lineTo(356, 90)
  ctx.stroke()

  // Word-wrapped bold title
  ctx.fillStyle = '#2C1E16'
  ctx.font = 'bold 26px "Cormorant Garamond", Georgia, serif'
  const words = (title || 'Academic & Technical Certification').split(' ')
  const lines = []
  let currentLine = ''
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    if (ctx.measureText(testLine).width > 380 && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) lines.push(currentLine)

  const lineHeight = 32
  const startY = lines.length <= 2 ? 156 : 138
  lines.slice(0, 3).forEach((line, idx) => {
    ctx.fillText(line, 256, startY + idx * lineHeight)
  })

  // Issuer & Date
  ctx.fillStyle = '#5C4938'
  ctx.font = '15px "Courier Prime", monospace'
  if (issuer) ctx.fillText(issuer, 256, 268)
  if (date) ctx.fillText(date, 256, 294)
  if (id) {
    ctx.font = '11px "Courier Prime", monospace'
    ctx.fillStyle = '#7D6A58'
    ctx.textAlign = 'left'
    ctx.fillText(`CREDENTIAL // ${id}`, 46, 336)
  }

  // Crimson & gold wax seal emblem (bottom-right)
  ctx.save()
  ctx.translate(426, 304)
  ctx.fillStyle = '#D4AF37'
  ctx.beginPath()
  ctx.arc(0, 0, 26, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#8B1E1E'
  ctx.beginPath()
  ctx.arc(0, 0, 21, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = '#D4AF37'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.arc(0, 0, 15, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = '#FAF6EE'
  ctx.font = 'bold 12px "Cormorant Garamond", Georgia, serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('SA', 0, 1)
  ctx.restore()

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

/**
 * Deterministic pseudo-random helper for repeatable procedural scenery.
 */
const seededRand = (seed) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Generates a rich painted outdoor landscape backdrop (Golden Hour Day or Midnight).
 */
export const createOutdoorSceneTexture = (THREE, isNight = false) => {
  const w = 1024
  const h = 768
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')

  // 1. Sky Gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.78)
  if (!isNight) {
    skyGrad.addColorStop(0.0, '#5689A4')
    skyGrad.addColorStop(0.36, '#8CB8C2')
    skyGrad.addColorStop(0.72, '#E8CE9D')
    skyGrad.addColorStop(1.0, '#F5B46E')
  } else {
    skyGrad.addColorStop(0.0, '#050914')
    skyGrad.addColorStop(0.35, '#0B1528')
    skyGrad.addColorStop(0.72, '#152542')
    skyGrad.addColorStop(1.0, '#1F3254')
  }
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, w, h)

  // 2. Celestial Glow & Sky Details
  if (!isNight) {
    // Low golden hour sun halo + core glow
    const sunHalo = ctx.createRadialGradient(300, 310, 12, 300, 310, 360)
    sunHalo.addColorStop(0.0, 'rgba(255, 250, 230, 0.92)')
    sunHalo.addColorStop(0.14, 'rgba(255, 232, 178, 0.65)')
    sunHalo.addColorStop(0.45, 'rgba(246, 184, 114, 0.24)')
    sunHalo.addColorStop(1.0, 'rgba(245, 180, 110, 0)')
    ctx.fillStyle = sunHalo
    ctx.fillRect(0, 0, w, h)

    // Layered warm cumulus & stratus cloud wisps
    const drawCloudBank = (cx, cy, scaleX, scaleY, puffs) => {
      ctx.save()
      for (let i = 0; i < puffs; i++) {
        const px = cx + (i - puffs * 0.5) * 34 * scaleX + (seededRand(cx + i) - 0.5) * 26
        const py = cy + Math.sin(i * 1.1) * 10 * scaleY
        const rx = (38 + seededRand(cy + i * 3) * 42) * scaleX
        const ry = (14 + seededRand(cx + i * 7) * 14) * scaleY

        // Top creamy sunlit puff
        const puffGrad = ctx.createRadialGradient(px, py - ry * 0.25, rx * 0.1, px, py, rx)
        puffGrad.addColorStop(0.0, 'rgba(255, 249, 236, 0.52)')
        puffGrad.addColorStop(0.55, 'rgba(252, 224, 184, 0.28)')
        puffGrad.addColorStop(1.0, 'rgba(245, 190, 140, 0)')
        ctx.fillStyle = puffGrad
        ctx.beginPath()
        ctx.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    drawCloudBank(210, 145, 1.3, 0.9, 6)
    drawCloudBank(680, 125, 1.45, 1.0, 7)
    drawCloudBank(460, 215, 1.15, 0.78, 5)
    drawCloudBank(845, 240, 1.25, 0.8, 5)
  } else {
    // Crisp starfield
    for (let i = 0; i < 90; i++) {
      const sx = seededRand(i * 3.1 + 1) * w
      const sy = Math.pow(seededRand(i * 5.7 + 2), 1.35) * (h * 0.56)
      const sr = 0.6 + seededRand(i * 9.3 + 4) * 1.5
      const sa = 0.3 + seededRand(i * 13.7 + 8) * 0.68
      ctx.fillStyle = `rgba(225, 238, 255, ${sa.toFixed(2)})`
      ctx.beginPath()
      ctx.arc(sx, sy, sr, 0, Math.PI * 2)
      ctx.fill()
    }

    // Moon corona & silver-ivory disc
    const mx = 740
    const my = 155
    const moonCorona = ctx.createRadialGradient(mx, my, 18, mx, my, 210)
    moonCorona.addColorStop(0.0, 'rgba(225, 238, 255, 0.42)')
    moonCorona.addColorStop(0.32, 'rgba(155, 190, 240, 0.16)')
    moonCorona.addColorStop(1.0, 'rgba(20, 38, 70, 0)')
    ctx.fillStyle = moonCorona
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = '#F2F6FF'
    ctx.beginPath()
    ctx.arc(mx, my, 28, 0, Math.PI * 2)
    ctx.fill()

    // Subtle lunar mare texture
    ctx.fillStyle = 'rgba(155, 175, 205, 0.25)'
    ctx.beginPath()
    ctx.arc(mx - 7, my - 5, 9, 0, Math.PI * 2)
    ctx.arc(mx + 8, my + 6, 7, 0, Math.PI * 2)
    ctx.fill()

    // Translucent moonlit cloud wisps
    for (let b = 0; b < 4; b++) {
      const bx = 180 + b * 220
      const by = 140 + (b % 2) * 75
      const bandGrad = ctx.createRadialGradient(bx, by, 10, bx, by, 170)
      bandGrad.addColorStop(0.0, 'rgba(140, 175, 220, 0.13)')
      bandGrad.addColorStop(1.0, 'rgba(140, 175, 220, 0)')
      ctx.fillStyle = bandGrad
      ctx.beginPath()
      ctx.ellipse(bx, by, 170, 34, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // 3. Receding Mountain & Hill Ridges
  const drawRidge = (baseY, amp, freq1, freq2, phase, fillStyle, mistColor) => {
    ctx.beginPath()
    ctx.moveTo(0, h)
    for (let x = 0; x <= w; x += 12) {
      const nx = x / w
      const ridgeY =
        baseY -
        Math.sin(nx * Math.PI * freq1 + phase) * amp -
        Math.cos(nx * Math.PI * freq2 + phase * 1.7) * (amp * 0.45) -
        Math.sin(nx * Math.PI * 11 + phase * 2.3) * (amp * 0.12)
      ctx.lineTo(x, ridgeY)
    }
    ctx.lineTo(w, h)
    ctx.closePath()
    ctx.fillStyle = fillStyle
    ctx.fill()

    if (mistColor) {
      const mistGrad = ctx.createLinearGradient(0, baseY - amp * 0.4, 0, baseY + amp * 1.4)
      mistGrad.addColorStop(0, 'rgba(255, 255, 255, 0)')
      mistGrad.addColorStop(1, mistColor)
      ctx.fillStyle = mistGrad
      ctx.fill()
    }
  }

  if (!isNight) {
    drawRidge(420, 58, 2.2, 5.1, 0.4, '#6D867E', 'rgba(232, 206, 157, 0.32)')
    drawRidge(472, 46, 2.8, 6.4, 1.9, '#516B5F', 'rgba(238, 198, 145, 0.22)')
    drawRidge(522, 34, 3.2, 7.2, 3.3, '#3B5346', null)
  } else {
    drawRidge(420, 58, 2.2, 5.1, 0.4, '#121E33', null)
    drawRidge(472, 46, 2.8, 6.4, 1.9, '#0C1626', null)
    drawRidge(522, 34, 3.2, 7.2, 3.3, '#08101C', null)

    // Distant valley window lights nestled below hills
    for (let i = 0; i < 24; i++) {
      const lx = 80 + seededRand(i * 19 + 3) * (w - 160)
      const ly = 515 + seededRand(i * 23 + 7) * 55
      const glow = ctx.createRadialGradient(lx, ly, 0.5, lx, ly, 5)
      glow.addColorStop(0.0, 'rgba(255, 195, 95, 0.95)')
      glow.addColorStop(1.0, 'rgba(255, 183, 77, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(lx, ly, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#FFE0A3'
      ctx.fillRect(lx - 1, ly - 1, 2, 2)
    }
  }

  // 4. Midground Garden Treeline & Sunlit / Moonlit Treetop Crowns
  const drawTreelineLayer = (baseY, minR, maxR, step, seedOffset, darkCol, midCol, highlightCol) => {
    // Solid lower foliage mass down to bottom of canvas
    ctx.fillStyle = darkCol
    ctx.fillRect(0, baseY + maxR * 0.35, w, h - baseY)

    for (let x = -20; x <= w + 20; x += step) {
      const r = minR + seededRand(x * 0.13 + seedOffset) * (maxR - minR)
      const cy = baseY + (seededRand(x * 0.29 + seedOffset) - 0.5) * 34

      // Outer darker crown
      ctx.fillStyle = darkCol
      ctx.beginPath()
      ctx.arc(x, cy, r, 0, Math.PI * 2)
      ctx.fill()

      // Mid foliage cluster
      ctx.fillStyle = midCol
      ctx.beginPath()
      ctx.arc(x - r * 0.14, cy - r * 0.14, r * 0.78, 0, Math.PI * 2)
      ctx.fill()

      // Sunlit / Moonlit rim lobe toward upper-left sun (or moon upper-right at night)
      ctx.fillStyle = highlightCol
      ctx.beginPath()
      ctx.arc(
        x + (isNight ? r * 0.22 : -r * 0.26),
        cy - r * 0.26,
        r * 0.52,
        0,
        Math.PI * 2
      )
      ctx.fill()
    }
  }

  if (!isNight) {
    drawTreelineLayer(572, 34, 58, 36, 11, '#2E472A', '#466638', '#6E8A44')
    drawTreelineLayer(648, 42, 74, 42, 47, '#22361E', '#35512A', '#567438')
  } else {
    drawTreelineLayer(572, 34, 58, 36, 11, '#060D16', '#0B1726', '#172A40')
    drawTreelineLayer(648, 42, 74, 42, 47, '#040910', '#08121E', '#112236')
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.needsUpdate = true
  return tex
}

/**
 * Draws a procedural fallback branch & leaf silhouette (black on white)
 * if tree_shadow.webp is unavailable.
 */
const drawFallbackCanopyMask = (ctx, size) => {
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)

  ctx.strokeStyle = '#000000'
  ctx.fillStyle = '#000000'
  ctx.lineCap = 'round'

  const drawBranch = (x1, y1, len, angle, width, depth) => {
    if (depth <= 0) return
    const x2 = x1 + Math.cos(angle) * len
    const y2 = y1 + Math.sin(angle) * len
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()

    if (depth <= 3) {
      const leafCount = 7
      for (let i = 0; i < leafCount; i++) {
        const t = i / leafCount
        const lx = x1 + (x2 - x1) * t + (seededRand(x1 + i * 7) - 0.5) * 28
        const ly = y1 + (y2 - y1) * t + (seededRand(y1 + i * 11) - 0.5) * 28
        ctx.save()
        ctx.translate(lx, ly)
        ctx.rotate(angle + (seededRand(i * 17 + depth) - 0.5) * 1.8)
        ctx.beginPath()
        ctx.ellipse(0, 0, 22, 9, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    drawBranch(x2, y2, len * 0.72, angle - 0.38, width * 0.65, depth - 1)
    drawBranch(x2, y2, len * 0.68, angle + 0.34, width * 0.65, depth - 1)
  }

  drawBranch(size, size * 0.32, 260, Math.PI * 1.08, 22, 5)
  drawBranch(size, size * 0.65, 220, Math.PI * 0.92, 18, 4)
}

/**
 * Converts a black-on-white tree silhouette image into three RGBA textures:
 * - canopyDayTex: shaded golden-hour olive/forest foliage on transparent sky
 * - canopyNightTex: moonlit slate-indigo foliage on transparent sky
 * - dappledShadowTex: soft blurred transparent shadow overlay for blinds
 */
export const createTreeCanopyTextures = (THREE, sourceImage = null) => {
  const size = 512

  // 1. Rasterize source silhouette
  const srcCanvas = document.createElement('canvas')
  srcCanvas.width = size
  srcCanvas.height = size
  const srcCtx = srcCanvas.getContext('2d')
  if (sourceImage && sourceImage.width > 0) {
    srcCtx.fillStyle = '#ffffff'
    srcCtx.fillRect(0, 0, size, size)
    srcCtx.drawImage(sourceImage, 0, 0, size, size)
  } else {
    drawFallbackCanopyMask(srcCtx, size)
  }

  const srcData = srcCtx.getImageData(0, 0, size, size).data

  // 2. Build blurred half-res foliage density map for volumetric interior vs edge shading
  const blurSize = 512
  const blurCanvas = document.createElement('canvas')
  blurCanvas.width = blurSize
  blurCanvas.height = blurSize
  const blurCtx = blurCanvas.getContext('2d')
  blurCtx.fillStyle = '#ffffff'
  blurCtx.fillRect(0, 0, blurSize, blurSize)
  blurCtx.filter = 'blur(8px)'
  blurCtx.drawImage(srcCanvas, 0, 0, blurSize, blurSize)
  blurCtx.filter = 'none'
  const blurData = blurCtx.getImageData(0, 0, blurSize, blurSize).data

  // 3. Allocate day & night canopy RGBA buffers
  const dayCanvas = document.createElement('canvas')
  dayCanvas.width = size
  dayCanvas.height = size
  const dayCtx = dayCanvas.getContext('2d')
  const dayImg = dayCtx.createImageData(size, size)

  const nightCanvas = document.createElement('canvas')
  nightCanvas.width = size
  nightCanvas.height = size
  const nightCtx = nightCanvas.getContext('2d')
  const nightImg = nightCtx.createImageData(size, size)

  // Raw shadow alpha mask before final blur
  const shadowMaskCanvas = document.createElement('canvas')
  shadowMaskCanvas.width = size
  shadowMaskCanvas.height = size
  const shadowMaskCtx = shadowMaskCanvas.getContext('2d')
  const shadowMaskImg = shadowMaskCtx.createImageData(size, size)

  for (let y = 0; y < size; y++) {
    const by = Math.min(blurSize - 1, y >> 1)
    const rowOffset = y * size
    const blurRowOffset = by * blurSize
    const sunGradY = 1 - y / size

    for (let x = 0; x < size; x++) {
      const idx = (rowOffset + x) * 4
      const bx = Math.min(blurSize - 1, x >> 1)
      const bIdx = (blurRowOffset + bx) * 4

      const L = (srcData[idx] + srcData[idx + 1] + srcData[idx + 2]) / 765
      const leafAlpha = L > 0.93 ? 0 : Math.pow(Math.max(0, 1 - L), 1.35)
      const alphaByte = Math.round(leafAlpha * 255)

      if (alphaByte === 0) continue

      // 0 = outer leaf tip, 1 = deep foliage cluster / bark
      const bL = (blurData[bIdx] + blurData[bIdx + 1] + blurData[bIdx + 2]) / 765
      const density = Math.min(1, Math.max(0, 1 - bL))
      const sunBias = (1 - x / size) * 0.45 + sunGradY * 0.55
      const warmth = Math.min(1, Math.max(0, (1 - density) * 0.72 + sunBias * 0.28))

      // Day: blend deep forest (#263E22 = 38,62,34) -> olive (#5B7D3C = 91,125,60) -> golden-olive (#88A24A = 136,162,74)
      let dr, dg, db
      if (warmth < 0.55) {
        const t = warmth / 0.55
        dr = 38 + (91 - 38) * t
        dg = 62 + (125 - 62) * t
        db = 34 + (60 - 34) * t
      } else {
        const t = (warmth - 0.55) / 0.45
        dr = 91 + (136 - 91) * t
        dg = 125 + (162 - 125) * t
        db = 60 + (74 - 60) * t
      }
      dayImg.data[idx] = Math.round(dr)
      dayImg.data[idx + 1] = Math.round(dg)
      dayImg.data[idx + 2] = Math.round(db)
      dayImg.data[idx + 3] = alphaByte

      // Night: blend deep midnight (#0A1420 = 10,20,32) -> slate (#142436 = 20,36,54) -> moonlit rim (#21384E = 33,56,78)
      const moonBias = (x / size) * 0.45 + sunGradY * 0.55
      const coolHighlight = Math.min(1, Math.max(0, (1 - density) * 0.65 + moonBias * 0.35))
      nightImg.data[idx] = Math.round(10 + (33 - 10) * coolHighlight)
      nightImg.data[idx + 1] = Math.round(20 + (56 - 20) * coolHighlight)
      nightImg.data[idx + 2] = Math.round(32 + (78 - 32) * coolHighlight)
      nightImg.data[idx + 3] = alphaByte

      // Shadow overlay mask (warm sepia-brown #1C140C with soft alpha)
      shadowMaskImg.data[idx] = 28
      shadowMaskImg.data[idx + 1] = 20
      shadowMaskImg.data[idx + 2] = 12
      shadowMaskImg.data[idx + 3] = Math.round(leafAlpha * 82)
    }
  }

  dayCtx.putImageData(dayImg, 0, 0)
  nightCtx.putImageData(nightImg, 0, 0)
  shadowMaskCtx.putImageData(shadowMaskImg, 0, 0)

  // Soft-blurred dappled shadow canvas
  const shadowCanvas = document.createElement('canvas')
  shadowCanvas.width = size
  shadowCanvas.height = size
  const shadowCtx = shadowCanvas.getContext('2d')
  shadowCtx.filter = 'blur(7px)'
  shadowCtx.drawImage(shadowMaskCanvas, 0, 0, size, size)
  shadowCtx.filter = 'none'

  const configureTex = (targetCanvas) => {
    const tex = new THREE.CanvasTexture(targetCanvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = THREE.MirroredRepeatWrapping
    tex.wrapT = THREE.MirroredRepeatWrapping
    tex.repeat.set(0.94, 0.94)
    tex.offset.set(0.03, 0.03)
    tex.needsUpdate = true
    return tex
  }

  return {
    canopyDayTex: configureTex(dayCanvas),
    canopyNightTex: configureTex(nightCanvas),
    dappledShadowTex: configureTex(shadowCanvas)
  }
}
