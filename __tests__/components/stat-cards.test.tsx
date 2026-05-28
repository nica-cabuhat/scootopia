import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import StatCards from "@/components/domain-checker/stat-cards";
import { useDomainCheckerStore } from "@/store/domain-checker";

beforeEach(() => useDomainCheckerStore.getState().reset());

describe("StatCards", () => {
  it("renders all three category cards", () => {
    render(<StatCards />);
    expect(screen.getByText("2xx")).toBeInTheDocument();
    expect(screen.getByText("4xx/5xx")).toBeInTheDocument();
    expect(screen.getByText("Network Error")).toBeInTheDocument();
  });

  it("shows zero counts initially", () => {
    render(<StatCards />);
    const zeros = screen.getAllByText("0");
    expect(zeros.length).toBeGreaterThanOrEqual(3);
  });

  it("reflects store counts", () => {
    useDomainCheckerStore.getState().prependResults([
      { url: "https://a.com", finalUrl: "https://a.com", status: 200, category: "ok" },
      { url: "https://b.com", finalUrl: "https://b.com", status: 404, category: "error" },
    ]);
    render(<StatCards />);
    const okCard = screen.getByText("2xx").closest("[data-slot='card']")!;
    const errorCard = screen.getByText("4xx/5xx").closest("[data-slot='card']")!;
    expect(okCard).toHaveTextContent("1");
    expect(errorCard).toHaveTextContent("1");
  });
});
