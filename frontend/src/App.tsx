import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Item } from "common/models/item.model.ts";

function App() {
    const [items, setItems] = useState<Item[]>([]);

    const getItems = useCallback(() => {
        fetch("http://localhost:3000/api/items")
            .then((response) => response.json())
            .then((items: Item[]) => {
                console.log("Success:", items);
                setItems(items);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    useEffect(() => {
        getItems();
    }, [getItems]);

    const createRandomItem = useCallback(() => {
        const newRandomItem: Item = {
            id: "",
            name: "Name" + Math.random(),
            description: "some description",
            date: new Date().getTime(),
        };

        fetch("http://localhost:3000/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRandomItem),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                getItems();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [getItems]);

    return (
        <>
            <h1>Vite + React</h1>

            <div>
                <img src={reactLogo} className="logo react" alt="React logo" />
            </div>

            <button onClick={() => createRandomItem()}>
                Create random item
            </button>

            <h2>All items:</h2>
            <div>
                {items.map((item) => {
                    return <div>{JSON.stringify(item)}</div>;
                })}
            </div>
        </>
    );
}

export default App;
