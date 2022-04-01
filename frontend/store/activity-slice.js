import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
	name: 'activity',
	initialState: {
		activities: [],
		totalQuantity: 0
	},
	reducers: {
		replaceActivities(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.activities = action.state.activities;
		}
	}
});

export const uiActions = uiSlice.actions;

export default uiSlice;