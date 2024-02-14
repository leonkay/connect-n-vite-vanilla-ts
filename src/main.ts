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

Alpine.store("error", {
  hasError: false,
  errorMsg: ""
});

function initializeAlpineStore(winCondition: number , playerCount: number) {

  if (winCondition < 1 || winCondition > 20) {
    Alpine.store("error", {
      hasError: true,
      errorMsg: "Set Up Win Condition Value between 1 and 20"
    });
    return;
  }
  if (playerCount < 1 || playerCount > 50) {
    Alpine.store("error", {
      hasError: true,
      errorMsg: "Set Up Player Count between 1 and 50"
    }
   );
    return;
  }
  Alpine.store("error", {
    hasError: false,
    errorMsg: ""
  });

  window.WinCondition = new ConnectNWinCondition(winCondition);
  window.Grid = Alpine.reactive(new ConnectGrid(window.WinCondition.colHeight()));

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
    val: window.Grid,
  });

  Alpine.store("players", {
    current: 0,
  });

  Alpine.store("winner", {
    player: null
  });
  Alpine.store("gameStatus", {
    status: "PLAYING"
  });

  Alpine.effect(() => {
    console.log(window.Grid.printGrid(""));

    const actors = window.Engine.actors;
    actors.forEach((act) => {
      const status = window.WinCondition.didWin(act, window.Grid)
      if (status === 'WINNER') {
        window.Engine.status = 'WINNER';
        Alpine.store("winner", {
          player: act
        });
        Alpine.store("gameStatus",{
          status: "WINNER"
        });
      } else if (status === 'PLAYING') {
        if (window.Grid.maxCapacity === window.Engine.moveCount) {
          Alpine.store("gameStatus", {
            status: "STALEMATE"
          })
        }
      }
    })
  })
  // with the game engine setup, set initialized to true to render the board.
  Alpine.store("initialized", true);
}

window.Init = initializeAlpineStore;

Alpine.start();

