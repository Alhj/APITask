import { IUpdate } from '../../models/interface/respons'
import { ICollectionDoc } from '../../models/interface/collection'
import Collection from '../scheman/collection'

export const updateCollection: (body: IUpdate) => Promise<boolean> = async (body: IUpdate) => {
  try {

    const coll: ICollectionDoc = await Collection.findById(body.id)

    coll.taskCollection = body.collection.taskCollection

    coll.save();

    return true
  } catch (e) {
    return false
  }
}