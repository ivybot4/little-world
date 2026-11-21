import { assetUrl } from '../utils/asset';

export interface BookConfig {
  id: string;
  title: string;
  author: string;
  rating: string;
  /** Book review paragraphs shown on the book review page */
  review: string[];
  /** Optional custom cover image URL (uses styled book cover if omitted) */
  coverImage?: string;
  /** Optional custom spine image URL (uses styled book spine if omitted) */
  spineImage?: string;
  /** Accent color for the book spine & cover */
  color: string;
}

export const books: BookConfig[] = [
  {
    id: 'the-death-of-ivan-ilyich',
    title: 'The Death of Ivan Ilyich',
    author: 'Leo Tolstoy',
    rating: '9.5/10',
    review: [
      'This has easily become one of my favorite books. At just around 50 pages, The Death of Ivan Ilyich by Leo Tolstoy was a great read.',
      'There’s no surprise that the book is about the death of a man. It is about his regrets and thoughts when he knew he was going to die of a disease. It revolves around how even when we do everything by the book, we might end up feeling dissatisfied on our deathbed.',
      'It could mean that doing everything by the book might not guarantee happiness, which makes it okay to do things that bring us joy. But it could also mean that no matter what we do, we always end up thinking about what we could’ve done.',
      'But I would like to focus on another aspect of the book. The book also speaks of the importance of empathy. When Ivan Ilyich was sick, he did not want people fixing him or going to doctors; he just wanted people to understand the fact that he was in pain and be kind to him, just like Gerasim. It also showed the reality of human behavior. When the news of his death broke, his colleagues and friends all thought that at least it wasn’t them on the deathbed. His relationships were hollow. He and his wife had drifted apart, and he did not have fulfilling relationships with his children. ',
      'Another thing I really liked about the book was its brevity. It conveyed what was important, without getting into a hundred other details. He was just a man on his deathbed. Not a hero to root for or a villain who deserves to die. We have no context about his kindness or mistreatment of others throughout the book. He could be likable or unlikable, but he was just a human being. He was a rational being who knew Caius was human, and humans are mortal; hence, Caius was mortal. But he also acknowledged that things that become easy to digest because they happened to others are much harder to accept when we are facing them. With his own memories, joys, and sorrows, the inevitable mortality of a human felt different.',
      'In the beginning of his life, he was happy that there was growth. But just like a lot of people trying to fit in a structured society, he eventually became bitter. How he went to get a job for 5,000 rubles is so real because he was not satisfied; he kept having this insatiable need, but in reality, he also lacked empathy and compassion, which he realized very late.',
      'This book really made me think. It wasn’t a fun read or a good story. The story is in the title. But I will still recommend it to everyone to read at least once.'
    ],
    coverImage: assetUrl('/images/books/ivan-ilyich-cover.svg?v=2'),
    spineImage: assetUrl('/images/books/ivan-ilyich-spine.svg?v=2'),
    color: '#8C231F',
  },
  {
    id: 'the-little-prince',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    rating: '9/10',
    review: [
      'The one thing I know is that I was smiling the entire time I was reading the book. This book really made me feel good. ',
      'The Little Prince by Antoine de Saint-Exupéry is an eighty-page book about the nicest prince from a star who meets a serious pilot in the desert. This book is about how the pilot remembers the prince and the conversations he had with him. The language is very easy to read, and you can probably read the entire book in less than 2 hours. The author’s drawings definitely add to the reading experience. ',
      'The Little Prince had such a refreshing worldview. It is very easy for adults to lose their childlike wonder and look at people or relationships through a lens of logic and not of feeling. This book does a good job of reminding you how important it is to understand things and approach things with love and curiosity, not function and value. You could go to a place with a thousand roses, but you would still think about that one rose you had.',
      'The simple plot also very beautifully conveyed how adults are, and how grown-ups tend to think of themselves and their work as important. I really liked how the elements in the book can mean different things to different people. ',
      'I hope this book finds you when you need it the most.'
    ],
    coverImage: assetUrl('/images/books/little-prince-cover.svg'),
    spineImage: assetUrl('/images/books/little-prince-spine.svg?v=2'),
    color: '#A63A28',
  },
  {
    id: 'the-midnight-library',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    rating: '8.5/10',
    review: [
      'I had the chance to meet the author of The Midnight Library and get my copy of the book signed during his promotional tour for ‘The Midnight Train’. Matt Haig looked at it and immediately went, “This wins for having the most Post-its.” And that is for a reason.',
      'The story follows Nora Seed,  a woman in her thirties, who gets transported to a library where she can try out all the infinite lives that she could have lived. She gets to experience all the different versions of her life based on her regrets. So if she regretted not moving abroad, she was transported into a life where she did. With around 350 pages, the story progression is fairly fast. Short chapters and quick movement from one “life” to another make it fun and easy to read.',
      'This book does a good job of showing what goes on in someone struggling with their mental health in the present time. Not someone burdened with glorious purposes going crazy, not someone who becomes prideful, or someone who can never catch a lucky break. The protagonist is just a girl with a seemingly normal life, which in reality is not fulfilling or satisfactory for her.',
      'It was fun exploring how different life can turn out to be if you just make a small decision differently, and it sort of reinforces the belief that whatever happens, happens for good. You can choose choices, not outcomes, and sometimes regrets are not based on facts at all. And maybe tomorrow, everything can be different, but you need to wait till tomorrow for that to happen.',
      'It does have a predictable ending, but that does not mean that the ending is bad. It is very appropriate and kind of sweet to read. We have a lot of good books about great ideas or mysteries, but not about navigating our modern lives. I would add it to the list of good books about our lives in these times.',
      'On a side note, I did request the author to include an Indian girl in his next novel, even if she is just a side character as a joke, but he was really nice about it. He is a pretty cool person and I am excited to read more of his books.'
    ],
    coverImage: assetUrl('/images/books/midnight-library-cover.svg'),
    spineImage: assetUrl('/images/books/midnight-library-spine.svg'),
    color: '#13314C',
  },
  {
    id: 'farenheit-451',
    title: 'Farenheit 451',
    author: 'Ray Bradbury',
    rating: '7.5/10',
    review: [
      'Fahrenheit 451 is a short novel (about 150 pages) by Ray Bradbury that made me question how I process information and define intelligence.',
      'The story follows the protagonist, Guy Montag, a fireman in a world where firemen burn houses that contain books. He begins to question his job and understand the importance of books throughout the story, and questions his personal philosophy.',
      'It started strong and is definitely very fast-paced. Things happen very quickly, but what stays is the description of events and the words the author uses to describe things. He puts complex ideas into these gentle quotes that really broaden the way I look at things. Yes, it is verbose, and the ending is a little too open-ended for me, but I think this is criticism for the sake of criticism.',
      'Whenever I read a dystopian novel (especially something like this published in 1953), I tend to look for similarities with the world, which were way too many in this book. For instance, people here used little seashells to listen to the radio 24/7, similar to how all of us always have earphones on. This really makes the book engaging to sit with.',
      'The author mentions how books naturally fade out and are replaced by things that give a quick boost of dopamine, and how people want to think that they are thinking, but in reality don’t really engage in deep thought.',
      'Of course, it’s only fair to think about the other side of things as well. Television was becoming increasingly popular around the time the book was released, and it made sense to associate reading with smartness and consuming other forms of media as something that promotes less thinking. But there is truth in what he wrote because our generation sees the effects of it in real time. We see how easy it is to get lost in a sea of information and form opinions by listening to others that might not even be fully ours. And the diversity in video content has increased now, which is a good thing. But if we remember the old TV shows, we also see how different they were and how they promoted certain ideas we might not fully resonate with.',
      'So, I would definitely recommend this read if you want to expand your point of view. Everyone should read this at least once, if not for the story, then for the message and the beautiful ways in which the author describes complex feelings and thoughts.'
    ],
    coverImage: assetUrl('/images/books/farenheit-451-cover.svg'),
    spineImage: assetUrl('/images/books/farenheit-451-spine.svg'),
    color: '#E32028',
  },
];
