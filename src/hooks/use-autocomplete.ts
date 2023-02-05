import { RefObject, useEffect, useRef, useState } from "react";

import { AutocompleteSuggestion } from "../lib/types";

interface Props {
  onSearch: (searchQuery: string) => Promise<AutocompleteSuggestion[]>;
}

interface UseAutocompleteHook {
  handleItemFocus: (suggestionText: string) => void;
  handleSelectItem: (suggestionText: string) => void;
  handleValueChange: (newValue: string) => void;
  isAutocompleted: boolean;
  placeholderValue: string;
  results: AutocompleteSuggestion[];
  searchInputRef: RefObject<HTMLInputElement>;
  value: string;
}

/**
 * Autocomplete hook that returns a list of results that matches a search query
 */
export function useAutocomplete({ onSearch }: Props): UseAutocompleteHook {
  const [value, setValue] = useState("");
  const [placeholderValue, setPlaceholderValue] = useState("");
  const [results, setResults] = useState<AutocompleteSuggestion[]>([]);
  const isAutocompleted = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleValueChange(newValue: string): void {
    if (placeholderValue) {
      setPlaceholderValue("");
    }

    isAutocompleted.current = false;
    setValue(newValue);
  }

  function handleItemFocus(suggestionText: string) {
    setPlaceholderValue(suggestionText);
  }

  function handleSelectItem(suggestionText: string) {
    handleValueChange(suggestionText);
    isAutocompleted.current = true;
    searchInputRef.current?.focus();
  }

  useEffect(() => {
    // Clear the results when the search query is empty
    if (!value) {
      isAutocompleted.current = false;
      setResults([]);
      return;
    }

    // Debounced function for fetching the autocomplete suggestions.
    const timeout = setTimeout(async () => {
      const matchedResults = await onSearch(value);
      setResults(matchedResults);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return {
    handleItemFocus,
    handleSelectItem,
    handleValueChange,
    isAutocompleted: isAutocompleted.current,
    placeholderValue,
    results,
    searchInputRef,
    value,
  };
}
