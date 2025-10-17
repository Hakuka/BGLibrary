export interface Copy {
  id: string;
  gameId: string;
  weight: number;
  borrowed: 'Y' | 'N';
  comment?: string;
  responsiblePerson?: string;
}
