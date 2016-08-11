export const TAB_ADD = 'TAB_ADD';
export const FOLDER_ADD = 'FOLDER_ADD';
export const FOLDER_ADD_ENDPOINT = 'FOLDER_ADD_ENDPOINT';
export const MODAL = 'MODAL';

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
            id: Math.random().toString(36).substr(2, 9),
            items: [{
                name: "url",
                description: "endpoint description",
                type:"GET"
            }]
        }
    }
}

export function folderAddEndpoint(folder,name){
    console.log(folder,name);
    return{
        type: FOLDER_ADD_ENDPOINT,
        payload: {
            name: name,
            folderId: folder

        }
    }
}

export function modal(type){
    return {
        type: MODAL,
        payload: {
            type:type
        }
    }
}
