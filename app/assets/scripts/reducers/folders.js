import File from "../libs/file";
import {FOLDER_ADD,FOLDER_ADD_ITEM,FOLDERS_FETCH} from '../actions/index';

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
        case FOLDERS_FETCH:
            return action.payload;
        case FOLDER_ADD:
            folders = [...state,action.payload]
            file.loadSetupFile(function (data){
                data.folders = folders
                file.updateSetupFile(data);
            });
            return folders;
        case FOLDER_ADD_ITEM:
            folders = state.map(function(item){
                if (item.id == action.payload.folder){
                    item.items.push({
                        name: action.payload.item.name,
                        description: action.payload.item.description,
                        type: action.payload.item.type
                    })
                }
                return item;
            });

            file.loadSetupFile(function (data){
                data.folders = folders
                file.updateSetupFile(data);
            });

            return folders;
    }
    return state;
}
