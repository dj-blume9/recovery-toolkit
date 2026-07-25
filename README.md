# Recovery Toolkit

A React Native / Expo mobile app for recovery journaling and daily self-inventory.

---

## What It Is

Recovery Toolkit lets a user write a daily recovery inventory across several reflective sections, view a history of past entries, and configure personal recovery/sobriety dates. It is a local-first, offline-capable app that stores everything in an on-device SQLite database.

- **Framework:** Expo SDK ~54.0.25 with `expo-router`
- **UI:** React Native 0.81.5, React 19, TypeScript (strict)
- **Storage:** `expo-sqlite` with manual schema migrations
- **Build/Deploy:** EAS (Expo Application Services)

---

## Quick Start

The repo does **not** include `node_modules`, so install dependencies first.

```bash
# 1. Install dependencies
npm install

# 2. Start the Expo dev server
npx expo start
```

Then open the app:

- **Expo Go on your phone:** scan the QR code in the terminal.
- **Android emulator:** press `a` in the terminal or run `npx expo run:android`.
- **iOS simulator:** press `i` in the terminal or run `npx expo run:ios`.
- **Web:** `npx expo start --web` or `npm run web`.

### EAS Build Profiles

`eas.json` defines three build profiles:

- `development` – internal distribution with a development client
- `preview` – internal distribution (ad-hoc / internal)
- `production` – production build with `autoIncrement`

Submit is configured for the `production` profile.

---

## Project Structure

```
recovery-toolkit/
├── app/                    # Expo Router screens and root layout
│   ├── _layout.tsx         # Root Stack layout + SQLite provider
│   ├── index.tsx           # Home dashboard
│   ├── inventory.tsx       # Daily inventory form
│   ├── history.tsx         # List of past entries
│   ├── entry-detail.tsx    # Read-only detail for one entry
│   ├── settings.tsx        # Recovery / sobriety start dates
│   ├── +not-found.tsx      # 404 screen
│   └── +html.tsx           # Web HTML wrapper
├── components/             # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── DateTmePicker.tsx
│   ├── MultilineTextBox.tsx
│   └── SectionHeader.tsx
├── styles/                 # Design system
│   ├── theme/              # Tokens (colors, spacing, typography, etc.)
│   ├── components/         # Component style sheets
│   ├── layouts/            # Screen-level layout styles
│   └── README.md           # Styling architecture notes
├── database/
│   ├── migrate.ts          # SQLite schema migrations
│   └── repo/               # Repository hooks (data access)
│       ├── dailyInventoriesRepo.ts
│       └── settingsRepo.ts
├── hooks/                  # Business-logic hooks
│   ├── useInventoryFilter.ts
│   ├── useInventoryHistory.ts
│   └── useInventoryStats.ts
├── services/               # Pure helper services
│   └── inventoryService.ts
├── types/                  # Shared TypeScript types
│   └── inventory.types.ts
├── utils/                  # Small utilities
│   ├── date.ts
│   └── helpers.ts
├── assets/                 # Icons, splash, favicon
├── app.json                # Expo configuration
├── eas.json                # EAS build/submit configuration
└── package.json
```

---

## Routing & Navigation

The app uses **Expo Router** file-based routing. Files in `app/` map directly to routes.

| File | Route | Purpose |
|------|-------|---------|
| `index.tsx` | `/` | Home dashboard |
| `inventory.tsx` | `/inventory` | Daily inventory form |
| `history.tsx` | `/history` | Entry history + filters |
| `entry-detail.tsx` | `/entry-detail?id=...` | Read-only entry view |
| `settings.tsx` | `/settings` | Date settings |

`app/_layout.tsx` wraps the whole tree in:

1. `SQLiteProvider` (from `expo-sqlite`) with `databaseName="recovery.db"`
2. `SafeAreaProvider` (from `react-native-safe-area-context`)
3. A shared `Stack` navigator with a teal header

Navigation is done with `Link` components or `useRouter().push('/path')`.

---

## Design System & Styling Patterns

Styles live in `styles/` and are organized around design tokens.

### Theme Tokens (`styles/theme/`)

All UI values should come from these tokens rather than hardcoded values.

