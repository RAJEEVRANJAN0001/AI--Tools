#!/usr/bin/env python3
import re
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / 'src' / 'data' / 'aiToolsData.ts'
OUT = ROOT / 'ai-tools-list.txt'

if not SRC.exists():
    print(f"Source file not found: {SRC}")
    raise SystemExit(1)

text = SRC.read_text(encoding='utf-8')

# Find the start of the main array after the export declaration
decl_pos = text.find('export const aiToolsData')
if decl_pos == -1:
    print('Could not find "export const aiToolsData" declaration')
    raise SystemExit(1)
# Find the '=' after the declaration, then the array '[' after the '=' to avoid the '[]' in the type annotation
eq_pos = text.find('=', decl_pos)
if eq_pos == -1:
    print('Could not find assignment "=" after declaration')
    raise SystemExit(1)
arr_start = text.find('[', eq_pos)
if arr_start == -1:
    print('Could not find array start after declaration')
    raise SystemExit(1)

# Extract the array block between the opening '[' and the matching closing ']' after arr_start
# Find matching closing bracket for the array using bracket counting
bracket = 0
end_pos = -1
for i in range(arr_start, len(text)):
    c = text[i]
    if c == '[':
        bracket += 1
    elif c == ']':
        bracket -= 1
        if bracket == 0:
            end_pos = i
            break
if end_pos == -1:
    print('Could not find matching closing bracket for array')
    raise SystemExit(1)

array_block = text[arr_start+1:end_pos]

# Now extract top-level objects by brace counting within the array block
objects = []
idx = 0
N = len(array_block)
while idx < N:
    # skip whitespace and commas
    while idx < N and array_block[idx] in ' \n\r\t,':
        idx += 1
    if idx >= N:
        break
    if array_block[idx] == '{':
        start = idx
        brace = 1
        idx += 1
        while idx < N and brace > 0:
            c = array_block[idx]
            if c == '{':
                brace += 1
            elif c == '}':
                brace -= 1
            idx += 1
        end = idx  # position after closing brace
        obj_text = array_block[start:end]
        objects.append(obj_text)
    else:
        # unexpected token, skip ahead
        idx += 1

print(f'Found {len(objects)} tool objects')

# helper extractors
str_re = lambda k: re.compile(rf"{re.escape(k)}\s*:\s*(['\"])(.*?)\1", re.S)
arr_re = lambda k: re.compile(rf"{re.escape(k)}\s*:\s*\[(.*?)\]", re.S)
num_re = lambda k: re.compile(rf"{re.escape(k)}\s*:\s*([0-9]+)")

keys = ['id','name','company','category','shortDescription','longDescription','pricing','apiAccess','officialWebsite','documentation','releaseDate','lastUpdated','version','userCount']

lines = []
for i, obj in enumerate(objects, 1):
    entry = []
    # basic keys
    for k in keys:
        m = str_re(k).search(obj)
        v = m.group(2).strip() if m else ''
        entry.append(f"{k}: {v}")
    # coreFeatures (array of strings)
    m = arr_re('coreFeatures').search(obj)
    if m:
        items = re.findall(r"(['\"])(.*?)\1", m.group(1), re.S)
        features = [it[1].strip() for it in items]
    else:
        features = []
    entry.append('coreFeatures: ' + (', '.join(features)))
    # tags
    m = arr_re('tags').search(obj)
    if m:
        items = re.findall(r"(['\"])(.*?)\1", m.group(1), re.S)
        tags = [it[1].strip() for it in items]
    else:
        tags = []
    entry.append('tags: ' + (', '.join(tags)))
    # integrations (could be array of strings or objects)
    m = arr_re('integrations').search(obj)
    integrations = []
    if m:
        # find string entries
        items = re.findall(r"(['\"])(.*?)\1", m.group(1), re.S)
        integrations = [it[1].strip() for it in items]
    else:
        # also try integrations: { ... } or integratoins: []
        pass
    entry.append('integrations: ' + (', '.join(integrations)))
    # supportedPlatforms
    m = arr_re('supportedPlatforms').search(obj)
    platforms = []
    if m:
        items = re.findall(r"(['\"])(.*?)\1", m.group(1), re.S)
        platforms = [it[1].strip() for it in items]
    entry.append('supportedPlatforms: ' + (', '.join(platforms)))
    # notes: capture any other common properties: license, pricingDetails
    m = str_re('license').search(obj)
    entry.append('license: ' + (m.group(2).strip() if m else ''))
    # Compose human readable block
    name_match = re.search(r"name\s*:\s*['\"](.*?)['\"]", obj, re.S)
    name = name_match.group(1) if name_match else 'Unknown'
    header = f"Tool {i}/{len(objects)}: {name}"
    lines.append(header)
    lines.append('-' * len(header))
    lines.extend(entry)
    lines.append('')

OUT.write_text('\n'.join(lines), encoding='utf-8')
print(f'Wrote {OUT} with {len(objects)} entries')
