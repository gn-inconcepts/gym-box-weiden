import { Activity, Apple, Brain, Check, Dumbbell, HeartPulse, Search, User, Users, Star, Zap, Trophy, Timer } from "lucide-react";

export const iconMap: Record<string, any> = {
    activity: Activity,
    apple: Apple,
    brain: Brain,
    check: Check,
    dumbbell: Dumbbell,
    heartPulse: HeartPulse,
    search: Search,
    user: User,
    users: Users,
    star: Star,
    zap: Zap,
    trophy: Trophy,
    timer: Timer,
};

export function getIcon(name: string) {
    return iconMap[name] || Activity; // Default to Activity if not found
}
