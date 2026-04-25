# MVP Screen Checklist

Use this checklist for the Figma handoff of the ATTA Back to Tech MVP.

## Shared requirements

- Frame names follow `Screen / State / Device`.
- Desktop and mobile variants are both included for every primary screen.
- Auto layout is used consistently so engineering can inspect spacing and resizing behavior.
- All cards, accordions, upload areas, and buttons use realistic product copy.
- Primary, hover, focus, disabled, loading, empty, success, and error states are shown where relevant.
- Accessibility notes are included for keyboard focus, contrast, captions, and live-status feedback.

## MVP screens

### 1. Home / Program Hub

- Hero includes mission statement, short support copy, and CTA buttons for `Explore Sessions` and `Try Resume Review`.
- Program snapshot row shows `8 sessions`, `1 hour each`, and `Volunteer-led`.
- Featured topic cards show title, summary, agenda preview, planned date, and status.
- Resume review promo block explains ATS-style review in plain language.
- Volunteer callout explains speaker, mentor, and reviewer roles.

### 2. Sessions / Program Overview

- Screen shows all 8 session cards in the default browse state.
- Filter area includes role track, skill level, and session status.
- Expanded card state shows agenda bullets, planned date, speaker, and CTA.
- Empty, loading, and no-match states are included.

### 3. Session Detail

- Includes title, summary, agenda timeline, planned date, and speaker section.
- Shows resource links and related-session recommendations.
- Includes primary CTA for `Register Interest` or `Join Session`.

### 4. Resume Review / Upload

- Shows resume upload control, job description input, optional target role, and submit button.
- Includes helper text for accepted file types and privacy reassurance.
- Includes upload validation, uploading, and processing states.

### 5. Review Results

- Includes ATS-style score summary, matched strengths, concept gaps, and suggested resume edits.
- Shows recommended 30-60 second learning videos and related program sessions.
- Includes empty, partial, and full success states.

### 6. Volunteer Page

- Includes volunteer mission statement and role cards for speaker, mentor, reviewer, and organizer support.
- Shows signup form with success and error states.
- Includes FAQ accordion.

### 7. Organizer / Admin

- Includes upcoming sessions, volunteer submissions, and content-management quick actions.
- Shows empty state for fresh setup and alert state for items needing attention.

### 8. System Feedback

- Includes global loading, inline error, full-screen error, and empty states.
- Documents messaging tone and recovery actions.

## Handoff package

- One `Ready for Dev` Figma page contains final desktop and mobile frames.
- Reusable components are published for nav, card, accordion, file upload, stat card, and form field.
- Callouts identify truncation rules for summaries and agenda bullets.
- Prototype links cover the path: Home -> Sessions -> Resume Review -> Results.
