import React, {useState} from "react";
import "./App.css"

function ProductCategoryRow({category}) {
    return (
        <tr>
            <th colSpan="2">{category}</th>
        </tr>
    );
}

function ProductRow({product}) {
    return (
        <tr>
            <td style={{color: product.stocked ? "black" : "red"}}>{product.name}</td>
            <td>{product.price}</td>
        </tr>
    );
}

function ProductTable({products, filterText, stockOnly}) {
    const tableRows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (!product.name.toLowerCase().includes(filterText.toLowerCase())) {
            return;
        }

        if (stockOnly && !product.stocked) {
            return;
        }

        if (product.category !== lastCategory) {
            tableRows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category}
                />
            );
        }

        tableRows.push(
            <ProductRow
                product={product}
                key={product.name}
            />
        );

        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {tableRows}
            </tbody>
        </table>
    );
}

function SearchBar({filterText, stockOnly, onFilterTextChange, onStockCheckChange}) {
    return (
        <form>
            <input type="text" id="searchBar" value={filterText} placeholder="Search..."
                   onChange={(e) => onFilterTextChange(e.target.value)}/>
            <br/>
            <input type="checkbox" id="stockCheckBox" checked={stockOnly}
                   onChange={(e) => onStockCheckChange(e.target.checked)}/>
            <label htmlFor="stockCheckBox"> Only show products in stock</label>
        </form>
    );
}

function FilterableProductTable({products}) {
    const [filterText, setFilterText] = useState("");
    const [stockOnly, setStockOnly] = useState(false);

    return (
        <>
            <SearchBar
                filterText={filterText}
                stockOnly={stockOnly}
                onFilterTextChange={setFilterText}
                onStockCheckChange={setStockOnly}/>
            <ProductTable
                products={products}
                filterText={filterText}
                stockOnly={stockOnly}/>
        </>
    );
}

function App() {
    return <FilterableProductTable products={groceryList}/>;
}

const groceryList = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragon fruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passion fruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"},
];

export default App;
