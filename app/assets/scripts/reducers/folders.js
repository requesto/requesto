import File from "../libs/file";
import {FOLDER_ADD,
        FOLDER_ITEM_ADD,
        FOLDER_ITEM_DELETE,
        FOLDER_FETCH} from '../actions/index';

let initialState = {
    name:"Folder",
    id: 1,
    items:[
    {
        name:"/user",
        description:"Create new user",
        type:"POST",
        url:"http://beta.json-generator.com/api/json/get/4JVFHRAHZ"
    }]
}

export default function(state = [initialState],action) {
    const file = new File();
    var folders = [];
    switch (action.type){
        case FOLDER_FETCH:
            return action.payload;

        case FOLDER_ADD:
            folders = [...state,action.payload]
            file.loadSetupFile(function (data){
                data.folders = folders
                file.updateSetupFile(data);
            });
            return folders;

        case FOLDER_ITEM_ADD:
            folders = state.map(function(folder){
                if (folder.id == action.payload.folder){
                    folder.items.push({
                        name: action.payload.item.name,
                        description: action.payload.item.description,
                        type: action.payload.item.type
                    })
                }
                return folder;
            });

            file.loadSetupFile(function (data){
                data.folders = folders
                file.updateSetupFile(data);
            });

            return folders;

        case FOLDER_ITEM_DELETE:
            console.log("state: ",state);

            folders = state.map(function(folder,index){
                if (index == action.payload.folder){
                    folder.items.splice(action.payload.item,1);
                }
                return folder;
            });

            console.log("state: ",folders);

            file.loadSetupFile(function (data){
                data.folders = state
                file.updateSetupFile(data);
            });

            return folders;
    }
    return state;
}
