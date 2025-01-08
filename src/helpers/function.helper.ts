export const isFulfilled = (type: string) => type.endsWith('/fulfilled');

export const isRejected = (type: string) => type.endsWith('/rejected');