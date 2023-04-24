// 科中申请的仓库，里面应该包含：
// 1. 申请状态: "unsubmitted" | "submitted" | "seats_selected" | "checked_in"
//   1.1. unsubmitted: 未提交表单
//   1.2. submitted: 已提交表单，未选择座位
//   1.3. seats_elected: 已选择座位，并应该生成签到码
//   1.4. checked_in: 已签到，等待申请结果
// 2. 申请表单：包括姓名、学号、学部院系、联系方式、长文申请理由（此处应该有一个StackNavigator）、申请组别、提交时间
//   2.1 name: 姓名
//   2.2 student_id: 学号
//   2.3 department: 学部院系
//   2.4 contact: 联系方式
//   2.5 long_text_description: 长文申请理由，包含
//     2.5.1 description: 申请理由

import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";

// 3. 座位选择：包括座位识别ID，通过座位ID获取场次ID与座位号，通过场次ID获取时间与组别
// 4. 签到码：签到码应该是一个QR Code（二维码），二维码内容是包含座位信息与个人信息的JSON字符串，附带RSA4096+SHA256签名
// 5. 签到结果：签到结果就是签到结果（bu

type Status =
  | "loading"
  | "unsubmitted"
  | "submitted"
  | "seats_selected"
  | "checked_in";

type Group = "电子组" | "软件组";

interface Form {
  name?: string;
  studentId?: string;
  // department应该是dlutFaculties中的一个
  department?: string;
  contact?: string;
  group?: Group;
  longText: {
    reason?: string;
    experience?: string;
    selfEvaluation?: string;
  };
}

interface Room {
  id: string;
  name: string;
  time: string;
  capacity: number;
  place: string;
  currentOccupancy: number;
}

interface SelectedRoom extends Room {
  seatNumber: number;
}

function getLongTextTranslate(key: keyof ApplicationStore["form"]["longText"]) {
  switch (key) {
    case "reason":
      return { title: "申请理由", description: "你为什么要加入科中？" };
    case "experience":
      return {
        title: "个人获奖与社会经历",
        description:
          "你的个人获奖与社会经历。例如：中学五大竞赛奖项、学生组织或社团任职情况",
      };
    case "selfEvaluation":
      return {
        title: "自我评价",
        description: '你是如何认识自己的？请不要简单写如"我很好"之类的话。',
      };
    default:
      throw new Error("Invalid key");
  }
}

class ApplicationStore {
  status: Status = "unsubmitted";

  loading: boolean = true;

  form: Form = {
    name: "",
    studentId: "",
    department: "电子信息与电气工程学部",
    contact: "",
    group: "电子组",
    longText: {
      reason: "",
      experience: "",
      selfEvaluation: "",
    },
  };

  rooms: Room[] = [
    {
      id: "elab-soft-0",
      name: "9月17日下午第1组",
      time: "2021-09-17 13:00",
      place: "海映(电气)楼302",
      capacity: 10,
      currentOccupancy: 10,
    },
    {
      id: "elab-soft-1",
      name: "软件组9月17日下午第1组",
      time: "2021-09-17 13:00",
      capacity: 10,
      place: "海映(电气)楼303",
      currentOccupancy: 3,
    },
    {
      id: "elab-soft-1",
      name: "软件组9月17日下午第1组",
      time: "2021-09-17 23:00",
      capacity: 10,
      place: "海映(电气)楼304",
      currentOccupancy: 3,
    },
  ];

  roomLoading: boolean = false;

  selectedRoom: SelectedRoom | null = null;

  get isFormLocked() {
    return this.selectedRoom !== null;
  }

  deadline: Date = new Date("2023-04-25T23:59:59.999Z");

  setDeadline(date: Date) {
    this.deadline = date;
  }

  setSelectedRoom(room: SelectedRoom) {
    this.selectedRoom = room;
  }

  saveSelectedRoom() {
    AsyncStorage.setItem(
      "temp_selected_room",
      JSON.stringify(this.selectedRoom)
    ).catch((err) => {
      console.error(err);
    });
  }

  async loadSelectedRoom() {
    await AsyncStorage.getItem("temp_selected_room").then((value) => {
      if (value !== null) {
        this.setSelectedRoom(JSON.parse(value));
      }
    });
  }

  toggleRoomLoading(loading: boolean) {
    this.roomLoading = loading;
  }

  async refreshRooms() {
    this.toggleRoomLoading(true);
    setTimeout(() => {
      this.toggleRoomLoading(false);
    }, 2000);
  }

  get isFormValid() {
    // 检测是否有空值
    for (const key in this.form) {
      if (this.form[key] === "") {
        return false;
      }
    }
    for (const key in this.form.longText) {
      if (this.form.longText[key] === "") {
        return false;
      }
    }
    if (
      this.form.contact?.length !== 11 ||
      this.form.studentId?.length !== 11
    ) {
      return false;
    }
    return true;
  }

  setStatus(status: Status) {
    this.status = status;
  }

  saveStatus() {
    AsyncStorage.setItem("temp_status", this.status).catch((err) => {
      console.error(err);
    });
  }

  async loadStatus() {
    await AsyncStorage.getItem("temp_status")
      .then((value) => {
        console.log(value);
        if (value !== null && value !== "loading") {
          this.setStatus(value as any);
        } else {
          this.setStatus("unsubmitted");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  clearStatus() {
    this.setStatus("unsubmitted");
    AsyncStorage.removeItem("temp_status").catch((err) => {
      console.error(err);
    });
  }

  setForm(form: {
    name: string;
    studentId: string;
    // department应该是dlutFaculties中的一个
    department: string;
    contact: string;
    group: Group;
  }) {
    this.form = Object.assign(this.form, form);
  }

  setLongText(longText: {
    reason?: string;
    experience?: string;
    selfEvaluation?: string;
  }) {
    this.form.longText = Object.assign(this.form.longText, longText);
  }

  saveForm() {
    AsyncStorage.setItem("temp_form", JSON.stringify(this.form)).catch(
      (err) => {
        console.error(err);
      }
    );
  }

  async loadForm() {
    await AsyncStorage.getItem("temp_form")
      .then((value) => {
        if (value !== null) {
          this.setForm(JSON.parse(value));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setText(
    key: "name" | "student_id" | "department" | "contact",
    value: string
  ) {
    this[key] = value;
  }

  toggleLoading(targetLoading?: boolean) {
    if (targetLoading !== undefined) {
      this.loading = targetLoading;
    } else {
      this.loading = !this.loading;
    }
  }

  constructor() {
    makeAutoObservable(this);
    this.setStatus("loading");
    Promise.all([
      this.loadStatus(),
      this.loadForm(),
      this.loadSelectedRoom(),
    ]).catch((err) => {
      console.error(err);
    });
  }
}

export default ApplicationStore;
export { getLongTextTranslate, type Room, type SelectedRoom, type Group };
