import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { Item } from "common/models/item.model";
import { ITEMS } from "../repositories/items.repository";

const createItem = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const newItem: Item = { id: Date.now() + "", name };
        ITEMS.push(newItem);
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

const getItems = (_: Request, res: Response, next: NextFunction) => {
    try {
        res.json(ITEMS);
    } catch (error) {
        next(error);
    }
};

const getItemById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const item = ITEMS.find((i) => i.id === id);
        if (!item) {
            res.status(404).json({ message: "Item not found" });
            return;
        }
        res.json(item);
    } catch (error) {
        next(error);
    }
};

const updateItem = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const itemIndex = ITEMS.findIndex((i) => i.id === id);
        if (itemIndex === -1) {
            res.status(404).json({ message: "Item not found" });
            return;
        }
        ITEMS[itemIndex].name = name;
        res.json(ITEMS[itemIndex]);
    } catch (error) {
        next(error);
    }
};

const deleteItem = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const itemIndex = ITEMS.findIndex((i) => i.id === id);
        if (itemIndex === -1) {
            res.status(404).json({ message: "Item not found" });
            return;
        }
        const deletedItem = ITEMS.splice(itemIndex, 1)[0];
        res.json(deletedItem);
    } catch (error) {
        next(error);
    }
};

export const itemRouter = Router();
itemRouter.get("/", getItems);
itemRouter.get("/:id", getItemById);
itemRouter.post("/", createItem);
itemRouter.put("/:id", updateItem);
itemRouter.delete("/:id", deleteItem);