- `colors.ts` – primary/secondary/accent/semantic palette
- `spacing.ts` – 8px grid scale (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`)
- `typography.ts` – font sizes, weights, and pre-defined text styles
- `shadows.ts` – elevation styles (`sm`, `md`, `lg`, `xl`)
- `borderRadius.ts` – rounded-corner scale
- `index.ts` – re-exports `colors`, `spacing`, `typography`, `shadows`, `borderRadius`

Typical usage in a screen:

```tsx
import { StyleSheet } from 'react-native';
import { colors, spacing, typography, shadows } from '../styles/theme';

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    backgroundColor: colors.neutral.white,
    ...shadows.sm,
  },
  title: {
    ...typography.styles.h2,
    color: colors.primary.teal,
    marginBottom: spacing.sm,
  },
});
```

### Component Style Sheets (`styles/components/`)

- `button.styles.ts` – base + primary/outlined/text variants + sizes
- `card.styles.ts` – default, elevated, and outlined card styles
- `input.styles.ts` – label, input, focus, error, and multiline styles
- `screen.styles.ts` (in `layouts/`) – common screen containers and scroll containers

### UI Components (`components/`)

| Component | Props | Notes |
|-----------|-------|-------|
| `Button` | `title`, `onPress`, `variant`, `type`, `size`, `disabled`, `loading` | Variants: `teal` / `green` / `orange` / `purple`; Types: `primary` / `outlined` / `text` |
| `Card` | `children`, `variant`, `style` | Variants: `default` / `elevated` / `outlined`; accepts `ViewStyle` override |
| `DateTmePicker` | `label`, `date`, `OnChangeDate` | Opens `@react-native-community/datetimepicker` in `spinner` mode |
| `MultilineTextBox` | `label`, `placeholder`, `value`, `onChangeText` | 6-line multiline `TextInput` with focus styling |
| `SectionHeader` | `title`, `subtitle?`, `accentColor?` | Colored accent bar + heading |

---

## Data Layer

### SQLite Setup

`database/migrate.ts` runs on app startup. It uses `PRAGMA user_version` to apply migrations inside a transaction.

**Current schema:**

- `daily_inventories` – one row per date (`id`, `date_iso`, timestamps)
- `daily_inventory_prompts` – the fixed set of prompts (`id`, `code`, `label`, `meta_json`)
- `daily_inventory_answers` – one row per prompt per inventory (`value_text`, FKs, timestamps)
- `app_settings` – key/value settings (added in migration v2)

Indexes exist on `date_iso`, `daily_inventories_id`, `daily_inventory_prompts_id`, and the `code` unique constraint.

### Repository Hooks (`database/repo/`)

These are custom hooks that get the `SQLiteContext` and expose async data methods. They are the only place that should talk to the database.

- `useDailyInventoriesRepo()`
  - `ensureDefaultPrompts()` – seeds the 7 default prompts
  - `getAllPrompts()`, `getAllInventories()`, `getAllEntries()`
  - `upsertDailyInventory(date_iso)`, `getDailyInventoryId(date_iso)`
  - `saveAnswerByCode(inventoryId, code, value)`
  - `getEntryByDate(date_iso)`, `getEntryById(id)`
- `useSettingsRepo()`
  - `getSetting(key)`
  - `updateSetting(key, value)`

Because these are React hooks, they can only be called inside a component or another hook. They are used directly inside `useEffect` handlers or event handlers.

### Business-Logic Hooks (`hooks/`)

These hooks consume the repository hooks and prepare data for the UI.

- `useInventoryHistory()` – loads all inventories, responses, and prompts and returns `{ entries, loading, error }`
- `useInventoryFilter(entries)` – manages the `all` / `week` / `month` filter with `useMemo`
- `useInventoryStats(entries)` – computes `totalEntries`, `weekEntries`, and `currentStreak`

### Service Helpers (`services/inventoryService.ts`)

Pure functions used by hooks:

- `transformInventoryData(...)` – converts raw DB rows into `InventoryEntry[]` objects
- `filterEntriesByWeek(...)` / `filterEntriesByMonth(...)`
- `applyFilter(entries, filter)`

### Types (`types/inventory.types.ts`)

```ts
export type InventoryResponse = {
  promptCode: string;
  promptLabel: string;
  response: string;
};

