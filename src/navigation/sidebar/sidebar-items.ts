import { User, MessageSquare, LayoutDashboard, BookOpen, type LucideIcon } from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "홈",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Pages",
    items: [
      {
        title: "참여자 관리",
        url: "/dashboard/user",
        icon: User,
      },
      {
        title: "대화 기록",
        url: "/dashboard/chat",
        icon: MessageSquare,
      },
      {
        title: "주제문 (Theme)",
        url: "/dashboard/theme",
        icon: BookOpen,
      },
    ],
  },
];
