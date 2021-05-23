function removeIdAndEmpty(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => key != "id" && value != null)
  );
}

exports.removeIdAndEmpty = removeIdAndEmpty;
