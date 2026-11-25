import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning Wi-Fi network name (32 chars exactly):
// "Our Wi-Fi outlived our marriage."
//
// Why the twist works, against the judge brief in priority order:
// 1. It IS a Wi-Fi network name of exactly 32 characters, and it reads as a
//    joke a stranger gets on first sight in a phone's network list.
// 2. The joke lands on the first read: "outlived" is the punchline word. A
//    marriage ends, but the router is still broadcasting — the network
//    survived the relationship.
// 3. It tells a whole story: a couple, a shared flat, a divorce, and someone
//    who kept the router (and the flat) afterwards. The reader fills in the
//    rest: who left, who stayed, whose name the network still carries.
// 4. It is fresh: no stock Wi-Fi joke ("FBI Surveillance Van", "It Burns
//    When IP", "Pretty Fly for a Wi-Fi") — the marriage angle turns the
//    familiar "named network" into a divorce document.
// 5. It is tight: every character earns its place, and the trailing period
//    closes the sentence like a tombstone for the marriage.
// Reviser note: "outlived" does the whole job in one word. A marriage is
// supposed to outlast a router — here the order is reversed, so the network
// name reads as the divorce papers: the flat, the flat's Wi-Fi, and the
// person who stayed are all still there, and the person who left is the
// only thing gone. The period is the full stop on the marriage, not on
// the network, which is still broadcasting.
const LINE = "Our Wi-Fi outlived our marriage.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate self-check (RULES.txt): UTF-8 text, 1-32 chars, not only whitespace, one line.
// This competition's entry must be exactly 32 characters.
if (LINE.length < 1 || LINE.length > 32) throw new Error(`entry length ${LINE.length} outside 1-32`);
if (LINE.length !== 32) throw new Error(`entry must be exactly 32 characters, got ${LINE.length}`);
if (!/\S/.test(LINE)) throw new Error("entry is only whitespace");
if (LINE.includes("\n")) throw new Error("entry must be a single line");
// Content checks: the name must carry the outlived twist and end on the marriage.
if (!LINE.includes("outlived")) throw new Error("entry must contain 'outlived'");
if (!LINE.includes("Wi-Fi")) throw new Error("entry must name the Wi-Fi network");
if (!LINE.endsWith("marriage.")) throw new Error("entry must end with 'marriage.'");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${LINE.length} chars)`);
