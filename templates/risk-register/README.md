# Risk Register Template — source files

These CSVs are the **source** for the risk register template offered on
`/resources`. They are not published directly: the site links to an `.xlsx`,
which you assemble from these.

They live outside `public/` on purpose, so they are version-controlled but not
served.

## Files

| File | Becomes sheet | Contents |
|---|---|---|
| `1-risk-register.csv` | **Risk Register** | The register itself — headers, three worked examples, blank rows with the rating formula pre-filled |
| `2-how-to-use.csv` | **How to use** | What goes in each column and why it earns its place, plus notes on running the register |
| `3-scales.csv` | **Scales** | Likelihood and impact scales, rating bands, escalation thresholds |

## Building the .xlsx

1. Open `1-risk-register.csv` in Excel or Google Sheets
2. Rename the sheet to **Risk Register**
3. Add two more sheets and import `2-how-to-use.csv` and `3-scales.csv` into
   them, named **How to use** and **Scales**
4. Tidy the presentation — bold the header row, freeze it, widen the statement
   and controls columns, and set the Due Date / Last Reviewed columns to a date
   format
5. Optional but worth it: add data validation on Likelihood and Impact (whole
   number, 1–4) and conditional formatting on the Rating column using the bands
   from the Scales sheet
6. Save as `axiomrisk-risk-register-template.xlsx`
7. Put it at `public/downloads/axiomrisk-risk-register-template.xlsx`

The path is set in `src/config/resources.js`. If you use a different filename or
format, update `file` and `fileLabel` there to match.

## Before you publish it

- **Delete the three `EX-` example rows**, or keep them and clearly label the
  sheet as a sample. They are illustrative and generic — no real organisation is
  described — but a recipient should not mistake them for a starting position.
- **Fill in the impact scale.** It ships with `<define>` placeholders on purpose:
  impact has to be expressed in measures the business recognises, and a generic
  scale is the main reason registers produce ratings nobody trusts.
- Replace the `[Name]` and `<who>` / `<timeframe>` placeholders, or leave them as
  prompts for the recipient — either is defensible, but decide deliberately.

## Notes on the content

The `Rating` column contains a formula (`=F2*G2`) rather than a static value.
Excel and Google Sheets both evaluate this on import. Do not overwrite it.

The rating bands are a judgement call, not a benchmark — they are not derived
from industry data and the Scales sheet says so explicitly. This matches how the
Risk Health Check on the site describes its own scoring.

The column set and the guidance mirror
[Building a Risk Register Your Team Will Actually Use](https://axiomrisk.co/insights/building-a-risk-register-your-team-will-use),
which is the article that links to this template. If you change one, change the
other so they stay consistent.
