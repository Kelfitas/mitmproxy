export const TOGGLE_VISIBILITY = 'SPLITVIEW_TOGGLE_VISIBILITY'

interface SplitViewState {
    visible: boolean
}

export const defaultState: SplitViewState = {
    visible: false,
};

export default function reducer(state = defaultState, action): SplitViewState {
    switch (action.type) {
        case TOGGLE_VISIBILITY:
            return {
                ...state,
                visible: !state.visible
            }

        default:
            return state
    }
}

export function toggleVisibility() {
    return {type: TOGGLE_VISIBILITY}
}
