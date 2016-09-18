export const FOLDER_FETCH = "FOLDER_FETCH";
export const FOLDER_ADD = "FOLDER_ADD";
export const FOLDER_EDIT = "FOLDER_EDIT";
export const FOLDER_DELETE = "FOLDER_DELETE";
export const FOLDER_ITEM_ADD = "FOLDER_ITEM_ADD";
export const FOLDER_ITEM_EDIT = "FOLDER_ITEM_EDIT";
export const FOLDER_ITEM_DELETE = "FOLDER_ITEM_DELETE";
export const TAB_ADD = "TAB_ADD";
export const TAB_DELETE = "TAB_DELETE";
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

export function folderDelete(index) {
    return {
        type: FOLDER_DELETE,
        payload: {
            folder: index,
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

export function tabAdd(item = {}) {
    return {
        type: TAB_ADD,
        payload: {
            name: ("name" in item)? item.name: "",
            url: ("url" in item)? item.url: "",
            type: ("type" in item)? item.type: "",
            description: ("description" in item)? item.description: "",
            params: ("body" in item)? item.body: [],
            headers: ("headers" in item)? item.headers: [],
            body: ("body" in item)? item.body: []
        }
    }
}

export function tabDelete(index) {
    return {
        type: TAB_DELETE,
        payload: {
            tab:index
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
