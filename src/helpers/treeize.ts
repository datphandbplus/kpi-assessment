import { CodeConstants } from '../interfaces/code_constants';
import * as Treeize from 'treeize';

export class RowsToJson {
    async mapViewResultWithJson(viewResult:any, detectCollectionsFlag:boolean = true) {
        try {
            let sqlView = new Treeize();
            sqlView.setOptions({input: {delimiter: '__', detectCollections: detectCollectionsFlag}, output: {prune: false}});
            sqlView.grow(viewResult);
            var jsonResult = await sqlView.getData();
            return jsonResult;
        } catch(err) {
            throw new Error(err);
        }
    }
}
