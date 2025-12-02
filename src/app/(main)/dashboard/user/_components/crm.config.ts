/* eslint-disable max-lines */

import { ChartConfig } from "@/components/ui/chart";

export const leadsChartData = [
  { date: "1-5", newLeads: 120, disqualified: 40 },
  { date: "6-10", newLeads: 95, disqualified: 30 },
  { date: "11-15", newLeads: 60, disqualified: 22 },
  { date: "16-20", newLeads: 100, disqualified: 35 },
  { date: "21-25", newLeads: 150, disqualified: 70 },
  { date: "26-30", newLeads: 110, disqualified: 60 },
];

export const leadsChartConfig = {
  newLeads: {
    label: "New Leads",
    color: "var(--chart-1)",
  },
  disqualified: {
    label: "Disqualified",
    color: "var(--chart-3)",
  },
  background: {
    color: "var(--primary)",
  },
} as ChartConfig;

export const proposalsChartData = [
  { date: "1-5", proposalsSent: 9 },
  { date: "6-10", proposalsSent: 16 },
  { date: "11-15", proposalsSent: 6 },
  { date: "16-20", proposalsSent: 18 },
  { date: "21-25", proposalsSent: 11 },
  { date: "26-30", proposalsSent: 14 },
];

export const proposalsChartConfig = {
  proposalsSent: {
    label: "Proposals Sent",
    color: "var(--chart-1)",
  },
} as ChartConfig;

export const revenueChartData = [
  { month: "Jul 2024", revenue: 6700 },
  { month: "Aug 2024", revenue: 7100 },
  { month: "Sep 2024", revenue: 6850 },
  { month: "Oct 2024", revenue: 7500 },
  { month: "Nov 2024", revenue: 8000 },
  { month: "Dec 2024", revenue: 8300 },
  { month: "Jan 2025", revenue: 7900 },
  { month: "Feb 2025", revenue: 8400 },
  { month: "Mar 2025", revenue: 8950 },
  { month: "Apr 2025", revenue: 9700 },
  { month: "May 2025", revenue: 11200 },
  { month: "Jun 2025", revenue: 9500 },
];

export const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} as ChartConfig;

export const leadsBySourceChartData = [
  { source: "website", leads: 170, fill: "var(--color-website)" },
  { source: "referral", leads: 105, fill: "var(--color-referral)" },
  { source: "social", leads: 90, fill: "var(--color-social)" },
  { source: "cold", leads: 62, fill: "var(--color-cold)" },
  { source: "other", leads: 48, fill: "var(--color-other)" },
];

export const leadsBySourceChartConfig = {
  leads: {
    label: "Leads",
  },
  website: {
    label: "Website",
    color: "var(--chart-1)",
  },
  referral: {
    label: "Referral",
    color: "var(--chart-2)",
  },
  social: {
    label: "Social Media",
    color: "var(--chart-3)",
  },
  cold: {
    label: "Cold Outreach",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} as ChartConfig;

export const projectRevenueChartData = [
  { name: "MVP Development", actual: 82000, target: 90000 },
  { name: "Consultation", actual: 48000, target: 65000 },
  { name: "Framer Sites", actual: 34000, target: 45000 },
  { name: "DevOps Support", actual: 77000, target: 90000 },
  { name: "LLM Training", actual: 68000, target: 80000 },
  { name: "Product Launch", actual: 52000, target: 70000 },
].map((row) => ({
  ...row,
  remaining: Math.max(0, row.target - row.actual),
}));

export const projectRevenueChartConfig = {
  actual: {
    label: "Actual",
    color: "var(--chart-1)",
  },
  remaining: {
    label: "Remaining",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--primary-foreground)",
  },
} as ChartConfig;

export const salesPipelineChartData = [
  { stage: "Leads", value: 680, fill: "var(--chart-1)" },
  { stage: "Qualified", value: 480, fill: "var(--chart-2)" },
  { stage: "Proposal Sent", value: 210, fill: "var(--chart-3)" },
  { stage: "Negotiation", value: 120, fill: "var(--chart-4)" },
  { stage: "Won", value: 45, fill: "var(--chart-5)" },
];

export const salesPipelineChartConfig = {
  value: {
    label: "Leads",
    color: "var(--chart-1)",
  },
  stage: {
    label: "Stage",
  },
} as ChartConfig;

export const regionSalesData = [
  {
    region: "North America",
    sales: 37800,
    percentage: 31,
    growth: "-3.2%",
    isPositive: false,
  },
  {
    region: "Europe",
    sales: 40100,
    percentage: 34,
    growth: "+9.4%",
    isPositive: true,
  },
  {
    region: "Asia Pacific",
    sales: 30950,
    percentage: 26,
    growth: "+12.8%",
    isPositive: true,
  },
  {
    region: "Latin America",
    sales: 12200,
    percentage: 7,
    growth: "-1.7%",
    isPositive: false,
  },
  {
    region: "Middle East & Africa",
    sales: 2450,
    percentage: 2,
    growth: "+6.0%",
    isPositive: true,
  },
];

