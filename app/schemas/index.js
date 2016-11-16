import React, { PropTypes as T } from 'react'

export const users = {
  _id: T.string,
  phone: T.string,
  name: T.string,
  email: T.string,
  avatar: T.string,
  banner: T.string,
  geolocation: T.string,
  profession: T.string,
  followers: T.arrayOf(T.string),
  followings: T.arrayOf(T.string),
  favoriteHomes: T.arrayOf(T.string),
  favoriteDesigns: T.arrayOf(T.string),
  preferences: T.object,
  rules: T.arrayOf(T.string),
  hostId: T.string,
  designerId: T.string,

  createdAt: T.string,
  updatedAt: T.string
}

