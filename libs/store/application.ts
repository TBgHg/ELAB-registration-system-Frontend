import type { LongTextFormType } from "@/types/application";
import { makeAutoObservable } from "mobx";
import type { RootStore } from ".";

class ApplicationStore {
  rootStore: RootStore;

  longTextFormType: LongTextFormType = "reason";
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setLongTextForm(longTextForm: LongTextFormType) {
    this.longTextFormType = longTextForm;
  }
}

export default ApplicationStore;
