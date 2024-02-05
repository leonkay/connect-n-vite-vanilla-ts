import { Alpine as AlpineType } from "alpinejs";
import { ConnectGrid as ConnectGridType } from "./model/ConnectGrid";
import { WinCondition as WinConditionType } from "./model/WinCondition";
import { Engine as EngineType } from "./model/Engine";

declare global {
    var Alpine: AlpineType;
    var Grid: ConnectGridType;
    var WinCondition: WinConditionType;
    var Engine: EngineType;
    var Init: Function;
    var Reset: Function;
}
