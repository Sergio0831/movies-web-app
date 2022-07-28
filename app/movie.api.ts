import { User } from './../types/user';
import { TMovie } from 'types/movies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Movie'],
  endpoints: (build) => ({
    getMovies: build.query<TMovie[], void>({
      query: () => ({
        url: '/movies'
      }),
      providesTags: ['Movie']
    }),
    getMoviesByCategory: build.query<TMovie[], string>({
      query: (category) => ({
        url: `/${category}`
      }),
      providesTags: ['Movie']
    }),
    getBookmarkedMovies: build.query<TMovie[], void>({
      query: () => ({
        url: '/bookmarkedMovies'
      }),
      providesTags: ['Movie']
    }),
    toggleBookmarks: build.mutation<
      TMovie,
      { id: string; isBookmarked: boolean }
    >({
      query: ({ id, isBookmarked }) => ({
        url: '/bookmarks',
        method: 'PATCH',
        body: { id, isBookmarked }
      }),
      invalidatesTags: ['Movie']
    }),
    searchMovies: build.mutation<
      TMovie[],
      { searchQuery: string; category?: string }
    >({
      query: ({ searchQuery, category }) => ({
        url: '/search',
        method: 'POST',
        body: { searchQuery, category }
      })
    }),
    signupUser: build.mutation<
      User,
      { email: string; password: string; passwordMatch: string }
    >({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data
      })
    })
  })
});

export const {
  useGetMoviesQuery,
  useGetMoviesByCategoryQuery,
  useGetBookmarkedMoviesQuery,
  useToggleBookmarksMutation,
  useSearchMoviesMutation,
  useSignupUserMutation
} = movieApi;
