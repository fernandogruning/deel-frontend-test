import {
  FocusEventHandler,
  KeyboardEventHandler,
  PointerEventHandler,
} from "react";

import { AutocompleteSuggestion } from "../../lib/types";

interface Props {
  suggestion: AutocompleteSuggestion;
  searchValue: string;
  id: number;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
  onFocus: FocusEventHandler<HTMLDivElement>;
  onClick: PointerEventHandler<HTMLDivElement>;
}

export function SuggestionItem({
  suggestion,
  searchValue,
  id,
  onKeyDown,
  onFocus,
  onClick,
}: Props): JSX.Element {
  const keywords = suggestion.text.split(new RegExp(`(${searchValue})`, "gi"));

  return (
    <div
      tabIndex={0}
      id={`item-${id}`}
      className="item suggestion"
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onClick={onClick}
    >
      {keywords.map((keyword, index) => {
        const key = `${suggestion.id}-${index}-${keyword}`;
        const isHighlighted =
          keyword.toLowerCase() === searchValue.toLowerCase();

        return (
          <span key={key} className={isHighlighted ? "highlight" : ""}>
            {keyword}
          </span>
        );
      })}
    </div>
  );
}
