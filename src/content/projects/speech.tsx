import { Figure, P, ProjectActions, Section, SubHeading } from '../../components/ProjectContent/Blocks';
import { assetUrl } from '../../utils/asset';

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

        <ProjectActions
          githubUrl="https://github.com/ivybot4/on-device-hinglish-asr"
          tryUrl="https://navyajain.dev"
        />
        <>
        <p>This project can be divided into 3 main tasks:</p>
        <ol>
          <li>Fine-tune a model on Hindi, English, and Hinglish data</li>
          <li>Quantize the model</li>
          <li>Build a real-time pipeline</li>
        </ol>
        </>

        <P>
          A model processes audio in the form of a 1D array of floating point numbers. 
        </P>

        <Figure
          src={assetUrl('/images/projects/on-device-speech.png')}
          alt="On-Device Speech project"
          width="70%"
        />

        <P>The baseline was zero-shot Whisper small. Fine-tuning was a lot better.</P>

        <P> 
          Initially I used a huge dataset which made English words be typed in Devnagiri script. So had to fix that.
        </P>

      </Section>
    </>
  );
}
