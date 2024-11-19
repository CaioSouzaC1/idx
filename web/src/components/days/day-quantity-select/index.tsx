import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export default function DayQuantitySelect({
  setValue,
}: {
  setValue: Dispatch<SetStateAction<number>>;
}) {
  return (
    <Select onValueChange={(value) => setValue(Number(value))}>
      <SelectTrigger className="w-20">
        <SelectValue placeholder="7" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7">7</SelectItem>
        <SelectItem value="15">15</SelectItem>
        <SelectItem value="30">30</SelectItem>
        <SelectItem value="60">60</SelectItem>
        <SelectItem value="90">90</SelectItem>
      </SelectContent>
    </Select>
  );
}
