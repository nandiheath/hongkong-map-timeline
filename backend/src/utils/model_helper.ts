/**
 * Helper function to remove the important fields
 * @param fieldsToHide: string[]
 */
export function jsonTransform(fieldsToHide: string[], modifier?: Function): (doc: object, ret: object) => object {
  return (doc: any, ret: any) => {
    ret.id = doc.id;
    delete ret._id;
    delete ret.__v;
    delete ret.created_at;
    delete ret.updated_at;
    for (const field of fieldsToHide) {
      delete ret[field];
    }

    if (modifier) {
      return modifier(ret);
    }

    return ret;
  };
}
