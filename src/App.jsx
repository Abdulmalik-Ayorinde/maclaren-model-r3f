import React, { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
	PerspectiveCamera,
	OrthographicCamera,
	OrbitControls,
} from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import * as THREE from "three"
import { Model } from "../Scene"
import "./App.css"

function App() {
	const [carColor, setCarColor] = useState("#13c1e8")
	const [colorInput, setColorInput] = useState(true)

	function handleChange(e) {
		setCarColor(e.target.value)
	}
	return (
		//
		<div style={{ height: "100vh", width: "100vw", position: "relative" }}>
			<input
				type='color'
				className='color-input'
				style={
					colorInput
						? { display: "block", position: "absolute" }
						: { display: "none" }
				}
				onChange={handleChange}
			/>
			<Canvas>
				<PerspectiveCamera makeDefault position={[0, 1, 7]} />
				<OrbitControls autoRotate />
				<ambientLight position={[0, 0, 5]} intensity={0.1} />
				{/* <directionalLight color={"green"} position={[0, 0, 5]} /> */}
				{/* <BoxMesh position={[20, 1, 5]} /> */}
				<Model color={carColor} position={[0, 0, -2]} />

				<mesh position={[10, -1.2, 0]} rotation={[Math.PI / -2, 0, 0]}>
					<planeGeometry args={[200, 200, 75, 75]} />
					<meshBasicMaterial color='#5b5a5b' side={THREE.DoubleSide} />
				</mesh>
			</Canvas>
			{/* <div style={{ position: "absolute", top: 320, left: 650 }}>
				<h1 style={{ fontSize: "50px", fontWeight: 600 }}>Hello</h1>
			</div> */}
		</div>
	)
}

export default App

function BoxMesh() {
	const [color, setColor] = useState("white")
	const [active, setActive] = useState(true)

	const boxRef = useRef()
	const mesh = useRef()

	const { scale } = useSpring({ scale: active ? 1.5 : 1 })

	useFrame(({ clock }) => {
		const a = clock.getElapsedTime()
		// console.log(a)
		// console.log(boxRef.current)
		// boxRef.current.rotation.x = a
		// boxRef.current.rotation.y = a
		boxRef.current.scale.x = Math.sin(clock.getElapsedTime()) + 3
		boxRef.current.scale.y = Math.sin(clock.getElapsedTime()) + 3
		// mesh.current.position.y = Math.sin(clock.getElapsedTime()) + 2.5
	})
	// console.log(boxRef.current.rotation.x)

	return (
		<mesh
			castShadow
			ref={mesh}
			// position={[-1, 0.5, 0.5]}
			onClick={() => setActive(!active)}>
			<boxGeometry ref={boxRef} scale={scale} args={[2, 2, 2]} />
			<meshStandardMaterial color={color} />
		</mesh>
	)
}
