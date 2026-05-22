# UI/UX Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize the PlantNursery website with a biophilic design system, interactive UI elements, and improved navigation.

**Architecture:** Use CSS Variables in `globals.css` for a centralized design system. Update Next.js Server Components for layout and client components for interactive elements.

**Tech Stack:** Next.js 15, Tailwind CSS (for layout), CSS Modules (for component-specific styling), Lucide-React (icons).

---

### Task 1: Global Design System (Biophilic Palette)

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update globals.css with new CSS variables**

```css
:root {
  /* Biophilic Color Palette */
  --color-forest-green: #2B4522;
  --color-sage: #8A9A86;
  --color-sage-light: #C0CDC0;
  --color-earthy-brown: #5C4B3F;
  --color-soft-sand: #F4F1EB;
  --color-white: #FFFFFF;
  --color-black: #1A1A1A;
  
  /* Backgrounds & Surfaces */
  --bg-primary: var(--color-soft-sand);
  --bg-secondary: var(--color-white);
  --bg-dark: var(--color-forest-green);
  
  /* Typography */
  --text-primary: var(--color-black);
  --text-secondary: var(--color-earthy-brown);
  --text-light: var(--color-white);
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

h1, h2, h3, h4 {
  color: var(--color-forest-green);
}
```

- [ ] **Step 2: Commit changes**

```bash
git add src/app/globals.css
git commit -m "style: implement biophilic design system variables"
```

### Task 2: Navigation Improvement (Glassmorphism & Sticky)

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update navbar styles in globals.css**

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(43, 69, 34, 0.1);
  transition: all 0.3s ease;
}

.nav-links a {
  position: relative;
  font-weight: 500;
  color: var(--color-forest-green);
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--color-sage);
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}
```

- [ ] **Step 2: Verify navbar is sticky and has blur effect on http://localhost:3000**

- [ ] **Step 3: Commit changes**

```bash
git add src/app/globals.css
git commit -m "style: add glassmorphism and sticky behavior to navbar"
```

### Task 3: Hero Section Modernization

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.module.css`

- [ ] **Step 1: Update Hero section copy and styling**

```tsx
// src/app/page.tsx
// Update Hero title and subtitle with the three generations story
<h1 className={styles.heroTitle}>Trzy Pokolenia Pasji do Ogrodów</h1>
<p className={styles.heroSubtitle}>
  Szkółka Wojciecha Kotyrby to tradycja od 1980 roku. 
  Oferujemy najwyższej jakości rośliny ozdobne oraz profesjonalne zakładanie ogrodów w Bydgoszczy i okolicach.
</p>
```

- [ ] **Step 2: Add a subtle overlay to the Hero image in page.module.css**

```css
.heroOverlay {
  background: linear-gradient(to bottom, rgba(43, 69, 34, 0.4), rgba(43, 69, 34, 0.7));
}
```

- [ ] **Step 3: Commit changes**

```bash
git add src/app/page.tsx src/app/page.module.css
git commit -m "feat: modernize hero section with authentic copy"
```

### Task 4: Interactive Plant Cards

**Files:**
- Modify: `src/app/page.tsx` (or a separate PlantCard component if it exists)
- Modify: `src/app/page.module.css`

- [ ] **Step 1: Implement hover effects on cards**

```css
.plantCard {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background: white;
}

.plantCard:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(43, 69, 34, 0.1);
}

.plantImageContainer img {
  transition: transform 0.5s ease;
}

.plantCard:hover .plantImageContainer img {
  transform: scale(1.05);
}
```

- [ ] **Step 2: Commit changes**

```bash
git add src/app/page.module.css
git commit -m "style: add interactive hover effects to plant cards"
```

### Task 5: Catalog Filtering UI (Minimal)

**Files:**
- Modify: `src/app/katalog/page.tsx`

- [ ] **Step 1: Add a filter bar UI with categories**

```tsx
const categories = ["Wszystkie", "Iglaste", "Liściaste", "Byliny", "Trawy"];

return (
  <div className="filter-bar flex gap-4 mb-8 overflow-x-auto pb-2">
    {categories.map(cat => (
      <button key={cat} className="px-4 py-2 rounded-full border border-sage hover:bg-sage hover:text-white transition">
        {cat}
      </button>
    ))}
  </div>
);
```

- [ ] **Step 2: Commit changes**

```bash
git add src/app/katalog/page.tsx
git commit -m "feat: add category filter bar to katalog page"
```
