// pages/credentials.js

import Link from "next/link";

const CredentialsPage = () => {
  const users = [
    {
      id: 1,
      email: "admin@gmail.com",
      password: 123,
      userType: "admin",
      permissions:["Create","Update","Delete"]
    },
    {
      id: 2,
      email: "emp@gmail.com",
      password: 1234,
      userType: "employee",
      permissions:["Create","Update"]
    },
    {
      id: 3,
      email: "customer@gmail.com",
      password: 12345,
      userType: "customer",
      permissions:["Create"]
    },
  ];

  const accessRoles = {
    admin: {
      subject: "manage",
      action: "all"
    },
    customer: {
      permissions: {
        Dashboard: ["read"],
        notes: ["read", "update", "create"]
      }
    },
    employee: {
      permissions: {
        Dashboard: ["read"],
        notes: ["create", "update"]
      }
    }
  };

  return (
    <div className="container">
       
      <h1 className="title">Testing Credentials</h1>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">ID</th>
            <th className="table-header">Email</th>
            <th className="table-header">Password</th>
            <th className="table-header">User Type</th>
            <th className="table-header">Access</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="table-cell">{user.id}</td>
              <td className="table-cell">{user.email}</td>
              <td className="table-cell">{user.password}</td>
              <td className="table-cell">{user.userType}</td>
              <td className="table-cell">
                {user.permissions.map((item)=>
                <p>{item}</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={"/"}>Go Back</Link>
    </div>
  );
};

export default CredentialsPage;
