import { act, renderHook, waitFor } from "@testing-library/react";
import { useAutocomplete } from "../hooks/use-autocomplete";
import { AutocompleteSuggestion } from "../lib/types";

const MOCK_RESULTS: AutocompleteSuggestion[] = [{ id: 1, text: "value text" }];

const onSearch = vi.fn(() => Promise.resolve(MOCK_RESULTS));

describe("useAutocomplete hook", () => {
  test("should initialize correctly", () => {
    const { result } = renderHook(() => useAutocomplete({ onSearch }));

    expect(result.current).toMatchObject({
      isAutocompleted: false,
      placeholderValue: "",
      results: [],
      value: "",
    });
  });

  test("should change value correctly", () => {
    const { result } = renderHook(() => useAutocomplete({ onSearch }));

    act(() => {
      result.current.handleValueChange("value");
    });

    expect(result.current.value).toEqual("value");
  });

  test("should call onSearch function when value changes and update `results`", () => {
    const { result } = renderHook(() => useAutocomplete({ onSearch }));

    act(() => {
      result.current.handleValueChange("value");
    });

    waitFor(() => {
      expect(onSearch).toHaveBeenCalledOnce();
      expect(result.current.value).toEqual("value");
      expect(result.current.results).toContain({ id: 1, text: "value text" });
    });

    onSearch.mockReturnValueOnce(Promise.resolve([]));

    act(() => {
      result.current.handleValueChange("invalid");
    });

    waitFor(() => {
      expect(onSearch).toHaveBeenCalledOnce();
      expect(result.current.value).toEqual("invalid");
      expect(result.current.results).toHaveLength(0);
    });
  });

  test("should update `placeholderValue` and not call onSearch", () => {
    const { result } = renderHook(() => useAutocomplete({ onSearch }));

    act(() => {
      result.current.handleItemFocus("placeholder");
    });

    waitFor(() => {
      expect(onSearch).not.toHaveBeenCalled();
      expect(result.current.value).toEqual("");
      expect(result.current.placeholderValue).toEqual("placeholder");
      expect(result.current.results).toHaveLength(0);
    });
  });

  test("should autocomplete the search query", () => {
    const selectedItemText = MOCK_RESULTS[0].text;

    const { result } = renderHook(() => useAutocomplete({ onSearch }));

    act(() => {
      result.current.handleValueChange("value");
    });

    waitFor(() => {
      expect(onSearch).toHaveBeenCalledOnce();
      expect(result.current.value).toEqual("value");
      expect(result.current.results).toContain({ id: 1, text: "value text" });
    });

    act(() => {
      result.current.handleSelectItem(selectedItemText);
    });

    waitFor(() => {
      expect(onSearch).toHaveBeenCalledOnce();
      expect(result.current.isAutocompleted).toEqual(true);
      expect(result.current.value).toEqual(selectedItemText);
    });
  });
});
