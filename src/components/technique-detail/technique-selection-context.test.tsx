import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  TechniqueSelectionProvider,
  useTechniqueSelection,
} from "./technique-selection-context";

afterEach(() => {
  cleanup();
});

function SelectionHarness() {
  const { selection, selectTechnique, clearTechnique } =
    useTechniqueSelection();

  return (
    <>
      <output>
        {selection
          ? `${selection.techniqueId} at ${selection.rankId}`
          : "No technique selected"}
      </output>
      <button
        onClick={() =>
          selectTechnique({
            techniqueId: "front-kick",
            rankId: "white-belt",
          })
        }
      >
        Select front kick
      </button>
      <button
        onClick={() =>
          selectTechnique({
            techniqueId: "roundhouse-kick",
            rankId: "yellow-belt",
          })
        }
      >
        Select roundhouse kick
      </button>
      <button onClick={clearTechnique}>Clear selection</button>
    </>
  );
}

describe("TechniqueSelectionProvider", () => {
  it("owns selection, replacement, and clearing for the journey", () => {
    render(
      <TechniqueSelectionProvider>
        <SelectionHarness />
      </TechniqueSelectionProvider>,
    );

    expect(screen.getByText("No technique selected")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "Select front kick" }));
    expect(screen.getByText("front-kick at white-belt")).toBeDefined();

    fireEvent.click(
      screen.getByRole("button", { name: "Select roundhouse kick" }),
    );
    expect(screen.getByText("roundhouse-kick at yellow-belt")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "Clear selection" }));
    expect(screen.getByText("No technique selected")).toBeDefined();
  });
});
