# Connect N Single Browser Game

This is a sample project building a "Connect-4" like game, inside of a single
browser session e.g. a Single Mouse Clicking User.

The game supports setting custom win length conditions e.g. "4" as well as a
custom number of "Player" tokens, defaulting to "2".

The Win Length Condition will determine the width and height of the "Connect-N"
board.

In this case, the `height = winCondition + winCondition / 2` and
`width = winCondition * 2 - 1`;

## Getting Started
To run the game, install all dependencies, and run the `dev` task.

```
  $ npm install
  $ npm run dev
```

The game should be running at [http://localhost:5173](http://localhost:5173), but
verify this in the output of the `dev` task.

## Playing the Game

You can customize the win condition `winCondition` and number of players `playerCount` by altering those inputs
before clicking the `Initialize` button.

`winCondition` and `playerCount` default to `4` and `2`, but can also be initialized by
matching url search query parameters.

Once initialized, Player 1 will always act 1, with each successful click progressively changing the player.

A successful click is when the player successfully occupies a slot in a column.
If the column is full when clicked, the action should not result in a slot being occupied
and the player should select another column.

The game is "won" when a player successfully connects N continuous slots, either
horizontally, vertically, or diagonally.

## Technology Choices

This was built as a Typescript / Html Web App. As such, [Vite](https://vitejs.dev) proved to be the simplest
option for bootstrapping the project in "vanilla / typescript" mode.

To simplify event handling and rendering of changes to the grid reactively, a lightweight
library [AlpineJS](https://alpinejs.dev) was leveraged. Using the `store` capability,
changes to the underlying model would reactively change the view.

This resulted in a relatively light weight "presentation" model entirely encapsulated
in [index.html](index.html).

It should be noted that I was only tangentially aware of AlpineJS through learning
about HTMX. Getting started and familiar with AlpineJS's API was extremely simple.


### Testing
Instead of `jest`, the general recommendation when using `vite` to create applications
is to use `vitest`, as done here. Tests can be run with `npm run test`.

Only model testing has been done.

## Future enhancements

1. Keep Track of Game State in a browser storage solution e.g. session, local, or the URI
2. Add tests for the Presentation logic.
