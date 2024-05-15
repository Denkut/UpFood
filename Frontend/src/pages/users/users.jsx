import { useEffect, useState } from "react";
import { ROLE } from "../../constants";
import { PrivateContent } from "../../components";
import { TableRow, UserRow } from "./components";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { checkAccess, request } from "../../utils";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
  const userRole = useSelector(selectUserRole);

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }

    Promise.all([request("api/users"), request("api/users/roles")]).then(
      ([usersRes, rolesRes]) => {
        if (usersRes.error || rolesRes.error) {
          setErrorMessage(usersRes.error || rolesRes.error);
          return;
        }

        setUsers(usersRes.data);
        setRoles(rolesRes.data);
      }
    );
  }, [shouldUpdateUserList, userRole]);

  const onUserRemove = (userId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }

    request(`api/users/${userId}`, "DELETE").then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };

  return (
    <div>
      <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
        <h2 className="mb-10 flex items-center justify-center text-xl font-semibold">
          Пользователи
        </h2>
        <div className=" bg-slate-400">
          <TableRow>
            <div className=" mx-[210px]  min-w-[70px] py-2 font-bold">
              Логин
            </div>
            <div className=" mr-[180px]  min-w-[70px]  font-bold">
              Дата регистрации
            </div>
            <div className="min-w-[50px] font-bold ">Роль</div>
          </TableRow>
          {users.map(({ id, login, registeredAt, roleId }) => (
            <UserRow
              key={id}
              id={id}
              login={login}
              registeredAt={registeredAt}
              roleId={roleId}
              roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
              onUserRemove={() => onUserRemove(id)}
            />
          ))}
        </div>
      </PrivateContent>
    </div>
  );
};
