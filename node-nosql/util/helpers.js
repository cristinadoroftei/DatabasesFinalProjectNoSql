function removeEmpty(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) => value !== null && value !== undefined
    )
  );
}

function mergeObjWithReqBody(obj, reqBody) {
  Object.entries(reqBody).forEach(([key, _]) => {
    obj[key] = reqBody[key];
  });
}

exports.removeEmpty = removeEmpty;
exports.mergeObjWithReqBody = mergeObjWithReqBody;
