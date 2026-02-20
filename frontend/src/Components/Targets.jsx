import { useRef, useEffect, useMemo } from 'react';
import {useFrame} from '@react-three/fiber'
import * as THREE from "three";

function randomTargetPos() {
    const x = THREE.MathUtils.randFloatSpread(6);
    const y = THREE.MathUtils.randFloat(1, 4); // eye-level height
    const z = THREE.MathUtils.randFloat(-18, -8);
    return new THREE.Vector3(x, y, z);
}

export default function Targets({ count = TARGET_COUNT }, onHit) {
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
                    <sphereGeometry args={[0.5, 24, 24]}/>
                    <meshStandardMaterial></meshStandardMaterial>
                </mesh>
            ))}
        </group>
    )
}