
import { Magazine } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { Timestamp } from "firebase/firestore";

export const exportToCSV = (data: Magazine[], filename: string) => {
  if (data.length === 0) {
    console.error("No data to export");
    return;
  }

  const headers = [
    "title",
    "abstract",
    "author",
    "pdf_link",
    "source",
    "textual_genre",
    "periodical_title",
    "publication_year",
    "createdAt",
    "createdBy",
  ];

  const formatDate = (timestamp: Timestamp | string): string => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleString(); // Convert Firestore Timestamp to local datetime
    }
    return timestamp; // If it's already a string, return as is
  };

  const escapeCSVValue = (value: unknown): string => {
    if (value instanceof Timestamp) {
      return `"${formatDate(value)}"`; // Convert Firestore Timestamp
    }
    if (typeof value === "string") {
      return `"${value.replace(/"/g, '""')}"`; // Escape double quotes
    }
    if (Array.isArray(value)) {
      return `"${value.map((v) => v.replace(/"/g, '""')).join("; ")}"`; // Handle arrays properly
    }
    return value !== undefined && value !== null ? value.toString() : ""; // Convert other types
  };

  const rows = data.map((magazine) =>
    headers.map((header) => escapeCSVValue(magazine[header as keyof Magazine])).join(";")
  );

  const csvContent = [headers.join(";"), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

