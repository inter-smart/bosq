import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "@/components/utils/custom-image";

export default function CountryFlagSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue className="bg-red-500" >
          <Image
            className="mr-2 h-4 w-4 rounded-sm"
            src="https://flagcdn.com/w20/au.png"
            alt="au"
            title="Australia"
          />
          Australia
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
