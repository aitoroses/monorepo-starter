import { NAME } from './constants'
import { compose } from 'ramda'
import * as model from './model'

export const getAll = state => state[NAME];

export const getMessage = compose(model.getMessage, getAll)
