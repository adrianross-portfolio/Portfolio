# Photography Project — Image Guide

## 1. Image Folder

Store all photography assets inside:

```text
public/
└── photography/
    ├── landscape-01.jpg
    ├── portrait-01.jpg
    ├── street-01.webp
    └── ...
```

Use descriptive filenames to make your images easier to identify and maintain.

Supported formats:

- `.jpg` / `.jpeg`
- `.png`
- `.webp`

## 2. Add Images to the Gallery

Open your project data file and locate the `photographyMedia` array.

Add each image using this structure:

```typescript
const photographyMedia: ProjectMedia[] = [
  {
    type: "image",
    src: "/photography/landscape-01.jpg",
    alt: "Mountain landscape at sunset",
  },
  {
    type: "image",
    src: "/photography/portrait-01.jpg",
    alt: "Outdoor portrait photography",
  },
  {
    type: "image",
    src: "/photography/street-01.webp",
    alt: "Urban street photography",
  },
];
```

Replace the sample filenames and descriptions with your actual images.

## 3. Add More Images

Copy an existing object inside `photographyMedia` and update its `src` and `alt` values.

Example:

```typescript
{
  type: "image",
  src: "/photography/architecture-01.webp",
  alt: "Modern architectural photography",
},
```

Place the corresponding file inside `public/photography/`.

**Important:** Do not include `public` in the image path. Use `/photography/landscape-01.jpg`, not `/public/photography/landscape-01.jpg`.

## 4. Keep the Project Configuration

Keep these properties in the Photography project:

```typescript
image: photographyMedia.map((item) => item.src),
media: photographyMedia,
```

The `media` property provides the gallery content, while `image` maintains compatibility with existing components.

No changes to the modal or gallery component should be necessary for ordinary images.

## 5. Image Optimization

For better portfolio performance:

- Resize images to approximately 1200–2000 pixels wide when appropriate.
- Compress large image files before adding them.
- Prefer WebP for optimized photography assets when practical.
- Write meaningful `alt` descriptions.
- Avoid uploading unnecessarily large original camera files.

## 6. Troubleshooting

If an image does not appear:

1. Verify that the file exists in `public/photography/`.
2. Check the filename, capitalization, and extension.
3. Confirm that the `src` begins with `/photography/`.
4. Check the browser console and Network tab for `404` errors.
5. Ensure the image object is inside `photographyMedia`.

## 7. Adding Videos Later

The `ProjectMedia` type supports videos as well:

```typescript
{
  type: "video",
  src: "/photography/highlights-reel.mp4",
  poster: "/photography/highlights-poster.webp",
  alt: "Photography highlights reel",
},
```

Place the video and poster files inside `public/photography/`. Confirm that the existing gallery component supports video playback before adding video entries.

---

**Maintenance tip:** Keep all Photography project media in one `photographyMedia` array. The existing project configuration can derive the legacy `image` array from it, avoiding duplicated image lists.
