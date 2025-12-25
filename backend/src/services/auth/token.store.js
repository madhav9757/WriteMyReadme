/* -------------------------------------------------------------------------- */
/*                   JWT → GitHub Token Mapping Store                         */
/* -------------------------------------------------------------------------- */

const store = new Map();

/* -------------------------- Production Note ------------------------------ */
/*
  ⚠️ In-memory store is volatile:
      - Will reset on server restart
      - Not shared across instances
  ✅ For real production, replace with Redis or other persistent store.
*/

export const tokenStore = {
  set: (jwtToken, githubToken) => {
    store.set(jwtToken, githubToken);
  },

  get: (jwtToken) => {
    return store.get(jwtToken);
  },

  delete: (jwtToken) => {
    store.delete(jwtToken);
  },

  has: (jwtToken) => {
    return store.has(jwtToken);
  },

  clear: () => {
    store.clear();
  },
};