export type InventoryEntry = {
  id: string;
  date: string;          // YYYY-MM-DD
  dateDisplay: string;   // "Today", "Yesterday", or formatted
  responses: InventoryResponse[];
  completedPrompts: number;
  totalPrompts: number;
};
```

---

## State Management

There is **no global state library** (no Redux, Zustand, Context stores, etc.). State is handled as follows:

1. **Local component state** with `useState` for form inputs and UI flags.
2. **Repository hooks** for reading/writing SQLite.
3. **Business-logic hooks** for derived data such as filtered lists and stats.
4. **`useMemo`** for computed values to avoid recalculation on every render.

### Example Flow: Saving a Daily Inventory

1. `InventoryScreen` renders prompts from `useDailyInventoriesRepo().getAllPrompts()`.
2. User types into `MultilineTextBox` → screen updates `responses` state.
3. `handleSave`:
   - Gets today via `getTodayDate()`.
   - Creates or reuses `daily_inventories` row for today.
   - Calls `saveAnswerByCode(inventoryId, code, value)` for each response.
4. `HistoryScreen` uses `useInventoryHistory()` to load and display entries.

---

## Key User Flows

### Home (`/`)

- Hero text and quick-action cards.
- `Start Inventory` → `/inventory`
- `Inventory History` → `/history`
- Gear icon in the header → `/settings`
- `Prayer & Meditation` and `Support Resources` are placeholders (`disabled` buttons).

### Daily Inventory (`/inventory`)

- Loads prompts grouped by code prefix:
  - `1_` → Self-Reflection
  - `2_` / `3_` → Daily Actions
  - `4_` / `5_` → Relationships
  - `6_` → Spiritual Growth
  - `7_` → Next Steps
- `Save Inventory` persists answers per prompt for today's date.
- `Clear All` resets the input fields locally (does not delete from the database).

### History (`/history`)

- Shows stats card (total, this week, current streak).
- Filter buttons: `All Time`, `This Week`, `This Month`.
- Each entry card shows date, completion badge, a response preview, and dot indicators for each prompt.
- Tapping an entry pushes `/entry-detail?id=<id>`.

### Entry Detail (`/entry-detail?id=...`)

- Reads `id` from `useLocalSearchParams()`.
- Loads the entry with `getEntryById(id)`.
- Groups responses by the same section prefixes used on the inventory screen.

### Settings (`/settings`)

- `recoveryStartDate` and `sobrietyStreakStartDate` stored in `app_settings`.
- `DateTmePicker` (note the intentional filename spelling) updates the values and saves them.

---

## Utilities

- `utils/date.ts` – `toYMDLocal(date)` and `parseYMDLocal(string)` for day-only local-time handling.
- `utils/helpers.ts` – `getTodayDate()` (YYYY-MM-DD in local time) and `formatDateDisplay(isoString)` ("Today", "Yesterday", or long form).

These are intentionally local-time helpers to avoid off-by-one timezone bugs when storing dates.

---

## How to Continue Building

### Add a New Screen

1. Create `app/<screen-name>.tsx`.
2. If it needs a custom header title, register it in `app/_layout.tsx` inside the `Stack`.
3. Navigate with `<Link href="/<screen-name>" />` or `router.push('/<screen-name>')`.

### Add a New Reusable Component

1. Create `components/ComponentName.tsx`.
2. Use theme tokens from `styles/theme` and/or one of the component style sheets in `styles/components/`.
3. Keep the component prop-driven and default-export it.

### Add or Change Data

1. Update `database/migrate.ts` with a new `version` block using `PRAGMA user_version`.
2. Add methods to the relevant repo hook (`database/repo/<name>Repo.ts`).
3. Add business-logic hooks in `hooks/` if the data needs transformation.
4. Update `types/` if new shapes are needed.

### Add a New Theme Token

1. Add the value in the appropriate `styles/theme/*.ts` file.
2. Import it from `styles/theme` in the file that uses it.
3. Update `styles/README.md` if it introduces a new pattern.

---

## Configuration Notes

- `app.json` enables the **New Architecture** (`newArchEnabled: true`) and **edge-to-edge** on Android.
- `app.json` plugins: `expo-router` and `expo-sqlite`.
- Bundle IDs:
  - iOS: `com.fivetooldev.recoverytoolkit`
  - Android: `com.fivetooldev.recoverytoolkit`
- EAS project ID is stored under `extra.eas.projectId` in `app.json`.

---

## Known Gaps / Next Steps

- `Prayer & Meditation` and `Support Resources` are disabled placeholders on the home screen.
- The `DateTmePicker` component name is missing an `i` (`DateTmePicker`).
- `settings.tsx` defines `title` in its style sheet but never uses it.
- `history.tsx` and `entry-detail.tsx` hardcode the prompt-code grouping; if prompts change, these will drift from `inventory.tsx`.
- No global error boundary or retry UI beyond inline loading/error states.