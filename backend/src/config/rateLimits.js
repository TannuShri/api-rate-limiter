
const RATE_LIMITS = {
  FREE: {
    "/api/test": { limit: 10, window: 60 },
    "/api/auth": { limit: 20, window: 60 },
    "/api/admin": { limit: 5, window: 60 }
  },
  PRO: {
    "/api/test": { limit: 100, window: 60 },
    "/api/auth": { limit: 200, window: 60 },
    "/api/admin": { limit: 50, window: 60 }
  }
};

export default RATE_LIMITS;
