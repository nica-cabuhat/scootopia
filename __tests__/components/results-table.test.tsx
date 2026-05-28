import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResultsTable from "@/components/domain-checker/results-table";
import { useDomainCheckerStore } from "@/store/domain-checker";

beforeEach(() => useDomainCheckerStore.getState().reset());

const seedResults = (n: number) => {
  useDomainCheckerStore.getState().prependResults(
    Array.from({ length: n }, (_, i) => ({
      url: `https://domain-${i}.com`,
      finalUrl: `https://domain-${i}.com`,
      status: 200,
      category: "ok" as const,
    })),
  );
};

describe("ResultsTable", () => {
  it("renders nothing when no results", () => {
    const { container } = render(<ResultsTable />);
    expect(container.firstChild).toBeNull();
  });

  it("renders result rows", () => {
    seedResults(3);
    render(<ResultsTable />);
    const list = screen.getByRole("list");
    expect(list.querySelectorAll("li")).toHaveLength(3);
  });

  it("shows pagination controls when results exceed page size", () => {
    seedResults(25);
    render(<ResultsTable />);
    expect(screen.getAllByText(/1–20 of 25/)[0]).toBeInTheDocument();
  });

  it("navigates to next page", async () => {
    seedResults(25);
    render(<ResultsTable />);
    await userEvent.click(screen.getByRole("button", { name: "→" }));
    expect(screen.getAllByText(/21–25 of 25/)[0]).toBeInTheDocument();
  });

  it("disables prev button on first page", () => {
    seedResults(25);
    render(<ResultsTable />);
    expect(screen.getByRole("button", { name: "←" })).toBeDisabled();
  });
});
