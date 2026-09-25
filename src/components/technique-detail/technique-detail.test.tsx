import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { karateCurriculum } from "@/data/karate-curriculum";
import type { Curriculum } from "@/domain/curriculum";

import { TechniqueDetail } from "./technique-detail";
import {
  TechniqueSelectionProvider,
  useTechniqueSelection,
} from "./technique-selection-context";

afterEach(cleanup);

const curriculumWithVideo = {
  id: "video-curriculum",
  name: "Video Curriculum",
  discipline: "Karate",
  ranks: [
    {
      id: "purple-belt",
      name: "Purple Belt",
      order: 6,
      belt: { name: "Purple", color: "#704c8a" },
      requirements: [
        {
          id: "purple-belt-techniques",
          category: "Techniques",
          items: [
            {
              type: "technique",
              technique: {
                id: "video-technique",
                name: "Video technique",
                description: "A technique with a supporting demonstration.",
                resources: [
                  {
                    type: "video",
                    label: "Watch the demonstration",
                    url: "https://example.com/video",
                  },
                  {
                    type: "video",
                    label: "Invalid demonstration",
                    url: "javascript:alert('unsafe')",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
} as const satisfies Curriculum;

function DetailHarness() {
  const { selectTechnique } = useTechniqueSelection();

  return (
    <>
      <button
        onClick={() =>
          selectTechnique({
            techniqueId: "inside-block",
            rankId: "orange-belt",
          })
        }
        type="button"
      >
        Select inside block
      </button>
      <button
        onClick={() =>
          selectTechnique({
            techniqueId: "ready-stance",
            rankId: "white-belt",
          })
        }
        type="button"
      >
        Select ready stance
      </button>
      <TechniqueDetail curriculum={karateCurriculum} />
    </>
  );
}

describe("TechniqueDetail", () => {
  it("shows the selected technique name and description", () => {
    render(
      <TechniqueSelectionProvider>
        <DetailHarness />
      </TechniqueSelectionProvider>,
    );

    expect(screen.queryByText("Technique detail")).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: "Select inside block" }),
    );

    expect(
      screen.getByRole("complementary", { name: "Inside block" }),
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { level: 2, name: "Inside block" }),
    ).toBeDefined();
    expect(
      screen.getByText(
        "A defensive motion that travels across the body to redirect an incoming attack.",
      ),
    ).toBeDefined();
    expect(screen.getByText("Orange Belt")).toBeDefined();
    expect(
      screen
        .getByRole("complementary", { name: "Inside block" })
        .getAttribute("style"),
    ).toContain("--belt-color: #ea7c2b");
  });

  it("reuses the same view when selection changes to another technique", () => {
    render(
      <TechniqueSelectionProvider>
        <DetailHarness />
      </TechniqueSelectionProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Select inside block" }),
    );
    expect(
      screen.getByRole("complementary", { name: "Inside block" }),
    ).toBeDefined();

    fireEvent.click(
      screen.getByRole("button", { name: "Select ready stance" }),
    );

    expect(screen.queryByText("Inside block")).toBeNull();
    expect(
      screen.getByRole("complementary", { name: "Ready stance" }),
    ).toBeDefined();
    expect(
      screen.getByText(
        "A balanced starting position used to prepare the body and attention for movement.",
      ),
    ).toBeDefined();
    expect(screen.getByText("White Belt")).toBeDefined();
    expect(
      screen
        .getByRole("complementary", { name: "Ready stance" })
        .getAttribute("style"),
    ).toContain("--belt-color: #f5f5f5");
  });

  it("renders valid video resources as safe external links", () => {
    function VideoHarness() {
      const { selectTechnique } = useTechniqueSelection();

      return (
        <>
          <button
            onClick={() =>
              selectTechnique({
                techniqueId: "video-technique",
                rankId: "purple-belt",
              })
            }
            type="button"
          >
            Select video technique
          </button>
          <TechniqueDetail curriculum={curriculumWithVideo} />
        </>
      );
    }

    render(
      <TechniqueSelectionProvider>
        <VideoHarness />
      </TechniqueSelectionProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Select video technique" }),
    );

    const videoLink = screen.getByRole("link", {
      name: "Watch the demonstration (video, opens in new tab)",
    });

    expect(videoLink.getAttribute("href")).toBe("https://example.com/video");
    expect(videoLink.getAttribute("target")).toBe("_blank");
    expect(videoLink.getAttribute("rel")).toContain("noopener");
    expect(videoLink.getAttribute("rel")).toContain("noreferrer");
    expect(screen.getByText("Video")).toBeDefined();
    expect(screen.queryByText("Invalid demonstration")).toBeNull();
  });

  it("renders nothing when the selected occurrence cannot be resolved", () => {
    function MissingSelection() {
      const { selectTechnique } = useTechniqueSelection();

      return (
        <button
          onClick={() =>
            selectTechnique({
              techniqueId: "inside-block",
              rankId: "missing-rank",
            })
          }
          type="button"
        >
          Select missing occurrence
        </button>
      );
    }

    render(
      <TechniqueSelectionProvider>
        <MissingSelection />
        <TechniqueDetail curriculum={karateCurriculum} />
      </TechniqueSelectionProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Select missing occurrence" }),
    );

    expect(screen.queryByRole("complementary")).toBeNull();
  });
});
