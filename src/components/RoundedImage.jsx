import React, { useMemo } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

// A reusable component that renders a texture on a flat, rounded plane.
// Replaces dreis <Image> when you need rounded corners.
export default function RoundedImage({ 
    url, 
    scale = [1, 1], // [width, height] 
    radius = 0.1,
    ...props 
}) {
  // 1. Load the image texture
  const texture = useTexture(url)
  const width = scale[0];
  const height = scale[1];

  // 2. Create the custom rounded geometry
  const geometry = useMemo(() => {
    // Draw a 2D shape with rounded corners
    const shape = new THREE.Shape();
    let x = -width/2; let y = -height/2;
    shape.moveTo( x + radius, y );
    shape.lineTo( x + width - radius, y );
    shape.quadraticCurveTo( x + width, y, x + width, y + radius );
    shape.lineTo( x + width, y + height - radius );
    shape.quadraticCurveTo( x + width, y + height, x + width - radius, y + height );
    shape.lineTo( x + radius, y + height );
    shape.quadraticCurveTo( x, y + height, x, y + height - radius );
    shape.lineTo( x, y + radius );
    shape.quadraticCurveTo( x, y, x + radius, y );
    
    // Convert shape to 3D geometry
    const geom = new THREE.ShapeGeometry( shape, 12 ); // 12 segments for smooth corners

    // FIX UV Mapping: Ensures the image stretches across the whole shape
    const pos = geom.attributes.position;
    const uvs = geom.attributes.uv;
    for ( let i = 0; i < pos.count; i ++ ) {
        const x = pos.getX( i );
        const y = pos.getY( i );
        uvs.setXY( i, (x + width/2) / width, (y + height/2) / height );
    }
    uvs.needsUpdate = true;
    return geom;
  }, [width, height, radius]);

  return (
    <mesh geometry={geometry} {...props}>
      {/* Use BasicMaterial so lighting doesn't fade the screenshot colors */}
      <meshBasicMaterial map={texture} toneMapped={false} transparent />
    </mesh>
  )
}