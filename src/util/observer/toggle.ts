import { Observer, Subject } from "./observer";

export type ToggleFunction = (toggled_on: boolean) => void;

// Notifies all observers (parent).
export class ToggleSubject implements Subject {
    public toggled_on: boolean = false;
    private observers: Observer[] = [];

    constructor(initial_toggle: boolean = false) {
        this.toggled_on = initial_toggle;
    }

    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) return;
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) return;
        this.observers.splice(observerIndex, 1);
    }

    public notify(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    public toggle(toggled_on: boolean): void {
        if (this.toggled_on != toggled_on) {
            this.toggled_on = toggled_on;
            this.notify();
        }
    }
}

// Handles notifications by subject (child).
export class ToggleObserver implements Observer {
    onToggled: ToggleFunction = (_: boolean) => {};
    update(subject: ToggleSubject): void {
        this.onToggled(subject.toggled_on);
    }
}
