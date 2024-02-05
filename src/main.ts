import { ConnectGrid } from "./model/ConnectGrid";
import { ConnectNWinCondition } from "./model/WinCondition";
import { Engine } from "./model/Engine";
import "./style.css";
import Alpine from "alpinejs";
import { Actor } from "./model/Actor";
import { Column } from "./model/Column";


const params = new URLSearchParams(window.location.search);

// support initialization of the winCondition and playerCount from query params
const winConditionParam = parseInt(params.get("winCondition") || "4");
const playerCountParam = parseInt(params.get("playerCount") || "2");

// Alpine was used to support reactivity so that changes to the
// grid would automatically be reflected in the view.
window.Alpine = Alpine;

// add a model for the winCondition
// and playerCount
Alpine.store("ready", {
  winCondition: winConditionParam,
  playerCount: playerCountParam
});

Alpine.store("initialized", false);


function initializeAlpineStore(winCondition: number , playerCount: number) {

  window.WinCondition = new ConnectNWinCondition(winCondition);
  window.Grid = new ConnectGrid(window.WinCondition.colHeight());

  const actors = [...Array(playerCount).keys()].map((idx) => new Actor(idx + 1))
  window.Engine = new Engine(window.WinCondition, window.Grid, actors)

  for (let i = 0; i < window.WinCondition.numCol(); i++) {
    window.Grid.addColumn(new Column(window.WinCondition.colHeight()));
  }

  Alpine.store("connect", {
      winCondition: winCondition,
      grid: window.Grid,
      engine: window.Engine,
      win: window.WinCondition,
      actors: actors
  });

  Alpine.store("grid", {
    val: window.Grid
  });

  // with the game engine setup, set initialized to true to render the board.
  Alpine.store("initialized", true);
}

window.Init = initializeAlpineStore;

Alpine.start();

