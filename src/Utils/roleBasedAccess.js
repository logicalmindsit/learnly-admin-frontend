// Role-based access control utilities

/**
 * Check if user has access to a specific feature/route based on their role
 * @param {string} userRole - Current user's role
 * @param {string[]} allowedRoles - Array of roles that have access
 * @returns {boolean} - Whether user has access
 */
export const hasAccess = (userRole, allowedRoles) => {
  if (!userRole || !allowedRoles) return false;
  return allowedRoles.includes(userRole);
};

/**
 * Role hierarchy for permission checks
 * Higher number = more permissions
 */
export const roleHierarchy = {
  'superadmin': 7,
  'admin': 6,
  'boscontroller': 5,
  'bosmembers': 4,
  'coursecontroller': 3,
  'markettingcontroller': 2,
  'datamaintenance': 1,
};

/**
 * Check if user has minimum role level
 * @param {string} userRole - Current user's role
 * @param {string} minimumRole - Minimum required role
 * @returns {boolean} - Whether user meets minimum role requirement
 */
export const hasMinimumRole = (userRole, minimumRole) => {
  const userLevel = roleHierarchy[userRole] || 0;
  const minimumLevel = roleHierarchy[minimumRole] || 0;
  return userLevel >= minimumLevel;
};

/**
 * Get user-friendly role name
 * @param {string} role - Role key
 * @returns {string} - Formatted role name
 */
export const getRoleDisplayName = (role) => {
  const roleMap = {
    superadmin: "Super Admin",
    admin: "Admin", 
    boscontroller: "BOS Controller",
    bosmembers: "BOS Member",
    datamaintenance: "Data Maintenance",
    coursecontroller: "Course Controller",
    markettingcontroller: "Marketing Controller",
  };
  return roleMap[role] || role;
};

/**
 * Define menu access permissions
 */
export const menuAccessRoles = {
  dashboard: ["superadmin", "admin", "boscontroller", "bosmembers", "datamaintenance", "coursecontroller", "markettingcontroller"],
  adminUsers: ["superadmin"],
  users: ["admin", "superadmin"],
  courses: ["coursecontroller", "admin", "superadmin"],
  bos: ["boscontroller", "bosmembers", "superadmin"],
  dataMaintenance: ["datamaintenance", "superadmin"],
  institutionalBoard: ["superadmin"],
  directMeetManagement: ["superadmin"],
  documentVerification: ["admin", "superadmin"],
  marketing: ["markettingcontroller", "superadmin"],
  certificateMaintenance: ["admin", "superadmin"],
  vote: ["boscontroller", "bosmembers", "superadmin"],
  notifications: ["superadmin", "admin", "boscontroller", "bosmembers", "datamaintenance", "coursecontroller", "markettingcontroller"],
  feedback: ["superadmin", "admin"],
};

/**
 * Check if user can access a specific menu item
 * @param {string} userRole - Current user's role
 * @param {string} menuKey - Menu key to check
 * @returns {boolean} - Whether user can access the menu
 */
export const canAccessMenu = (userRole, menuKey) => {
  const allowedRoles = menuAccessRoles[menuKey];
  return hasAccess(userRole, allowedRoles);
};

/**
 * React hook for role-based rendering
 * @param {string} userRole - Current user's role
 * @param {string[]} allowedRoles - Roles that can see the content
 * @returns {boolean} - Whether to render the component
 */
export const useRoleAccess = (userRole, allowedRoles) => {
  return hasAccess(userRole, allowedRoles);
};

/**
 * Higher-order component for role-based access control
 * @param {React.Component} WrappedComponent - Component to wrap
 * @param {string[]} allowedRoles - Roles that can access the component
 * @returns {React.Component} - Wrapped component with access control
 */
export const withRoleAccess = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const userRole = localStorage.getItem("role");
    
    if (!hasAccess(userRole, allowedRoles)) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          color: '#ef4444',
          fontSize: '1.2rem'
        }}>
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>
            Required roles: {allowedRoles.map(role => getRoleDisplayName(role)).join(', ')}
          </p>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Your role: {getRoleDisplayName(userRole)}
          </p>
        </div>
      );
    }
    
    return <WrappedComponent {...props} />;
  };
};

// All available roles in the system
export const allRoles = [
  "superadmin",
  "admin", 
  "boscontroller",
  "bosmembers",
  "datamaintenance",
  "coursecontroller",
  "markettingcontroller",
];
