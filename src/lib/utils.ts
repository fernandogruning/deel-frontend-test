import { KeyboardEvent } from "react";
import { ApiProduct, Product } from "./types";

export async function findProducts(searchQuery: string): Promise<Product[]> {
  try {
    const encodedQuery = encodeURIComponent(searchQuery);
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/?title=${encodedQuery}`,
      { method: "GET" }
    );
    const data = (await response.json()) as ApiProduct[];

    return data.map((product) => ({
      description: product.description,
      id: product.id,
      price: product.price,
      title: product.title,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

/**
 * Handle keyboard navigations for Up, Down and (Shift+)Tab keys to cycle
 * through a list of focusable items and Enter or Select to select an item
 */
export function handleKeyboardNavigation(
  event: KeyboardEvent<HTMLDivElement>,
  itemId: number,
  totalItems: number,
  onSelectItem: () => void
): void {
  if (["Enter", " "].includes(event.key)) {
    onSelectItem();
    return;
  }

  if (!["Tab", "ArrowDown", "ArrowUp"].includes(event.key)) return;
  event.preventDefault();

  const isFirstItem = itemId === 0;
  const lastItem = totalItems - 1;
  const isLastItem = itemId === lastItem;
  const prevItem = itemId - 1;
  const nextItem = itemId + 1;

  // On pressing Up or Shift+Tab, focus on the previous item
  // or the last one if the user is at the beginning of the list.
  // On pressing Down or Tab, focus on the next item or the first
  // one if the user is at the end of the list.
  if (event.key === "ArrowUp" || (event.key === "Tab" && event.shiftKey)) {
    if (isFirstItem) {
      document.getElementById(`item-${lastItem}`)?.focus();
    } else {
      document.getElementById(`item-${prevItem}`)?.focus();
    }
  } else if (
    event.key === "ArrowDown" ||
    (event.key === "Tab" && !event.shiftKey)
  ) {
    if (isLastItem) {
      document.getElementById("item-0")?.focus();
    } else {
      document.getElementById(`item-${nextItem}`)?.focus();
    }
  }
}
