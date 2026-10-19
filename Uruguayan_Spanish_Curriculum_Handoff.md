# Uruguayan Spanish Curriculum: Handoff

Beginner Rioplatense Spanish lessons for a family trip to Piriápolis.
*As of September 20, 2026. Lessons 1 through 6 built.*

---

## 1. Project at a glance

- **Goal:** teach beginner Uruguayan Spanish to Amanda's mother and brother before a November family vacation to Piriápolis, Uruguay.
- **Learners:** mother has some Duolingo background; brother is a complete beginner. Amanda is the teacher/facilitator.
- **Format:** ~30 to 45 minute lessons, delivered casually over Google Meet.
- **Real-world scope:** the family will mostly do small talk, ask directions, and buy things. They will not be making plans with other Spanish speakers, so lessons favor understanding, reading, and transactions over negotiating with locals.

## 2. Deliverables and file naming

Every lesson ships a deck plus a Word review/cheat sheet. From Lesson 5 on, each lesson also ships a facilitator guide compiled from the speaker notes.

| File | Naming pattern |
| --- | --- |
| Deck (PowerPoint) | `Leccion{N}_Uruguayan_Spanish.pptx` |
| Review / cheat sheet (Word) | `Leccion{N}_{descriptor}.docx` (e.g. `Hoja_de_Repaso`, `Chuleta_La_Hora`) |
| Facilitator guide (Word, L5+) | `Leccion{N}_Guia_del_Facilitador.docx` (L5 used `Guia_del_Anfitrion`) |

## 3. Design system (hold this rigorously)

- **Title and closing slides:** deep teal backgrounds (`#0E5C56` / `#08403C`), cream text (`#FBF7F0`), burnt orange accents (`#C9682B`), with decorative circles.
- **Content slides:** cream background, white rounded-rectangle cards with soft shadow, teal titles, gray English translations, teal callout boxes with tan labels.
- **Fonts:** Cambria for headings/serif accents, Calibri for body.
- **Glosses:** every Spanish heading and phrase carries a small English translation nearby, usually in parentheses or gray text.
- **Structure per deck:** title, repaso + agenda, content slides, a practice/activity slide, and a teal closing slide with recap and homework.

## 4. Standing content rules

> **Two rules that are easy to break**
>
> - **No alcoholic drinks anywhere in lesson content.** Applied retroactively across all files. Use jugo, agua, refresco, limonada instead.
> - **Answers stay off student-facing screens.** Roleplay curveballs and game answer keys live in speaker notes only; the slide shows a prompt or a "listen carefully" heads-up. Scramble answers are excluded from student documents.

- **Vos everywhere:** this is Rioplatense. Use vos forms (sos, tenés, querés, podés, andás), not tú.
- **Translations:** no untranslated Spanish on slides. Small English translations sit next to anything new.
- **Speaker notes:** every activity slide carries a full answer key and facilitation tips in the notes. Students see only prompts.
- **Facilitator guides:** compiled from the deck's speaker notes, organized by section (one section per slide).

## 5. Rioplatense specifics to preserve

- **Sound:** ll / y are pronounced "sh" (sheísmo); c and z sound like "s" (no Spain lisp).
- **Everyday words:** ta (OK / got it), la plata (money, not dinero), ¿cuánto sale? (not cuesta), quería... (polite ordering), talle (not talla), ómnibus or bondi (not autobús).
- **Money:** `$` means pesos, `U$S` means dollars; divide by 40 as a mental estimate. Note the rate drifts, so tell them to check on arrival.
- **Food and menu:** chivito, asado de tira, milanesa, ...completa (with everything), dulce de leche, alfajor, provoleta, palta (not aguacate), morrón, merluza; el cubierto (cover charge), la propina (~10%, often cash).
- **Places / trip anchors:** la rambla, el cerro (Cerro San Antonio chairlift), Hotel Argentino, la feria (street market). The family has a rental car, so nafta, ruta, estacionamiento appear and public-transport content was dropped.

## 6. Lesson roster

