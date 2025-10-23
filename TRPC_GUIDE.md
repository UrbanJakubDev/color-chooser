# tRPC Implementation Guide

This project now includes a complete tRPC setup for type-safe API communication between your Next.js frontend and backend.

## What's Included

### Server-side (Backend)

- **tRPC Server Configuration** (`src/server/trpc.ts`)
- **Individual Routers** for each data model:
  - `src/server/routers/potColor.ts` - Pot color operations
  - `src/server/routers/vaseColor.ts` - Vase color operations
  - `src/server/routers/colorCombination.ts` - Color combination operations
  - `src/server/routers/paletteColor.ts` - Palette color operations
- **Main App Router** (`src/server/index.ts`) - Combines all routers
- **Next.js API Route** (`src/app/api/trpc/[trpc]/route.ts`) - HTTP endpoint

### Client-side (Frontend)

- **tRPC Client** (`src/lib/trpc.ts`) - Client configuration
- **TRPCProvider** (`src/components/TRPCProvider.tsx`) - React Query integration
- **Example Component** (`src/components/TRPCExample.tsx`) - Usage examples
- **Updated Types** (`src/types/index.ts`) - TypeScript definitions

## Available Operations

Each router provides the following operations:

### Pot Colors (`trpc.potColor`)

- `getAll()` - Get all pot colors
- `getActive()` - Get only active pot colors
- `getById({ id })` - Get specific pot color
- `create({ name, hex, rgb, description? })` - Create new pot color
- `update({ id, ...data })` - Update existing pot color
- `delete({ id })` - Delete pot color

### Vase Colors (`trpc.vaseColor`)

- `getAll()` - Get all vase colors
- `getActive()` - Get only active vase colors
- `getById({ id })` - Get specific vase color
- `create({ name, hex, rgb, description? })` - Create new vase color
- `update({ id, ...data })` - Update existing vase color
- `delete({ id })` - Delete vase color

### Color Combinations (`trpc.colorCombination`)

- `getAll()` - Get all color combinations
- `getPublic()` - Get only public combinations
- `getById({ id })` - Get specific combination
- `create({ tema, miska, telo, hexMiska, hexTelo, rgbMiska, rgbTelo, userId?, isPublic? })` - Create new combination
- `update({ id, ...data })` - Update existing combination
- `delete({ id })` - Delete combination

### Palette Colors (`trpc.paletteColor`)

- `getAll()` - Get all palette colors
- `getById({ id })` - Get specific palette color
- `create({ hex, name })` - Create new palette color
- `update({ id, hex?, name? })` - Update existing palette color
- `delete({ id })` - Delete palette color

## How to Use

### 1. Wrap your app with TRPCProvider

```tsx
// In your main layout or app component
import { TRPCProvider } from "@/components/TRPCProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
```

### 2. Use tRPC in your components

```tsx
"use client";

import { trpc } from "@/lib/trpc";

export function MyComponent() {
  // Queries
  const { data: potColors, isLoading } = trpc.potColor.getAll.useQuery();
  const { data: activePotColors } = trpc.potColor.getActive.useQuery();

  // Mutations
  const createPotColor = trpc.potColor.create.useMutation();

  const handleCreate = async () => {
    try {
      await createPotColor.mutateAsync({
        name: "New Color",
        hex: "#FF5733",
        rgb: JSON.stringify([255, 87, 51]),
        description: "A beautiful color",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Pot Colors ({potColors?.length || 0})</h2>
      <button onClick={handleCreate}>Create New Color</button>
    </div>
  );
}
```

### 3. Type Safety

All operations are fully type-safe. TypeScript will provide autocomplete and error checking for:

- Input parameters
- Return types
- Database models
- API responses

## Benefits

- **Type Safety**: End-to-end type safety from database to frontend
- **Automatic Serialization**: Superjson handles Date objects and other complex types
- **React Query Integration**: Built-in caching, loading states, and error handling
- **Developer Experience**: Excellent autocomplete and error messages
- **Performance**: Optimized queries with automatic batching

## Next Steps

1. Replace your existing API calls with tRPC calls
2. Add authentication middleware to tRPC procedures if needed
3. Implement real-time subscriptions if required
4. Add input validation schemas for more complex operations

## Example Usage

See `src/components/TRPCExample.tsx` for a complete example of how to use all the available operations.