export const actionItems = [
  {
    id: 1,
    title: "Send kickoff docs",
    desc: "Send onboarding documents and timeline",
    due: "Due today",
    priority: "High",
    priorityColor: "bg-red-100 text-red-700",
    checked: false,
  },
  {
    id: 2,
    title: "Demo call for SaaS MVP",
    desc: "Book Zoom call with client",
    due: "Due tomorrow",
    priority: "Medium",
    priorityColor: "bg-yellow-100 text-yellow-700",
    checked: true,
  },
  {
    id: 3,
    title: "Update case study",
    desc: "Add latest LLM project",
    due: "Due this week",
    priority: "Low",
    priorityColor: "bg-green-100 text-green-700",
    checked: false,
  },
];

export const conversationData = [
  { id: "IG-P1-S1",  participant_id: "IG-P1",  status: "diagnosis",   theme: "수용의 마음가짐",      message_count: 12, completed: false, last_activity: "30m ago" },
  { id: "IG-P2-S1",  participant_id: "IG-P2",  status: "exploration", theme: "관계 속 갈등 완화",    message_count: 18, completed: false, last_activity: "1h ago" },
  { id: "IG-P3-S1",  participant_id: "IG-P3",  status: "planning",    theme: "자기이해 증진",        message_count: 9,  completed: true,  last_activity: "2h ago" },
  { id: "IG-P4-S1",  participant_id: "IG-P4",  status: "diagnosis",   theme: "감정 조절 연습",       message_count: 21, completed: false, last_activity: "10m ago" },
  { id: "IG-P5-S1",  participant_id: "IG-P5",  status: "reflection",  theme: "동기 강화",            message_count: 14, completed: true,  last_activity: "1d ago" },
  { id: "IG-P6-S1",  participant_id: "IG-P6",  status: "diagnosis",   theme: "완벽주의 다루기",      message_count: 7,  completed: false, last_activity: "15m ago" },
  { id: "IG-P7-S1",  participant_id: "IG-P7",  status: "exploration", theme: "습관 형성",            message_count: 20, completed: false, last_activity: "3h ago" },
  { id: "IG-P8-S1",  participant_id: "IG-P8",  status: "planning",    theme: "마음 챙김",            message_count: 16, completed: true,  last_activity: "5h ago" },
  { id: "IG-P9-S1",  participant_id: "IG-P9",  status: "diagnosis",   theme: "불안 다루기",          message_count: 11, completed: false, last_activity: "8m ago" },
  { id: "IG-P10-S1", participant_id: "IG-P10", status: "reflection",  theme: "자존감 강화",          message_count: 22, completed: true,  last_activity: "3d ago" },

  { id: "IG-P11-S1", participant_id: "IG-P11", status: "diagnosis",   theme: "수용의 마음가짐",      message_count: 13, completed: false, last_activity: "45m ago" },
  { id: "IG-P12-S1", participant_id: "IG-P12", status: "exploration", theme: "감정 조절 연습",       message_count: 19, completed: false, last_activity: "2h ago" },
  { id: "IG-P13-S1", participant_id: "IG-P13", status: "planning",    theme: "관계 속 갈등 완화",    message_count: 8,  completed: true,  last_activity: "6h ago" },
  { id: "IG-P14-S1", participant_id: "IG-P14", status: "reflection",  theme: "자기이해 증진",        message_count: 17, completed: true,  last_activity: "4d ago" },
  { id: "IG-P15-S1", participant_id: "IG-P15", status: "diagnosis",   theme: "습관 형성",            message_count: 10, completed: false, last_activity: "20m ago" },
  { id: "IG-P16-S1", participant_id: "IG-P16", status: "planning",    theme: "마음 챙김",            message_count: 23, completed: false, last_activity: "1h ago" },
  { id: "IG-P17-S1", participant_id: "IG-P17", status: "exploration", theme: "불안 다루기",          message_count: 12, completed: true,  last_activity: "1d ago" },
  { id: "IG-P18-S1", participant_id: "IG-P18", status: "diagnosis",   theme: "자존감 강화",          message_count: 15, completed: false, last_activity: "40m ago" },
  { id: "IG-P19-S1", participant_id: "IG-P19", status: "exploration", theme: "완벽주의 다루기",      message_count: 9,  completed: false, last_activity: "12m ago" },
  { id: "IG-P20-S1", participant_id: "IG-P20", status: "planning",    theme: "동기 강화",            message_count: 14, completed: true,  last_activity: "10h ago" },

  { id: "IG-P21-S1", participant_id: "IG-P21", status: "diagnosis",   theme: "수용의 마음가짐",      message_count: 18, completed: false, last_activity: "3h ago" },
  { id: "IG-P22-S1", participant_id: "IG-P22", status: "exploration", theme: "감정 조절 연습",       message_count: 21, completed: true,  last_activity: "7h ago" },
  { id: "IG-P23-S1", participant_id: "IG-P23", status: "planning",  theme: "관계 속 갈등 완화",    message_count: 11, completed: false, last_activity: "25m ago" },
  { id: "IG-P24-S1", participant_id: "IG-P24", status: "reflection",  theme: "자기이해 증진",        message_count: 20, completed: true,  last_activity: "2d ago" },
  { id: "IG-P25-S1", participant_id: "IG-P25", status: "diagnosis",   theme: "습관 형성",            message_count: 7,  completed: false, last_activity: "50m ago" },
  { id: "IG-P26-S1", participant_id: "IG-P26", status: "exploration", theme: "마음 챙김",            message_count: 16, completed: false, last_activity: "4h ago" },
  { id: "IG-P27-S1", participant_id: "IG-P27", status: "planning",    theme: "불안 다루기",          message_count: 22, completed: true,  last_activity: "3h ago" },
  { id: "IG-P28-S1", participant_id: "IG-P28", status: "diagnosis",   theme: "자존감 강화",          message_count: 19, completed: false, last_activity: "35m ago" },
  { id: "IG-P29-S1", participant_id: "IG-P29", status: "exploration", theme: "완벽주의 다루기",      message_count: 14, completed: false, last_activity: "15m ago" },
  { id: "IG-P30-S1", participant_id: "IG-P30", status: "reflection",  theme: "동기 강화",            message_count: 9,  completed: true,  last_activity: "6d ago" },

  { id: "IG-P31-S1", participant_id: "IG-P31", status: "diagnosis",   theme: "수용의 마음가짐",      message_count: 13, completed: false, last_activity: "1h ago" },
  { id: "IG-P32-S1", participant_id: "IG-P32", status: "planning",    theme: "감정 조절 연습",       message_count: 23, completed: true,  last_activity: "9h ago" },
  { id: "IG-P33-S1", participant_id: "IG-P33", status: "exploration", theme: "관계 속 갈등 완화",    message_count: 12, completed: false, last_activity: "45m ago" },
  { id: "IG-P34-S1", participant_id: "IG-P34", status: "diagnosis",   theme: "자기이해 증진",        message_count: 8,  completed: false, last_activity: "5m ago" },
  { id: "IG-P35-S1", participant_id: "IG-P35", status: "planning",    theme: "습관 형성",            message_count: 18, completed: true,  last_activity: "2h ago" },
  { id: "IG-P36-S1", participant_id: "IG-P36", status: "exploration", theme: "마음 챙김",            message_count: 20, completed: false, last_activity: "3d ago" },
  { id: "IG-P37-S1", participant_id: "IG-P37", status: "diagnosis",   theme: "불안 다루기",          message_count: 10, completed: false, last_activity: "55m ago" },
  { id: "IG-P38-S1", participant_id: "IG-P38", status: "reflection",  theme: "자존감 강화",          message_count: 22, completed: true,  last_activity: "8h ago" },
  { id: "IG-P39-S1", participant_id: "IG-P39", status: "diagnosis",   theme: "완벽주의 다루기",      message_count: 17, completed: false, last_activity: "14m ago" },
  { id: "IG-P40-S1", participant_id: "IG-P40", status: "exploration", theme: "동기 강화",            message_count: 11, completed: true,  last_activity: "10d ago" },

  { id: "IG-P41-S1", participant_id: "IG-P41", status: "planning",    theme: "수용의 마음가짐",      message_count: 14, completed: true,  last_activity: "6h ago" },
  { id: "IG-P42-S1", participant_id: "IG-P42", status: "diagnosis",   theme: "감정 조절 연습",       message_count: 18, completed: false, last_activity: "30m ago" },
  { id: "IG-P43-S1", participant_id: "IG-P43", status: "exploration", theme: "관계 속 갈등 완화",    message_count: 9,  completed: false, last_activity: "3h ago" },
  { id: "IG-P44-S1", participant_id: "IG-P44", status: "reflection",  theme: "자기이해 증진",        message_count: 16, completed: true,  last_activity: "12h ago" },
  { id: "IG-P45-S1", participant_id: "IG-P45", status: "diagnosis",   theme: "습관 형성",            message_count: 7,  completed: false, last_activity: "18m ago" },
  { id: "IG-P46-S1", participant_id: "IG-P46", status: "planning",    theme: "마음 챙김",            message_count: 21, completed: true,  last_activity: "1d ago" },
  { id: "IG-P47-S1", participant_id: "IG-P47", status: "exploration", theme: "불안 다루기",          message_count: 20, completed: false, last_activity: "4m ago" },
  { id: "IG-P48-S1", participant_id: "IG-P48", status: "diagnosis",   theme: "자존감 강화",          message_count: 12, completed: false, last_activity: "7m ago" },
  { id: "IG-P49-S1", participant_id: "IG-P49", status: "planning",    theme: "완벽주의 다루기",      message_count: 17, completed: true,  last_activity: "3h ago" },
  { id: "IG-P50-S1", participant_id: "IG-P50", status: "reflection",  theme: "동기 강화",            message_count: 23, completed: true,  last_activity: "15d ago" },
];
