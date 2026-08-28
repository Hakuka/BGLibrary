import { type Game } from '../models/game.model';
import { GamesService } from './games.service';

describe('GamesService', () => {
  const storageKey = 'dummy_games';

  beforeEach(() => {
    localStorage.removeItem(storageKey);
  });

  afterEach(() => {
    localStorage.removeItem(storageKey);
  });

  it('falls back to the initial games when localStorage contains malformed JSON', () => {
    localStorage.setItem(storageKey, '{not-valid-json');

    let service: GamesService | undefined;
    expect(() => {
      service = new GamesService();
    }).not.toThrow();

    expect(service?.getAllGames().length).toBeGreaterThan(0);
    expect(service?.getGameInfo('g1').name).toBe('Catan');
  });

  it('does not expose its internal array or game objects', () => {
    const service = new GamesService();
    const gamesSnapshot = service.getAllGames();
    const initialLength = gamesSnapshot.length;

    gamesSnapshot[0].name = 'Mutated outside the service';
    gamesSnapshot.pop();

    const gameSnapshot = service.getGameInfo('g1');
    gameSnapshot.name = 'Mutated game snapshot';

    expect(service.getAllGames().length).toBe(initialLength);
    expect(service.getGameInfo('g1').name).toBe('Catan');
  });

  it('persists the expected state after adding, updating, and removing a game', () => {
    const service = new GamesService();
    const newGame: Game = {
      id: 'g-test',
      name: 'Test Game',
      numberOfPlayers: '2-4',
      playingTime: '45 min',
      designer: 'Test Designer',
      artist: 'Test Artist',
    };

    expect(service.addGame(newGame)).toBeTrue();
    expect(readStoredGames().find((game) => game.id === newGame.id)).toEqual(newGame);

    service.updateGame({ id: newGame.id, name: 'Updated Test Game', comment: 'Updated' });
    expect(readStoredGames().find((game) => game.id === newGame.id)).toEqual({
      ...newGame,
      name: 'Updated Test Game',
      comment: 'Updated',
    });

    service.removeGameById(newGame.id);
    expect(readStoredGames().some((game) => game.id === newGame.id)).toBeFalse();
  });

  function readStoredGames(): Game[] {
    const serializedGames = localStorage.getItem(storageKey);
    expect(serializedGames).not.toBeNull();
    return JSON.parse(serializedGames ?? '[]') as Game[];
  }
});
