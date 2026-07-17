#!/usr/bin/env python3
"""Generate audio for listening lessons using gTTS. Splits long text into chunks."""

import json, os, re, sys, time, subprocess
from pathlib import Path
from gtts import gTTS

os.chdir(Path(__file__).parent.parent)

# Read seed file to extract transcripts
with open("prisma/seed.ts", "r") as f:
    seed = f.read()

blocks = seed.split('category: "listening"')
lessons = []

for i, block in enumerate(blocks[1:], 1):
    title_m = re.search(r'title:\s*"([^"]+)"', block)
    title = title_m.group(1) if title_m else f"Lesson_{i}"
    trans_m = re.search(r'transcriptText:\s*`([^`]+)`', block)
    trans = trans_m.group(1) if trans_m else ""
    if trans:
        lessons.append({"title": title, "transcript": trans})

print(f"Found {len(lessons)} listening lessons")

audio_dir = Path("public/audio/listening")
audio_dir.mkdir(parents=True, exist_ok=True)

def clean_text(text):
    text = re.sub(r'^(Man|Woman|Boy|Girl|Student|Tutor|Lecturer|Speaker|Interviewer|Agent|Customer|Receptionist|Caller|Friend|[A-Z])\s*:?\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'^\[\d+\]\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r' +', ' ', text)
    return text.strip()

def split_text(text, max_chars=800):
    """Split text into chunks at sentence boundaries."""
    if len(text) <= max_chars:
        return [text]
    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks = []
    current = ""
    for s in sentences:
        if len(current) + len(s) < max_chars:
            current += s + " "
        else:
            if current.strip(): chunks.append(current.strip())
            current = s + " "
    if current.strip(): chunks.append(current.strip())
    return chunks

def concat_mp3(files, output):
    """Concatenate MP3 files by joining raw bytes (works for same-format MP3s from gTTS)."""
    with open(output, "wb") as outfile:
        for mp3 in files:
            outfile.write(mp3.read_bytes())
            mp3.unlink()

for lesson in lessons:
    title_clean = re.sub(r'[^a-z0-9]+', '_', lesson['title'].lower()).strip('_')
    out = audio_dir / f"{title_clean}.mp3"
    
    if out.exists():
        print(f"✓ {lesson['title']}: exists ({out.stat().st_size/1024:.0f} KB)")
        continue
    
    cleaned = clean_text(lesson['transcript'])
    chunks = split_text(cleaned)
    
    print(f"\n{lesson['title']} ({len(cleaned)} chars, {len(chunks)} chunks)...")
    
    tmp_files = []
    success = True
    for ci, chunk in enumerate(chunks):
        tmp = audio_dir / f"tmp_{title_clean}_{ci}.mp3"
        try:
            tts = gTTS(text=chunk, lang='en', slow=False)
            tts.save(str(tmp))
            tmp_files.append(tmp)
            print(f"  chunk {ci+1}: {len(chunk)} chars ✓")
        except Exception as e:
            print(f"  chunk {ci+1}: ✗ {e}")
            success = False
        time.sleep(0.8)
    
    if success and tmp_files:
        if len(tmp_files) == 1:
            tmp_files[0].rename(out)
        else:
            concat_mp3(tmp_files, out)
        print(f"  ✓ Final: {out.name} ({out.stat().st_size/1024:.0f} KB)")
    
    time.sleep(0.5)

print(f"\n✅ Done! Files:")
for f in sorted(audio_dir.glob("*.mp3")):
    if not f.name.startswith("tmp_"):
        print(f"  {f.name} ({f.stat().st_size/1024:.0f} KB)")
