import { create } from 'zustand';

export interface Content {
  id: string;
  title: string;
  description: string;
  type: 'movie' | 'series';
  thumbnailUrl: string;
  videoUrl: string;
  genre: string[];
  year: number;
  rating: string;
  duration: string;
  trending?: boolean;
}

interface ContentState {
  contents: Content[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addContent: (content: Content) => void;
  removeContent: (id: string) => void;
  updateContent: (id: string, content: Partial<Content>) => void;
  getFilteredContent: () => Content[];
}

export const useContent = create<ContentState>((set, get) => ({
  contents: [
    {
      id: '1',
      title: 'Stranger Things',
      description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
      type: 'series',
      thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80',
      videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
      genre: ['Drama', 'Horror', 'Sci-Fi'],
      year: 2016,
      rating: 'TV-14',
      duration: '50m',
      trending: true,
    },
    // Add more sample content here
  ],
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  addContent: (content) => set((state) => ({ 
    contents: [...state.contents, content] 
  })),
  removeContent: (id) => set((state) => ({ 
    contents: state.contents.filter((c) => c.id !== id) 
  })),
  updateContent: (id, content) => set((state) => ({
    contents: state.contents.map((c) => 
      c.id === id ? { ...c, ...content } : c
    ),
  })),
  getFilteredContent: () => {
    const { contents, searchQuery } = get();
    if (!searchQuery) return contents;
    
    const query = searchQuery.toLowerCase();
    return contents.filter((content) =>
      content.title.toLowerCase().includes(query) ||
      content.description.toLowerCase().includes(query) ||
      content.genre.some((g) => g.toLowerCase().includes(query))
    );
  },
}));