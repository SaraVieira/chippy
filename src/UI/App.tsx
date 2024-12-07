import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Model } from "./Model";
import { ScreenUI } from "./Screen";
// import { startChippy } from "../../package/dist/chippy.esm.js";
import { startChippy } from "@saravieira/chippy";
import { useRef } from "react";

const Main = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRomLoad = (e: any) => {
    const rom = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function (loadEvent) {
      const buffer = loadEvent.target?.result as ArrayBuffer;
      const uint8Array = new Uint8Array(buffer);
      startChippy({
        rom: uint8Array,
        colors: { fill: "#fff" },
        el: ref.current!,
        speed: 1,
      });
    });
    reader.readAsArrayBuffer(rom);
  };
  return (
    <>
      <Stage adjustCamera={1.5} preset={"rembrandt"} environment={"sunset"}>
        <Model
          onButtonClick={onRomLoad}
          rotation={[0, -Math.PI / 2, 0]}
          HTML={<ScreenUI canvasEl={ref} />}
        />
        <OrbitControls />
      </Stage>
    </>
  );
};

export const App = () => {
  return (
    <>
      <Canvas>
        <Main />
      </Canvas>
    </>
  );
};
