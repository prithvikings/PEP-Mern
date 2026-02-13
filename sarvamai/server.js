import { SarvamAIClient } from "sarvamai";
import fs from "fs";

const client = new SarvamAIClient({
  apiSubscriptionKey: "sk_5sgdstt1_gxbRCQoVAFffI9uatMg2pEKS",
});

const run = async () => {
  const response = await client.textToSpeech.convert({
    text: "नमस्ते! Sarvam AI में आपका स्वागत है। हम भारतीय भाषाओं के लिए अत्याधुनिक voice technology बनाते हैं। हमारे text-to-speech models प्राकृतिक और इंसान जैसी आवाज़ें produce करते हैं, जो बेहद realistic लगती हैं। आप अपना text type कर सकते हैं या different voices को try करने के लिए किसी भी voice card पर play button पर click कर सकते हैं। तो चलिए, अपनी भाषा में AI की ताकत experience करें!",
    target_language_code: "hi-IN",
    speaker: "shubh",
    pace: 1.1,
    speech_sample_rate: 22050,
    enable_preprocessing: true,
    model: "bulbul:v3",
    temperature: 0.6,
  });

  const base64Audio = response.audios[0];
  const audioBuffer = Buffer.from(base64Audio, "base64");
  fs.writeFileSync("sarvam_output.wav", audioBuffer);

  console.log("Audio saved as sarvam_output.wav");
};

run();
