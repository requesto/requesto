export const VIEWER_ADD = 'VIEWER_ADD';

export function viewerAdd() {
    return {
        type: VIEWER_ADD,
        payload: {
            name: "untitled",
            url: ""
        }
    }
}
