import CountStore from "./CountStore";
import UserCredentialStore from "./UserCredentialStore";
import ApplicationStore from "./ApplicationStore";

const countStore = new CountStore();
const userCredentialStore = new UserCredentialStore();
const applicationStore = new ApplicationStore();

export { countStore, userCredentialStore, applicationStore };
