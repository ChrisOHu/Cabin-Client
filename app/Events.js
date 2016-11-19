import { EventEmitter } from 'events'

const Events = new EventEmitter()

/**
 * Events schem:
 *   cabin/new-home/publish
 *   cabin/my-profile/save
 *   cabin/my-profile/cancel
 *
 */

export default Events

