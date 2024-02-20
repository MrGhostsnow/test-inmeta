function reduceDescription(description: string) {
    const limit = 500;
    if (description.length <= limit) {
      return description;
    } else {
      const ReduceDescription = description.substring(0, limit) + "...";
      return ReduceDescription;
    }
  }

  export default reduceDescription