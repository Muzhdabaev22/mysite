import lodashPick from 'lodash/pick'

export const pick = <TObject extends Object, Tkeys extends keyof TObject>(
    obj: TObject,
    keys: Tkeys[]
): Pick<TObject, Tkeys> => {
    return lodashPick(obj, keys)
}