/**
 * TEMPLATE — copy this file to start a new project writeup.
 *
 * 1. Copy to src/content/projects/<your-project>.tsx
 * 2. In src/config/projects.ts:
 *      import MyProjectContent from '../content/projects/<your-project>';
 *    and add `content: MyProjectContent` to that project's entry.
 *
 * Every block accepts an optional `style={{ ... }}` prop for custom
 * fonts, colors, sizes and spacing.
 */
import {
  A,
  C,
  Callout,
  Code,
  Columns,
  Divider,
  Figure,
  Lead,
  List,
  P,
  PullQuote,
  Section,
  Stats,
  SubHeading,
  Video,
} from '../../components/ProjectContent/Blocks';

export default function TemplateContent() {
  return (
    <>
      <Lead>
        A one or two sentence summary of the project, set in a larger serif font.
      </Lead>

      <Stats
        items={[
          { value: '42 ms', label: 'Latency' },
          { value: '3.1×', label: 'Speedup' },
          { value: '98%', label: 'Accuracy' },
        ]}
      />

      <Section title="Overview">
        <P>
          Regular paragraph text with a <A href="https://example.com">link</A>, some{' '}
          <strong>bold</strong>, some <em>italics</em>, and inline code like <C>torch.compile</C>.
        </P>

        <Figure
          src="/images/projects/book-recommendation.png"
          alt="Description of the image"
          caption="A caption under the image."
          width="70%"
        />
      </Section>

      <Section title="How it works">
        <SubHeading>Step one</SubHeading>
        <List items={['First point', 'Second point', 'Third point']} />

        <SubHeading>Step two</SubHeading>
        <List ordered items={['Numbered item', 'Another numbered item']} />

        <Code language="python">{`def hello():
    print("hello world")`}</Code>
      </Section>

      <Section title="Image next to text">
        <Columns count={2} align="center">
          <Figure src="/images/projects/book-recommendation.png" caption="Left side" />
          <div>
            <P>Text that sits beside the image. On phones it stacks underneath.</P>
          </div>
        </Columns>
      </Section>

      <PullQuote cite="Someone">A memorable line, set large in an italic serif.</PullQuote>

      <Callout title="Key takeaway" tone="success">
        <P>Use callouts for results, notes, or warnings (tone: note, success, warning).</P>
      </Callout>

      <Video src="https://www.youtube.com/embed/dQw4w9WgXcQ" caption="Optional video embed." />

      <Divider />

      <P style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, color: '#8c231f' }}>
        Any block can be custom-styled with the style prop.
      </P>
    </>
  );
}
