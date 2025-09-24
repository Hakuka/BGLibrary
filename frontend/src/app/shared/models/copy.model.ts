export interface Copy {
  id: string;
  gameId: string;
  weight: number;
  comment: string;
  borrowed: 'Y' | 'N';
  responsiblePerson?: string;
}
