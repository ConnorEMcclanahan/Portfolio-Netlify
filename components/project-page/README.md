# Shared case-study styling

The stylesheet entry point is `project-components.css`. Pages continue to load
that single file; it imports focused stylesheets in the original cascade order.
No build step or JavaScript loader is required.

## Where to edit

| Stylesheet | Responsibility |
| --- | --- |
| `case-study-layout.css` | Shared tokens, phase layout, typography, research narrative and section spacing |
| `intro-theme.css` | Scoped intro heading, theme and link treatments |
| `case-study-nav.css` | Fixed navigation, progress bar, buttons and 900px breakpoint |
| `case-study-process.css` | Process cards, hover and keyboard-focus treatments |
| `section-content.css` | Section headings, conclusion heading treatment and content surfaces; existing nav focus override |
| `intro-summary.css` | Intro summary, metadata, images and existing phase placeholder styles |
| `final-columns.css` | Conclusions and reflection items |
| `research-cards.css` | Shared component wrappers, labels and persona cards |
| `research-boards.css` | POV grids, questions and HMW tables |
| `split-insights.css` | Two-column insights |
| `mockup-flow.css` | Mockup walkthroughs and tablet frames |
| `comparisons.css` | Competitor tables and comparison matrices |
| `responsive.css` | Shared 768px adaptations and reduced-motion process behavior |
| `figma-embed.css` | Click-to-load Figma poster, loading and ready states, reduced motion |

JavaScript renderers remain alongside these stylesheets. They use the existing
`window.ProjectComponents` API; this refactor does not change their behavior.
Page-specific styling remains in the root `styles/pages` directory.

## Cascade rules

- Keep the import order. This first pass deliberately preserves every original
  rule, declaration and media query, including legacy overrides.
- Some concerns span files because moving those rules together would change
  source order. For example, intro theme declarations precede intro layout,
  and shared mobile rules load after component defaults.
- Edit the relevant existing rule rather than appending another override to the
  entry point. Keep shared changes here and page-only changes in page styles.
- Do not add nested imports. Native imports retain the simple static setup but
  require an extra network discovery step compared with direct HTML links.
  A future build pipeline could bundle these files if performance warrants it.
- Consolidating duplicate rules, removing `!important`, or changing specificity
  is a separate visual-regression task, not part of this lossless extraction.

## Validation

From the repository root, run `python scripts/validate-project-css.py`.
It checks import targets, the four case-study links, and HTTP delivery using a
short-lived localhost server. It requires only the Python standard library.

To also compare the flattened stylesheet byte-for-byte with the version before
the split, run `python scripts/validate-project-css.py --baseline e439150`.
This comparison intentionally fails after future CSS design changes.

After styling changes, visually review all four case studies at desktop and
mobile widths, including navigation, process hover/focus, reduced motion and
Figma loading states. Structural and HTTP checks do not replace browser review.