| Lesson | Topic | Files |
| --- | --- | --- |
| 1 | Lo básico para empezar: greetings, vowel sounds, introducing yourself, el voseo, café basics, directions, mate intro | Deck + Hoja de Repaso |
| 2 | Números, plata y compras: numbers 0 to 100, price numbers, paying, shopping, `$` = pesos and divide-by-40 | Deck + Hoja de Repaso |
| 3 | Vocabulario para el viaje: restaurant food and drinks, Uruguayan specialties, places, car words, a restaurant roleplay dialogue with translations | Deck + Hoja de Repaso |
| 4 | Los verbos esenciales: querer, tener, ir, poder, necesitar; yo/vos forms; tener idioms; "vamos a" as an easy future; build-your-own-sentence game | Deck + Hoja de Repaso |
| 5 | ¡A jugar! game-day review: rapid fire, word scramble, word-to-sentence, restaurant roleplay with hidden curveballs, optional Jeopardy | Deck + Chuleta y Autoevaluacion + Guia del Anfitrion |
| 6 | La hora y los horarios: telling time, y media / y cuarto, ¿a qué hora abre?, reading abierto/cerrado signs, the 24-hour clock; two practice games | Deck + Chuleta La Hora + Guia del Facilitador |

*Lesson 3 was revised after the fact: the transport slide was removed (rental car), Hotel Argentino and la feria were added, the roleplay was expanded with translations and sentence frames, and alcoholic drinks were removed.*

## 7. Abandoned and shelved work

- **Shelved restaurant lesson:** a full "night out" lesson (table, order, pay and tip) was built with a real Piriápolis menu handout (landscape, three columns, dotted price leaders, Entradas first, sandwiches removed), a menu decoder, and a bill-totaling activity. The family did not want more restaurant content, so it was abandoned.
- **Renumbering:** the time/hours lesson was originally built as Lesson 7, then rebranded to Lesson 6. The abandoned restaurant Lesson 6 files were removed from outputs.
- **Recovery:** the restaurant build scripts still exist in the workspace, so that lesson (and its menu handout) can be regenerated and renumbered if the family ever changes their mind.

## 8. Backlog: candidate next lessons

- **Directions and getting around** *(natural Lesson 7)*: the rental car, ¿cómo llego a...?, left/right/straight, gas station, parking. Pairs directly with time/hours to finish the independent-tourist toolkit.
- **Beach and Piriápolis sights:** playa, arena, olas, the rambla, the chairlift, Castillo de Piria, ¿me sacás una foto?
- **Survival communication:** no entiendo, más despacio por favor, ¿cómo se dice...?, ¿podés repetir? Reassuring and high-value for beginners.
- **Farmacia y salud:** pharmacy basics, me duele..., sunscreen and aloe (beach-relevant), necesito ayuda.
- **Another game-day review** closer to November to consolidate everything.

## 9. Build and QA toolchain

- **Decks:** generated with the `pptxgenjs` npm package (Node, `NODE_PATH` set to the global modules). Speaker notes via `slide.addNotes()`. After writing, recompress the `.pptx` with a `ZIP_DEFLATED` pass for LibreOffice compatibility. To edit an existing deck, change its build script and rebuild.
- **Cheat sheets and guides:** built with the `docx` npm package.
- **Facilitator guides:** extract the built deck's speaker notes from the `notesSlides` XML into JSON, then run a generator that maps each slide to a section label and formats the answer keys. It strips the trailing slide-number artifact and drops duplicate all-caps title lines.
- **Landscape Word docs:** the `docx` library normalizes the page size, so the menu handout patches `word/document.xml` `pgSz` to explicit landscape (via `adm-zip`) after packing.
- **QA:** convert to PDF with `soffice.py --headless --convert-to pdf`, then `pdftoppm -jpeg` for a visual check and `pdftotext -bbox` for geometry.

> **QA gotcha worth remembering**
>
> Inline image preview is frequently unavailable in the build environment. Treat coordinate-based checks as the reliable QA: extract word bounding boxes from the PDF and confirm nothing crosses the right margin (~704 pt) or the bottom (~402 pt) on a 16:9 slide. Drawn elements (like the analog clocks in Lesson 6) can be verified by re-computing their geometry.

## 10. Working pattern

- Amanda answers a few preference and planning questions (tappable options) at the start of each build, then complete files are produced in one pass.
- Mid-build corrections are applied retroactively across every relevant file when a rule changes (for example, removing alcohol everywhere).
- Content decisions are family-driven: the curriculum follows what the learners respond to, not a fixed syllabus.
- **Personal writing note:** Amanda avoids em dashes in her own writing, using spaced hyphens instead. This document follows that; the lesson glosses use em dashes as a design choice and have not been changed.
