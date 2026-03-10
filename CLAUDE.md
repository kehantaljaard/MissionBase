# MissionBase - Mission Base Ministries Website

## Project Overview

A single-page website for **Mission Base Ministries**, a South African NGO serving the Enkanini community near Stellenbosch. Built with Next.js 14 (App Router), React 18, TypeScript, and Tailwind CSS. Content is CMS-editable via a built-in admin panel with password-protected API routes. Images are stored on Vercel Blob Storage.

## Tech Stack

- **Framework:** Next.js 14 (App Router, `app/` directory)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3 with custom brand colors
- **Font:** Inter (loaded via `next/font/google`)
- **Image Storage:** Vercel Blob (`@vercel/blob`)
- **Deployment:** Vercel

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
app/
  layout.tsx          # Root layout (metadata, font setup)
  page.tsx            # Single-page home (client component, manages content state)
  globals.css         # Global styles
  api/
    auth/route.ts     # Password validation endpoint
    content/route.ts  # GET/PUT site content (JSON)
    upload/route.ts   # Image upload to Vercel Blob
components/
  Navbar.tsx          # Navigation bar with admin access trigger
  HeroSection.tsx     # Hero banner with gallery
  MealsBanner.tsx     # Meals-served counter banner
  WhatWeDoSection.tsx # Programs description
  TeamFounderSection.tsx  # Combined team + founder display
  TeamSection.tsx     # Team members display
  FounderSection.tsx  # Founder bio
  DonateSection.tsx   # Donation info (bank details, SnapScan, needs)
  ContactSection.tsx  # Contact info + social links
  CollapsibleSection.tsx  # Expandable section wrapper
  Footer.tsx          # Site footer
  admin/
    AdminPanel.tsx    # Full admin CMS panel
    SectionEditor.tsx # Per-section content editor
    ImageUpload.tsx   # Image upload component
    ImageCropper.tsx  # Client-side image cropping
    AdminButton.tsx   # Admin UI button
data/
  defaultContent.ts   # Fallback content when API unavailable
lib/
  types.ts            # TypeScript interfaces (SiteContent and sub-types)
  content.ts          # Content fetch/save/upload helpers
  navigation.ts       # Section scroll navigation utility
  colorUtils.ts       # Color helper functions
public/
  images/Logo.jpeg    # Site logo
```

## Architecture

- **Single-page app:** All sections render on one page (`app/page.tsx`) as a client component
- **Content system:** Content is fetched from `/api/content` on mount, merged with `defaultContent` as fallback. Admin panel saves via PUT with Bearer token auth
- **Collapsible sections:** Main sections use `CollapsibleSection` wrapper and can be opened programmatically via `open-section` custom events + smooth scrolling
- **Admin panel:** Hidden panel opened via Navbar, protected by password. Supports editing all site content and uploading/cropping images
- **Path alias:** `@/*` maps to project root

## Brand Colors

Defined in `tailwind.config.ts` under `theme.extend.colors.brand`:

| Name    | Hex       |
|---------|-----------|
| orange  | `#FE7F2D` |
| teal    | `#215E61` |
| dark    | `#233D4D` |
| light   | `#F5FBE6` |
| green   | `#628141` |
| mustard | `#D4A017` |

## Content Types

All content types are defined in `lib/types.ts`. The root type is `SiteContent` with sections: `hero`, `whatWeDo`, `team`, `founder`, `donate`, `contact`, `footer`.

## Environment Variables

- `NEXT_PUBLIC_BASE_URL` - Base URL for server-side content fetching (defaults to `http://localhost:3000`)
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token (required for image uploads)
- `ADMIN_PASSWORD` - Password for admin API authentication

## Conventions

- Components are in `components/` as `.tsx` files, one component per file
- API routes use Next.js App Router convention (`app/api/*/route.ts`)
- ESLint is ignored during builds (`next.config.mjs`)
- Remote images from `*.public.blob.vercel-storage.com` are allowed in `next/image`
