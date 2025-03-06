import { platform } from "../app";
import { ToggleObserver } from "../util/observer/toggle";

let button = document.createElement("button");

export function setupObserver(element: HTMLDivElement): void {
    // Pause button.
    element.appendChild(button);
    button.className = "button";
    button.innerHTML = platform.playStateSubject.toggled_on ? "pause" : "play";
    button.onclick = () => {
        platform.state(!platform.playStateSubject.toggled_on);
    };

    // Assign observer to pause button.
    const playStateObserver = new ToggleObserver();
    platform.playStateSubject.attach(playStateObserver);
    playStateObserver.onToggled = (toggled_on: boolean) => {
        button.innerHTML = toggled_on ? "pause" : "play";
    };
}
