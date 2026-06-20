# Advanced Dishwasher Repairs - Enterprise Specification Addendum

## Additions Required For Claude Code

These sections should be appended to the existing specification.

---

# Detailed Homepage Wireframe

## Section 1 - Header

Logo (left)

Navigation:

- Home
- Services
- Brands
- Manuals
- Fault Codes
- Coverage Areas
- About
- Blog
- Contact

Primary CTA:

- Book Repair

Sticky header on scroll.

---

## Section 2 - Hero

Headline:
Commercial Dishwasher Repair Experts

Subheading:
Fast, reliable commercial dishwasher repairs, maintenance and installation services.

Actions:

- Book Engineer
- Get Instant Quote

Hero image:
Commercial dishwasher equipment

Trust indicators:

- 15+ Years Experience
- 5000+ Machines Repaired
- 24/7 Support
- 98% First Time Fix Rate

---

## Section 3 - Manual Search

Large search bar.

Search by:

- Brand
- Model
- Product Type

Instant search results.

---

## Section 4 - Fault Code Search

Search:

- Brand
- Fault Code

Quick access to common codes.

---

## Section 5 - Brands

Grid of supported brands.

Each card links to:
/brands/[slug]

---

## Section 6 - Services

Cards:

- Repairs
- Installation
- Maintenance
- Emergency Call Outs

---

## Section 7 - Before & After

Gallery slider.

---

## Section 8 - Testimonials

CMS managed.

---

## Section 9 - Latest Articles

Recent blog posts.

---

## Section 10 - Final CTA

Emergency repair banner.

---

# Complete Folder Structure

src/
├── app/
├── routes/
├── pages/
├── components/
│ ├── layout/
│ ├── ui/
│ ├── forms/
│ ├── search/
│ └── seo/
├── features/
│ ├── manuals/
│ ├── brands/
│ ├── fault-codes/
│ ├── services/
│ ├── blog/
│ └── booking/
├── hooks/
├── lib/
├── services/
├── types/
├── assets/
├── styles/
└── utils/

---

# CMS Models

## Brand

name
slug
logo
description
seoTitle
seoDescription

## Manual

title
slug
brand
model
productType
description
pdfAsset
thumbnail
seoTitle
seoDescription

## Fault Code

brand
model
code
title
description
commonCauses
recommendedActions
seoTitle
seoDescription

## Service

title
slug
description
content
image
seoTitle
seoDescription

## Blog Post

title
slug
excerpt
content
featuredImage
author
publishDate
seoTitle
seoDescription

## Testimonial

customerName
companyName
review
rating

## Location

name
slug
content
coverageArea
seoTitle
seoDescription

---

# URL Structure

/
/services
/services/[service]

/brands
/brands/[brand]

/manuals
/manuals/[manual]

/fault-codes
/fault-codes/[code]

/coverage-areas
/coverage-areas/[location]

/blog
/blog/[article]

/contact
/booking
/about

---

# SEO Requirements

Every page must have:

- Unique title tag
- Unique meta description
- Canonical URL
- Open Graph image
- Structured data
- Breadcrumb schema

---

# Technical Requirements

Use:

- React lazy loading
- Route code splitting
- Image optimisation
- Dynamic imports
- Sitemap generation
- Robots generation

---

# Security

Although authentication is not required:

- Rate limit forms
- Spam protection
- Honeypot fields
- Server-side validation

---

# Future-Proofing

Allow future expansion for:

- Ecommerce parts store
- Engineer portal
- Customer portal
- Online payments
- Live chat
- AI-assisted fault finder

---

# Definition of Done

Project is complete when:

- Mobile responsive
- Lighthouse 95+
- WCAG 2.2 AA compliant
- SEO implemented
- CMS connected
- Manuals searchable
- Fault codes searchable
- Forms working
- Vercel deployment ready
- Production ready
