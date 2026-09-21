export type Requirement = {
  id: string;
  category: string;
  items: readonly string[];
};

export type Rank = {
  id: string;
  name: string;
  order: number;
  belt: {
    name: string;
    color: string;
  };
  requirements: readonly Requirement[];
};

export type Curriculum = {
  id: string;
  name: string;
  discipline: string;
  ranks: readonly Rank[];
};
