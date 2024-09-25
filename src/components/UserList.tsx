import React from "react";
import { observer } from "mobx-react-lite";
import userStore from "../store/UserStore";

const UserList: React.FC = observer(() => {
  const handleEdit = (userId: number) => {
    const user = userStore.users.find((user) => user.id === userId);
    if (user) {
      userStore.setSelectedUser(user);
    }
  };

  return (
    <ul>
      {userStore.users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.phone})
          <button onClick={() => handleEdit(user.id)}>Tahrirlash</button>
          <button onClick={() => userStore.removeUser(user.id)}>
            O'chirish
          </button>
        </li>
      ))}
    </ul>
  );
});

export default UserList;
