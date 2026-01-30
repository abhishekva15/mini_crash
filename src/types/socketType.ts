export type Info = {
  id: string;
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
