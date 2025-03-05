export interface State {
    id: number | string;
    onEnter(): any;
    onExit(): any;
}

export class StateMachine {
    current_state: State | null;
    readonly states: Record<number | string, State> = {};

    constructor(states: Array<State>, initial_state: State | null = null) {
        // Initialize all states to state machine as a record.
        states.map((state) => {
            if (this.states[state.id] == undefined) {
                this.states[state.id] = state;
            } else {
                console.warn(`State with id '${state.id}' already exists.`);
            }
        });

        // Enter initial state.
        this.current_state = initial_state;
        this.current_state?.onEnter();
    }

    transition(new_state_id: number | string) {
        // Get new state.
        let new_state: State | undefined = this.states[new_state_id];
        if (new_state === undefined) {
            console.error(`State '${new_state_id}' does not exist.`);
            return;
        }

        // If current state === new state, do nothing.
        if (this.current_state?.id === new_state.id) {
            return;
        }

        // Exit current state.
        if (this.current_state) {
            console.log("exiting", this.current_state.id);
            this.current_state.onExit();
        }

        // Enter new state.
        this.current_state = new_state;
        console.log("entering", this.current_state?.id);
        this.current_state?.onEnter();
    }
}
