export interface CommunityStats {
  groups: number;
  discussions: number;
  events: number;
  members: number;
}

export const COMMUNITY_STATS: CommunityStats = {
  groups: 127,
  discussions: 1_126,
  events: 18,
  members: 5_600
};

export const TOP_MEMBERS = [
  {
    name: 'Marina Santos',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
    points: 842,
    ranking: '#12'
  },
  {
    name: 'Dr. Ricardo Lima',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
    points: 746,
    ranking: '#15'
  }
];
