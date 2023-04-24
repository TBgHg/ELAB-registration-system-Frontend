import { makeAutoObservable } from "mobx";
import type { PageNavigatorParams, PageType } from "./ElabStore";
import uuid from "react-native-uuid";

interface User {
  name: string;
  avatar: string;
}

interface Notification {
  id: string;
  title: string;
  content: string;
}

interface Favourite {
  title: string;
  description: string;
  navigation: PageNavigatorParams;
}

interface Wiki {
  id: string;
  title: string;
  description: string;
  content: string;
  lastModifiedUser: User;
  lastModifiedTime: Date;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: Date;
}

interface Comment {
  id: string;
  postId: string;
  content: string;
  author: User;
  createdAt: Date;
}

interface Space {
  id: string;
  title: string;
  description: string;
  members: User[];
  posts: Post[];
  comments: Comment[];
  icon: string;
  deadline?: boolean;
  color: string;
}

class SpaceStore {
  currentPage: PageType = "home";
  setCurrentPage(currentPage: PageType) {
    this.currentPage = currentPage;
  }

  canGoBack = false;
  setCanGoBack(canGoBack: boolean) {
    this.canGoBack = canGoBack;
  }

  get pageTypeTranslate() {
    switch (this.currentPage) {
      case "home":
        return this.spaces.length.toString() + "个空间";
      case "notification":
        return "左右滑通知可处理";
      case "favourite":
        return "点击即可快速进入";
      case "space":
        return "空间";
      case "space-member":
        return "空间成员";
      case "post":
        return "帖子";
      case "wiki":
        return "知识库";
      case "filesystem":
        return "文件系统";
      default:
        return "";
    }
  }

  notifications: Notification[] = [
    {
      id: "1",
      title: "科中警告",
      content:
        "因被发现违规操作电烙铁，您已被赋予科中警告1次，累计三次将会被劝退，请您知晓。",
    },
    {
      id: "2",
      title: "科中2023年毕业视频制作",
      content:
        "科中2023年毕业视频制作工作即将开始，还请您抽出时间与我们联系进行采访，感谢您的支持与配合。",
    },
  ];

  removeNotifications(id: string) {
    this.notifications = this.notifications.filter((item) => item.id !== id);
  }

  currentSpaceId: string = "";
  setCurrentSpaceId(id: string) {
    this.currentSpaceId = id;
  }

  favourites: Favourite[] = [
    {
      title: "goroutine",
      description: "goroutine是Go语言的并发模型",
      navigation: {
        type: "wiki",
        id: "goroutine",
        title: "goroutine",
      },
    },
    {
      title: "加油，冲击国赛！",
      description: "加油，冲击国赛！",
      navigation: {
        type: "post",
        id: "e7508e96-ef29-4d4a-bb9c-e38a38d64133",
        spaceId: "b4a21291-4049-4f5f-b741-c5e6f84e5366",
      },
    },
  ];

  spaces: Space[] = [
    {
      id: "779d2164-e7d0-433a-8e64-a37ca18a0d75",
      title: "科中应用2.0项目组",
      description: "科中应用2.0项目组，用于面向科中成员的创新平台管理。",
      icon: "checkmark-square-2-outline",
      color: "#3366FF",
      members: [
        {
          name: "金一",
          avatar:
            "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
        },
        {
          name: "孙连健",
          avatar: "https://gravatar.loli.net/avatar",
        },
      ],
      posts: [
        {
          id: "84940bab-795c-4a6b-8282-9dfbf1107679",
          title: "项目-科中2.0建设指南",
          content: `Build simple, secure, scalable systems with Go
          An open-source programming language supported by Google
          Easy to learn and great for teams
          Built-in concurrency and a robust standard library
          Large ecosystem of partners, communities, and tools`,
          author: {
            name: "金一",
            avatar:
              "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
          },
          createdAt: new Date("2022-05-12T23:50:21.817Z"),
        },
        {
          id: "84940bab-795c-4a6b-8282-9d4e62107679",
          title: "Golang使用",
          content: `Build simple, secure, scalable systems with Go
          An open-source programming language supported by Google
          Easy to learn and great for teams
          Built-in concurrency and a robust standard library
          Large ecosystem of partners, communities, and tools`,
          author: {
            name: "金一",
            avatar:
              "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
          },
          createdAt: new Date("2022-05-12T23:50:21.817Z"),
        },
      ],
      comments: [
        {
          id: "2352a010-3429-4b79-8eb5-0e33724b44c2",
          postId: "84940bab-795c-4a6b-8282-9dfbf1107679",
          content: "我依旧在怀疑，我能否担任这个职位。",
          author: {
            name: "金一",
            avatar:
              "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
          },
          createdAt: new Date("2022-06-12T23:50:21.817Z"),
        },
      ],
    },
    {
      id: "b4a21291-4049-4f5f-b741-c5e6f84e5366",
      title: "竞赛-计算机设计大赛（校内选拔赛）",
      description: "计算机设计大赛的校内选拔赛用项目。",
      icon: "checkmark-square-2-outline",
      color: "#FFA202",
      members: [
        {
          name: "金一",
          avatar:
            "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
        },
      ],
      comments: [
        {
          id: "04d819eb-eeb2-47b3-ad70-64dfb26011d1",
          postId: "e7508e96-ef29-4d4a-bb9c-e38a38d64133",
          content: "加油，冲击国赛！",
          author: {
            name: "金一",
            avatar:
              "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
          },
          createdAt: new Date("2022-06-12T23:50:21.817Z"),
        },
      ],
      posts: [
        {
          id: "e7508e96-ef29-4d4a-bb9c-e38a38d64133",
          title: "计算机设计大赛冲呀！",
          content: "Ahead Against Fate.",
          author: {
            name: "金一",
            avatar:
              "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
          },
          createdAt: new Date("2022-05-12T23:50:21.817Z"),
        },
      ],
    },
  ];

