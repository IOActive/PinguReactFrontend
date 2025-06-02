// Initial state for currentProject
const initialState = null;

// Reducer function
const active_project = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PROJECT':
      return action.payload; // Set the current project
    case 'CLEAR_ACTIVE_PROJECT':
      return ""; // Clear the current project
    default:
      return state;
  }
};

// Action creators
export const setActiveProject = (project) => ({
  type: 'SET_ACTIVE_PROJECT',
  payload: project,
});

export const clearActiveProject = () => ({
  type: 'CLEAR_ACTIVE_PROJECT',
});

// Export the reducer as default
export default active_project;
