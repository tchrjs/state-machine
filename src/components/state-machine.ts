import { State, StateMachine } from "../util/state_machine/state-machine";

let button = document.createElement("button");
let hasWon: boolean = false;

export function setupStateMachine(element: HTMLDivElement): void {
    // Start button.
    element.appendChild(button);
    button.className = "button";
    button.innerHTML = "start";
    button.onclick = () => {
        game.transition(idle, GameStates.RUNNING);
    };
}

enum GameStates {
    IDLE = "IDLE",
    RUNNING = "RUNNING",
    WIN = "WIN",
    LOSE = "LOSE",
}

const idle: State = {
    id: GameStates.IDLE,
    onEnter() {
        console.log("---------------------");
        button.style.pointerEvents = "all";
        button.style.background = "#2ea44f";
    },
    onExit() {
        button.style.pointerEvents = "none";
        button.style.background = "#94d3a2";
    },
};

const running: State = {
    id: GameStates.RUNNING,
    async onEnter() {
        await delay(1000);
        game.transition(this, hasWon ? GameStates.WIN : GameStates.LOSE);
    },
    onExit() {},
};

const win: State = {
    id: GameStates.WIN,
    async onEnter() {
        await delay(1000);
        game.transition(win, GameStates.IDLE);
    },
    onExit() {},
};

const lose: State = {
    id: GameStates.LOSE,
    async onEnter() {
        await delay(1000);
        game.transition(lose, GameStates.IDLE);
    },
    onExit() {},
};

// Setup game state machine.
const game: StateMachine = new StateMachine([idle, running, win, lose], idle);

// Add game delay.
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
