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
          items: [
            { id: "ready-stance", name: "Ready stance", type: "technique" },
            { id: "front-stance", name: "Front stance", type: "technique" },
            {
              id: "straight-punch",
              name: "Straight punch",
              type: "technique",
            },
          ],
        },
        {
          id: "white-belt-movement",
          category: "Movement",
          items: [
            { id: "forward-step", name: "Forward step", type: "technique" },
            {
              id: "backward-step",
              name: "Backward step",
              type: "technique",
            },
          ],
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
          items: [
            {
              id: "downward-block",
              name: "Downward block",
              type: "technique",
            },
            { id: "rising-block", name: "Rising block", type: "technique" },
            {
              id: "front-kick",
              name: "Front kick",
              type: "technique",
              resource: {
                type: "external",
                url: "https://en.wikipedia.org/wiki/Front_kick",
              },
            },
          ],
        },
        {
          id: "yellow-belt-form",
          category: "Form",
          items: [
            {
              id: "foundations-form-1",
              name: "Foundations form 1",
              type: "form",
            },
          ],
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
          items: [
            { id: "inside-block", name: "Inside block", type: "technique" },
            {
              id: "outside-block",
              name: "Outside block",
              type: "technique",
            },
            {
              id: "roundhouse-kick",
              name: "Roundhouse kick",
              type: "technique",
            },
          ],
        },
        {
          id: "orange-belt-form",
          category: "Form",
          items: [
            {
              id: "foundations-form-2",
              name: "Foundations form 2",
              type: "form",
            },
          ],
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
          items: [
            {
              id: "block-and-counter",
              name: "Block and counter",
              type: "technique",
            },
            {
              id: "front-kick-reverse-punch",
              name: "Front kick and reverse punch",
              type: "technique",
            },
          ],
        },
        {
          id: "green-belt-form",
          category: "Form",
          items: [
            {
              id: "foundations-form-3",
              name: "Foundations form 3",
              type: "form",
            },
          ],
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
          items: [
            {
              id: "angle-step-counter",
              name: "Angle-step counter",
              type: "technique",
            },
            {
              id: "roundhouse-reverse-punch",
              name: "Roundhouse and reverse punch",
              type: "technique",
            },
          ],
        },
        {
          id: "blue-belt-application",
          category: "Application",
          items: [
            {
              id: "controlled-partner-drill",
              name: "Controlled partner drill",
              type: "technique",
            },
            {
              id: "form-application-sequence",
              name: "Form application sequence",
              type: "technique",
            },
          ],
        },
      ],
    },
  ],
} as const satisfies Curriculum;
