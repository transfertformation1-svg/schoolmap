import json

PATH = 'src/data/trainingData.json'

# Global "100% free, no financial-aid needed" template applied to every country.
# Fields follow the exact schema of existing items in trainingData.json.
def build_items(cc):
    cc = cc.lower()
    return [
        {
            "id": f"{cc}-archive",
            "title": "Internet Archive",
            "url": "https://archive.org/",
            "verified": True,
            "subjects": ["Books", "Courses", "Audio/Video"],
            "audience": ["Students", "Researchers", "Public"],
            "certification": "No certificate",
            "cost": "Free",
            "language": ["English", "French"],
            "description": "Millions of free books, courses and archived media — fully open access.",
        },
        {
            "id": f"{cc}-ocw",
            "title": "MIT OpenCourseWare",
            "url": "https://ocw.mit.edu/",
            "verified": True,
            "subjects": ["Computer Science", "Engineering", "Science"],
            "audience": ["Students", "Professionals"],
            "certification": "No certificate",
            "cost": "Free",
            "language": ["English"],
            "description": "Full MIT course materials (notes, videos, exams) published for free.",
        },
        {
            "id": f"{cc}-openlearn",
            "title": "OpenLearn (Open University)",
            "url": "https://www.open.edu/openlearn/",
            "verified": True,
            "subjects": ["General", "Business", "Science"],
            "audience": ["Public", "Students"],
            "certification": "Free statement of participation",
            "cost": "Free",
            "language": ["English"],
            "description": "Free short courses from The Open University, no entry requirements.",
        },
        {
            "id": f"{cc}-saylor",
            "title": "Saylor Academy",
            "url": "https://learn.saylor.org/",
            "verified": True,
            "subjects": ["General", "Business", "Computer Science"],
            "audience": ["Students", "Professionals"],
            "certification": "Free certificate",
            "cost": "Free",
            "language": ["English"],
            "description": "Self-paced college-level courses with free completion certificates.",
        },
        {
            "id": f"{cc}-openstax",
            "title": "OpenStax",
            "url": "https://openstax.org/",
            "verified": True,
            "subjects": ["Textbooks", "Math", "Science"],
            "audience": ["Students", "Teachers"],
            "certification": "No certificate",
            "cost": "Free",
            "language": ["English"],
            "description": "Peer-reviewed, openly licensed college textbooks (PDF & web) for free.",
        },
    ]

with open(PATH, encoding='utf-8') as f:
    data = json.load(f)

added, appended, skipped = 0, 0, 0
for c in data['countries']:
    cc = c['code']
    existing_ids = {it['id'] for k in c['categories'] for it in k['items']}
    free_cat = next((k for k in c['categories'] if k['id'] == 'resources'), None)
    new_items = [it for it in build_items(cc) if it['id'] not in existing_ids]
    if free_cat is None:
        c['categories'].append({
            "id": "resources",
            "label_en": "Useful Resources & Guides",
            "label_fr": "Ressources Utiles & Guides",
            "icon": "🆓",
            "items": new_items,
        })
        added += 1
    elif new_items:
        free_cat['items'].extend(new_items)
        appended += 1
    else:
        skipped += 1

with open(PATH, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

total = sum(len(k['items']) for c in data['countries'] for k in c['categories'])
free_n = sum(len(k['items']) for c in data['countries'] for k in c['categories'] if k['id'] == 'resources')
print(f"countries={len(data['countries'])} free_cat_created={added} appended={appended} skipped={skipped}")
print(f"free resources={free_n} total resources={total}")
