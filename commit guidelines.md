# Commit Guidelines

## Format
`<emoji> <description>`

## Rules
- **Casing**: Use all lowercase for the description.
- **Tense**: Use imperative mood (e.g., "add" not "added").
- **Conciseness**: Keep it short and descriptive.

## Body (Optional)
- Use if the commit requires explanation (what and why, not how).
- Separate from subject with a blank line.
- Use bullet points (hyphens) for multiple points.
- Wrap lines at 72 characters.

## Footer (Optional)
- **Breaking Changes**: Start with `BREAKING CHANGE:` followed by a space or two newlines.
- **Referencing Issues**: `Closes #123`, `Fixes #123`.

## Emoji Legend

| Emoji | Meaning | Usage |
| :--- | :--- | :--- |
| ✨ | Feature | New features. |
| 🐛 | Fix | Bug fixes. |
| ♻️ | Refactor | Code changes without behavior changes. |
| 📚 | Docs | Documentation changes. |
| 🚀 | Performance | Performance improvements or deployments. |
| 📦 | Build/Deps | Dependency updates or build scripts. |
| 🚚 | Move | Moving or renaming files. |
| 🔥 | Remove | Removing code or files. |

## Examples

### Simple
`✨ add user profile page`

### With Body
`🐛 fix login redirect loop`

`- Check for existing session before redirecting.`
`- Add integration test for infinite loop scenario.`

### Breaking Change
`♻️ refactor user repository`

`Migrate raw sql queries to drizzle orm builder.`

`BREAKING CHANGE: UserRepository.findById now returns undefined instead of null.`
