import { projectAuth, projectDb } from "src/boot/firebase";
import { ref } from "vue";

const user = ref(projectAuth.currentUser);

projectAuth.onAuthStateChanged((_user) => {
  // console.log("user state change. current user is: ", _user);
  // user.value = _user;

  //User is signed in
  console.log("user state change. current user is: ", _user);
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
