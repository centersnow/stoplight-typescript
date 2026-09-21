# Stoplight - React + TypeScript

A separate TypeScript version of the app in `../stoplight-react`. The original JavaScript project is kept intact. This version includes the current heading and commented-out instruction labels.

The stoplight starts on green and continuously repeats:

1. Green for 5 seconds.
2. Yellow for 1 second.
3. Red for 2 seconds.

Only one light is on at a time. The visual order stays red, yellow, green from top to bottom.

## Run locally

Requires Node.js 22.12 or newer. In PowerShell:

```powershell
cd C:\Users\chang\OneDrive\Desktop\Development\stoplight-typescript
npm.cmd install
npm.cmd run dev
```

Open http://127.0.0.1:5174. The separate port allows this version to run alongside the original app on port 5173. If port 5174 is already in use, stop the existing server before starting another one. Press Ctrl+C in the terminal to stop a server you start there.

`npm.cmd` avoids the PowerShell script-policy error encountered with `npm.ps1`. If `npm` already works in your terminal, it is fine to use it instead.

## Type checking and production build

```powershell
npm.cmd run typecheck
npm.cmd run build
npm.cmd run preview
```

`typecheck` checks the code without generating files. `build` also runs the type checker before Vite creates `dist/`. Preview serves that production build at http://127.0.0.1:4174.

Vite's development server updates the page when you save files. Run `typecheck` to check TypeScript errors, or use the errors shown by VS Code.

## Where to edit

- `src/components/Stoplight.tsx`: the light sequence, timer, and rendered lights.
- `src/App.tsx`: the surrounding page and heading.
- `src/main.tsx`: starts React and checks that the HTML root element exists.
- `src/styles.css`: the original styling and responsive layout.
- `vite.config.ts`: Vite's configuration.
- `tsconfig.json`: strict TypeScript checking settings.

Files containing both TypeScript and JSX use `.tsx`. TypeScript files without JSX use `.ts`.

In `Stoplight.tsx`, `LightColor` restricts colors to `red`, `yellow`, or `green`. `Phase` specifies that each phase has a color and a numeric duration in milliseconds. `instruction?: string` makes the instruction text optional; uncomment an instruction in `PHASES` to show it.

The timer is cleaned up when the phase changes or the component unmounts. Browser timers may be delayed in background tabs or when a device sleeps.

Edit the source files; `node_modules/` contains installed packages and `dist/` contains generated build output. The new folder has its own dependency lockfile and does not copy the original Git history.

## References

- [React with TypeScript](https://react.dev/learn/typescript)
- [Vite TypeScript support](https://vite.dev/guide/features.html#typescript)
