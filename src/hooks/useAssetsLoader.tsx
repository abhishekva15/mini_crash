import { TextureAtlas } from "pixi-spine";
import { Assets, SCALE_MODES, settings, Texture } from "pixi.js";
import { useEffect, useState } from "react";

//@ts-ignore
interface SpineData {
  spineAtlas: TextureAtlas;
  spineData: any;
}

export interface Characters {
  bg_sun: Texture;
  plane_0: Texture;
  plane_1: Texture;
  plane_2: Texture;
  plane_3: Texture;
  blur: Texture;
}

// Define the type for loaded textures
export interface LoadedTextures {
  characters: Characters;
}

const useAssetsLoader = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadedTextures, setLoadedTextures] = useState<LoadedTextures | null>(
    null,
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      settings.SCALE_MODE = SCALE_MODES.LINEAR;
      if (settings.RENDER_OPTIONS) {
        settings.RENDER_OPTIONS.antialias = true;
      }
      try {
        await Assets.load([
          "/assets/bg-sun.svg",
          "/assets/plane/plane-0.svg",
          "/assets/plane/plane-1.svg",
          "/assets/plane/plane-2.svg",
          "/assets/plane/plane-3.svg",
          "/assets/blur.svg",
        ]);

        // console.log("Assets loaded successfully");

        const textures: LoadedTextures = {
          characters: {
            bg_sun: Assets.cache.get("/assets/bg-sun.svg"),
            plane_0: Assets.cache.get("/assets/plane/plane-0.svg"),
            plane_1: Assets.cache.get("/assets/plane/plane-1.svg"),
            plane_2: Assets.cache.get("/assets/plane/plane-2.svg"),
            plane_3: Assets.cache.get("/assets/plane/plane-3.svg"),
            blur: Assets.cache.get("/assets/blur.svg"),
          },
        };

        console.log("Loaded textures:", textures);

        setLoadedTextures(textures);
        setIsLoaded(true);
      } catch (err) {
        console.error("Error while loading assets", err);
        setError(err as Error);
        setIsLoaded(false);
      }
    };

    loadAssets();
  }, []);

  return { isLoaded, loadedTextures, error };
};

export default useAssetsLoader;
