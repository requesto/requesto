import File from "../libs/file";
import {FOLDER_ADD,
        FOLDER_DELETE,
        FOLDER_ITEM_ADD,
        FOLDER_ITEM_DELETE,
        FOLDER_ITEM_EDIT,
        FOLDER_FETCH} from '../actions/index';

export default function(state = [],action) {
    const file = new File();
    var folders = [];
    switch (action.type){
        case FOLDER_FETCH:
            return action.payload;

        case FOLDER_ADD:
            folders = [...state,action.payload]
            file.loadStorageFile(function (data){
                data.folders = folders
                file.updateStorageFile(data);
            });
            return folders;

        case FOLDER_DELETE:
            folders = state.slice();
            folders.splice(action.payload.folder,1);
            file.loadStorageFile(function (data){
                data.folders = folders
                file.updateStorageFile(data);
            });
            return folders;

        case FOLDER_ITEM_ADD:
            folders = state.map(function(folder){
                if (folder.id == action.payload.folder){
                    folder.items.push({
                        name: action.payload.item.name,
                        description: action.payload.item.description,
                        type: action.payload.item.type,
                        url: action.payload.item.url
                    })
                }
                return folder;
            });

            file.loadStorageFile(function (data){
                data.folders = folders
                file.updateStorageFile(data);
            });
            return folders;

        case FOLDER_ITEM_DELETE:
            folders = state.map(function(folder,index){
                if (index == action.payload.folder){
                    folder.items.splice(action.payload.item,1);
                }
                return folder;
            });

            file.loadStorageFile(function (data){
                data.folders = state
                file.updateStorageFile(data);
            });

            console.log(folders);

            return folders;
        case FOLDER_ITEM_EDIT:
            folders = state.map(function(folder){
                folder.items.forEach(function(item,index){
                    if (item.id === action.payload.item.id){
                        console.log("find id:",item.id," with url: ",action.payload.item.url);
                        folder.items[index] = action.payload.item;
                    }
                })
                return folder;
            });

            console.log(folders);

            file.loadStorageFile(function (data){
                data.folders = state
                file.updateStorageFile(data);
            });
            return folders;
    }
    return state;
}
