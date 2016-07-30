export const TAB_ADD = 'TAB_ADD';
export const FOLDER_ADD = 'FOLDER_ADD';

//name: "untitled "+ Math.floor((Math.random() * 100) + 1),

export function tabAdd() {
    return {
        type: TAB_ADD,
        payload: {
            name: "untitled"
        }
    }
}

export function folderAdd(name) {
    return {
        type: FOLDER_ADD,
        payload: {
            name: name
        }
    }
}
