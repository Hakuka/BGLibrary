export interface Game {
  id: string;
  name: string;
  numberOfPlayers: string;
  playingTime: string;
  minAge?: number;
  weight?: number;
  designer: string;
  artist: string;
  shortDescription?: string;
  comment?: string;
}
