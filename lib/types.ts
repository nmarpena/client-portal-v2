// Tipos globales para el portal
export type Ticket = {
  id: string;
  name: string;
  column_values: Array<{ id: string; value: any; text: string }>;
};

export type TicketDetail = Ticket & {
  updates: Array<{ id: string; body: string; created_at: string }>;
  assets: Array<{ id: string; name: string; public_url: string }>;
};

export type Comment = {
  id: string;
  body: string;
  created_at: string;
};

export type FileAsset = {
  id: string;
  name: string;
  public_url: string;
};
