/**
 * 대화 단계별 색상 정의
 * 채팅 세션 및 관련 컴포넌트에서 사용되는 스테이지 색상 상수
 */
export const STAGE_COLORS: { [key: string]: { bg: string; text: string } } = {
  introduction: {
    bg: "bg-orange-100 dark:bg-orange-900/50",
    text: "text-orange-800 dark:text-orange-200",
  },
  diagnosis: {
    bg: "bg-red-100 dark:bg-red-900/50",
    text: "text-red-800 dark:text-red-200",
  },
  presentation: {
    bg: "bg-sky-100 dark:bg-sky-900/50",
    text: "text-sky-800 dark:text-sky-200",
  },
  conclusion: {
    bg: "bg-green-100 dark:bg-green-900/50",
    text: "text-green-800 dark:text-green-200",
  },
  default: {
    bg: "bg-gray-200 dark:bg-gray-700",
    text: "text-gray-800 dark:text-gray-200",
  },
};
