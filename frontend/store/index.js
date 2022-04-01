import { configureStore } from "@reduxjs/toolkit";

import activitySlice from './activity-slice'

const store = configureStore({
	reducer: {
		activity: activitySlice.reducer,
	},
});

export default store;