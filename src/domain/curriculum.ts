export type CurriculumResource =
  | {
      type: "external";
      url: string;
    }
  | {
      type: "internal";
      slug: string;
    };

export type CurriculumItem = {
  id: string;
  name: string;
  type: "form" | "technique" | "knowledge";
  resource?: CurriculumResource;
};

export type Requirement = {
  id: string;
  category: string;
  items: readonly CurriculumItem[];
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
