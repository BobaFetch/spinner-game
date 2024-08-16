function spin() {
  // all slices have been picked
  if (oldpick.length === data.length) {
    container.on("click", null);
    return;
  }
}
