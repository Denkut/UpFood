export const fetchData = async (resource) => {
  try {
    const response = await fetch(`/api/constants/${resource}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${resource}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${resource}:`, error);
    throw error;
  }
};
