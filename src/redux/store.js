import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice.js";
import themeSlice from "./themeSlice.js";
import companySlice from "./companySlice.js";
import appSettingSlice from "./appSettingSlice.js";
import userManagementSlice from "./userManagementSlice.js";
import estimateSlice from "./estimateSlice.js"
import projectSlice from "./projectslice.js"
import chatSlice from "./chatSlice"
import fileSlice from "./fileSlice"
import rolesPermissionsSlice from "./RolesPermissionsSlice.js"

const rootReducer = combineReducers({
    user: userSlice,
    company: companySlice,
    theme: themeSlice,
    appSetting: appSettingSlice,
    userManagement: userManagementSlice,
    estimate : estimateSlice,
    project : projectSlice,
    chat:chatSlice,
    file:fileSlice,
    rolesPermissions: rolesPermissionsSlice,

});

const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
