export const ScreenUI = ({
  canvasEl,
}: {
  canvasEl: React.MutableRefObject<HTMLCanvasElement | null>;
}) => {
  return (
    <>
      <div className="crt w-[275px] h-[200px] crt">
        <canvas ref={canvasEl} className="w-[275px] h-[200px]"></canvas>
      </div>
    </>
  );
};
