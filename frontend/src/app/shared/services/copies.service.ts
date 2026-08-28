import { Injectable } from '@angular/core';
import { type Copy } from '../models/copy.model';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === 'string';
}

function isOptionalFiniteNumber(value: unknown): value is number | undefined {
  return value === undefined || (typeof value === 'number' && Number.isFinite(value));
}

function isCopy(value: unknown): value is Copy {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value['id'] === 'string' &&
    typeof value['gameId'] === 'string' &&
    (value['borrowed'] === 'Y' || value['borrowed'] === 'N') &&
    isOptionalFiniteNumber(value['weight']) &&
    isOptionalString(value['comment']) &&
    isOptionalString(value['responsiblePerson'])
  );
}

function cloneCopy(copy: Copy): Copy {
  return { ...copy };
}

@Injectable({ providedIn: 'root' })
export class CopiesService {
  private dummy_copies: Copy[] = [
    {
      id: 'c1',
      gameId: 'g1',
      weight: 2.3,
      comment: 'Copy in good condition, corners slightly worn.',
      borrowed: 'Y',
      responsiblePerson: 'Jan Kowalski',
    },
    {
      id: 'c2',
      gameId: 'g1',
      weight: 2.31,
      comment: 'New copy, all components included.',
      borrowed: 'N',
    },
    {
      id: 'c3',
      gameId: 'g2',
      weight: 1.9,
      comment: 'Used copy, tiles slightly scratched.',
      borrowed: 'Y',
      responsiblePerson: 'Anna Nowak',
    },
    {
      id: 'c4',
      gameId: 'g2',
      weight: 1.92,
      comment: 'Perfect condition, box intact.',
      borrowed: 'N',
    },
    {
      id: 'c5',
      gameId: 'g3',
      weight: 1.8,
      comment: 'Copy missing one card, rest complete.',
      borrowed: 'Y',
      responsiblePerson: 'Piotr Wiśniewski',
    },
    {
      id: 'c6',
      gameId: 'g3',
      weight: 1.79,
      comment: 'Full set, corners slightly worn.',
      borrowed: 'N',
    },
    {
      id: 'c7',
      gameId: 'g4',
      weight: 2.3,
      comment: 'Game in excellent condition, rulebook slightly bent.',
      borrowed: 'N',
    },
    {
      id: 'c8',
      gameId: 'g4',
      weight: 2.29,
      comment: 'New copy, unused.',
      borrowed: 'Y',
      responsiblePerson: 'Maria Zielińska',
    },
    {
      id: 'c9',
      gameId: 'g5',
      weight: 1.8,
      comment: 'Used but fully complete.',
      borrowed: 'N',
    },
    {
      id: 'c10',
      gameId: 'g5',
      weight: 1.82,
      comment: 'Perfect condition, slightly dusty.',
      borrowed: 'Y',
      responsiblePerson: 'Tomasz Lewandowski',
    },
    {
      id: 'c11',
      gameId: 'g6',
      weight: 2.4,
      comment: 'Copy in good condition, rulebook in plastic.',
      borrowed: 'N',
    },
    {
      id: 'c12',
      gameId: 'g6',
      weight: 2.41,
      comment: 'New, never used.',
      borrowed: 'Y',
      responsiblePerson: 'Ewa Kamińska',
    },
    {
      id: 'c13',
      gameId: 'g7',
      weight: 2.4,
      comment: 'Used copy, tiles slightly damaged.',
      borrowed: 'Y',
      responsiblePerson: 'Marek Dąbrowski',
    },
    {
      id: 'c14',
      gameId: 'g7',
      weight: 2.39,
      comment: 'Complete and in good condition.',
      borrowed: 'N',
    },
    {
      id: 'c15',
      gameId: 'g8',
      weight: 1.9,
      comment: 'Perfect condition, few tiles slightly scratched.',
      borrowed: 'N',
    },
    {
      id: 'c16',
      gameId: 'g8',
      weight: 1.88,
      comment: 'New copy, box in plastic.',
      borrowed: 'Y',
      responsiblePerson: 'Katarzyna Wójcik',
    },
    {
      id: 'c17',
      gameId: 'g9',
      weight: 3.4,
      comment: 'Used, components in good condition.',
      borrowed: 'Y',
      responsiblePerson: 'Andrzej Kaczmarek',
    },
    {
      id: 'c18',
      gameId: 'g9',
      weight: 3.42,
      comment: 'New copy, all figurines intact.',
      borrowed: 'N',
    },
    {
      id: 'c19',
      gameId: 'g4',
      weight: 3.3,
      comment: 'Used copy, board slightly warped.',
      borrowed: 'N',
    },
    {
      id: 'c20',
      gameId: 'g4',
      weight: 3.31,
      comment: 'New, perfect condition.',
      borrowed: 'Y',
      responsiblePerson: 'Monika Piotrowska',
    },
    {
      id: 'c21',
      gameId: 'g4',
      weight: 3.31,
      comment: 'New, perfect condition.',
      borrowed: 'Y',
      responsiblePerson: 'Kaszalot Wielkoludzki',
    },
    {
      id: 'c22',
      gameId: 'g4',
      weight: 3.31,
      comment:
        'Bacon ipsum dolor amet corned beef sausage pig brisket turkey prosciutto buffalo andouille. Cupim shank biltong chuck sirloin porchetta landjaeger chislic tongue filet mignon strip steak. Cow corned beef hamburger, salami shankle meatball brisket pork belly tail turkey kielbasa strip steak landjaeger tri-tip. Jowl tenderloin meatloaf bacon, salami flank swine. Jowl kevin porchetta cupim tongue, kielbasa bresaola salami frankfurter meatball pork chop corned beef turducken short loin pastrami. Jowl pancetta drumstick, sausage kevin pork chop tail short loin beef ribs venison landjaeger.',
      borrowed: 'N',
      responsiblePerson: 'John Zmienny',
    },
  ];

