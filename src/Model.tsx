import * as THREE from "three";
import { Html, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRef } from "react";

type GLTFResult = GLTF & {
  nodes: {
    Antenna_1_Dark_red_texturepng_0: THREE.Mesh;
    Antenna_2_Dark_red_texturepng_0: THREE.Mesh;
    antenna_cube_Antenna_cube_texture_0: THREE.Mesh;
    back_cube_texture_1_0: THREE.Mesh;
    button_1_Button_1_texture_0: THREE.Mesh;
    button_2_Button_2_texture_0: THREE.Mesh;
    button_plane_Button_plane_texturepng_0: THREE.Mesh;
    dial_1_Dial_1_texture_0: THREE.Mesh;
    dial_2_Dial_2_texture_0: THREE.Mesh;
    dial_hoop_Dark_red_texturepng_0: THREE.Mesh;
    foot_1_Dark_red_texturepng_0: THREE.Mesh;
    foot_2_Dark_red_texturepng_0: THREE.Mesh;
    logo_hoop_Dark_red_texturepng_0: THREE.Mesh;
    Logo_plane_Logo_texture_color_televisionpng_0: THREE.Mesh;
    main_hoop_Dark_red_texturepng_0: THREE.Mesh;
    Screen_hoop_texture_2_0: THREE.Mesh;
    Stand_texture_0: THREE.Mesh;
    stereo_hoop_Dark_red_texturepng_0: THREE.Mesh;
    stereo_plane_Stereo_texturepng_0: THREE.Mesh;
    top_logo_hoop_Dark_red_texturepng_0: THREE.Mesh;
    top_Logo_plane_Top_logopng_0: THREE.Mesh;
    TV_case_TV_case_texturepng_0: THREE.Mesh;
    TV_screen_Screen_texturepng_0: THREE.Mesh;
  };
  materials: {
    ["Dark_red_texture.png"]: THREE.MeshStandardMaterial;
    Antenna_cube_texture: THREE.MeshStandardMaterial;
    texture_1: THREE.MeshStandardMaterial;
    Button_1_texture: THREE.MeshStandardMaterial;
    Button_2_texture: THREE.MeshStandardMaterial;
    ["Button_plane_texture.png"]: THREE.MeshStandardMaterial;
    Dial_1_texture: THREE.MeshStandardMaterial;
    Dial_2_texture: THREE.MeshStandardMaterial;
    ["Logo_texture_color_television.png"]: THREE.MeshStandardMaterial;
    texture_2: THREE.MeshStandardMaterial;
    texture: THREE.MeshStandardMaterial;
    ["Stereo_texture.png"]: THREE.MeshStandardMaterial;
    ["Top_logo.png"]: THREE.MeshStandardMaterial;
    ["TV_case_texture.png"]: THREE.MeshStandardMaterial;
    ["Screen_texture.png"]: THREE.MeshPhysicalMaterial;
  };
};

export function Model(
  props: JSX.IntrinsicElements["group"] & {
    onButtonClick: () => void;
    HTML: React.ReactNode;
  }
) {
  const { nodes, materials } = useGLTF("/crt.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.937}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-0.829, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Antenna_1_Dark_red_texturepng_0.geometry}
              material={materials["Dark_red_texture.png"]}
              position={[0, 82.813, 68.75]}
            />
          </group>
          <group rotation={[0.829, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Antenna_2_Dark_red_texturepng_0.geometry}
              material={materials["Dark_red_texture.png"]}
              position={[0, 82.813, -68.75]}
            />
          </group>
          <group position={[-0.938, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.button_plane_Button_plane_texturepng_0.geometry}
              material={materials["Button_plane_texture.png"]}
              position={[66.406, -35.937, -35.937]}
            />
          </group>
          <group rotation={[0, 0, Math.PI / 2]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.dial_1_Dial_1_texture_0.geometry}
              material={materials.Dial_1_texture}
              position={[61.406, -36.5, -36.749]}
            />
          </group>
          <group rotation={[0, 0, Math.PI / 2]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.dial_2_Dial_2_texture_0.geometry}
              material={materials.Dial_2_texture}
              position={[72.812, -36.5, -35.937]}
            />
          </group>
          <group position={[-0.938, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.Logo_plane_Logo_texture_color_televisionpng_0.geometry
              }
              material={materials["Logo_texture_color_television.png"]}
              position={[26.562, -35.937, -35.937]}
            />
          </group>
          <group position={[-0.938, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.stereo_plane_Stereo_texturepng_0.geometry}
              material={materials["Stereo_texture.png"]}
              position={[43.75, -35.937, -35.938]}
            />
          </group>
          <group
            position={[-0.938, 56.25, 70.312]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.top_Logo_plane_Top_logopng_0.geometry}
              material={materials["Top_logo.png"]}
              position={[26.563, -35.937, -35.938]}
            />
          </group>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.TV_screen_Screen_texturepng_0.geometry}
              material={
                new THREE.MeshPhysicalMaterial({
                  roughness: 1,
                  envMapIntensity: 0.9,
                  clearcoat: 1,
                  transparent: true,
                  transmission: 0.95,
                  opacity: 1,
                  reflectivity: 0.2,
                })
              }
              position={[36.225, 9.645, -51.082]}
            >
              <Html
                scale={9.5}
                rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                position={[0, 0, 0]}
                transform
                occlude="blending"
              >
                {props.HTML}
              </Html>
            </mesh>
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.antenna_cube_Antenna_cube_texture_0.geometry}
            material={materials.Antenna_cube_texture}
            position={[0, 92.692, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.back_cube_texture_1_0.geometry}
            material={materials.texture_1}
            position={[-41.797, 25.781, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.button_1_Button_1_texture_0.geometry}
            material={materials.Button_1_texture}
            onClick={props.onButtonClick}
            position={[35.313, 32.813, -31.25]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.button_2_Button_2_texture_0.geometry}
            material={materials.Button_2_texture}
            onClick={props.onButtonClick}
            position={[35.313, 32.812, -40.625]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.dial_hoop_Dark_red_texturepng_0.geometry}
            material={materials["Dark_red_texture.png"]}
            position={[35, 66.406, -35.937]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.foot_1_Dark_red_texturepng_0.geometry}
            material={materials["Dark_red_texture.png"]}
            position={[0, 3.125, 34.375]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.foot_2_Dark_red_texturepng_0.geometry}
            material={materials["Dark_red_texture.png"]}
            position={[0, 3.125, -34.375]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.logo_hoop_Dark_red_texturepng_0.geometry}
            material={materials["Dark_red_texture.png"]}
            position={[34.766, 26.562, -35.937]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.main_hoop_Dark_red_texturepng_0.geometry}
            material={materials["Dark_red_texture.png"]}
            position={[35.417, 51.562, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Screen_hoop_texture_2_0.geometry}
            material={materials.texture_2}
            position={[36.719, 51.562, 9.375]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Stand_texture_0.geometry}
            material={materials.texture}
            position={[0, 12.74, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.stereo_hoop_Dark_red_texturepng_0.geometry}
            material={materials["Dark_red_texture.png"]}
            position={[35, 43.75, -35.938]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.top_logo_hoop_Dark_red_texturepng_0.geometry}
            material={materials["Dark_red_texture.png"]}
            position={[34.766, 82.812, 34.375]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.TV_case_TV_case_texturepng_0.geometry}
            material={materials["TV_case_texture.png"]}
            position={[-26.562, 54.048, 0]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/crt.glb");
