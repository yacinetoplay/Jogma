"use client"

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

interface ThreeSceneProps {
  selectedBox: {
    title: string
    description: string
  } | null
}

export function ThreeScene({ selectedBox }: ThreeSceneProps) {
  const containerRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const labelRef = useRef<THREE.Group | null>(null)
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize Three.js scene
  useEffect(() => {
    if (!isClient || !containerRef.current) return

    // Create scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    cameraRef.current = camera

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      canvas: containerRef.current
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    rendererRef.current = renderer

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(0, 1, 1)
    scene.add(ambientLight)
    scene.add(directionalLight)

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      if (labelRef.current) {
        labelRef.current.rotation.y += 0.01
      }
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (renderer && renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [isClient])

  // Handle selected box changes
  useEffect(() => {
    if (!selectedBox || !sceneRef.current || !isClient) return

    const getThemeColors = () => ({
      text: theme === 'dark' ? 0xffffff : 0x2c3e50,
      description: theme === 'dark' ? 0xcccccc : 0x34495e,
    })

    const createTextMesh = (font: any, text: string, options: { size: number; color: number; complexity: boolean }) => {
      const textGeometry = new TextGeometry(text, {
        font,
        size: options.size,
        height: 0.05,
        curveSegments: 12,
        bevelEnabled: options.complexity,
        bevelThickness: options.complexity ? 0.03 : 0,
        bevelSize: options.complexity ? 0.02 : 0,
        bevelOffset: 0,
        bevelSegments: options.complexity ? 5 : 0
      })

      textGeometry.computeBoundingBox()
      textGeometry.center()

      const textMaterial = new THREE.MeshPhongMaterial({ 
        color: options.color,
        shininess: 100
      })

      return new THREE.Mesh(textGeometry, textMaterial)
    }

    const wrapText = (text: string, maxCharsPerLine: number) => {
      const words = text.split(' ')
      const lines: string[] = []
      let currentLine = ''

      words.forEach(word => {
        if ((currentLine + word).length > maxCharsPerLine) {
          lines.push(currentLine.trim())
          currentLine = word + ' '
        } else {
          currentLine += word + ' '
        }
      })

      if (currentLine) lines.push(currentLine.trim())
      return lines
    }

    const createDescriptionLabel = (font: any, title: string, description: string) => {
      const group = new THREE.Group()
      const colors = getThemeColors()

      const titleMesh = createTextMesh(font, title, { 
        size: 0.3, 
        color: colors.text, 
        complexity: false 
      })
      titleMesh.position.y = 0.5
      group.add(titleMesh)

      const wrappedDescription = wrapText(description, 30)
      wrappedDescription.forEach((line, index) => {
        const descriptionLineMesh = createTextMesh(font, line, { 
          size: 0.15, 
          color: colors.description, 
          complexity: false 
        })
        descriptionLineMesh.position.y = 0.2 - (index * 0.2)
        group.add(descriptionLineMesh)
      })

      group.position.set(0, 0, -3)
      return group
    }

    const loader = new FontLoader()
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      if (labelRef.current) {
        sceneRef.current?.remove(labelRef.current)
      }

      const newLabel = createDescriptionLabel(font, selectedBox.title, selectedBox.description)
      sceneRef.current?.add(newLabel)
      labelRef.current = newLabel
    })

    return () => {
      if (labelRef.current && sceneRef.current) {
        sceneRef.current.remove(labelRef.current)
        labelRef.current = null
      }
    }
  }, [selectedBox, theme, isClient])

  return <canvas ref={containerRef} className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }} />
} 