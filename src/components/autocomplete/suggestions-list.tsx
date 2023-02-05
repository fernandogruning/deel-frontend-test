import {
  FocusEventHandler,
  KeyboardEventHandler,
  PointerEventHandler,
} from "react";

import { AutocompleteSuggestion } from "../../lib/types";
import { handleKeyboardNavigation } from "../../lib/utils";
import { SuggestionItem } from "./suggestion-item";

interface Props {
  isAutocompleted: boolean;
  onItemFocus: (suggestionText: string) => void;
  onSelectItem: (suggestionText: string) => void;
  searchValue: string;
  suggestions: AutocompleteSuggestion[];
}

export function SuggestionsList({
  isAutocompleted,
  onItemFocus,
  onSelectItem,
  searchValue,
  suggestions,
}: Props): JSX.Element | null {
  function handleItemClick(
    suggestionText: string
  ): PointerEventHandler<HTMLDivElement> {
    return () => {
      onSelectItem(suggestionText);
    };
  }

  function handleItemKeyup(
    id: number,
    suggestionText: string
  ): KeyboardEventHandler<HTMLDivElement> {
    return (event) =>
      handleKeyboardNavigation(event, id, suggestions.length, () =>
        onSelectItem(suggestionText)
      );
  }

  function handleItemFocus(
    suggestionText: string
  ): FocusEventHandler<HTMLDivElement> {
    return () => {
      onItemFocus(suggestionText);
    };
  }

  if (!searchValue || isAutocompleted) {
    return null;
  }

  return (
    <div className="suggestions-list">
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, id) => (
          <SuggestionItem
            key={`result-${suggestion.id}`}
            searchValue={searchValue}
            suggestion={suggestion}
            id={id}
            onKeyDown={handleItemKeyup(id, suggestion.text)}
            onFocus={handleItemFocus(suggestion.text)}
            onClick={handleItemClick(suggestion.text)}
          />
        ))
      ) : (
        <div className="item">
          No products found, try again with another term.
        </div>
      )}
    </div>
  );
}
