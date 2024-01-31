export type Frequent = {
  id: number;
  name: string;
  word: string;
};

export type FormDataFrequent = Omit<Frequent, "id">;