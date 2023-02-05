import { ChangeEvent, KeyboardEvent } from "react";
import { useAutocomplete } from "../../hooks/use-autocomplete";
import { AutocompleteSuggestion } from "../../lib/types";
import { SuggestionsList } from "./suggestions-list";

interface Props {
  onSearch: (searchQuery: string) => Promise<AutocompleteSuggestion[]>;
}

export function Autocomplete({ onSearch }: Props): JSX.Element {
  const {
    handleItemFocus,
    handleSelectItem,
    handleValueChange,
    isAutocompleted,
    placeholderValue,
    results,
    searchInputRef,
    value,
  } = useAutocomplete({
    onSearch,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    handleValueChange(e.target.value);
  }

  function onSearchInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();
      document.getElementById("item-0")?.focus();
    }
  }

  return (
    <div className="autocomplete">
      <label htmlFor="search" className="label">
        Search our products
      </label>
      <input
        type="text"
        id="search"
        className="search-input"
        value={placeholderValue || value}
        placeholder='Search for "ball", "car", "hat", "shoe"...'
        ref={searchInputRef}
        onChange={handleChange}
        onKeyDown={onSearchInputKeyDown}
      />

      <SuggestionsList
        isAutocompleted={isAutocompleted}
        suggestions={results}
        searchValue={value}
        onItemFocus={handleItemFocus}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}
