export const getRoles = () => {
  const roles = localStorage.getItem("roles");
  return roles ? JSON.parse(roles) : [];
};

export const isAdmin = () => {
  return getRoles().includes("ROLE_ADMIN");
};