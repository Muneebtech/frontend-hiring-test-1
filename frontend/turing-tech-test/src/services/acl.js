import { VALID_ROUTES_BY_ROLE } from '../components/constants/config/config.dev';

class AclService {
  constructor(role) {
    this.role = role;
    this.userAccess = VALID_ROUTES_BY_ROLE[this.role];
  }

  get redirectUrl() {
    return this.userAccess?.redirectUrl ?? '/not-found';
  }

  get landingPage() {
    return this.userAccess?.landingPage ?? '/not-found';
  }

  hasPermission(path) {
    return this.userAccess?.paths.includes(path);
  }
}

export default AclService;
