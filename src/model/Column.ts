/**
 * A JSON representation of the Column
 */
export interface ColumnType {
    capacity: number;
    state: number[];
}

/**
 * A factory method to create a Column from the JSON representation of the Column
 * @param data -
 * @returns a Column
 */
export function FromColumnType(data: ColumnType): Column {
    return new Column(data.capacity, data.state);
}

/**
 * Represents a Column in a Grid, with the assumption that tokens placed move as
 * far down the column as possible i.e. a Stack.
 */
export class Column {
    constructor(private capacity: number = 6, private state: number[] = []) {}

    /**
     * Represents placing a token in the column. The token value is the actor.
     * @param actor the token value
     * @param maxHeight the maxHeight that should be allowed for this column
     * @returns null if a token cannot be placed, or the index of the token that
     * was placed
     */
    placeToken(actor: number, maxHeight: number): null | number {
        if (this.state.length === maxHeight) {
            return null;
        }
        this.state.push(actor);
        return this.state.length - 1;
    }

    /**
     * @returns The number of occupied slots in this column
     */
    occupiedSlots(): number {
        return this.state.length;
    }

    /**
     * @param idx the index of the column value to be fetched
     * @returns Fetch the index value in the column if it exists, -1 otherwise
     */
    get(idx: number): number {
        if (idx >= this.state.length) {
            return -1;
        } else {
            return this.state[idx];
        }
    }

    /**
     * Reactive method used to fetch the values in the column
     * in reverse order, to support rendering the column from the
     * top->down. Empty slots will be populated with a '-1'.
     */
    get values(): number[] {
        const length = this.state.length;
        const rtn: number[] = [];

        if (length < this.capacity) {
            for (let i = this.capacity; i > length; i--) {
                rtn.push(-1);
            }
        }

        for (let i = length; i > 0; i--) {
            rtn.push(this.state[i - 1]);
        }
        return rtn;
    }

    /**
     * @returns a JSON representation of the column
     */
    toJSON(): ColumnType {
        return {
            capacity: this.capacity,
            state: this.state,
        };
    }

    /**
     * @param index the index in the column to return a string for
     * @returns a string representation of the value in the column for the index,
     * in the format '[%d]' if a value is present, or '[-]' if no value is present
     * for the index.
     */
    printElement(index: number): string {
        if (index >= this.state.length) {
            return "[-]";
        } else {
            return "[" + this.state[index] + "]";
        }
    }
}
