import { Application } from "pixi.js";
import { useEffect, useRef } from "react";
import useAssetsLoader from "../../hooks/useAssetsLoader";
import { Wrapper } from "./_components/wrapper";
// import { useSocketContext } from "../../context/SocketContext";
import { getGlobalWrapper, setGlobalWrapper } from "../../utils/helper";

interface canvasProp {
  planeData: string;
  planeMultiplier: string | number;
}
export let app: Application;
const Canvas: React.FC<canvasProp> = ({ planeMultiplier, planeData }) => {
//   const { chatOpen } = useSocketContext();
  const multiplier = Number(planeMultiplier);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<Application | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const WrapperRef = useRef<Wrapper | null>(null);
  const { isLoaded, loadedTextures, error } = useAssetsLoader();

  useEffect(() => {
    if (isLoaded && loadedTextures) {
      initializeGame(loadedTextures);
    }

    if (error) {
      console.error("Error loading assets:", error);
    }

    const handleResize = () => {
      if (containerRef.current && appRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        appRef.current.renderer.resize(clientWidth, clientHeight);
        WrapperRef.current?.handleResize();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, loadedTextures, error]);

  const prevStatusRef = useRef<number | null>(null);
  const global = getGlobalWrapper();
  useEffect(() => {
    if (!planeData || !WrapperRef.current) return;
    const parsed = planeData.split(":");
    const status = parsed.length > 2 ? parseInt(parsed[2]) : -1;
    if (status === prevStatusRef.current) return;
    prevStatusRef.current = status;

    if (status === 1) {
      WrapperRef.current.animateCurveDrawing();
    } else if (status === 0) {
      WrapperRef.current.resetPlane();
    } else if (status === 2) {
      WrapperRef.current.flewAway();
    }
  }, [planeData, WrapperRef.current, multiplier]);

  useEffect(() => {
    if (!planeData) return;
    const parsed = planeData.split(":");
    const status = parsed.length > 2 ? parseInt(parsed[2]) : -1;
    if (status == 1) {
      if (multiplier <= 2) {
        global?.changeBlurColor("0x34b4ff");
      } else if (multiplier > 2 && multiplier < 10) {
        global?.changeBlurColor("0x913ef8");
      } else if (multiplier >= 10) {
        global?.changeBlurColor("0xc017b4");
      }
    }
  }, [multiplier]);

  const initializeGame = (textures: any) => {
    if (!containerRef.current) return;
    app = new Application({
      view: canvasRef.current!,
      // backgroundAlpha: 0,
      // backgroundColor: 0x57564f,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      autoDensity: true,
      antialias: true,
      resolution: window.devicePixelRatio,
      // powerPreference: "high-performance",
    });

    // @ts-ignores
    globalThis.__PIXI_APP__ = app;

    appRef.current = app;

    WrapperRef.current = new Wrapper(app, textures);
    setGlobalWrapper(WrapperRef.current);
    app.stage.addChild(WrapperRef.current);
  };
  
//   useEffect(() => {
//     if (containerRef.current && appRef.current) {
//       const { clientWidth, clientHeight } = containerRef.current;
//       appRef.current.renderer.resize(clientWidth, clientHeight);
//       WrapperRef.current?.handleResize();
//     }
//   }, [chatOpen]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          overflow: "hidden",
          border: "1px solid #2a2b2e",
          borderRadius: "10px",
          aspectRatio: "16 / 9",
        }}
      >
        <canvas ref={canvasRef} className={`canvas-game-main`} />
      </div>
    </>
  );
};

export default Canvas;
