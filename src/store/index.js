import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from './apis/photosApi'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer
    },
    middleware: (getDefautlMiddleware) => {
        return getDefautlMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware)
    }
})

setupListeners(store.dispatch)

export * from './thunks/fetchUsers'
export * from './thunks/addNewUser'
export * from './thunks/deleteUser'
export { 
    useFetchAlbumsQuery, 
    useAddAlbumMutation,
    useDeleteAlbumMutation
} from './apis/albumsApi'
export {
    useFetchPhotosQuery, 
    useAddPhotoMutation,
    useDeletePhotoMutation
} from './apis/photosApi'