  createSpace(title: string, description: string) {
    this.spaces.push({
      id: uuid.v4() as string,
      title,
      description,
      posts: [],
      comments: [],
      color: "black",
      icon: "arrow-back-outline",
      members: [
        {
          name: "金一",
          avatar:
            "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
        },
      ],
    });
  }

  createPost(spaceId: string, title: string, content: string) {
    const spaceIndex = this.spaces.findIndex((value) => value.id === spaceId);
    if (spaceIndex === -1) {
      return;
    }
    console.log(`before: ${this.spaces[spaceIndex].posts.length}`);

    this.spaces[spaceIndex].posts.push({
      id: uuid.v4() as string,
      title,
      content,
      author: {
        name: "金一",
        avatar:
          "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
      },
      createdAt: new Date(),
    });

    console.log(`after: ${this.spaces[spaceIndex].posts.length}`);
  }

  wikis: Wiki[] = [
    {
      id: "goroutine",
      title: "Goroutine",
      description: "Goroutine是Go语言的并发模型，是Go语言的核心特性之一。",
      content:
        "Goroutine是**Go语言**的并发模型，是Go语言的核心特性之一，它是一种轻量级的线程，由Go运行时管理。<br>Go运行时会为每个Goroutine分配2KB的栈空间，Goroutine之间通过channel进行通信。",
      lastModifiedUser: {
        name: "金一",
        avatar:
          "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
      },
      lastModifiedTime: new Date("2020-05-12T23:50:21.817Z"),
    },
    {
      id: "async",
      title: "异步",
      description:
        "异步指的是两个或两个以上的对象或事件不同时存在或发生（或多个相关事物的发生无需等待其前一事物的完成）",
      content:
        "异步指两个或两个以上的对象或事件不同时存在或发生（或多个相关事物的发生无需等待其前一事物的完成）。 在计算机技术中，`异步`一词被用于两大语境。 异步通信是一种在双方或多方之间交换消息的方式。 其中每个参与方各自在他们方便或可操作的情况下接收并处理消息，而不是在收到消息后立即进行处理。",
      lastModifiedUser: {
        name: "金一",
        avatar:
          "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
      },
      lastModifiedTime: new Date("2020-05-30T23:50:21.817Z"),
    },
  ];

  createComment(postId: string, spaceId: string, comment: string) {
    // 定位space和post
    const spaceIndex = this.spaces.findIndex((value) => value.id === spaceId);
    if (spaceIndex === -1) {
      return;
    }
    const space = this.spaces[spaceIndex];
    const post = space.posts.findIndex((value) => value.id === postId);
    if (post === undefined) {
      return;
    }
    const commentId = uuid.v4() as string;
    this.spaces[spaceIndex].comments.push({
      id: commentId,
      postId,
      content: comment,
      author: {
        name: "金一",
        avatar:
          "https://gravatar.loli.net/avatar/5e8b9843628fdb52e06d0667a568cfcasiz",
      },
      createdAt: new Date(),
    });
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default SpaceStore;
export type { Space, Comment, Post, Wiki, Favourite, User };
