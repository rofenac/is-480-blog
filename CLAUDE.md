# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Always Use MCPs

**Always prefer MCP (Model Context Protocol) tools over built-in alternatives when available.** For example:
- Use `mcp__filesystem__*` tools for file operations instead of Read/Write/Edit
- Use `mcp__github__*` tools for GitHub operations instead of `gh` CLI commands
- Use `mcp__memory__*` tools to store and retrieve project context across sessions
- Check available MCPs and use them whenever they can accomplish the task

## Commands

- `npm run dev` - Start development server
- `npm run build` - Type-check with TypeScript and build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture

This is a React + TypeScript blog for documenting an IS-480 internship at a college IT lab (NDG Netlab+ installation).

**Tech Stack:**
- React 19 with TypeScript
- Vite 7 for build tooling
- Tailwind CSS 4 with DaisyUI 5 for styling
- GSAP for animations (with @gsap/react hooks)

**Component Structure:**
- `src/App.tsx` - Main layout composing Header, Hero, BlogPosts, and Footer
- `src/components/` - UI components with GSAP animations
  - BlogPosts uses ScrollTrigger for scroll-based animations
  - Header/Hero use timeline animations on mount

**Styling:**
- Uses DaisyUI's "night" theme (set in `index.html` and `App.tsx`)
- Tailwind configured via `@tailwindcss/vite` plugin
- Custom fonts: Inter (body) and Fira Code (monospace)
