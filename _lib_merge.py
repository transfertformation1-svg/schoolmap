"""National library URLs part 4/4: Oceania (13) + merge script. Run: python3 _lib_merge.py
Adds a 'library' category with the national library of each country.
- verified=True for official domains, False for UNESCO fallback.
- Countries that already have a 'library' category are skipped (ZA/FR/US have curated ones).
"""
import json
from _lib_af import LIBS_AF
from _lib_eu import LIBS_EU
from _lib_am_as import LIBS_AM, LIBS_AS

LIBS_OC = {
"FJ": ("National Library of Fiji", "https://www.library.gov.fj/"),
"KI": ("Kiribati National Library", "https://www.unesco.org/"),
"MH": ("Marshall Islands Library", "https://www.unesco.org/"),
"FM": ("FSM National Library", "https://www.unesco.org/"),
"NR": ("Nauru National Library", "https://www.unesco.org/"),
"NZ": ("National Library of New Zealand", "https://natlib.govt.nz/"),
"PW": ("Palau Community College Library", "https://www.pcc.palau.edu/"),
"PG": ("National Library of PNG", "https://www.nlpng.gov.pg/"),
"WS": ("Nelson Memorial Library (Samoa)", "https://www.unesco.org/"),
"SB": ("Solomon Islands Library", "https://www.unesco.org/"),
"TO": ("Tonga National Library", "https://www.unesco.org/"),
"TV": ("Tuvalu National Library", "https://www.unesco.org/"),
"VU": ("Vanuatu National Library", "https://www.unesco.org/"),
"AU": ("National Library of Australia", "https://www.nla.gov.au/"),
}

P = "/home/aristote/.cline/data/workspaces/chat/global-training-directory/src/data/trainingData.json"
LIBS = {}
for part in (LIBS_AF, LIBS_EU, LIBS_AM, LIBS_AS, LIBS_OC):
    LIBS.update(part)

d = json.load(open(P, encoding="utf-8"))
added, skipped, fallback = 0, 0, 0
for c in d["countries"]:
    if any(k["id"] == "library" for k in c["categories"]):
        skipped += 1
        continue
    title, url = LIBS.get(c["code"], ("National Library", "https://www.unesco.org/"))
    off = "unesco.org" not in url
    if not off:
        fallback += 1
    cc = c["code"].lower()
    c["categories"].append({
        "id": "library", "label_en": "Library & Partners",
        "label_fr": "Biblioth\u00e8ques & Partenaires", "icon": "\U0001F4DA",
        "items": [{
            "id": f"{cc}-natlib",
            "title": title if c["code"] not in ("FR", "US", "ZA") else title,
            "url": url, "verified": off,
            "subjects": ["Books", "Archives", "Research"],
            "audience": ["Students", "Researchers", "Public"],
            "certification": "Free access",
            "cost": "Free",
            "language": ["English", "French"],
            "description": f"National library of {c['name_en']}: free catalogs, digital collections and reading rooms.",
        }],
    })
    added += 1

json.dump(d, open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
n = len(d["countries"])
res = sum(len(k["items"]) for c in d["countries"] for k in c["categories"])
print(f"libs added={added} skipped={skipped} fallback={fallback} countries={n} resources={res}")
