import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { faker } from '@faker-js/faker'

const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery:fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
    endpoints: builder => {
        return {
            deletePhoto: builder.mutation({
                invalidatesTags: (results, error, photo) => {
                    return [{ type: 'Photo', id: photo.albumId }]
                },
                query: (photo) => {
                    return {
                        url:`/photos/${photo.id}`,
                        method: 'DELETE'
                    }
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (results, error, album) => {
                    return [{ type: 'Photo', id: album.id }]
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: {
                            albumId: album.id,
                            url: faker.image.abstract(150, 150, true),
                        }
                    }
                }
            }),
            fetchPhotos: builder.query({
                providesTags: (results, error, album) => {
                    return [{ type: 'Photo', id: album.id}]
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id
                        },
                        method: 'GET'
                    }
                }
            })
        }
    }
})

export const { useFetchPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } = photosApi
export { photosApi }