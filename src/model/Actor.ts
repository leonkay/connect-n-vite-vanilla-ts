/**
 * Type used to track the moves made by an actor
 */
export interface ActorMove {
    colIdx: number;
    tokenIdx: number;
}

/**
 * For a JSON Model
 */
export interface ActorType {
    symbol: number;
    moves: ActorMove[];
}

/**
 * Factory method from JSON
 * @param actor
 * @returns
 */
export function FromActorType(actor: ActorType): Actor {
    return new Actor(actor.symbol, actor.moves);
}

/**
 * Represents a Player. Will keep track of its "symbol" on the grid,
 * generate a random color, and the associated moves made by the actor.
 */
export class Actor {

    constructor(private _symbol: number,
         private _moves: ActorMove[] = [], private _color: string = getRandomColor()) {
    }


    get color(): string {
        return this._color;
    }

    get symbol(): number {
        return this._symbol;
    }

    moves(): ActorMove[] {
        return this._moves;
    }

    moveCount(): number {
        return this._moves.length;
    }

    successfulMove(column: number, tokenIndex: number) {
        this._moves.push({
            colIdx: column,
            tokenIdx: tokenIndex,
        });
    }

    toJSON(): ActorType {
        return {
            symbol: this._symbol,
            moves: this._moves,
        };
    }
}

/**
 *
 * @returns Utility to generate a random hexcode color
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
