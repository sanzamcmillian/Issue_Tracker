export const statusLabels = (status) => {
  switch (status) {
    case "in_progress":
      return "In Progress";
    case "open":
      return "Open";
    case "closed":
      return "Closed";
    default:
      return status;
  }
};
