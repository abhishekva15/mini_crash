export type Info = {
  user_id: string;
  image: string;
  balance: string;
  operator_id: string;
};

export type ClientData = {
  [username: string]: string;
};

export type MaxOddsData = {
  lobby_id: number;
  round_max_mult: string;
  created_at: string;
  decimal: number;
  hashedSeed: string;
  hex: string;
  serverSeed: string;
  client_seeds: ClientData;
};
export type GameStatus = {
  user_id: string;
  name: string;
  image: number;
  bet_amount: number;
  mult: number;
  chip: number;
};

