'use client';

interface Brand {
    _id: string;
    name: string;
}

interface Category {
    _id: string;
    name: string;
}

interface FilterDrawerProps {
    brands: Brand[];
    categories: Category[];
    selectedBrands: string[];
    selectedCategories: string[];
    setSelectedBrands: (brands: string[]) => void;
    setSelectedCategories: (categories: string[]) => void;
    maxPrice: string;
    minPrice: string;
    setMinPrice: (value: string) => void;
    setMaxPrice: (value: string) => void;
    onClose?: () => void;
}

export default function FilterDrawer({
    brands,
    categories,
    selectedBrands,
    selectedCategories,
    setSelectedBrands,
    setSelectedCategories,
    maxPrice,
    minPrice,
    setMinPrice,
    setMaxPrice,
    onClose
}: FilterDrawerProps) {

    const toggle = (
        id: string,
        selected: string[],
        setSelected: (val: string[]) => void
    ) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(item => item !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    return (
        <div className="filter-drawer">
            <div className="filter-header">
                <h5>Filter</h5>
                <button onClick={onClose}>✕</button>
            </div>

            {/* Brands */}
            <div className="filter-content">
                <h6>Brands</h6>
                {brands.map(brand => (
                    <div key={brand._id}>
                        <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand._id)}
                            onChange={() =>
                                toggle(brand._id, selectedBrands, setSelectedBrands)
                            }
                        />
                        <label>{brand.name}</label>
                    </div>
                ))}

                {/* Categories */}
                <h6 style={{ marginTop: "20px" }}>Categories</h6>
                {categories.map(category => (
                    <div key={category._id}>
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category._id)}
                            onChange={() =>
                                toggle(category._id, selectedCategories, setSelectedCategories)
                            }
                        />
                        <label>{category.name}</label>
                    </div>
                ))}
                <h6 style={{ marginTop: "20px" }}>Price Range</h6>

                <div>
                    <input
                        type="number"
                        placeholder="From"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div>

                <div style={{ marginTop: "10px" }}>
                    <input
                        type="number"
                        placeholder="To"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}