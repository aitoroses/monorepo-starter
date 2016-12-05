import { NAME } from './constants'
import { compose } from 'ramda'
import * as modelHelpers from './model'

export const getAll = state => state[NAME];
export const getMessage = compose(modelHelpers.getMessage, getAll)
