// import logger from '@/config/logger'
import { Store } from '../models/store.model'
import ApiError from '../utils/ApiError'
import express from 'express'
import httpStatus from 'http-status'
// import { authenticate } from 'passport'

const router = express.Router()

router.get('/', async (req, res, next) => {
  const store = await Store.find()
  res.json(store)
})

router.get('/:id', async (req, res, next) => {
  try {
    const store = await Store.findOne({ _id: req.params.id })
    if (!store) throw new ApiError(httpStatus.NOT_FOUND, 'Store not found')
    res.json(store)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const store = new Store(req.body.store)
    await store.save()
    res.json(store)
  } catch (e) {
    next(e)
  }
})

export default router