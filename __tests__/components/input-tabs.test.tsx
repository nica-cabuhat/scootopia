import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputTabs from "@/components/domain-checker/input-tabs";

describe("InputTabs", () => {
  it("renders both tab triggers", () => {
    render(<InputTabs />);
    expect(screen.getByRole("tab", { name: /paste/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /upload/i })).toBeInTheDocument();
  });

  it("paste tab is active by default", () => {
    render(<InputTabs />);
    const pasteTab = screen.getByRole("tab", { name: /paste/i });
    expect(pasteTab).toHaveAttribute("aria-selected", "true");
  });

  it("switches to upload tab on click", async () => {
    render(<InputTabs />);
    await userEvent.click(screen.getByRole("tab", { name: /upload/i }));
    const uploadTab = screen.getByRole("tab", { name: /upload/i });
    expect(uploadTab).toHaveAttribute("aria-selected", "true");
  });
});
