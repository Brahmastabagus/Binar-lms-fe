const choosePriority = (priority) => {
  switch (priority) {
    case "high":
      priority = "danger"
      break;

    case "medium":
      priority = "info"
      break;

    case "low":
      priority = "warning"
      break;

    default:
      priority = "light"
      break;
  }

  return priority
}

export default choosePriority