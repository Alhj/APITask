import { IUpdate } from '../../models/interface/respons'
import { ICollectionDoc } from '../../models/interface/collection'
import { ITaskCollection } from '../../models/interface/task'
import Collection from '../scheman/collection'

export const updateCollection: (body: IUpdate) => Promise<boolean> = async (body: IUpdate) => {
  try {

    let coll: ICollectionDoc = await Collection.findById(body._id)

    coll.taskCollection = body.taskCollection

    coll.save()

    return true
  } catch (e) {
    return false
  }
}


export const dealteTask: (collectionId: string, taskId: string) => Promise<boolean> = async(collectionId: string, taskId: string) => {
  try {

    let coll: ICollectionDoc = await Collection.findById(collectionId)
    coll.taskCollection.forEach((tasks:ITaskCollection) => {
      // tslint:disable-next-line:no-console
      console.log(tasks.task.length)
      tasks.task.filter(task => task.id !== taskId)
      // tslint:disable-next-line:no-console
      console.log(tasks.task.length)
      // tslint:disable-next-line:no-console
      console.log()
    })

    coll.save()

    return true
  } catch (e) {
    return false
  }
}