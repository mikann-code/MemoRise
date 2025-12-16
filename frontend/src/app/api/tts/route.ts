import { NextResponse } from "next/server";
import textToSpeech from "@google-cloud/text-to-speech";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const client = new textToSpeech.TextToSpeechClient({
      projectId: process.env.GOOGLE_TTS_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_TTS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_TTS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
    });

    const request = {
      input: { text },
      voice: {
        languageCode: "en-US",
        name: "en-US-Wavenet-D",
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: 0.9,
      },
    };

    const result: any = await client.synthesizeSpeech(request);
    const audioContent = result[0].audioContent;

    return NextResponse.json({
      audioContent: audioContent?.toString("base64"),
    });

  } catch (error) {
    console.error("TTSエラー：", error);
    return NextResponse.json(
      { error: "TTS failed" },
      { status: 500 }
    );
  }
}
