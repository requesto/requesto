export const FOLDER_FETCH = "FOLDER_FETCH";
export const FOLDER_ADD = "FOLDER_ADD";
export const FOLDER_EDIT = "FOLDER_EDIT";
export const FOLDER_DELETE = "FOLDER_DELETE";
export const FOLDER_ITEM_ADD = "FOLDER_ITEM_ADD";
export const FOLDER_ITEM_EDIT = "FOLDER_ITEM_EDIT";
export const FOLDER_ITEM_DELETE = "FOLDER_ITEM_DELETE";
export const TAB_ADD = "TAB_ADD";
export const MODAL = "MODAL";

export function folderFetch(folders) {
    return {
        type: FOLDER_FETCH,
        payload: folders
    }
}

export function folderAdd(name) {
    return {
        type: FOLDER_ADD,
        payload: {
            name: name,
            id: Math.random().toString(36).substr(2, 9),
            items: [{
                name: "url",
                description: "endpoint description",
                type: "GET"
            }]
        }
    }
}

export function folderItemAdd(folder, item) {
    console.log("folderItemAdd", folder, item);
    return {
        type: FOLDER_ITEM_ADD,
        payload: {
            folder: folder,
            item: item
        }
    }
}

export function folderItemEdit(folder, item) {
    console.log("folderItemEdit", folder, item);
    return {
        type: FOLDER_ITEM_EDIT,
        payload: {
            folder: folder,
            item: item
        }
    }
}

export function folderItemDelete(folder, item) {
    console.log("folderItemDelete", folder, item);
    return {
        type: FOLDER_ITEM_DELETE,
        payload: {
            folder: folder,
            item: item
        }
    }
}

export function tabAdd(name = "untitled") {
    return {
        type: TAB_ADD,
        payload: {
            name: name
        }
    }
}

export function modal(type) {
    return {
        type: MODAL,
        payload: {
            type: type
        }
    }
}
