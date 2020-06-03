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

      const sortCollection: ITask[] = []

      tasks.task.forEach((task: ITask) => {

        if (task.id !== taskId) {
          sortCollection.push(task)
        }
      })

      tasks.task = sortCollection
    })

    coll.taskCollection.forEach(t => {
      t.task.forEach(x => {
        // tslint:disable-next-line:no-console
        console.log(x)
      })
    })

    coll.markModified('object')

    coll.save();

    return true
  } catch (e) {
    return false
  }
}


export const dealteTaskCollection: () => Promise<boolean> = async () => {
  try {

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