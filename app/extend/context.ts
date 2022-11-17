// app/extend/context.js

let _userInfo: { username: string; id: number };
export default {
  getUser() {
    return _userInfo;
  },
  setUser(userInfo: { username: string; id: number }) {
    _userInfo = userInfo;
  },
};
