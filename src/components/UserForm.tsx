import React, { useEffect, useState } from "react";
import userStore from "../store/UserStore";
import { observer } from "mobx-react";

const UserForm: React.FC = observer(() => {
  const [name, setName] = useState<string>("");

  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    if (userStore.selectedUser) {
      setName(userStore.selectedUser.name);
      setPhone(userStore.selectedUser.phone);
    } else {
      setName("");
      setPhone("");
    }
  }, [userStore.selectedUser]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userId = userStore.selectedUser
      ? userStore.selectedUser.id
      : Date.now();
    const newUser = {
      id: userId,
      name: name,
      phone: phone,
    };

    if (userStore.selectedUser) {
      userStore.updateUser(newUser);
      userStore.setSelectedUser(null);
    } else {
      userStore.addUser(newUser);
    }

    setName("");

    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Foydalanuvchi ismi"
        required
      />

      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefon raqami"
        required
      />
      <button type="submit">
        {userStore.selectedUser ? "Yangilash" : "Qo'shish"}
      </button>
    </form>
  );
});

export default UserForm;
