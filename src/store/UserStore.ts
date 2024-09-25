import { makeAutoObservable } from "mobx";

interface User {
  id: number;
  name: string;

  phone: string;
}

class UserStore {
  users: User[] = [];
  selectedUser: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addUser(user: User) {
    this.users.push(user);
  }

  removeUser(userId: number) {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  setSelectedUser(user: User | null) {
    this.selectedUser = user;
  }
}

const userStore = new UserStore();
export default userStore;
