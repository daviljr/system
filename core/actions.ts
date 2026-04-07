export function createAction(type: string, payload?: any) {
  return {
    type,
    payload,
  };
}
