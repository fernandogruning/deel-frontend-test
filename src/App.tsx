import { Autocomplete } from "./components/autocomplete";
import { AutocompleteSuggestion } from "./lib/types";
import { findProducts } from "./lib/utils";

function App() {
  async function searchProducts(
    searchQuery: string
  ): Promise<AutocompleteSuggestion[]> {
    const matchedProducts = await findProducts(searchQuery);
    return matchedProducts.map((product) => ({
      id: product.id,
      text: product.title,
    }));
  }

  return (
    <main>
      <section className="search-section">
        <Autocomplete onSearch={searchProducts} />
      </section>
    </main>
  );
}

export default App;
