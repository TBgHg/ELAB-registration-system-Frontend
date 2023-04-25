import { makeAutoObservable } from "mobx";
import type { ImageRequireSource } from "react-native";

interface Navigation {
  pageName: string;
  param: any;
}

type PageType =
  | "post"
  | "wiki"
  | "filesystem"
  | "notification"
  | "favourite"
  | "space"
  | "space-member"
  | "home";

interface PageNavigatorParams {
  type: PageType;
  id: string;
  [key: string]: any;
}

interface PageNavigation extends Navigation {
  param: PageNavigatorParams;
}

interface Carousel {
  imageSource: ImageRequireSource;
  title: string;
  navigation?: Navigation;
}

interface RemindCard {
  type: "deadline";
  content: RemindCardContent;
}

interface RemindCardContent {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  prompt: string;
  description: string;
  [key: string]: any;
}

interface TodayWiki {
  title: string;
  description: string;
  image?: string;
  navigation: WikiNavigation;
}

interface PostNavigatorParams {
  type: "post";
  id: string;
  spaceId: string;
}

interface PostNavigation extends PageNavigation {
  param: PostNavigatorParams;
}

interface FileSystemNavigatorParams extends PageNavigatorParams {
  type: "filesystem";
  /**
   * 文件系统的路径
   */
  id: string;
}

interface FileSystemNavigation extends PageNavigation {
  param: FileSystemNavigatorParams;
}

interface WikiNavigatorParams extends PageNavigatorParams {
  type: "wiki";
  /**
   * Wiki的标题
   */
  id: string;
}

interface WikiNavigation extends PageNavigation {
  param: WikiNavigatorParams;
}

interface DeadlineRemindCardContent extends RemindCardContent {
  deadline: Date;
}

class ElabStore {
  carousels: Carousel[] = [
    {
      title: "来科中，让科研飞起来",
      imageSource: require("../../assets/carousel/1.jpg"),
    },
    {
      title: "计算机设计大赛申报已经截止",
      imageSource: require("../../assets/carousel/2.jpg"),
    },
  ];

  remindCards: RemindCard[] = [
    {
      type: "deadline",
      content: {
        title: "竞赛-2023年计算机设计大赛（校内选拔）",
        prompt: "竞赛申报已经截止",
        backgroundColor: "#015B90",
        textColor: "white",
        description: "请确认您的申报材料准确无误。\n截止时间：2023年4月20日",
      },
    },
    {
      type: "deadline",
      content: {
        title: "项目-科中应用2.0工作组",
        prompt: "上个月您做了4条贡献。",
        backgroundColor: "#6E9B05",
        textColor: "white",
        description: "上一次 GitHub Action 正确运行率为87%。",
      },
    },
  ];

  todayWiki: TodayWiki = {
    title: "Goroutine",
    image: "https://go.dev/images/favicon-gopher.png",
    description:
      "Goroutine是Go语言的并发模型，是Go语言运行时（runtime）管理的轻量级线程。",
    navigation: {
      pageName: "WikiPage",
      param: {
        type: "wiki",
        id: "goroutine",
      },
    },
  };

  get sections() {
    return [
      { section: "carousel", data: this.carousels },
      { section: "remindcards", data: this.remindCards },
      { section: "todaywiki", data: [this.todayWiki] },
    ];
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default ElabStore;

export type {
  Carousel,
  RemindCard,
  RemindCardContent,
  TodayWiki,
  Navigation,
  PageNavigation,
  PageType,
  PageNavigatorParams,
  WikiNavigation,
  WikiNavigatorParams,
  DeadlineRemindCardContent,
  FileSystemNavigation,
  FileSystemNavigatorParams,
  PostNavigation,
  PostNavigatorParams,
};
