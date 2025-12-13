# AI Rules for Sobol Application Development

This document outlines the core technologies and best practices to follow when developing for the Sobol application.

## Tech Stack Overview

1.  **Framework:** Next.js (version 16.0.7) for building server-rendered React applications.
2.  **Language:** TypeScript for type safety and improved code quality across the entire codebase.
3.  **Styling:** Tailwind CSS (version 4) is used exclusively for all styling. Utility classes should be preferred for layout, spacing, colors, and responsive design.
4.  **UI Components:** Shadcn/ui components are utilized for pre-built, accessible, and customizable UI elements.
5.  **Icons:** Lucide React is the designated library for all icons within the application.
6.  **Animation:** Framer Motion is used for declarative animations and transitions to enhance user experience.
7.  **Font:** The Tajawal font is used, imported via `next/font/google`.
8.  **Routing:** Next.js App Router is used for defining routes and managing navigation.
9.  **Utility Functions:** `clsx` and `tailwind-merge` are combined in `lib/utils.ts` for robust class name concatenation.
10. **State Management:** React's built-in `useState` hook is used for local component state.

## Library Usage Rules

*   **Next.js:**
    *   Use the App Router for all page-based routing (e.g., `app/page.tsx`, `app/services/page.tsx`).
    *   Leverage Next.js features like `Image` component for optimized images and `Link` for client-side navigation.
*   **React:**
    *   All UI should be built using React components.
    *   For local component state, use `useState`. Avoid complex state management libraries unless a clear need arises and is approved.
*   **TypeScript:**
    *   All new files and modifications must be written in TypeScript (`.ts` or `.tsx`).
    *   Ensure proper typing for props, state, and functions.
*   **Tailwind CSS:**
    *   **Mandatory:** All styling must be done using Tailwind CSS utility classes. Avoid inline styles or custom CSS files unless absolutely necessary for very specific, isolated cases (e.g., complex gradients not easily achievable with Tailwind).
    *   Use the `cn` utility from `lib/utils.ts` for combining and conditionally applying Tailwind classes.
*   **Shadcn/ui:**
    *   Prioritize using existing shadcn/ui components (e.g., `Button`) for common UI patterns.
    *   If a shadcn/ui component needs modification, **do not edit the original file**. Instead, create a new component in `src/components/` that wraps or extends the shadcn/ui component, applying your custom styling or logic.
*   **Lucide React:**
    *   All icons should be imported from `lucide-react`.
    *   Ensure icons are appropriately sized and styled using Tailwind classes.
*   **Framer Motion:**
    *   Use `motion` components for animations.
    *   Keep animations subtle and purposeful to enhance user experience without being distracting.
    *   Utilize `AnimatePresence` for exit animations when components are unmounted.
*   **`lib/utils.ts` (`cn` function):**
    *   Always use the `cn` function when combining multiple Tailwind classes, especially when dealing with conditional classes.