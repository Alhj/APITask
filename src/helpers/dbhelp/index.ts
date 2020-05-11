import { IUpdate } from '../../models/interface/respons'
import Collection from '../scheman/collection'

export const updateCollection: (body: IUpdate) => Promise<boolean> = async (body: IUpdate) => {
  try {

    const coll: any = await Collection.findById(body.id)

    coll.collection = body.collection

    coll.save();

    return true
  } catch (e) {
    return false
  }
}