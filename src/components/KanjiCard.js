import React from "react";
import Config from '../config';

const credentials = Config();

async function fetchKanji(kanji) {
    const response = await fetch('https://kanjiapi.dev/v1/kanji/' + kanji);
    const data = await response.json();
    return data.on_readings[0];
}

async function speakKanji(kanji) {
    const response = await fetch("https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=" + credentials, {
        method: 'POST',
        body: JSON.stringify({
            audioConfig: {
                audioEncoding: "LINEAR16",
                pitch: 0,
                speakingRate: 1
            },
            input: {
                text: kanji
            },
            voice: {
                languageCode: "ja-JP",
                name: "ja-JP-Standard-A"
            }
        })
    });
    const data = await response.json()
    const snd = new Audio("data:audio/wav;base64," + data.audioContent);
    snd.play() 
}

export default function KanjiCard(props) {
    const kanji = props.kanji;
    return (
        <div id="kanji-card" onClick={async () => {await speakKanji(kanji);}}>
            <h1>{kanji}</h1>
        </div>
    )
}