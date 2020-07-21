import { IUpdate } from '../../models/interface/respons'
import { ICollectionDoc } from '../../models/interface/collection'
import { ITaskCollection } from '../../models/interface/task'
import { ICollectionRequestDoc } from '../../models/interface/requestCollection'
import { IUser } from '../../models/interface/user'
import Collection from '../scheman/collection'
import collection from '../scheman/collection'
import RequestCollection from '../scheman/collectionRequest'
import TaskCollection from '../scheman/collection'
import User from '../scheman/user'


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

    await collection.findByIdAndDelete(id)

    return true
  } catch (e) {
    return false
  }
}

export const request: (id: string) => Promise<boolean> = async (id: string) => {
  try {
    const collectionRequest: ICollectionRequestDoc = await RequestCollection.findById(id)

    const collection: ICollectionDoc = await TaskCollection.findOne(collectionRequest.collection)

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


const remove: (coll: ICollectionDoc, id: string) => ITaskCollection[] = (coll: ICollectionDoc, taskId: string) => {
  let filterColl: ITaskCollection[] = [];

  coll.taskCollection.forEach((tasks: ITaskCollection) => {

    tasks.task = tasks.task.filter(task => task.id !== taskId)

    filterColl.push(tasks)
  })

  return filterColl
}