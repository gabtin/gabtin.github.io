import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import satori from 'satori';
import sharp from 'sharp';

const contentDirectory = path.join(process.cwd(), 'content');
const outputDirectory = path.join(process.cwd(), 'public/images/thoughts');

interface Thought {
  slug?: string;
  title?: string;
  date: string;
  description?: string;
  draft?: boolean;
  fileName: string;
}

// Load VT323 font for satori
async function loadFont(): Promise<ArrayBuffer> {
  const fontPath = path.join(process.cwd(), 'public/fonts/VT323-Regular.ttf');

  // Check if font exists locally, otherwise fetch from Google Fonts
  if (fs.existsSync(fontPath)) {
    return fs.readFileSync(fontPath).buffer as ArrayBuffer;
  }

  // Fetch from Google Fonts
  const response = await fetch(
    'https://fonts.googleapis.com/css2?family=VT323&display=swap'
  );
  const css = await response.text();
  const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];

  if (!fontUrl) {
    throw new Error('Could not find VT323 font URL');
  }

  const fontResponse = await fetch(fontUrl);
  return fontResponse.arrayBuffer();
}

function getThoughts(): Thought[] {
  const thoughtsDir = path.join(contentDirectory, 'thoughts');
  if (!fs.existsSync(thoughtsDir)) {
    return [];
  }

  const files = fs.readdirSync(thoughtsDir).filter(
    (file) => file.endsWith('.mdx') || file.endsWith('.md')
  );

  return files.map((file) => {
    const fullPath = path.join(thoughtsDir, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      ...data,
      fileName: file,
      slug: data.slug || undefined,
    } as Thought;
  }).filter((t) => !t.draft && t.slug);
}

function createPreviewElement(thought: Thought) {
  const formattedDate = new Date(thought.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#ebe8e1',
        padding: '60px',
        fontFamily: 'VT323',
      },
      children: [
        // Header with site name
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              fontSize: '28px',
              color: '#666666',
            },
            children: 'gabrieletinelli.com',
          },
        },
        // Main content
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            },
            children: [
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '64px',
                    color: '#2b2b2b',
                    lineHeight: 1.1,
                    maxWidth: '1000px',
                  },
                  children: thought.title || 'Untitled',
                },
              },
              // Description
              thought.description ? {
                type: 'div',
                props: {
                  style: {
                    fontSize: '32px',
                    color: '#666666',
                    lineHeight: 1.3,
                    maxWidth: '900px',
                  },
                  children: thought.description,
                },
              } : null,
            ].filter(Boolean),
          },
        },
        // Footer with date
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '24px',
              color: '#666666',
            },
            children: [
              {
                type: 'div',
                props: {
                  children: formattedDate,
                },
              },
              // Decorative element
              {
                type: 'div',
                props: {
                  style: {
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#b8c9b0',
                    border: '2px solid #2b2b2b',
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function generatePreview(thought: Thought, font: ArrayBuffer): Promise<void> {
  const element = createPreviewElement(thought);

  const svg = await satori(element as any, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'VT323',
        data: font,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const png = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  const outputPath = path.join(outputDirectory, `${thought.slug}-preview.png`);
  fs.writeFileSync(outputPath, png);

  console.log(`Generated: ${thought.slug}-preview.png`);
}

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const thoughts = getThoughts();

  if (thoughts.length === 0) {
    console.log('No thoughts with slugs found.');
    return;
  }

  console.log(`Found ${thoughts.length} thoughts to generate previews for...\n`);

  const font = await loadFont();

  for (const thought of thoughts) {
    await generatePreview(thought, font);
  }

  console.log('\nDone!');
}

main().catch(console.error);
