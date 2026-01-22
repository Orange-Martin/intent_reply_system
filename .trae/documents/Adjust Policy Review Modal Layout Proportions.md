I have analyzed the current code for `src/components/PolicyReviewModal.tsx`.

**Current Width Analysis:**
The current width of the left preview area is set to `w-[420px]` (line 129).

**Plan:**

1.  **Reduce Left Preview Width**:
    *   Change the left preview container width from `w-[420px]` to `w-[350px]` (approximately 1/4 of the total modal width of 1400px).
    *   Adjust the internal mobile preview card scaling to fit this narrower width. Currently it's `scale-[0.95]`, I will likely need to reduce it further (e.g., `scale-[0.8]`) or adjust the container padding to ensure the `375px` card still fits visually without horizontal scrolling or clipping.

2.  **Verify Proportions**:
    *   With the modal width at `1400px`, setting the left pane to `350px` creates an exact 1:3 ratio (350px : 1050px), which matches your request for it to be about 1/4 of the total width.

**Action**:
I will modify `src/components/PolicyReviewModal.tsx` to implement these width and scaling adjustments.