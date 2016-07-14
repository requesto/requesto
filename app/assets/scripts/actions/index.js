export const VIEWER_ADD = 'VIEWER_ADD';

export function viewerAdd() {
    return {
        type: VIEWER_ADD,
        payload: [{
            name: "untitled "+ Math.floor((Math.random() * 100) + 1),
            url: ""
        }]
    }
}
