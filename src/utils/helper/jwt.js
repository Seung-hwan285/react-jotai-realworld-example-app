export const getHeaders = (authToken) => {
  const baseHeaders = {
    'Content-Type': 'application/json',
  };
  if (authToken) {
    isJwtToken(authToken);

    baseHeaders.Authorization = `Token ${encodeURIComponent(authToken)}`;
  }
  return baseHeaders;
};

export const isJwtToken = (authToken) => {
  const parts = authToken.split('.');

  if (parts.length !== 3) {
    return false;
  }
  try {
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));

    if (header.alg !== 'HS256' || header.typ !== 'JWT') {
      return false;
    }

    if (!payload.email || !payload.username || !payload.idt || !payload.exp) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};
