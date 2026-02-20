import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Targets from "./Targets";
import HUD from "./HUD";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useState, useMemo, useRef } from 'react';

const MODE = "gridshot";
const DURATION_MS = "60_000";
const DURATION_S = 60;
const TARGET_COUNT = 3;
const TARGET_RADIUS = 28;

// function Targets({ count = TARGET_COUNT }, onHit) {
//     const group = useRef();

//     const targets = useMemo(() => {
//         return Array.from({ length: count }, (_, i) => ({
//             id: i,
//             pos: randomTargetPos(),
//         }));
//     }, [count]);

//     const respawn = (id) => {
//         const t = targets.find((x) => x.id === id);
//         if (t) t.pos.copy(randomTargetPos());
//     }

//     useEffect(() => {
//         if (!group.current) return;

//         group.current.children.forEach((child, idx) => {
//             child.userData.targetId = targets[idx].id;
//         });
//     }, [targets]);

//     useFrame(() => {
//         if (!group.current) return;
//         group.current.children.forEach((mesh, idx) => {
//             mesh.position.copy(targets[idx].pos);
//         });
//     });

//     return (
//         <group ref={group} userData={{ respawn }}>
//             {
//             targets.map((t) => (
//                 <mesh key={t.id}>
//                     <THREE.SphereGeometry args={[0.5, 24, 24]}/>
//                     <THREE.MeshStandardMaterial></THREE.MeshStandardMaterial>
//                 </mesh>
//             ))}
//         </group>
//     )
// }

function FpsGame({ durationMs = DURATION_MS, onHudChange, onActionsReady, }) {
    const { camera, gl } = useThree();

    const [running, setRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(DURATION_S);
    const [hits, setHits] = useState(0);
    const [shots, setShots] = useState(0);

    const startRef = useRef(0);
    const endRef = useRef(0);

    const targetsRef = useRef(null);

    const raycaster = useMemo(() => new THREE.Raycaster(), []);
    const forward = useMemo(() => new THREE.Vector3(), []);

   

    function start() {
        setHits(0);
        setShots(0);
        setTimeLeft(durationMs / 1000);
        startRef.current = performance.now();
        endRef.current = 0;
        setRunning(true);
    }

    useEffect(() => {
        onActionsReady?.({ start });
    }, []);

    const acc = shots === 0 ? 0 : Math.round((hits / shots) * 100);

    useEffect(() => {
        onHudChange?.({ running, timeLeft, hits, shots, acc });
    }, [running, timeLeft, hits, shots, acc, onHudChange]);

     useEffect(() => {
        camera.position.set(0, 1.8, 5);
        camera.lookAt(0, 1.8, 0);
    }, [camera]);
    
    useFrame(() => {
        if (!running) return;
        
        const now = performance.now();
        const elapsed = now - startRef.current;
        const remaining = Math.max(0, durationMs - elapsed);
        setTimeLeft(remaining / 1000);

        if (remaining <= 0) {
            endRef.current = now();
            setRunning(false);
        }
    });

    useEffect(() => {
        const onMouseDown = () => {
            if (!running) return;
            setShots((s) => s + 1);

            camera.getWorldDirection(forward);
            raycaster.set(camera.position, forward);

            const targetGroup = targetsRef.current;
            if (!targetGroup) return;

            const meshes = targetGroup.__r3f?.objects ?? targetGroup.children;
            const intersects = raycaster.intersectObjects(targetGroup.children, false);

            if (intersects.length > 0) {
                const hitMesh = intersects[0].object;
                const id = hitMesh.userData.targetId;
                setHits((h) => h + 1);

                const respawn = targetGroup.userData.respawn;
                if (typeof respawn === "function") respawn(id);
            }
        };
        gl.domElement.addEventListener("mousedown", onMouseDown);
        return () => gl.domElement.removeEventListener("mousedown", onMouseDown);
    }, [running, camera, gl, raycaster]);

    return (
    <>
      <PointerLockControls />

      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 10, 5]} intensity={1.0} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial />
      </mesh>

      <group ref={targetsRef}>
        <Targets count={TARGET_COUNT} />
      </group>
    </>
  );
}

export default function FpsGridShot() {
    const [hud, setHud] = useState({
        running: false,
        timeLeft: DURATION_S,
        hits: 0,
        shots: 0,
        acc: 0,
    })

    const actionsRef = useRef({ start: null });

    return (
        <div style={{ width: "100%", height: "80vh", position: "relative" }}>
            <HUD
                running={hud.running}
                timeLeft={hud.timeLeft}
                hits={hud.hits}
                shots={hud.shots}
                acc={hud.acc}
                onStart={()=> actionsRef.current.start?.()}
            />
            <Canvas style={{ width: "100%", height: "100%" }} camera={{ fov: 75, near: 0.1, far: 200 }}>
                <FpsGame
                    durationMs={DURATION_MS} onHudChange={setHud} onActionsReady={(actions) => {
                        actionsRef.current = actions;
                    }}
                />
            </Canvas>
        </div>
    );
}