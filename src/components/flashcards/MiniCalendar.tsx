"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  calendarData: Record<string, number>;
  dueCount: number;
}

export default function MiniCalendar({ calendarData, dueCount }: Props) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const days = useMemo(() => {
    const result: { date: Date; key: string; count: number; status: "today" | "past" | "overdue" | "future" }[] = [];
    for (let i = -3; i <= 28; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      const count = calendarData[key] || 0;
      let status: "today" | "past" | "overdue" | "future";
      if (i === 0) status = "today";
      else if (i < 0) status = "past";
      else if (count > 0 && i <= 1) status = "overdue";
      else status = "future";

      result.push({ date: d, key, count, status });
    }
    return result;
  }, [today, calendarData]);

  const weekDays = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];
  const monthNames = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-sm">
          {monthNames[today.getMonth()]} {today.getFullYear()}
        </h3>
        <div className="flex items-center gap-1 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="text-gray-500">Bugun</span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300 ml-2" />
          <span className="text-gray-500">Ertaga</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {weekDays.map((d) => (
          <div key={d} className="text-xs text-gray-400 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          let bgColor = "bg-transparent";
          let textColor = "text-gray-400";
          if (day.status === "today") {
            bgColor = "bg-red-400";
            textColor = "text-white";
          } else if (day.status === "past") {
            textColor = "text-gray-300";
          } else if (day.count > 0) {
            if (new Date(day.key) <= new Date(today.getTime() + 86400000)) {
              bgColor = "bg-red-100";
              textColor = "text-red-600";
            } else if (new Date(day.key) <= new Date(today.getTime() + 2 * 86400000)) {
              bgColor = "bg-amber-100";
              textColor = "text-amber-600";
            } else {
              bgColor = "bg-green-100";
              textColor = "text-green-600";
            }
          }

          return (
            <div
              key={day.key}
              className={`text-xs rounded-lg py-1.5 ${bgColor} ${textColor} text-center relative`}
            >
              {day.date.getDate()}
              {day.count > 0 && day.status !== "past" && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                  {day.count > 9 ? "9+" : day.count}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Bugungi takrorlash</span>
          <span className={`font-bold ${dueCount > 0 ? "text-red-500" : "text-green-500"}`}>
            {dueCount} ta so'z
          </span>
        </div>
      </div>
    </div>
  );
}
