import type { Curriculum, Technique } from "@/domain/curriculum";

function defineTechnique(id: string, name: string, description: string) {
  return {
    id,
    name,
    description,
    resources: [],
  } satisfies Technique;
}

export const karateTechniques = {
  readyStance: defineTechnique(
    "ready-stance",
    "Ready stance",
    "A balanced starting position used to prepare the body and attention for movement.",
  ),
  frontStance: defineTechnique(
    "front-stance",
    "Front stance",
    "A stable forward-facing stance that supports strong movement, blocks, and strikes.",
  ),
  straightPunch: defineTechnique(
    "straight-punch",
    "Straight punch",
    "A direct punch that coordinates stance, hip rotation, and a straight path to the target.",
  ),
  forwardStep: defineTechnique(
    "forward-step",
    "Forward step",
    "Controlled forward movement that preserves stance, balance, and readiness.",
  ),
  backwardStep: defineTechnique(
    "backward-step",
    "Backward step",
    "Controlled retreating movement that maintains posture, distance, and balance.",
  ),
  downwardBlock: defineTechnique(
    "downward-block",
    "Downward block",
    "A descending defensive motion used to redirect attacks toward the lower body.",
  ),
  risingBlock: defineTechnique(
    "rising-block",
    "Rising block",
    "An upward defensive motion used to protect the head and create a safe angle.",
  ),
  frontKick: defineTechnique(
    "front-kick",
    "Front kick",
    "A linear kick driven toward a target while preserving posture and a controlled return.",
  ),
  insideBlock: defineTechnique(
    "inside-block",
    "Inside block",
    "A defensive motion that travels across the body to redirect an incoming attack.",
  ),
  outsideBlock: defineTechnique(
    "outside-block",
    "Outside block",
    "A defensive motion that redirects an attack away from the body's center line.",
  ),
  roundhouseKick: defineTechnique(
    "roundhouse-kick",
    "Roundhouse kick",
    "A rotational kick that delivers the leg along a curved path and returns under control.",
  ),
  blockAndCounter: defineTechnique(
    "block-and-counter",
    "Block and counter",
    "A combination that links a defensive response directly to a controlled counterattack.",
  ),
  frontKickReversePunch: defineTechnique(
    "front-kick-reverse-punch",
    "Front kick and reverse punch",
    "A combination that connects a front kick to a reverse punch while recovering balance.",
  ),
  angleStepCounter: defineTechnique(
    "angle-step-counter",
    "Angle-step counter",
    "A defensive combination that moves off the attack line before delivering a counter.",
  ),
  roundhouseReversePunch: defineTechnique(
    "roundhouse-reverse-punch",
    "Roundhouse and reverse punch",
    "A combination that follows a roundhouse kick with a stable reverse punch.",
  ),
  controlledPartnerDrill: defineTechnique(
    "controlled-partner-drill",
    "Controlled partner drill",
    "A cooperative exercise for practicing distance, timing, control, and safe responses.",
  ),
  formApplicationSequence: defineTechnique(
    "form-application-sequence",
    "Form application sequence",
    "A partnered sequence that explores practical uses for movements found in a form.",
  ),
} as const satisfies Record<string, Technique>;

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
            {
              type: "technique",
              technique: karateTechniques.readyStance,
            },
            {
              type: "technique",
              technique: karateTechniques.frontStance,
            },
            {
              type: "technique",
              technique: karateTechniques.straightPunch,
            },
          ],
        },
        {
          id: "white-belt-movement",
          category: "Movement",
          items: [
            {
              type: "technique",
              technique: karateTechniques.forwardStep,
            },
            {
              type: "technique",
              technique: karateTechniques.backwardStep,
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
              type: "technique",
              technique: karateTechniques.downwardBlock,
            },
            {
              type: "technique",
              technique: karateTechniques.risingBlock,
            },
            {
              type: "technique",
              technique: karateTechniques.frontKick,
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
            {
              type: "technique",
              technique: karateTechniques.insideBlock,
            },
            {
              type: "technique",
              technique: karateTechniques.outsideBlock,
            },
            {
              type: "technique",
              technique: karateTechniques.roundhouseKick,
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
              type: "technique",
              technique: karateTechniques.blockAndCounter,
            },
            {
              type: "technique",
              technique: karateTechniques.frontKickReversePunch,
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
              type: "technique",
              technique: karateTechniques.angleStepCounter,
            },
            {
              type: "technique",
              technique: karateTechniques.roundhouseReversePunch,
            },
          ],
        },
        {
          id: "blue-belt-application",
          category: "Application",
          items: [
            {
              type: "technique",
              technique: karateTechniques.controlledPartnerDrill,
            },
            {
              type: "technique",
              technique: karateTechniques.formApplicationSequence,
            },
          ],
        },
      ],
    },
  ],
} as const satisfies Curriculum;
