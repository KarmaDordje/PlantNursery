# UI/UX Improvement Plan - PlantNursery

## Project Overview
Modernizing the digital presence of the Wojtek Ogrodnik plant nursery with a focus on "Biophilic Design" (nature-inspired aesthetics) and a seamless user experience for both retail and local customers.

## Current State Analysis
- **Framework:** Next.js 15+ (App Router), Tailwind CSS.
- **Design:** Modern but relies on generic placeholders (Unsplash images).
- **Layout:** Standard landing page structure (Hero > Categories > Featured > Footer).

## 1. Visual Design (UI) Enhancements

### 1.1 Biophilic Palette Refinement
- **Primary:** Forest Green (#2B4522) for headers and primary CTAs.
- **Secondary:** Sage (#8A9A86) for accents and secondary buttons.
- **Neutral:** Soft Sand (#F4F1EB) for section backgrounds.
- **Implementation:** Consolidate these into `globals.css` as CSS variables for site-wide consistency.

### 1.2 Typography & Hierarchy
- **Headings:** `Playfair Display` for a classic, trustworthy feel.
- **Body:** `Inter` for legibility.
- **Action Items:** Increase weight and letter spacing for buttons and navigation links.

### 1.3 Card Design
- **Elevation:** Use soft shadows (`shadow-sm` to `shadow-md`) that feel natural.
- **Hover States:** Implement a subtle "lift" effect and image zoom on plant cards.
- **Badges:** Use organic shapes (pill-style) for "Polecane" and "Nowość".

## 2. User Experience (UX) Enhancements

### 2.1 Navigation
- **Glassmorphism:** Make the navbar sticky with a backdrop blur (`backdrop-blur-md`) and 80% opacity.
- **Active States:** Clear visual indicator for the current page in the navbar.
- **Mobile UX:** Implement a dedicated hamburger menu with slide-in animation.

### 2.2 Hero Section
- **Dynamic Content:** Swap the static Unsplash image for a high-quality local nursery shot or a subtle auto-playing video.
- **Copy:** Use the extracted "O nas" summary to craft a more authentic value proposition.

### 2.3 Interactive Catalog
- **Filter Bar:** Allow users to filter by "Sunlight" (Full Sun, Shade), "Type" (Conifer, Deciduous), and "Price".
- **Quick View:** (Optional) Modal to see plant details without leaving the catalog page.

### 2.4 Footer
- **Information Density:** Add a mini-map or clear directional text to the Bydgoszcz location.
- **Social Proof:** Add links to Facebook/Instagram (if available).

## 3. Performance & Accessibility
- **Next Image:** Audit all `<img>` tags to ensure `next/image` is used for optimal loading and layout stability (CLS).
- **A11y:** Check color contrast on "Sage" text and ensure all interactive elements are keyboard navigable.

---
**Next Steps:**
1. User approval of this plan.
2. Implement Global Design System (globals.css).
3. Update Hero and Navigation components.
4. Enhance Plant Card components.
