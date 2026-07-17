#!/usr/bin/env python3
"""Generate high-quality audio files for listening lessons using gTTS."""

import json
import os
import re
import sys
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Use gTTS
from gtts import gTTS

def clean_transcript(text):
    """Remove speaker labels and clean up text for TTS."""
    if not text:
        return ""
    # Remove speaker labels like "Man:", "Woman:", "Student:", "Tutor:", etc.
    text = re.sub(r'^(Man|Woman|Man|Boy|Girl|Student|Tutor|Lecturer|Person|Speaker|Interviewer|Agent|Customer|Receptionist|Caller|Friend|A|B|C)\s*:?\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'^\[\d+\]\s*', '', text, flags=re.MULTILINE)
    # Remove brackets content like [pause], [laughter]
    text = re.sub(r'\[.*?\]', '', text)
    # Remove multiple newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Clean up extra spaces
    text = re.sub(r' +', ' ', text)
    return text.strip()

def generate_audio(text, output_path, lang='en'):
    """Generate audio file using gTTS."""
    cleaned = clean_transcript(text)
    if len(cleaned) < 10:
        print(f"  ⚠ Text too short after cleaning ({len(cleaned)} chars)")
        return False
    
    # Split long text into chunks (gTTS has 100 char limit... actually it's fine for longer)
    try:
        tts = gTTS(text=cleaned, lang=lang, slow=False)
        tts.save(output_path)
        print(f"  ✓ Generated: {output_path.name} ({len(cleaned)} chars)")
        return True
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def main():
    # Paths
    audio_dir = Path(__file__).parent.parent / "public" / "audio" / "listening"
    audio_dir.mkdir(parents=True, exist_ok=True)
    
    # Read the database directly using Prisma
    os.chdir(Path(__file__).parent.parent)
    
    # Use the Prisma client to get lessons
    import subprocess
    result = subprocess.run(
        ["npx", "tsx", "-e", """
            const { PrismaClient } = require('@prisma/client');
            const prisma = new PrismaClient();
            prisma.lesson.findMany({
                where: { category: 'listening' },
                select: { id: true, title: true, transcriptText: true },
                orderBy: { order: 'asc' }
            }).then(async (lessons) => {
                console.log(JSON.stringify(lessons));
                await prisma.$disconnect();
            });
        """],
        capture_output=True, text=True, timeout=30
    )
    
    # Parse output - find JSON in stdout
    output = result.stdout
    json_match = re.search(r'\[.*\]', output, re.DOTALL)
    if not json_match:
        print("Failed to parse lessons from database")
        print("stdout:", output[:500])
        print("stderr:", result.stderr[:500])
        return
    
    lessons = json.loads(json_match.group())
    
    if not lessons:
        print("No listening lessons found!")
        return
    
    print(f"Found {len(lessons)} listening lessons")
    
    import time
    
    for lesson in lessons:
        title_clean = re.sub(r'[^a-z0-9]+', '_', lesson['title'].lower()).strip('_')
        filename = f"{title_clean}.mp3"
        output_path = audio_dir / filename
        
        # Relative URL for database
        audio_url = f"/audio/listening/{filename}"
        
        print(f"\n{lesson['title']}:")
        
        if not lesson.get('transcriptText'):
            print("  ⚠ No transcript text")
            continue
        
        if generate_audio(lesson['transcriptText'], output_path):
            # Update the lesson with the audio URL
            update_result = subprocess.run(
                ["npx", "tsx", "-e", f"""
                    const {{ PrismaClient }} = require('@prisma/client');
                    const prisma = new PrismaClient();
                    prisma.lesson.update({{ where: {{ id: '{lesson['id']}' }}, data: {{ audioUrl: '{audio_url}' }} }})
                    .then(() => {{ console.log('updated'); prisma.$disconnect(); }});
                """],
                capture_output=True, text=True, timeout=15
            )
            if 'updated' in update_result.stdout:
                print(f"  ✓ DB updated: {audio_url}")
            else:
                print(f"  ✗ DB update failed: {update_result.stderr[:200]}")
        
        # Small delay to avoid rate limiting
        time.sleep(0.5)
    
    print(f"\n✅ All audio files generated in {audio_dir}")

if __name__ == "__main__":
    main()
