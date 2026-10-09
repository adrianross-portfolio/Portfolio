export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  date?: string;
  jobType?: string;
  image: string[];
  media?: ProjectMedia[];
  features?: string[];
  liveUrl?: string;
  stack?: string[];
  hasModal?: boolean;
};

const photoIds = [
  "photo-1470770841072-f978cf4d019e",
  "photo-1500530855697-b586d89ba3ee",
  "photo-1470252649378-9c29740c9fa8",
  "photo-1472214103451-9374bd1c798e",
  "photo-1501785888041-af3ef285b470",
  "photo-1464822759023-fed622ff2c3b",
  "photo-1441974231531-c6227db76b6e",
  "photo-1472396961693-142e6e269027",
  "photo-1500534623283-312aade485b7",
  "photo-1469474968028-56623f02e42e",
  "photo-1490750967868-88aa4486c946",
  "photo-1490730141103-6cac27aaab94",
  "photo-1518837695005-2083093ee35b",
  "photo-1507525428034-b723cf961d3e",
  "photo-1519681393784-d120267933ba",
  "photo-1500534314209-a25ddb2bd429",
  "photo-1511497584788-876760111969",
  "photo-1518005020951-eccb494ad742",
  "photo-1487958449943-2429e8be8625",
  "photo-1511818966892-d7d671e672a2",
  "photo-1497366754035-f200968a6e72",
  "photo-1497366216548-37526070297c",
  "photo-1497366811353-6870744d04b2",
  "photo-1497366754035-f200968a6e72",
  "photo-1517248135467-4c7edcad34c4",
  "photo-1519608487953-e999c86e7455",
  "photo-1500534314209-a25ddb2bd429",
  "photo-1518837695005-2083093ee35b",
  "photo-1490750967868-88aa4486c946",
  "photo-1470252649378-9c29740c9fa8",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1500648767791-00dcc994a43e",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1534528741775-53994a69daeb",
  "photo-1524504388940-b1c1722653e1",
  "photo-1531123897727-8f129e1688ce",
  "photo-1529139574466-a303027c1d8b",
  "photo-1515886657613-9f3515b0c78f",
  "photo-1483985988355-763728e1935b",
  "photo-1529139574466-a303027c1d8b",
  "photo-1494438639946-1ebd1d20bf85",
  "photo-1445116572660-236099ec97a0",
  "photo-1501339847302-ac426a4a7cbb",
  "photo-1495474472287-4d71bcdd2085",
  "photo-1517248135467-4c7edcad34c4",
  "photo-1519608487953-e999c86e7455",
  "photo-1519681393784-d120267933ba",
  "photo-1501785888041-af3ef285b470",
  "photo-1464822759023-fed622ff2c3b",
  "photo-1470770841072-f978cf4d019e",
];

const photographyMedia: ProjectMedia[] = photoIds.map((photoId, index) => ({
  type: "image",
  src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1400&q=80`,
  alt: `Photography sample ${index + 1}`,
}));

export const projects: Project[] = [
  {
    id: "photography",
    title: "Photography",
    description:
      "A curated visual collection capturing moments, perspectives, and stories through photography.",
    date: "2025-Present",
    jobType: "Full-Time",

    // Keep compatibility with existing components.
    image: photographyMedia.map((item) => item.src),

    // 50 sample gallery images.
    media: photographyMedia,

    hasModal: true,
  },
];
