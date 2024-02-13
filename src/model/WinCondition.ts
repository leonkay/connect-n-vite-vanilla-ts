import { Actor, ActorType, FromActorType } from "./Actor";
import { ConnectGrid } from "./ConnectGrid";

export type GameStatus = "PLAYING" | "WINNER" | "NOWINNER" | "STALEMATE";

/**
 * Minimum interface to build out a grid in order
 * to meet a winCondition.
 */
export interface WinCondition {
    didWin(actor: Actor, grid: ConnectGrid): GameStatus;
    colHeight(): number;
    numCol(): number;
    toJSON(): any;
    winner?: Actor;
}

/**
 * For JSON Marshalling / Unmarshalling
 */
export interface ConnectNWinConditionType {
    connectN: number;
    winner?: ActorType;
}

export function FromWinCondition(type: any): WinCondition {
    if (type.connectN) {
        let actor: undefined | Actor = undefined;
        if (type.winner) {
            actor = FromActorType(type.winner);
        }
        return new ConnectNWinCondition(type.connectN, actor);
    } else {
        throw new Error("Unsupport Win Condition");
    }
}

/**
 * The Connect "N" continuous slots Win Condition.
 *
 */
export class ConnectNWinCondition {
    constructor(private connectN: number = 4, private _winner?: Actor) {}

    get winner(): Actor | undefined {
        return this._winner
    }

    set winner(arg: Actor) {
        this._winner = arg;
    }

    toJSON(): ConnectNWinConditionType {
        return {
            connectN: this.connectN,
            winner: this.winner?.toJSON(),
        };
    }

    colHeight(): number {
        return Math.floor(this.connectN + this.connectN / 2);
    }

    numCol(): number {
        return this.connectN * 2 - 1;
    }

    didWin(actor: Actor, grid: ConnectGrid): GameStatus {
        // if there is a game winner already, and the actor is
        // not the winner, show a status of "NOWINNER" for them.
        if (this.winner && this.winner.symbol !== actor.symbol) {
            return "NOWINNER";
        }

        if (actor.moveCount() < this.connectN) {
            // actor cannot win if they didn't make enough moves
            return "PLAYING";
        }

        // Since we know the position last played by the actor
        // we can check for the longest stretch of continuous
        // slots occupied by player in either direction will be at most
        // N - 1, i.e. 2N checks per directional check.

        // check horizontal
        let lastMove = actor.moves()[actor.moveCount() - 1];
        let contiguous = true;
        let horizontalCount = 1;

        // check horizontal line
        // check right
        let horizontalSearchIndex = lastMove.colIdx + 1;
        while (
            contiguous &&
            horizontalCount < this.connectN &&
            horizontalSearchIndex < grid.getGrid().length
        ) {
            if (
                grid
                    .getGridCol(horizontalSearchIndex++)
                    ?.get(lastMove.tokenIdx) === actor.symbol
            ) {
                horizontalCount++;
            } else {
                contiguous = false;
            }
        }

        // check left
        contiguous = true;
        horizontalSearchIndex = lastMove.colIdx - 1;
        while (
            contiguous &&
            horizontalCount < this.connectN &&
            horizontalSearchIndex >= 0
        ) {
            if (
                grid
                    .getGridCol(horizontalSearchIndex--)
                    ?.get(lastMove.tokenIdx) === actor.symbol
            ) {
                horizontalCount++;
            } else {
                contiguous = false;
            }
        }

        if (horizontalCount >= this.connectN) {
            this.winner = actor;
            return "WINNER";
        }

        // check vertical line
        // check above
        let verticalCount = 1;
        let verticalSearchIndex = lastMove.tokenIdx + 1;
        contiguous = true;
        while (
            contiguous &&
            verticalCount < this.connectN &&
            verticalSearchIndex < grid.height()
        ) {
            if (
                grid.getGridCol(lastMove.colIdx)?.get(verticalSearchIndex++) ===
                actor.symbol
            ) {
                verticalCount++;
            } else {
                contiguous = false;
            }
        }

        // check below
        contiguous = true;
        verticalSearchIndex = lastMove.tokenIdx - 1;
        while (
            contiguous &&
            verticalCount < this.connectN &&
            verticalSearchIndex >= 0
        ) {
            if (
                grid.getGridCol(lastMove.colIdx)?.get(verticalSearchIndex--) ===
                actor.symbol
            ) {
                verticalCount++;
            } else {
                contiguous = false;
            }
        }

        if (verticalCount >= this.connectN) {
            this.winner = actor;
            return "WINNER";
        }

        // diagonal line up-right
        let diagonalURCount = 1;

        // up and to the right
        contiguous = true;
        verticalSearchIndex = lastMove.tokenIdx + 1;
        horizontalSearchIndex = lastMove.colIdx + 1;
        while (
            contiguous &&
            diagonalURCount < this.connectN &&
            verticalSearchIndex < grid.height() &&
            horizontalSearchIndex < grid.getGrid().length
        ) {
            if (
                grid
                    .getGridCol(horizontalSearchIndex++)
                    ?.get(verticalSearchIndex++) === actor.symbol
            ) {
                diagonalURCount++;
            } else {
                contiguous = false;
            }
        }

        // down and to the left
        contiguous = true;
        verticalSearchIndex = lastMove.tokenIdx - 1;
        horizontalSearchIndex = lastMove.colIdx - 1;
        while (
            contiguous &&
            diagonalURCount < this.connectN &&
            verticalSearchIndex >= 0 &&
            horizontalSearchIndex >= 0
        ) {
            if (
                grid
                    .getGridCol(horizontalSearchIndex--)
                    ?.get(verticalSearchIndex--) === actor.symbol
            ) {
                diagonalURCount++;
            } else {
                contiguous = false;
            }
        }

        if (diagonalURCount >= this.connectN) {
            this.winner = actor;
            return "WINNER";
        }

        // diagonal line Down-right
        let diagonalDRCount = 1;

        // Down and to the right
        contiguous = true;
        verticalSearchIndex = lastMove.tokenIdx - 1;
        horizontalSearchIndex = lastMove.colIdx + 1;
        while (
            contiguous &&
            diagonalDRCount < this.connectN &&
            verticalSearchIndex >= 0 &&
            horizontalSearchIndex < grid.getGrid().length
        ) {
            if (
                grid
                    .getGridCol(horizontalSearchIndex++)
                    ?.get(verticalSearchIndex--) === actor.symbol
            ) {
                diagonalDRCount++;
            } else {
                contiguous = false;
            }
        }

        // up and to the left
        contiguous = true;
        verticalSearchIndex = lastMove.tokenIdx + 1;
        horizontalSearchIndex = lastMove.colIdx - 1;
        while (
            contiguous &&
            diagonalDRCount < this.connectN &&
            verticalSearchIndex < grid.height() &&
            horizontalSearchIndex >= 0
        ) {
            if (
                grid
                    .getGridCol(horizontalSearchIndex--)
                    ?.get(verticalSearchIndex++) === actor.symbol
            ) {
                diagonalDRCount++;
            } else {
                contiguous = false;
            }
        }

        if (diagonalDRCount >= this.connectN) {
            this.winner = actor;
            return "WINNER";
        }

        // if no winners than the game is still playing.
        return "PLAYING";
    }
}
