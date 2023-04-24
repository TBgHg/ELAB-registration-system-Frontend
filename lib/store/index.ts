import CountStore from "./CountStore";
import UserCredentialStore from "./UserCredentialStore";
import ApplicationStore from "./ApplicationStore";
import ElabStore from "./ElabStore";
import SpaceStore from "./SpaceStore";

const countStore = new CountStore();
const userCredentialStore = new UserCredentialStore();
const applicationStore = new ApplicationStore();
const elabStore = new ElabStore();
const spaceStore = new SpaceStore();

export {
  countStore,
  userCredentialStore,
  applicationStore,
  elabStore,
  spaceStore,
};
