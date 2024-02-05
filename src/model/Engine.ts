import { Actor, ActorType, FromActorType } from "./Actor";
import {
    ConnectGrid,
    ConnectGridType,
    FromConnectGridType,
} from "./ConnectGrid";
import { FromWinCondition, GameStatus, WinCondition } from "./WinCondition";

export interface EngineType {
    winCondition: any;
    grid: ConnectGridType;
    actors: ActorType[];
    playerIndex: number;
    status: GameStatus;
}

export function FromEngineType(type: EngineType): Engine {
    return new Engine(
        FromWinCondition(type.winCondition),
        FromConnectGridType(type.grid),
        type.actors.map((act) => FromActorType(act)) || [],
        type.playerIndex,
        type.status,
    );
}

/**
 * The Core Game Engine. It tracks the game state, including
 * whose turn it is, the winCondition and the grid.
 * After each move, it will test the winCondition and update
 * the game state accordingly.
 */
export class Engine {
    constructor(
        private winCondition: WinCondition,
        private grid: ConnectGrid,
        private _actors: Actor[] = [],
        private playerIndex: number = 0,
        private status: GameStatus = "PLAYING",
    ) {}

    get currentActor(): Actor {
        return this._actors[this.playerIndex];
    }

    get actors(): Actor[] {
        return this._actors;
    }

    /**
     * Utility for placing the token in a column by the actor
     * @param actor
     * @param colIdx
     * @returns null if the colIdx doesn't exist, or if the player could not place a token
     */
    play(actor: Actor, colIdx: number): null | number {
        let col = this.grid.getGridCol(colIdx);
        if (!col) {
            return null;
        }
        return col.placeToken(actor.symbol, this.grid.height());
    }

    /**
     * Action when player makes a move, testing the winCondition and updates the
     * game status.
     * @param colIdx
     * @returns the current gameStatus
     */
    makeMove(colIdx: number): GameStatus {
        if (this.status != "PLAYING") {
            console.log("Game not playable");
            return this.status;
        }
        const actor = this.actors[this.playerIndex];
        const index = this.play(actor, colIdx);
        if (index !== null) {
            actor.successfulMove(colIdx, index);
            const gameStatus = this.winCondition.didWin(actor, this.grid);
            if (gameStatus === "PLAYING") {
                this.playerIndex = (this.playerIndex + 1) % this.actors.length;
            } else {
                this.status = gameStatus;
            }
        }
        return this.status;
    }

    toJSON(): EngineType {
        return {
            winCondition: this.winCondition.toJSON(),
            grid: this.grid.toJSON(),
            actors: this.actors.map((act) => act.toJSON()),
            playerIndex: this.playerIndex,
            status: this.status,
        };
    }
}
