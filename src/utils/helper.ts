// globalWrapper.ts
export let globalWrapper: any = null;

export const setGlobalWrapper = (wrapper: any) => {
  globalWrapper = wrapper;
};

export const getGlobalWrapper = () => globalWrapper;

export const initialBetBtns = [
  {
    type: "Yes",
    click: false,
    chip: 1,
  },
  {
    type: "No",
    click: false,
    chip: 2,
  },
];

export function getOverUnderOdds(crashPoint: number, rtp = 0.97) {
  if (crashPoint < 1 || crashPoint >= 100) {
    throw new Error("Crash point must be between 1 and 99");
  }

  const total = 100;
  const pUnder = crashPoint / total;
  const pOver = (total - crashPoint) / total;
  const underMultiplier = (1 / pUnder) * rtp;
  const overMultiplier = (1 / pOver) * rtp;

  return {
    multipliers: {
      under: Number(underMultiplier.toFixed(2)),
      over: Number(overMultiplier.toFixed(2)),
    },
  };
}

export const payoutData = [
  {
    betOption: "Single Number (1–12)",
    winningCondition: "Exact selected number wins",
    payout: 11.64,
  },
  {
    betOption: "1–6",
    winningCondition: "Winning number is between 1 and 6",
    payout: 1.94,
  },
  {
    betOption: "7–12",
    winningCondition: "Winning number is between 7 and 12",
    payout: 1.94,
  },
  {
    betOption: "Even",
    winningCondition: "Winning number is even",
    payout: 1.94,
  },
  {
    betOption: "Odd",
    winningCondition: "Winning number is odd",
    payout: 1.94,
  },
  {
    betOption: "Red",
    winningCondition: "Winning number is red",
    payout: 1.94,
  },
  {
    betOption: "Black",
    winningCondition: "Winning number is black",
    payout: 1.94,
  },
];

export const categoryCheck = (cat: number) => {
  if (cat == 1) {
    return "Single";
  } else if (cat == 2) {
    return "SP";
  } else if (cat == 3) {
    return "DP";
  } else {
    return "Trio";
  }
};

export const chipNumber = (cat: number, chip: number): string => {
  if (cat === 1 && chip === 10) {
    return "L1";
  } else if (cat === 1 && chip === 11) {
    return "L2";
  } else if (cat === 1 && chip === 13) {
    return "Odd";
  } else if (cat === 1 && chip === 12) {
    return "Even";
  } else if ((cat === 2 || cat === 3) && chip === 10) {
    return "All";
  } else if (cat === 4 && chip === 1) {
    return "";
  } else {
    return chip.toString();
  }
};
