import { combineReducers } from 'redux'
import app from './app'
import theme from './themes'
import navigations from './navigations'
import users from './users'
import homes from './homes'
import hosts from './hosts'
import designers from './designers'
import designs from './designs'

const rootReducer = combineReducers({
  app, theme, navigations, users, homes, hosts, designers, designs
})

export default rootReducer

