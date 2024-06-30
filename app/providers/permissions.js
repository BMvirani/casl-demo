import { AbilityBuilder, Ability } from "@casl/ability";
import accessRights from "./access.json";

export default function defineAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user?.role === "admin") {
    can(accessRights.admin.subject, accessRights.admin.action);
  } else if (user?.role === "customer") {
    const customerPermissions = accessRights.customer.permissions;
    // Iterate through each subject and apply corresponding actions
    for (const subject in customerPermissions) {
      if (customerPermissions.hasOwnProperty(subject)) {
        can(customerPermissions[subject], subject);
      }
    }
  } else if (user?.role === "employee") {
    const employeePermissions = accessRights.employee.permissions;
    // Iterate through each subject and apply corresponding actions
    for (const subject in employeePermissions) {
      if (employeePermissions.hasOwnProperty(subject)) {
        can(employeePermissions[subject], subject);
      }
    }
  }
  else if (user?.role === "other") {
    const employeePermissions = accessRights.other.permissions;
    // Iterate through each subject and apply corresponding actions
    for (const subject in employeePermissions) {
      if (employeePermissions.hasOwnProperty(subject)) {
        can(employeePermissions[subject], subject);
      }
    }
  }
  return build();
}
