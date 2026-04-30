# Patches

## @slidev/cli@51.8.2

Fix: SideEditor / ShikiEditor crashes with `TypeError: Cannot convert undefined
or null to object at Object.entries` from `@shikijs/core@3.23.0`.

Root cause: `dist/shared-BC4uxnur.js` at the line where the virtual `#slidev/shiki`
module is codegen'd, it unconditionally emits `themes: undefined,` into the
`codeToHtml` options when only a single `theme` is configured. Shiki 3.23 sees
`"themes" in options` is true and then `Object.entries(undefined)` throws.

Fix conditionally includes the `theme` / `themes` keys only when defined.

Apply manually by editing node_modules (lost on reinstall), or run `pnpm patch`
once upstream Slidev hasn't fixed it yet.
