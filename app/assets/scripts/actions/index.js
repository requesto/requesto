export const TAB_ADD = 'TAB_ADD';
export const FOLDER_ADD = 'FOLDER_ADD';
export const MODAL_OPEN = 'MODAL_OPEN';

export function tabAdd(name = "untitled") {
    return {
        type: TAB_ADD,
        payload: {
            name: name
        }
    }
}

export function folderAdd(name) {
    return {
        type: FOLDER_ADD,
        payload: {
            name: name,
            items: [{
                name: "url",
                description: "endpoint description",
                type:"GET"
            }]
        }
    }
}


export function modalOpen(name){
    return {
        type: MODAL_OPEN,
        payload: {
            name: name
        }
    }
}
