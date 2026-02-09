export type StyleCatalogItem = {
  id: string;
  name: string;
  description?: string;
  photos: string[];
};

const toId = (name: string) => {
  const base = name.split('(')[0]?.trim() || name.trim();
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const styleCatalog: StyleCatalogItem[] = [
  {
    id: toId('Undercut (Андеркат)'),
    name: 'Undercut (Андеркат)',
    description: "Yonlari qisqa, tepasi uzun. Kontrastli va zamonaviy ko'rinish.",
    photos: [
      'https://i.pinimg.com/1200x/09/38/a7/0938a7851634599a510dba75e2b7d117.jpg',
      'https://i.pinimg.com/736x/c5/4a/f1/c54af1d7485c258cf3eba3a165c7e7ab.jpg',
      'https://i.pinimg.com/1200x/37/ec/49/37ec496db0f0cea3053d2256f39f4e43.jpg',
    ],
  },
  {
    id: toId('Fade (Фейд)'),
    name: 'Fade (Фейд)',
    description: "Yonlar asta-sekin qisqarib boradi. Juda toza va silliq o'tish.",
    photos: [
      'https://i.pinimg.com/1200x/47/61/bc/4761bc67e56dfbc520ee4194630bca90.jpg',
      'https://i.pinimg.com/736x/10/46/89/1046897d4051837858bcb5ed260ec784.jpg',
      'https://i.pinimg.com/1200x/6d/be/f2/6dbef2272f9826d56e45998f3647ca4e.jpg',
    ],
  },
  {
    id: toId('Canadian (Канадка)'),
    name: 'Canadian (Канадка)',
    description: "Klassik proporsiya: tepasi biroz uzun, yonlari ixcham. Universal variant.",
    photos: [
      'https://i.pinimg.com/736x/b3/68/09/b36809b78c16ade3faa9deb9befeed2b.jpg',
      'https://i.pinimg.com/736x/73/70/f9/7370f9437c7d2f8b5e1c4b5f062ade3c.jpg',
      'https://i.pinimg.com/736x/30/e8/c1/30e8c15c54c7be6e6cb5dcc11a1da368.jpg',
    ],
  },
  {
    id: toId('Pompadour (Помпадур)'),
    name: 'Pompadour (Помпадур)',
    description: "Old qismida hajm katta. Stil berib yurishni yoqtiradiganlar uchun.",
    photos: [
      'https://i.pinimg.com/1200x/96/d0/ec/96d0ecb6d7274fd518d80611aef534b8.jpg',
      'https://i.pinimg.com/736x/bd/ba/f2/bdbaf262e69807ecc8d8cec56a97ea1b.jpg',
      'https://i.pinimg.com/1200x/10/14/48/1014481fe693194ae63db92538930a77.jpg',
    ],
  },
  {
    id: toId('Textured Crop (Текстурный кроп)'),
    name: 'Textured Crop (Текстурный кроп)',
    description: "Teksturali qisqa turmak. Mat effekt va yengil tartibsizlik bilan.",
    photos: [
      'https://i.pinimg.com/736x/7f/2a/1c/7f2a1cb05878339fe86d9fa11635ae3d.jpg',
      'https://i.pinimg.com/1200x/76/82/a3/7682a34ec66c7017853bda919b7f70b4.jpg',
      'https://i.pinimg.com/736x/3c/75/9a/3c759a825a515cd9c56e9d56acd13d94.jpg',
    ],
  },
  {
    id: toId('Buzz Cut (Бокс / Под ноль)'),
    name: 'Buzz Cut (Бокс / Под ноль)',
    description: "Eng qisqa va minimal. Sportcha, saranjom, parvarishi oson.",
    photos: [
      'https://i.pinimg.com/1200x/5c/c0/b2/5cc0b245025b067db3fb7393e15b16b4.jpg',
      'https://i.pinimg.com/736x/a2/61/3b/a2613bd5b1d3fe91e61c6e3a2ee53ff4.jpg',
      'https://i.pinimg.com/736x/ca/93/c9/ca93c9ddb0dcbba015385a9452695e20.jpg',
    ],
  },
];
