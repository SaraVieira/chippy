import "./style.css";
import { CPU } from "./chippy/cpu";
import { Keyboard } from "./chippy/keyboard";
import { Screen } from "./chippy/screen";
import { useEffect, useRef } from "react";
import { loadChippy } from "./chippy/main";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Model } from "./Model";

const Main = () => {
  return (
    <>
      <Stage adjustCamera={1.5} preset={"rembrandt"} environment={"sunset"}>
        <Model
          onButtonClick={() => console.log("sup")}
          rotation={[0, -Math.PI / 2, 0]}
          HTML={
            <div className="bg-blue-300">
              <ChippyScreen />
            </div>
          }
        />
        <OrbitControls />
      </Stage>
    </>
  );
};

const ChippyScreen = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const cpu = useRef<CPU | null>(null);

  useEffect(() => {
    if (ref.current) {
      const screen = new Screen(10, ref.current, { fill: "#2786a9" });
      const keyboard = new Keyboard();
      cpu.current = new CPU(screen, keyboard);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRomLoad = (e: any) => {
    const rom = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function (loadEvent) {
      const buffer = loadEvent.target?.result as ArrayBuffer;
      const uint8Array = new Uint8Array(buffer);
      loadChippy(uint8Array, cpu.current!);
    });
    reader.readAsArrayBuffer(rom);
  };
  return (
    <>
      <div className="crt w-[275px] h-[200px]">
        <canvas ref={ref} className="w-[275px] h-[200px]"></canvas>
      </div>
      {/* <button
        onClick={() => cpu.current!.togglePause()}
        className={hidden ? "hidden" : ""}
      >
        Pause
      </button> */}
      <label className="absolute z-10 top-0">
        sup
        <input className=" hidden" type="file" id="rom" onChange={onRomLoad} />
      </label>
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
