import lodashOmit from 'lodash/omit'

export const omit = <TObject extends Object, Tkeys extends keyof TObject>(
    obj: TObject,
    keys: Tkeys[]
): Omit<TObject, Tkeys> => {
    return lodashOmit(obj, keys)
}