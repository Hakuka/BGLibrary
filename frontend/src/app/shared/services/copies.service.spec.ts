import { type Copy } from '../models/copy.model';
import { CopiesService } from './copies.service';

describe('CopiesService', () => {
  const storageKey = 'dummy_copies';

  beforeEach(() => {
    localStorage.removeItem(storageKey);
  });

  afterEach(() => {
    localStorage.removeItem(storageKey);
  });

  it('falls back to the initial copies when localStorage contains malformed JSON', () => {
    localStorage.setItem(storageKey, '[not-valid-json');

    let service: CopiesService | undefined;
    expect(() => {
      service = new CopiesService();
    }).not.toThrow();

    expect(service?.getAllCopies().length).toBeGreaterThan(0);
    expect(service?.getCopyInfo('c1').gameId).toBe('g1');
  });

  it('does not expose its internal array or copy objects', () => {
    const service = new CopiesService();
    const copiesSnapshot = service.getAllCopies();
    const initialLength = copiesSnapshot.length;

    copiesSnapshot[0].comment = 'Mutated outside the service';
    copiesSnapshot.pop();

    const copySnapshot = service.getCopyInfo('c1');
    copySnapshot.responsiblePerson = 'Mutated person';

    expect(service.getAllCopies().length).toBe(initialLength);
    expect(service.getCopyInfo('c1').comment).toBe(
      'Copy in good condition, corners slightly worn.',
    );
    expect(service.getCopyInfo('c1').responsiblePerson).toBe('Jan Kowalski');
  });

  it('persists the expected state after adding, updating, and removing copies', () => {
    const service = new CopiesService();
    const firstCopy: Copy = {
      id: 'c-test-1',
      gameId: 'g-test',
      borrowed: 'N',
      weight: 1.5,
      comment: 'First test copy',
    };
    const secondCopy: Copy = {
      id: 'c-test-2',
      gameId: 'g-test',
      borrowed: 'N',
      comment: 'Second test copy',
    };

    expect(service.addCopy(firstCopy)).toBeTrue();
    expect(service.addCopy(secondCopy)).toBeTrue();
    expect(readStoredCopies().find((copy) => copy.id === firstCopy.id)).toEqual(firstCopy);

    service.updateCopy({
      id: firstCopy.id,
      borrowed: 'Y',
      responsiblePerson: 'Test Person',
    });
    expect(readStoredCopies().find((copy) => copy.id === firstCopy.id)).toEqual({
      ...firstCopy,
      borrowed: 'Y',
      responsiblePerson: 'Test Person',
    });

    service.removeCopyById(firstCopy.id);
    expect(readStoredCopies().some((copy) => copy.id === firstCopy.id)).toBeFalse();
    expect(readStoredCopies().some((copy) => copy.id === secondCopy.id)).toBeTrue();

    service.removeCopyByGameId(secondCopy.gameId);
    expect(readStoredCopies().some((copy) => copy.gameId === secondCopy.gameId)).toBeFalse();
  });

  function readStoredCopies(): Copy[] {
    const serializedCopies = localStorage.getItem(storageKey);
    expect(serializedCopies).not.toBeNull();
    return JSON.parse(serializedCopies ?? '[]') as Copy[];
  }
});
