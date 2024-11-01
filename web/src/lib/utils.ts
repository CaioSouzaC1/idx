import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createFormData(
  data: any,
  formData = new FormData(),
  parentKey = ""
): FormData {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          createFormData(item, formData, `${newKey}[${index}]`);
        });
      } else {
        createFormData(value, formData, newKey);
      }
    });
  } else if (data !== null && data !== undefined) {
    if (data instanceof Date) {
      formData.append(parentKey, data.toISOString());
    } else if (data instanceof File) {
      formData.append(parentKey, data, data.name);
    } else {
      formData.append(parentKey, String(data));
    }
  }
  return formData;
}
