// globalWrapper.ts
export let globalWrapper: any = null;

export const setGlobalWrapper = (wrapper: any) => {
  globalWrapper = wrapper;
};

export const getGlobalWrapper = () => globalWrapper;
