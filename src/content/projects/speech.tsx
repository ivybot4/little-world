import { A, Figure, P, Section, SubHeading } from '../../components/ProjectContent/Blocks';

export default function SpeechContent() {
  return (
    <>
      <Section title="Quantized and Fine-tuned Whisper Model for Real-time Automatic Speech Recognition for Hinglish on-device">
        <SubHeading
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#6d6a63',
            marginTop: 0,
          }}
        >
          Quantization | Fine-tuning | HuggingFace Transformers | PyTorch | OpenAI Whisper
        </SubHeading>

        <P>
          <A href="https://github.com/ivybot4/on-device-hinglish-asr">github.com/ivybot4/on-device-hinglish-asr</A>
        </P>

        <P>A model listens to audio as a 1D array of floating numbers of the size of a sampling rate.
          Wav2Vec was pretrained with self-supervised learning and then fine-tuned on a small labeled dataset.
          But Whisper decided to use supervised learning with weak dataset, that includes noisy data. 
          This means that a lot of data with supervised learning performs better even if the data is not the best.
        </P>

        <Figure
          src="/images/projects/device-speech.png"
          alt="On-Device Speech project"
          width="70%"
        />

        <P>The baseline was zero-shot Whisper small. Fine-tuning was a lot better.</P>

      </Section>
    </>
  );
}
