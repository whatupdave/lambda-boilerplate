
export function handler(params, context) {
  if (!params ||
      !params.arg1) {
    return context.done(null, "invalid request: " + JSON.stringify(params))
  }

  console.log('Hello', params.arg1)
}
