import React, { useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";
import { Search, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface FilterOption {
  key: string;
  label: string;
  type: "select" | "date" | "text";
  options?: { value: string; label: string }[];
}

interface SearchAndFilterProps {
  searchPlaceholder?: string;
  filterOptions?: FilterOption[];
  onSearch?: (query: string) => void;
  onFilter?: (filters: Record<string, string>) => void;
  onClear?: () => void;
}

const SearchAndFilter = ({
  searchPlaceholder = "Search...",
  filterOptions = [],
  onSearch,
  onFilter,
  onClear,
}: SearchAndFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter?.(newFilters);
  };

  const removeFilter = (key: string) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    onFilter?.(newFilters);
  };

  const clearAll = () => {
    setSearchQuery("");
    setFilters({});
    onClear?.();
  };

  const activeFiltersCount = Object.keys(filters).length;

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center space-x-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            id="search-input"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle >Filter Options</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {filterOptions.map((option) => (
                <div key={option.key} className="space-y-2">
                  <label className="text-sm font-medium">{option.label}</label>
                  {option.type === "select" && option.options ? (
                    <Select
                      value={filters[option.key] || ""}
                      onValueChange={(value) =>
                        handleFilterChange(option.key, value)
                      }
                    >
                      <option value="" disabled selected hidden>{`Select ${option.label.toLowerCase()}`}</option>
                      {option.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </Select>
                  ) : option.type === "date" ? (
                    <Input
                      id={`filter-${option.key}`}
                      type="date"
                      value={filters[option.key] || ""}
                      onChange={(e) =>
                        handleFilterChange(option.key, e.target.value)
                      }
                    />
                  ) : (
                    <Input
                      id={`filter-${option.key}`}
                      value={filters[option.key] || ""}
                      onChange={(e) =>
                        handleFilterChange(option.key, e.target.value)
                      }
                      placeholder={`Enter ${option.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Close
                </Button>
                <Button variant="destructive" onClick={clearAll}>
                  Clear All
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            const option = filterOptions.find((opt) => opt.key === key);
            return (
              <Badge
                key={key}
                variant="secondary"
                className="flex items-center space-x-1"
              >
                <span>
                  {option?.label}: {value}
                </span>
                <button
                  onClick={() => removeFilter(key)}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
