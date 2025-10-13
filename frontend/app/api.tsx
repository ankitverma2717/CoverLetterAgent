let accessToken = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

// Function to update the token in memory and storage
const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    localStorage.setItem('jwt_token', token);
  } else {
    localStorage.removeItem('jwt_token');
  }
};

// Our token refresh function
const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Send the expired token
      },
    });

    if (!response.ok) {
      throw new Error('Could not refresh token');
    }

    const data = await response.json();
    const newAccessToken = data.token;
    setAccessToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    setAccessToken(null); // Logout the user
    window.location.href = '/'; // Or redirect to a login page
    return null;
  }
};

// The main API wrapper function
export const api = async (url: string, options: RequestInit = {}): Promise<Response> => {
  if (!accessToken) {
    // This case happens if the user was never logged in.
    // We could redirect to login here, but for API calls, throwing an error is better.
    throw new Error('User is not authenticated.');
  }

  // First try with the current token
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  // If the token is expired (401), try to refresh and retry
  if (response.status === 401) {
    console.log('Access token expired. Attempting to refresh...');
    const newAccessToken = await refreshToken();

    if (newAccessToken) {
      console.log('Token refreshed successfully. Retrying original request...');
      // Retry the request with the new token
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${newAccessToken}`,
        },
      });
    }
  }

  return response;
};