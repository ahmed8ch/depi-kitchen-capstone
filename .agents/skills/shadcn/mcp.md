# shadcn MCP Server

The CLI includes an MCP server (`npx shadcn@latest mcp`) configured globally in `~/.gemini/config/mcp_config.json` that lets AI assistants search, browse, view, and install items from `@shadcn` and third-party registries directly.

## Core Tools
- `shadcn:get_project_registries` — Reads configured registries from `components.json`.
- `shadcn:list_items_in_registries` — Lists available UI primitives & blocks.
- `shadcn:search_items_in_registries` — Fuzzy search across registries.
- `shadcn:view_items_in_registries` — Inspect full source & dependencies before installing.
- `shadcn:get_item_examples_from_registries` — Pull live usage examples & demos.
- `shadcn:get_add_command_for_items` — Generates exact `npx shadcn@latest add ...` command.
- `shadcn:get_audit_checklist` — Returns verification checklist (imports, deps, lint, TS).

> Tip: For project config inspection (`style`, `base`, `iconLibrary`, `aliases`), run `npx shadcn@latest info --json`.
