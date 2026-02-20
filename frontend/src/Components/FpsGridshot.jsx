import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "react-three/drei";
import * as THREE from "three";
import { useEffect, useState, useMemo, useRef } from 'react';

const MODE = "gridshot";
const DURATION_MS = "60_000";
const DURATION_S = 60;
const TARGET_COUNT = 3;
const TARGET_RADIUS = 28;

function randomTargetPos() {
    const x = THREE.MathUtils.randFloatSpread(6);
    const y = THREE.MathUtils.randFloat(1, 4); // eye-level height
    const z = THREE.MathUtils.randFloat(-18, -8);
    return new THREE.Vector3(x, y, z);
}

function Targets({ count = TARGET_COUNT }, onHit) {
    const group = useRef();

    const targets = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            pos: randomTargetPos(),
        }));
    }, [count]);

    const respawn = (id) => {
        const t = targets.find((x) => x.id === id);
        if (t) t.pos.copy(randomTargetPos());
    }

    useEffect(() => {
        if (!group.current) return;

        group.current.children.forEach((child, idx) => {
            child.userData.targetId = targets[idx].id;
        });
    }, [targets]);

    useFrame(() => {
        if (!group.current) return;
        group.current.children.forEach((mesh, idx) => {
            mesh.position.copy(targets[idx].pos);
        });
    });

    return (
        <group ref={group} userData={{ respawn }}>
            {
            targets.map((t) => (
                <mesh key={t.id}>
                    <THREE.SphereGeometry args={[0.5, 24, 24]}/>
                    <THREE.MeshStandardMaterial></THREE.MeshStandardMaterial>
                </mesh>
            ))}
        </group>
    )
}

function FpsGame({ durationMs = DURATION_MS }) {
    const { camera, gl } = useThree();

    const [running, setRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(DURATION_S);
    const [hits, setHits] = useState(0);
    const [shots, setShots] = useState(0);
}