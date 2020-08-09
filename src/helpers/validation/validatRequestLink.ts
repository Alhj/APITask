import requestLink from '../scheman/requestLink'


export const validateInfo:(id:string) => Promise<boolean> = async (id:string) => {

  const findCollection = await requestLink.find({id:id})

  return findCollection.length >= 1
}