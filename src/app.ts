import { setupObserver } from "./components/observer";
import { setupStateMachine } from "./components/state-machine";
import "./style.css";
import { ToggleSubject } from "./util/observer/toggle";

export const platform = {
    playStateSubject: new ToggleSubject(false),
    state(toggled_on: boolean): void {
        this.playStateSubject.toggle(toggled_on);
    },
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div id="state-machine"></div>
    <div id="observer"></div>`;

setupStateMachine(document.querySelector<HTMLDivElement>("#state-machine")!);
setupObserver(document.querySelector<HTMLDivElement>("#observer")!);
