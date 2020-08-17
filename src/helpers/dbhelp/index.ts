import { Document } from 'mongoose'


import Collection from '../scheman/collection'
import RequestCollection from '../scheman/collectionRequest'
import RequestLink from '../scheman/requestLink'
import TaskCollection from '../scheman/collection'
import User from '../scheman/user'

import { IUpdate } from '../../models/interface/respons'
import { ICollectionDoc } from '../../models/interface/collection'
import { ITaskCollection } from '../../models/interface/task'
import { ICollectionRequestDoc } from '../../models/interface/requestCollection'
import { IUser } from '../../models/interface/user'
import { IGetRequestLinkCredidsels, IRequestLink } from '../../models/interface/requestLink'
import { IReqLinkDoc, IReqLink } from '../../models/interface/requestLink'
import requestLink from '../scheman/requestLink'

export const updateCollection: (body: IUpdate) => Promise<boolean> = async (body: IUpdate) => {
  try {

    let coll: ICollectionDoc = await Collection.findById(body._id)

    coll.taskCollection = body.taskCollection

    await coll.save()

    return true
  } catch (e) {
    return false
  }
}

export const dealteTask: (collectionId: string, taskId: string) => Promise<boolean> = async (collectionId: string, taskId: string) => {
  try {

    let coll: ICollectionDoc = await Collection.findById(collectionId)

    coll.taskCollection = remove(coll, taskId);

    coll.markModified('taskCollection')

    await coll.save()

    return true
  } catch (e) {
    return false
  }
}

export const dealteTaskCollection: (id: string, name: string) => Promise<boolean> = async (id: string, name: string) => {
  try {

    const coll: ICollectionDoc = await Collection.findById(id)

    coll.taskCollection = coll.taskCollection.filter(task => task.name.toLowerCase() !== name.toLowerCase())

    coll.markModified('taskCollection')

    await coll.save()


    return true
  } catch (e) {
    return false
  }
}

export const dealteCollection: (id: string) => Promise<boolean> = async (id: string) => {
  try {

    await Collection.findByIdAndDelete(id)

    return true
  } catch (e) {
    return false
  }
}

export const request: (id: string) => Promise<boolean> = async (id: string) => {
  try {
    const collectionRequest: ICollectionRequestDoc = await RequestCollection.findById(id)

    const collection: ICollectionDoc = await TaskCollection.findById(collectionRequest.requestCollectionId)

    collection.users.push(collectionRequest.user)

    collection.markModified('users')

    await collection.save()

    await requestRemove(id)

    return true
  } catch (e) {
    return false
  }
}

export const requestRemove: (id: string) => Promise<boolean> = async (id: string) => {
  try {

    await RequestCollection.findByIdAndDelete(id)

    return true
  } catch (e) {
    return false
  }
}

export const validateUser: (name: string) => Promise<boolean> = async (name: string) => {
  try {
    const findUser: IUser = await User.findOne({ name: name })

    if (findUser) {
      return true
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}

export const checkCollectionRequest: (user: string, requestCollectionId: string) => Promise<boolean> = async (user: string, requestCollectionId: string) => {
  const request: Document[] = await RequestCollection.find({ requestCollectionId: requestCollectionId, user: user })

  return request.length >= 1
}

export const validateRequestLink: (credidsels: IGetRequestLinkCredidsels) => Promise<boolean> = async (credidsels: IGetRequestLinkCredidsels) => {
  try {

    const collection: ICollectionDoc = await Collection.findById(credidsels.collectionId)

    const index: number = collection.users.findIndex((name) => name === credidsels.name)

    return index >= 0

  } catch (e) {
    return false
  }
}

export const checkRequestExist: (collectionId: string) => Promise<string> = async (collectionId: string) => {
  try {
    const reqest: IReqLinkDoc[] = await requestLink.find({ collectionId: collectionId })

    if (true) {

    }

    return reqest[0].linkId
  } catch (e) {
    return ''
  }
}

export const addUserToCollection: (credidsels: IRequestLink) => Promise<boolean> = async (credidsels: IRequestLink) => {
  try {

    let coll: ICollectionDoc = await Collection.findById(credidsels.collectionId)

    const index: number = coll.users.findIndex((user) => credidsels.name === user)

    if (index >= 0) {
      throw new Error()
    }

    coll.users.push(credidsels.name)

    coll.markModified('users')

    await coll.save()

    return true

  } catch (e) {
    return false
  }
}

export const getCollectionName: (collectionId: string) => Promise<string> = async (collectionId: string) => {
  try {
    const collection: ICollectionDoc = await Collection.findById(collectionId)

    return collection.project
  } catch (e) {
    return ''
  }
}

const remove: (coll: ICollectionDoc, id: string) => ITaskCollection[] = (coll: ICollectionDoc, taskId: string) => {
  let filterColl: ITaskCollection[] = [];

  coll.taskCollection.forEach((tasks: ITaskCollection) => {

    tasks.task = tasks.task.filter(task => task.id !== taskId)

    filterColl.push(tasks)
  })

  return filterColl
}