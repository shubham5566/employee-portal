# Employee Portal

A production-ready employee management web app built with Next.js (App Router), React, TypeScript, and Tailwind CSS — built as a frontend developer technical assessment.

## Project Overview

Employee Portal lets a signed-in admin browse, search, filter, sort, and page through an employee directory sourced from [dummyjson.com/users](https://dummyjson.com/users), drill into an individual employee's details, and add new employees (stored locally, no backend). The app is fully responsive: a data table on desktop, a card list on mobile, with identical search/filter/sort functionality on both.

**Core features**

- Hardcoded-credential login with form validation, session persistence across reloads, logout, and protected routes
- Employee listing with dashboard summary cards (total / active / inactive / department count), debounced real-time search by name or email, department filter, name sort (asc/desc), and pagination
- **State preservation**: navigating to an employee's details page and back restores the exact page, search text, filter, and sort the user left
- Employee details page with full contact/company info
- Add Employee form with required-field and email-format validation; new employees persist to `localStorage` and appear at the top of the listing immediately
- Loading skeletons, toast notifications, a friendly 404 page, and a global error boundary

## Setup Instructions

```bash
git clone <this-repo-url>
cd employee-portal
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to `/login`.

**Demo credentials**

| Field    | Value           |
| -------- | --------------- |
| Email    | admin@test.com  |
| Password | Admin@123       |

To build for production:

```bash
npm run build
npm run start
```

## Assumptions Made

- **Employee status**: dummyjson's `/users` endpoint has no `status` or job-title-style `designation` beyond `company.title`, and no active/inactive flag. Status is derived deterministically from the user's `id` (roughly 75% Active / 25% Inactive) so values are stable across reloads rather than random. This is called out explicitly in code comments (`utils/employeeMapper.ts`).
- **Employee ID display**: dummyjson IDs are used directly as the "Employee ID" column; locally-added employees are assigned negative IDs so they can never collide with API IDs.
- **Add Employee persistence**: per the assessment's "no backend required" note, new employees are written to `localStorage` (via a small custom hook) rather than sent to an API. They're merged with the API-sourced list in `EmployeeContext` so both sources render through the same table/card components.
- **State preservation scope**: interpreted to mean the listing's search/filter/sort/page should survive navigating away and back — this is implemented by persisting that UI state (also via `localStorage`) rather than only in-memory, so it survives a full page reload too, not just client-side navigation.
- **Search fetch strategy**: all users are fetched once (dummyjson caps at 208) and search/filter/sort/pagination run client-side. This was chosen because the required search (name *or* email) and department filter don't map cleanly onto dummyjson's query params, and the dataset is small enough that client-side filtering is both simpler and faster than round-tripping to the API on every keystroke.

## Technical Decisions

- **App Router + TypeScript, strict mode**: matches the assessment's mandatory stack; strict mode plus explicit interfaces/enums throughout (no `any`) to demonstrate type safety.
- **Tailwind CSS** was chosen over Material UI to keep full control over markup and bundle size, and because the assessment explicitly allows either.
- **Context API over Redux Toolkit/Zustand**: the app's shared state (auth session, toasts, employee data + list UI state) is small and doesn't need the middleware/devtools/selector machinery Redux brings, or an extra dependency Zustand would add. Three focused providers (`AuthContext`, `ToastContext`, `EmployeeContext`) keep concerns separated without extra boilerplate.
- **A hand-rolled API service layer** (`services/api.ts` + `services/employeeService.ts`) rather than React Query/TanStack Query: the app makes exactly one real network call (fetch all users, once), so a fetch wrapper with centralized error handling covers the requirement without adding a caching/retry library whose main benefits (background refetch, query invalidation) aren't exercised by this app's read-mostly, mostly-local data model.
- **Debounced search** (`useDebounce`) avoids re-filtering on every keystroke.
- **Route groups**: `(protected)` groups all authenticated pages behind a single layout that renders the header and the `ProtectedRoute` guard once, instead of repeating the guard on every page.
- **Generic, config-driven `Table` component**: a single `Table<T>` component (column config + row data) backs the employee table, keeping it reusable rather than employee-specific.
- **Derived, memoized filtering** (`useFilteredEmployees`): search/filter/sort/pagination and dashboard stats are computed in one hook with `useMemo`, recalculating only when the employee list or list state actually changes.

## Third-Party Libraries

| Library | Why |
| --- | --- |
| `next` | App Router, file-based routing, built-in optimizations (mandatory per the assessment) |
| `react` / `react-dom` | UI runtime (mandatory) |
| `typescript` | Static typing across the app (mandatory) |
| `tailwindcss` + `postcss` + `autoprefixer` | Chosen UI framework; utility-first styling without a separate component library |
| `eslint` + `eslint-config-next` | Next.js's recommended lint rules |
| `jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom` | Unit testing critical components (bonus requirement) |

No state-management, data-fetching, or UI-kit libraries beyond the above were added — Context API and a small fetch wrapper cover the app's needs, per the technical decisions above.

## Project Structure

```
src/
├── app/                 # Routes (App Router)
│   ├── login/
│   └── (protected)/     # Auth-gated route group: employees list, details, add
├── components/
│   ├── ui/               # Reusable primitives: Input, Select, Button, Table, Card, Pagination, StatCard, Skeleton
│   ├── layout/            # Header, ProtectedRoute
│   └── employees/         # Feature components: table, card list, filters, form, status badge, dashboard summary
├── contexts/             # AuthContext, ToastContext, EmployeeContext
├── hooks/                # useDebounce, useLocalStorage, useFilteredEmployees
├── services/             # API service layer (fetch wrapper + employee service)
├── types/                # TypeScript interfaces/enums
├── utils/                # Validation helpers, API-response mapper
└── constants/            # Routes, storage keys, credentials, page sizes
```

## Git Workflow

Development followed a feature-branch workflow off `main`, one branch per functional area (`feature/auth-module`, `feature/employee-listing`, `feature/employee-details`, `feature/add-employee`, etc.), each merged back with `--no-ff` to keep the feature history visible. See the commit log for the full progression.
