import { IUpdate } from '../../models/interface/respons'
import { ICollectionDoc } from '../../models/interface/collection'
import Collection from '../scheman/collection'

export const updateCollection: (body: IUpdate) => Promise<boolean> = async (body: IUpdate) => {
  try {

    let coll: ICollectionDoc = await Collection.findById(body._id)

    // tslint:disable-next-line:no-console
    console.log(body.taskCollection)
  
    coll.taskCollection = body.taskCollection
    
    // tslint:disable-next-line:no-console
    console.log()

    // tslint:disable-next-line:no-console
    console.log(coll)

    coll.save();

    return true
  } catch (e) {
    return false
  }
}