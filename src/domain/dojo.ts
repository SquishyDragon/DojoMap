import type { Curriculum } from "./curriculum";

export type Dojo = {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
  description: string;
  curriculum: Curriculum;
};
