export interface IndustryItem {
  id: string;
  label: string;
  icon: string;
}

export const INDUSTRIES: IndustryItem[] = [
  { id: 'Tech',          label: 'Tech',          icon: '🖥' },
  { id: 'Music',         label: 'Music',          icon: '🎵' },
  { id: 'Fashion',       label: 'Fashion',        icon: '👗' },
  { id: 'Sports',        label: 'Sports',         icon: '⚽' },
  { id: 'Food',          label: 'Food',           icon: '🍕' },
  { id: 'Finance',       label: 'Finance',        icon: '💰' },
  { id: 'Health',        label: 'Health',         icon: '🏥' },
  { id: 'Entertainment', label: 'Entertainment',  icon: '🎬' },
];
