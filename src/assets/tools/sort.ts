import { INotes } from "../../types/notes";

export const sort = (notes: INotes[]) => {
    return notes.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });
}
