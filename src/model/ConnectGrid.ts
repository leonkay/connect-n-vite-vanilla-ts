import { Column, ColumnType, FromColumnType } from "./Column";

export interface ConnectGridType {
    height: number;
    columns: ColumnType[];
}

export function FromConnectGridType(type: ConnectGridType): ConnectGrid {
    return new ConnectGrid(
        type.height,
        type.columns?.map((col) => FromColumnType(col)),
    );
}

/**
 * A model to track the Columns in the Grid. 
 */
export class ConnectGrid {
    constructor(private _height: number = 6, private columns: Column[] = []) {}

    height(): number {
        return this._height;
    }

    addColumn(column: Column) {
        this.columns.push(column);
    }

    get cols() {
        return this.columns;
    }

    getGrid(): Column[] {
        return this.columns;
    }

    getGridCol(index: number): Column | undefined {
        return this.columns[index];
    }

    toJSON(): ConnectGridType {
        return {
            height: this._height,
            columns: this.columns.map((col) => col.toJSON()),
        };
    }

    printGrid(prefix: string = "\n") {
        if (this.columns.length < 1) {
            return "";
        }
        let rtn: string = "";
        for (let i = this._height - 1; i >= 0; i--) {
            rtn += prefix;
            for (let j = 0; j < this.columns.length; j++) {
                rtn += this.columns[j].printElement(i);
            }
            rtn += "\n";
        }
        return rtn;
    }
}
