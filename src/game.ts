import { State, StateMachine } from "./state-machine";

let hasWon: boolean = false;
let button = document.createElement("button");
button.className = "button";
button.innerHTML = "start";

enum GameStates {
    IDLE = "IDLE",
    RUNNING = "RUNNING",
    WIN = "WIN",
    LOSE = "LOSE",
}

let idle: State = {
    id: GameStates.IDLE,
    onEnter: () => {
        console.log("---------------------");
        button.style.pointerEvents = "all";
        button.style.background = "#2ea44f";
    },
    onExit: () => {
        button.style.pointerEvents = "none";
        button.style.background = "#94d3a2";
    },
};

let running: State = {
    id: GameStates.RUNNING,
    onEnter: async () => {
        await delay(1000);
        game.transition(hasWon ? GameStates.WIN : GameStates.LOSE);
    },
    onExit: () => {},
};

let win: State = {
    id: GameStates.WIN,
    onEnter: async () => {
        await delay(1000);
        game.transition(GameStates.IDLE);
    },
    onExit: () => {},
};

let lose: State = {
    id: GameStates.LOSE,
    onEnter: async () => {
        await delay(1000);
        game.transition(GameStates.IDLE);
    },
    onExit: () => {},
};

// Setup game state machine.
let game: StateMachine = new StateMachine([idle, running, win, lose]);

// Start game up.
export async function setupGame(element: HTMLDivElement) {
    element.appendChild(button);
    button.onclick = () => {
        game.transition(GameStates.RUNNING);
    };
}

// Add game delay.
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
