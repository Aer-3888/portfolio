import React, { useState } from 'react'
import { Text, useCursor, RoundedBox } from '@react-three/drei' 
import RoundedImage from './RoundedImage'
import { RigidBody } from '@react-three/rapier'

export default function Project({ 
  title = "Project Title", 
  description = "Description goes here", 
  image = null,       
  screenshots = [],   
  url = null, 
  ...props 
}) {
  
  const screenScale = [0.8, 1.6] 
  const gap = 0.1 
  
  const totalWidth = screenshots.length > 0 
    ? (screenScale[0] + gap) * screenshots.length + 0.5 
    : 2.5 

  const [hovered, setHovered] = useState(false)
  useCursor(hovered && !!url)

  const handleClick = () => {
    if (url) {
      window.open(url, '_blank')
    }
  }

  // Shared props for interactivity on images
  const interactProps = {
      onClick: handleClick,
      onPointerOver: () => setHovered(true),
      onPointerOut: () => setHovered(false)
  }

  return (
    <group {...props}>
      
      {/* 1. The Dynamic Rounded Board (Background) */}
      <RigidBody type="fixed" colliders="cuboid">
        <RoundedBox
          args={[totalWidth, 3.3, 0.1]} 
          radius={0.15} 
          smoothness={8} 
          position-y={1.5}
          {...interactProps}
        >
          <meshStandardMaterial color={hovered ? "#ffebd6" : "#f0f0f0"} />
        </RoundedBox>
      </RigidBody>

      {/* 2. Content Logic */}
      
      {/* CASE A: Single Wide Image */}
      {image && !screenshots.length && (
        <RoundedImage 
          url={image}
          scale={[2.2, 1.2]}
          radius={0.1} 
          position={[0, 1.5, 0.07]}
          {...interactProps}
        />
      )}

      {/* CASE B: Multiple Phone Screenshots */}
      {screenshots.length > 0 && screenshots.map((url, index) => {
        const startX = -((screenshots.length - 1) * (screenScale[0] + gap)) / 2
        const xPos = startX + index * (screenScale[0] + gap)

        return (
          <RoundedImage 
            key={index}
            url={url}
            scale={screenScale} 
            radius={0.08} // Slightly smaller radius for phones
            position={[xPos, 1.5, 0.07]}
            {...interactProps}
          />
        )
      })}

      {/* 3. The Text */}
      <Text
        fontSize={0.25}
        position={[0, 2.7, 0.06]} 
        color="black"
        maxWidth={totalWidth - 0.2}
        textAlign="center"
        anchorY="bottom"
      >
        {title}
      </Text>

      <Text
        fontSize={0.12}
        position={[0, 0.3, 0.06]} 
        color="#555"
        maxWidth={totalWidth - 0.2}
        textAlign="center"
        anchorY="top"
      >
        {description}
      </Text>

    </group>
  )
}