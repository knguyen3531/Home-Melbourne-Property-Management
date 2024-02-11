export const fetchTenants = async () => {
    const response = await fetch('/api/tenants', {
      headers: {
        // Include headers as needed, e.g., for authentication
        'Authorization': `Bearer ${yourAuthToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch tenants: ${response.statusText}`);
    }
    return await response.json();
  };
  