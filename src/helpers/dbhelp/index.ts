import { IUpdate } from '../../models/interface/respons'
import { ICollectionDoc } from '../../models/interface/collection'
import { ITaskCollection, ITask } from '../../models/interface/task'
import Collection from '../scheman/collection'
import collection from '../scheman/collection'

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


    coll.taskCollection.forEach((tasks: ITaskCollection) => {

      // tslint:disable-next-line:no-console
      console.log(tasks.task.length)

    })

    let newBody: ITaskCollection[] = []

    coll.taskCollection.forEach((tasks: ITaskCollection) => {

      tasks.task = tasks.task.filter(task => task.id !== taskId)

      newBody.push(tasks)
    })

    coll.taskCollection = newBody


    await coll.save()

    coll.taskCollection.forEach((tasks: ITaskCollection) => {

      // tslint:disable-next-line:no-console
      console.log(tasks.task.length)

    })

    return true
  } catch (e) {
    return false
  }
}

export const dealteTaskCollection: (id: string, name: string) => Promise<boolean> = async (id: string, name: string) => {
  try {

    const coll: ICollectionDoc = await Collection.findById(id)


    coll.taskCollection = coll.taskCollection.filter(task => task.name.toLowerCase() !== name.toLowerCase())


    coll.save()

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