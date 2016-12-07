import { compose } from 'ramda'
import { NAME } from './constants'
import * as model from './model'

export const getAll = state => state[NAME];
export const getMessage = compose(model.getMessage, getAll)
