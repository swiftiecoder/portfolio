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
