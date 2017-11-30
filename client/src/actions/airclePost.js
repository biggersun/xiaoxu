import {
    COMMON_UPLOAD,
} from 'constants/api';
import { uploadFile } from 'assets/js/request';
import { FILE_UPLOAD } from 'constants/actionTypes';
import { actionCreator } from 'assets/js/util';

const fileUpload = actionCreator(FILE_UPLOAD);

export function uploadMarkdown(opt = {}) {
    return async (dispatch) => {
        let payload;

        try {
            payload = await uploadFile(COMMON_UPLOAD, opt);
        } catch (error) {
            return;
        }

        dispatch(fileUpload(payload));
    };
}
