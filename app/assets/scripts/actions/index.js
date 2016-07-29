export const TAB_ADD = 'TAB_ADD';

//name: "untitled "+ Math.floor((Math.random() * 100) + 1),

export function tabAdd() {
    return {
        type: TAB_ADD,
        payload: {
            name: "untitled",
            url: ""
        }
    }
}