  constructor() {
    const storedCopies = this.loadCopies();
    if (storedCopies !== undefined) {
      this.dummy_copies = storedCopies;
    }
  }

  getAllCopies(): Copy[] {
    return this.dummy_copies.map(cloneCopy);
  }

  getAllBorrowedCopies(): Copy[] {
    return this.dummy_copies.filter((copy) => copy.borrowed === 'Y').map(cloneCopy);
  }

  getCopyInfo(copyId: string): Copy {
    const copy = this.dummy_copies.find((e) => e.id === copyId);
    if (!copy) {
      throw new Error(`Copy not found for id =${copyId}`);
    }

    return cloneCopy(copy);
  }

  updateCopy(updateCopyData: Partial<Copy> & { id: string }): void {
    const index = this.dummy_copies.findIndex((c) => c.id === updateCopyData.id);
    if (index !== -1) {
      this.dummy_copies[index] = { ...this.dummy_copies[index], ...updateCopyData };
    }
    this.saveCopies();
  }

  removeCopyById(copyId: string): void {
    this.dummy_copies = this.dummy_copies.filter((c) => c.id !== copyId);
    this.saveCopies();
  }

  removeCopyByGameId(gameId: string): void {
    this.dummy_copies = this.dummy_copies.filter((c) => c.gameId !== gameId);
    this.saveCopies();
  }

  addCopy(newCopy: Copy): boolean {
    const exists = this.dummy_copies.some((c) => c.id === newCopy.id);
    if (exists) {
      return false;
    }
    this.dummy_copies.push({ ...newCopy });
    this.saveCopies();
    return true;
  }

  private loadCopies(): Copy[] | undefined {
    try {
      const serializedCopies = localStorage.getItem('dummy_copies');
      if (serializedCopies === null) {
        return undefined;
      }

      const parsedCopies: unknown = JSON.parse(serializedCopies);
      if (!Array.isArray(parsedCopies) || !parsedCopies.every(isCopy)) {
        return undefined;
      }

      return parsedCopies.map(cloneCopy);
    } catch {
      return undefined;
    }
  }

  private saveCopies(): void {
    try {
      localStorage.setItem('dummy_copies', JSON.stringify(this.dummy_copies));
    } catch {
      // The in-memory update remains usable when storage is unavailable or full.
    }
  }
}
