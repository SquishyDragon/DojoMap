import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { karateCurriculum } from "@/data/karate-curriculum";

import { TechniqueDetail } from "./technique-detail";
import {
  TechniqueSelectionProvider,
  useTechniqueSelection,
} from "./technique-selection-context";

afterEach(cleanup);

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
        Select technique
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

    fireEvent.click(screen.getByRole("button", { name: "Select technique" }));

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
