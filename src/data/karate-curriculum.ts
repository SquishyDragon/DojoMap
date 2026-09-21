import type { Curriculum } from "@/domain/curriculum";

export const karateCurriculum = {
  id: "foundations-karate",
  name: "Foundations Karate",
  discipline: "Karate",
  ranks: [
    {
      id: "white-belt",
      name: "White Belt",
      order: 1,
      belt: {
        name: "White",
        color: "#f5f5f5",
      },
      requirements: [
        {
          id: "white-belt-basics",
          category: "Basics",
          items: ["Ready stance", "Front stance", "Straight punch"],
        },
        {
          id: "white-belt-movement",
          category: "Movement",
          items: ["Forward step", "Backward step"],
        },
      ],
    },
    {
      id: "yellow-belt",
      name: "Yellow Belt",
      order: 2,
      belt: {
        name: "Yellow",
        color: "#f5c842",
      },
      requirements: [
        {
          id: "yellow-belt-basics",
          category: "Basics",
          items: ["Downward block", "Rising block", "Front kick"],
        },
        {
          id: "yellow-belt-form",
          category: "Form",
          items: ["Foundations form 1"],
        },
      ],
    },
    {
      id: "orange-belt",
      name: "Orange Belt",
      order: 3,
      belt: {
        name: "Orange",
        color: "#ea7c2b",
      },
      requirements: [
        {
          id: "orange-belt-basics",
          category: "Basics",
          items: ["Inside block", "Outside block", "Roundhouse kick"],
        },
        {
          id: "orange-belt-form",
          category: "Form",
          items: ["Foundations form 2"],
        },
      ],
    },
    {
      id: "green-belt",
      name: "Green Belt",
      order: 4,
      belt: {
        name: "Green",
        color: "#3b7a57",
      },
      requirements: [
        {
          id: "green-belt-combinations",
          category: "Combinations",
          items: ["Block and counter", "Front kick and reverse punch"],
        },
        {
          id: "green-belt-form",
          category: "Form",
          items: ["Foundations form 3"],
        },
      ],
    },
    {
      id: "blue-belt",
      name: "Blue Belt",
      order: 5,
      belt: {
        name: "Blue",
        color: "#3267a8",
      },
      requirements: [
        {
          id: "blue-belt-combinations",
          category: "Combinations",
          items: ["Angle-step counter", "Roundhouse and reverse punch"],
        },
        {
          id: "blue-belt-application",
          category: "Application",
          items: ["Controlled partner drill", "Form application sequence"],
        },
      ],
    },
  ],
} as const satisfies Curriculum;
