---
name: design-ui
description: Build mobile UI screens and components (Expo/React Native + NativeWind) by following an HTML snippet or image design provided by the user. Falls back to referencing existing screens in the project when no reference design is given.
argument-hint: A description of the screen or component to build, optionally accompanied by an HTML snippet or image design reference.
---

## Purpose

Implement mobile UI based on user requirements by:

1. **Primary**: Closely follow any HTML snippet or image design the user provides.
2. **Fallback**: If no reference design is provided, read existing screens in `apps/mobile/app/` to maintain visual consistency.

---

## Rules

### File structure

- Split child components with distinct logic or UI into separate files under `apps/mobile/components/[feature|screen]/`.
- Re-export all child components through `apps/mobile/components/[feature|screen]/index.ts`.
- Place the main screen file in `apps/mobile/app/` following Expo Router conventions.

### Text & i18n

- **Never hardcode display strings** in JSX. All user-visible text must use `i18next` translations.
- Add new keys to both locale files: `apps/mobile/i18n/locales/en.ts` and `apps/mobile/i18n/locales/vi.ts`.
- Use the `useTranslation` hook from `react-i18next`.

### Colors & styling

- **Only use color tokens from the NativeWind theme** defined in `apps/mobile/tailwind.config.js`:
  - `primary`, `secondary`, `accent`, `background`, `surface`
  - `text-DEFAULT`, `text-secondary`, `text-muted`
  - `error`, `success`
- Never use hardcoded colors (e.g. `#ffffff`, `bg-blue-500`).
- Maintain an iOS-like style: `rounded-full` for pills and buttons, large-radius cards.

### Reusing common UI components

Before creating a new component, check and prefer in this order:

1. Use an existing component from `apps/mobile/components/ui/` (`Button`, `Card`, `Pill`, `ThemeText`, `PetCard`, `AppointmentCard`, etc.).
2. Extend an existing component with small, backwards-compatible props if a minor feature is needed.
3. Create a new component in `components/ui/` only when the pattern appears across multiple screens.

### Registering a new screen

When creating a new screen (a file inside `apps/mobile/app/`), **always** add a `Stack.Screen` entry to `apps/mobile/app/_layout.tsx` with `headerShown: false`:

```tsx
<Stack.Screen name="[screen-name]" options={{ headerShown: false }} />
```

---

## Implementation workflow

1. Read the reference design (HTML/image) or scan existing screens for style guidance.
2. Identify the list of child components to create.
3. Add or update i18n keys in both locale files.
4. Implement each child component in `components/[feature]/`.
5. Create the main screen file in `app/`.
6. Update `_layout.tsx` if a new screen was added.
7. Check for TypeScript errors and verify no text or colors are hardcoded.
