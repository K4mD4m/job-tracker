"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export default function SearchFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search */}
      <Input
        type="text"
        placeholder="Search by company or position..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full md:w-1/2"
      />

      {/* Select */}
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full md:w-52 cursor-pointer">
          {/* If statusFilter empty- show 'Filter by status' */}
          <SelectValue>{statusFilter || "Filter by status"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {/* 'All' - no filter */}
          <SelectItem value="all" className="cursor-pointer">
            All
          </SelectItem>
          <SelectItem value="applied" className="cursor-pointer">
            Applied
          </SelectItem>
          <SelectItem value="interview" className="cursor-pointer">
            Interview
          </SelectItem>
          <SelectItem value="rejected" className="cursor-pointer">
            Rejected
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
