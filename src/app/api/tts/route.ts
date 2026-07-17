import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Text talab qilinadi" }, { status: 400 });
    }

    if (process.env.OPENAI_API_KEY) {
      const res = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tts-1",
          input: text,
          voice: "alloy",
          response_format: "mp3",
        }),
      });

      if (!res.ok) {
        return NextResponse.json({ error: "TTS API xatosi" }, { status: 502 });
      }

      const audioBuffer = await res.arrayBuffer();
      return new NextResponse(audioBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Length": audioBuffer.byteLength.toString(),
        },
      });
    }

    return NextResponse.json({
      message: "TTS uchun OPENAI_API_KEY sozlanmagan. Brauzer SpeechSynthesis ishlatiladi.",
      useBrowserTTS: true,
    });
  } catch {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
