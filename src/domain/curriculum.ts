export type ExternalCurriculumResource = {
  type: "external";
  url: string;
};

export type TechniqueResource =
  | {
      type: "video";
      label: string;
      url: string;
    }
  | {
      type: "article";
      label: string;
      url: string;
    }
  | {
      type: "note";
      text: string;
    };

export type Technique = {
  id: string;
  name: string;
  description: string;
  resources: readonly TechniqueResource[];
};

export type TechniqueCurriculumItem = {
  type: "technique";
  technique: Technique;
  resource?: ExternalCurriculumResource;
};

export type NamedCurriculumItem = {
  id: string;
  name: string;
  type: "form" | "knowledge";
  resource?: ExternalCurriculumResource;
};

export type CurriculumItem = TechniqueCurriculumItem | NamedCurriculumItem;

export function getCurriculumItemId(item: CurriculumItem) {
  return item.type === "technique" ? item.technique.id : item.id;
}

export function getCurriculumItemName(item: CurriculumItem) {
  return item.type === "technique" ? item.technique.name : item.name;
}

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

export type TechniqueContext = {
  rank: Rank;
  requirement: Requirement;
  item: TechniqueCurriculumItem;
};

export function getTechniqueContexts(
  curriculum: Curriculum,
  techniqueId: string,
): TechniqueContext[] {
  return curriculum.ranks.flatMap((rank) =>
    rank.requirements.flatMap((requirement) =>
      requirement.items.flatMap((item) =>
        item.type === "technique" && item.technique.id === techniqueId
          ? [{ rank, requirement, item }]
          : [],
      ),
    ),
  );
}
